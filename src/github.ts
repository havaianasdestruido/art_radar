/**
 * GitHub API types and fetch helpers.
 * Reads GITHUB_TOKEN and DIGEST_REPO from the environment at call time.
 */

import { type Lang } from "./lang.ts";
import { labelBase, findReport } from "./reports.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RepoConfig {
  /** Short identifier used for filenames */
  id: string;
  /** GitHub owner/repo slug */
  repo: string;
  /** Human-readable display name */
  name: string;
  /**
   * Fetch multiple pages until items older than `since` are reached.
   * Use for high-volume repos with many daily updates.
   */
  paginated?: boolean;
}

export interface GitHubUser {
  login: string;
}

export interface GitHubLabel {
  name: string;
}

export interface GitHubReactions {
  "+1": number;
}

export interface GitHubItem {
  number: number;
  title: string;
  state: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  created_at: string;
  updated_at: string;
  comments: number;
  reactions?: GitHubReactions;
  body?: string | null;
  html_url: string;
  pull_request?: unknown;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  body?: string | null;
  published_at: string;
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

/** Maximum pages to fetch for paginated repos (100 items/page). */
const MAX_PAGES = 5;

function headers(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env["GITHUB_TOKEN"] ?? ""}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubGet<T>(url: string, params: Record<string, string> = {}): Promise<T> {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const resp = await fetch(u.toString(), { headers: headers() });
  if (!resp.ok) throw new Error(`GitHub API error ${resp.status} (${url}): ${await resp.text()}`);
  return resp.json() as Promise<T>;
}

async function fetchItemPage(
  repo: string,
  itemType: "issues" | "pulls",
  since: Date,
  page: number,
): Promise<GitHubItem[]> {
  const params: Record<string, string> = {
    state: "all",
    sort: "updated",
    direction: "desc",
    per_page: "100",
    page: String(page),
  };
  // /pulls does not support `since`; filter client-side instead
  if (itemType === "issues") params["since"] = since.toISOString();

  const items = await githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/${itemType}`, params);
  return itemType === "pulls" ? items.filter((i) => new Date(i.updated_at) >= since) : items;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/**
 * Fetch items updated since `since`.
 * Paginated repos: keeps fetching until a page ends before `since` or MAX_PAGES reached.
 * Regular repos: single page of 50.
 */
export async function fetchRecentItems(
  cfg: RepoConfig,
  itemType: "issues" | "pulls",
  since: Date,
): Promise<GitHubItem[]> {
  if (!cfg.paginated) {
    const params: Record<string, string> = {
      state: "all",
      sort: "updated",
      direction: "desc",
      per_page: "50",
    };
    if (itemType === "issues") params["since"] = since.toISOString();
    const items = await githubGet<GitHubItem[]>(
      `https://api.github.com/repos/${cfg.repo}/${itemType}`,
      params,
    );
    return itemType === "pulls" ? items.filter((i) => new Date(i.updated_at) >= since) : items;
  }

  const all: GitHubItem[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const items = await fetchItemPage(cfg.repo, itemType, since, page);
    if (items.length === 0) break;
    all.push(...items);
    const last = items[items.length - 1];
    if (last && new Date(last.updated_at) < since) break;
    if (items.length < 100) break;
  }
  return all;
}

export async function fetchRecentReleases(repo: string, since: Date): Promise<GitHubRelease[]> {
  const releases = await githubGet<GitHubRelease[]>(`https://api.github.com/repos/${repo}/releases`, {
    per_page: "10",
  });
  return releases.filter((r) => new Date(r.published_at) >= since);
}

export async function ensureLabel(name: string, color: string): Promise<void> {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const resp = await fetch(`https://api.github.com/repos/${digestRepo}/labels`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  if (!resp.ok && resp.status !== 422) {
    throw new Error(`Failed to create label "${name}": ${await resp.text()}`);
  }
}

/**
 * Fetch community submissions from a curated "awesome" list repository
 * (e.g. terkelg/awesome-creative-coding), where each PR proposes a new tool,
 * library, studio or event for the list.
 *
 * PRs are sorted by popularity (comment count) and issues by comments — there
 * is no `since` filter because submissions stay relevant far longer than a day.
 */
export async function fetchShowcaseData(repo: string): Promise<{ prs: GitHubItem[]; issues: GitHubItem[] }> {
  const [prs, issuesRaw] = await Promise.all([
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/pulls`, {
      state: "open",
      sort: "popularity",
      direction: "desc",
      per_page: "50",
    }),
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/issues`, {
      state: "all",
      sort: "comments",
      direction: "desc",
      per_page: "50",
    }),
  ]);
  return { prs, issues: issuesRaw.filter((i) => !i.pull_request) };
}

const GITHUB_ISSUE_BODY_LIMIT = 65536;

const TRUNCATION_NOTICE: Record<Lang, string> = {
  en: "\n\n---\n> ⚠️ Report exceeded GitHub's issue size limit. The full report is in the committed Markdown file.",
  pt: "\n\n---\n> ⚠️ O relatório excedeu o limite de tamanho de issues do GitHub. O relatório completo está no arquivo Markdown commitado.",
  zh: "\n\n---\n> ⚠️ 内容超过 GitHub Issue 上限，完整报告见提交的 Markdown 文件。",
};

export async function createGitHubIssue(
  title: string,
  body: string,
  label: string,
  lang: Lang = "en",
): Promise<string> {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const notice = TRUNCATION_NOTICE[lang];
  if (body.length > GITHUB_ISSUE_BODY_LIMIT) {
    body = body.slice(0, GITHUB_ISSUE_BODY_LIMIT - notice.length) + notice;
  }
  const color = findReport(labelBase(label))?.color ?? "6b7280";
  await ensureLabel(label, color);
  const resp = await fetch(`https://api.github.com/repos/${digestRepo}/issues`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, labels: [label] }),
  });
  if (!resp.ok) throw new Error(`Failed to create issue: ${await resp.text()}`);
  const data = (await resp.json()) as { html_url: string };
  return data.html_url;
}
