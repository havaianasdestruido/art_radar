/**
 * LLM prompt builders and item formatting — Art Radar edition.
 *
 * Prompts are organised as per-language templates: every builder renders the
 * shared GitHub/feed data once and then hands it to the template for the
 * requested language (English, Portuguese or Chinese). Keeping the three
 * templates side by side makes it obvious when one falls behind.
 */

import type { RepoConfig, GitHubItem, GitHubRelease } from "./github.ts";
import type { WebFetchResult } from "./web.ts";
import type { TrendingData } from "./trending.ts";
import type { HnData } from "./hn.ts";
import type { Lang } from "./lang.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RepoDigest {
  config: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
  summary: string;
}

/** Render a payload with the template of the requested language. */
function render<T>(templates: Record<Lang, (payload: T) => string>, lang: Lang, payload: T): string {
  return templates[lang](payload);
}

// ---------------------------------------------------------------------------
// Shared status strings
// ---------------------------------------------------------------------------

export const NO_ACTIVITY: Record<Lang, string> = {
  en: "No activity in the last 24 hours.",
  pt: "Sem atividade nas últimas 24 horas.",
  zh: "过去24小时无活动。",
};

export const FETCH_FAILED: Record<Lang, string> = {
  en: "⚠️ GitHub data could not be fetched for this repository in this run.",
  pt: "⚠️ Não foi possível obter os dados do GitHub deste repositório nesta execução.",
  zh: "⚠️ 本次运行未能获取该仓库的 GitHub 数据。",
};

export const COMPARISON_FAILED: Record<Lang, string> = {
  en: "⚠️ The cross-project comparison could not be generated in this run.",
  pt: "⚠️ Não foi possível gerar a comparação entre projetos nesta execução.",
  zh: "⚠️ 本次运行未能生成横向对比分析。",
};

export const SUMMARY_FAILED: Record<Lang, string> = {
  en: "⚠️ Summary generation failed.",
  pt: "⚠️ Falha ao gerar o resumo.",
  zh: "⚠️ 摘要生成失败。",
};

export const SHOWCASE_FAILED: Record<Lang, string> = {
  en: "⚠️ Community showcase generation failed.",
  pt: "⚠️ Falha ao gerar a vitrine da comunidade.",
  zh: "⚠️ 社区展示生成失败。",
};

export const TRENDING_NO_DATA: Record<Lang, string> = {
  en: "⚠️ Trending data unavailable, unable to generate the report.",
  pt: "⚠️ Dados de tendências indisponíveis, não foi possível gerar o relatório.",
  zh: "⚠️ 今日趋势数据获取失败，无法生成报告。",
};

export const TRENDING_FAILED: Record<Lang, string> = {
  en: "⚠️ Trending report generation failed.",
  pt: "⚠️ Falha ao gerar o relatório de tendências.",
  zh: "⚠️ 趋势报告生成失败。",
};

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

interface ItemLabels {
  author: string;
  created: string;
  updated: string;
  comments: string;
  url: string;
  summary: string;
}

const ITEM_LABELS: Record<Lang, ItemLabels> = {
  en: {
    author: "Author",
    created: "Created",
    updated: "Updated",
    comments: "Comments",
    url: "URL",
    summary: "Summary",
  },
  pt: {
    author: "Autor",
    created: "Criado",
    updated: "Atualizado",
    comments: "Comentários",
    url: "Link",
    summary: "Resumo",
  },
  zh: { author: "作者", created: "创建", updated: "更新", comments: "评论", url: "链接", summary: "摘要" },
};

export function formatItem(item: GitHubItem, lang: Lang = "en"): string {
  const labels = item.labels.map((l) => l.name).join(", ");
  const labelStr = labels ? ` [${labels}]` : "";
  const body = (item.body ?? "").replace(/\n/g, " ").trim().slice(0, 300);
  const ellipsis = (item.body ?? "").length > 300 ? "..." : "";
  const t = ITEM_LABELS[lang];
  return [
    `#${item.number} [${item.state.toUpperCase()}]${labelStr} ${item.title}`,
    `  ${t.author}: @${item.user.login} | ${t.created}: ${item.created_at.slice(0, 10)} | ${t.updated}: ${item.updated_at.slice(0, 10)} | ${t.comments}: ${item.comments} | 👍: ${item.reactions?.["+1"] ?? 0}`,
    `  ${t.url}: ${item.html_url}`,
    `  ${t.summary}: ${body}${ellipsis}`,
  ].join("\n");
}

function formatReleases(releases: GitHubRelease[], lang: Lang): string {
  const none = lang === "en" ? "None" : lang === "pt" ? "Nenhuma" : "无";
  return (
    releases.map((r) => `- ${r.tag_name}: ${r.name}\n  ${(r.body ?? "").slice(0, 300)}`).join("\n") || none
  );
}

// ---------------------------------------------------------------------------
// Sampling helpers (shared)
// ---------------------------------------------------------------------------

const TOOL_ISSUE_LIMIT = 30;
const TOOL_PR_LIMIT = 20;
const FRAMEWORK_ISSUE_LIMIT = 30;
const FRAMEWORK_PR_LIMIT = 20;

/** Sort by comment count desc, take top N. */
function topN(items: GitHubItem[], n: number): GitHubItem[] {
  return [...items].sort((a, b) => b.comments - a.comments).slice(0, n);
}

export function sampleNote(total: number, sampled: number, lang: Lang = "en"): string {
  if (lang === "en") {
    return total > sampled
      ? `(Total: ${total} items; showing the ${sampled} most commented)`
      : `(Total: ${total} items)`;
  }
  if (lang === "pt") {
    return total > sampled
      ? `(Total: ${total} itens; mostrando os ${sampled} mais comentados)`
      : `(Total: ${total} itens)`;
  }
  return total > sampled ? `（共 ${total} 条，以下展示评论数最多的 ${sampled} 条）` : `（共 ${total} 条）`;
}

const NONE: Record<Lang, string> = { en: "None", pt: "Nenhum", zh: "无" };

// ---------------------------------------------------------------------------
// 1. Artist tool digest (apps & CLIs an artist actually runs)
// ---------------------------------------------------------------------------

interface ToolPayload {
  name: string;
  repo: string;
  dateStr: string;
  releasesText: string;
  issuesText: string;
  prsText: string;
  issueNote: string;
  prNote: string;
  counts: { issues: number; prs: number };
}

const toolPromptTemplates: Record<Lang, (p: ToolPayload) => string> = {
  en: (
    p,
  ) => `You are a technical analyst covering creative-coding and generative-art tools. Using the GitHub data below, write the ${p.name} community digest for ${p.dateStr}.

# Source: github.com/${p.repo}
# Activity in the last 24h: ${p.counts.issues} issues, ${p.counts.prs} pull requests

## Releases (last 24h)
${p.releasesText}

## Issues updated in the last 24h ${p.issueNote}
${p.issuesText}

## Pull requests updated in the last 24h ${p.prNote}
${p.prsText}

---

Write a structured English digest with these sections:

1. **Today's Highlights** — 2-3 sentences on what matters most today: new builds, breaking changes, the single most interesting discussion.
2. **Releases** — if new versions shipped, summarise the notable changes, migration notes and any new export/hardware support; omit the section if there were none.
3. **Hot Issues** — pick up to 10 issues. For each: what the artist reported or asked for, why it matters for real work, and how the community reacted.
4. **Key PR Progress** — pick up to 10 pull requests and say which features or fixes are moving forward.
5. **Creative Workflow Trends** — what the requests reveal about how people actually work with the tool: export formats (SVG, G-code, PNG sequences), pen/tablet input, performance and GPU use, scripting and automation.
6. **Artist Pain Points** — recurring frustrations, workarounds and high-frequency requests.

Style: concrete and technical, written for artists and tool developers. Link every item to its GitHub URL.
`,

  pt: (
    p,
  ) => `Você é um analista técnico especializado em ferramentas de programação criativa e arte generativa. Com base nos dados do GitHub abaixo, escreva o resumo da comunidade ${p.name} de ${p.dateStr}.

# Fonte: github.com/${p.repo}
# Atividade nas últimas 24h: ${p.counts.issues} issues, ${p.counts.prs} pull requests

## Releases (últimas 24h)
${p.releasesText}

## Issues atualizadas nas últimas 24h ${p.issueNote}
${p.issuesText}

## Pull requests atualizados nas últimas 24h ${p.prNote}
${p.prsText}

---

Escreva um relatório estruturado em português brasileiro com as seguintes seções:

1. **Destaques do dia** — 2-3 frases sobre o que mais importa hoje: novas versões, mudanças que quebram compatibilidade, a discussão mais interessante.
2. **Lançamentos** — se houver novas versões, resuma as mudanças relevantes, notas de migração e novos formatos de exportação ou suporte a hardware; omita a seção se não houver.
3. **Issues em destaque** — escolha até 10 issues. Para cada uma: o que o artista relatou ou pediu, por que importa no trabalho real e como a comunidade reagiu.
4. **Progresso dos PRs principais** — escolha até 10 pull requests e diga quais recursos ou correções estão avançando.
5. **Tendências de fluxo de trabalho criativo** — o que os pedidos revelam sobre como as pessoas realmente usam a ferramenta: formatos de exportação (SVG, G-code, sequências PNG), entrada por caneta/mesa digitalizadora, desempenho e uso de GPU, scripting e automação.
6. **Dores dos artistas** — frustrações recorrentes, soluções improvisadas e pedidos mais frequentes.

Estilo: concreto e técnico, para artistas e desenvolvedores de ferramentas. Inclua o link do GitHub de cada item.
`,

  zh: (
    p,
  ) => `你是一位专注于创意编程与生成艺术工具的技术分析师。请根据以下 GitHub 数据，生成 ${p.dateStr} 的 ${p.name} 社区动态日报。

# 数据来源: github.com/${p.repo}
# 过去24小时动态: ${p.counts.issues} 条 Issues，${p.counts.prs} 条 Pull Requests

## 最新 Releases（过去24小时）
${p.releasesText}

## 过去24小时内更新的 Issues ${p.issueNote}
${p.issuesText}

## 过去24小时内更新的 Pull Requests ${p.prNote}
${p.prsText}

---

请生成一份结构清晰的中文日报，包含以下部分：

1. **今日速览** — 用 2~3 句话概括今天最重要的动态：新版本、破坏性变更、最值得关注的讨论。
2. **版本发布** — 如有新版本，总结重要变化、迁移注意事项及新增的导出/硬件支持；无则省略该部分。
3. **热点 Issues** — 挑选最多 10 条 Issue，说明艺术家反馈或提出的需求、为何影响实际创作、社区反应如何。
4. **重要 PR 进展** — 挑选最多 10 条 PR，说明正在推进的功能或修复。
5. **创作流程趋势** — 从需求中提炼艺术家真实的工作方式：导出格式（SVG、G-code、PNG 序列）、数位笔与手绘板输入、性能与 GPU 使用、脚本与自动化。
6. **创作者痛点** — 反复出现的困扰、变通做法与高频需求。

语言要求：具体、技术化，面向艺术家与工具开发者。每个条目附上 GitHub 链接。
`,
};

export function buildToolPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
  lang: Lang = "en",
): string {
  const sampledIssues = topN(issues, TOOL_ISSUE_LIMIT);
  const sampledPrs = topN(prs, TOOL_PR_LIMIT);

  return render(toolPromptTemplates, lang, {
    name: cfg.name,
    repo: cfg.repo,
    dateStr,
    releasesText: formatReleases(releases, lang),
    issuesText: sampledIssues.map((i) => formatItem(i, lang)).join("\n") || NONE[lang],
    prsText: sampledPrs.map((p) => formatItem(p, lang)).join("\n") || NONE[lang],
    issueNote: sampleNote(issues.length, sampledIssues.length, lang),
    prNote: sampleNote(prs.length, sampledPrs.length, lang),
    counts: { issues: issues.length, prs: prs.length },
  });
}

// ---------------------------------------------------------------------------
// 2. Creative-coding framework digest (flagship + peers)
// ---------------------------------------------------------------------------

interface FrameworkPayload extends ToolPayload {
  openIssues: number;
  closedIssues: number;
  openPrs: number;
  mergedPrs: number;
  releasesCount: number;
}

const frameworkPromptTemplates: Record<Lang, (p: FrameworkPayload) => string> = {
  en: (
    p,
  ) => `You are an analyst of open-source creative-coding frameworks — the libraries artists, designers and educators sketch with. Based on the GitHub data below from ${p.name} (github.com/${p.repo}), write a project digest for ${p.dateStr}.

# Data overview
- Issues updated in the last 24h: ${p.counts.issues} (open/active: ${p.openIssues}, closed: ${p.closedIssues})
- PRs updated in the last 24h: ${p.counts.prs} (open: ${p.openPrs}, merged/closed: ${p.mergedPrs})
- New releases: ${p.releasesCount}

## Latest releases
${p.releasesText}

## Latest issues ${p.issueNote}
${p.issuesText}

## Latest pull requests ${p.prNote}
${p.prsText}

---

Write a structured English digest with these sections:

1. **Today's Overview** — 3-5 sentences on the project's health today, including an activity assessment versus its usual pace.
2. **Releases** — details of new versions, breaking changes, migration notes and new APIs; omit if none.
3. **Project Progress** — merged/closed PRs today: which rendering, API or tooling work advanced.
4. **Community Hot Topics** — the most-commented issues and PRs (with links) and the underlying needs they reveal.
5. **Bugs & Stability** — bugs, regressions and crashes reported today, ordered by severity, noting whether a fix PR already exists.
6. **Feature Requests & Roadmap Signals** — what the community is asking for and which requests look likely to land in the next release.
7. **Artist & Educator Feedback** — real workflows, classroom/teaching concerns, accessibility notes and satisfaction levels from the issues.
8. **Backlog Watch** — long-unanswered issues or PRs that deserve maintainer attention.

Style: objective and data-driven, focused on project health for the people who teach and create with it. Link every item.
`,

  pt: (
    p,
  ) => `Você é um analista de frameworks open source de programação criativa — as bibliotecas com que artistas, designers e educadores criam seus sketches. Com base nos dados do GitHub de ${p.name} (github.com/${p.repo}), escreva o resumo do projeto para ${p.dateStr}.

# Visão geral dos dados
- Issues atualizadas nas últimas 24h: ${p.counts.issues} (abertas/ativas: ${p.openIssues}, fechadas: ${p.closedIssues})
- PRs atualizados nas últimas 24h: ${p.counts.prs} (abertos: ${p.openPrs}, mesclados/fechados: ${p.mergedPrs})
- Novos releases: ${p.releasesCount}

## Últimos releases
${p.releasesText}

## Últimas issues ${p.issueNote}
${p.issuesText}

## Últimos pull requests ${p.prNote}
${p.prsText}

---

Escreva um relatório estruturado em português brasileiro com as seguintes seções:

1. **Panorama do dia** — 3-5 frases sobre a saúde do projeto hoje, incluindo uma avaliação da atividade em relação ao ritmo habitual.
2. **Lançamentos** — detalhes das novas versões, mudanças que quebram compatibilidade, notas de migração e novas APIs; omita se não houver.
3. **Progresso do projeto** — PRs mesclados/fechados hoje: quais avanços de renderização, API ou ferramental.
4. **Temas quentes da comunidade** — as issues e PRs mais comentados (com links) e as necessidades que revelam.
5. **Bugs e estabilidade** — bugs, regressões e travamentos relatados hoje, em ordem de gravidade, indicando se já existe PR de correção.
6. **Pedidos de recursos e sinais de roadmap** — o que a comunidade pede e o que parece provável de entrar na próxima versão.
7. **Retorno de artistas e educadores** — fluxos de trabalho reais, questões de sala de aula/ensino, acessibilidade e níveis de satisfação observados nas issues.
8. **Fila de pendências** — issues ou PRs antigos sem resposta que merecem atenção dos mantenedores.

Estilo: objetivo e baseado em dados, com foco na saúde do projeto para quem ensina e cria com ele. Inclua link de cada item.
`,

  zh: (
    p,
  ) => `你是一位开源创意编程框架分析师，关注艺术家、设计师与教育者日常使用的创作库。请根据 ${p.name} (github.com/${p.repo}) 的以下 GitHub 数据，生成 ${p.dateStr} 的项目动态日报。

# 数据概览
- 过去24小时 Issues 更新：${p.counts.issues} 条（新开/活跃: ${p.openIssues}，已关闭: ${p.closedIssues}）
- 过去24小时 PR 更新：${p.counts.prs} 条（待合并: ${p.openPrs}，已合并/关闭: ${p.mergedPrs}）
- 新版本发布：${p.releasesCount} 个

## 最新 Releases
${p.releasesText}

## 最新 Issues ${p.issueNote}
${p.issuesText}

## 最新 Pull Requests ${p.prNote}
${p.prsText}

---

请生成一份结构清晰的中文日报，包含以下部分：

1. **今日速览** — 用 3~5 句话概括项目今日整体状态，并与日常节奏对比评估活跃度。
2. **版本发布** — 新版本详情、破坏性变更、迁移注意事项与新 API；无则省略。
3. **项目进展** — 今日合并/关闭的 PR：渲染、API 或工具链上推进了哪些工作。
4. **社区热点** — 讨论最活跃的 Issues/PRs（附链接）及其背后诉求。
5. **Bug 与稳定性** — 今日报告的 Bug、回归与崩溃，按严重程度排列，标注是否已有修复 PR。
6. **功能请求与路线图信号** — 社区在争取什么，哪些需求可能进入下个版本。
7. **艺术家与教育者反馈** — 来自 Issues 的真实创作流程、课堂/教学关切、可访问性问题与满意度。
8. **待处理积压** — 长期未响应、需要维护者关注的重要 Issue 或 PR。

语言要求：客观、数据驱动，突出项目对创作者与教学者的健康度。每个条目附上 GitHub 链接。
`,
};

export function buildFrameworkPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
  issueLimit = FRAMEWORK_ISSUE_LIMIT,
  prLimit = FRAMEWORK_PR_LIMIT,
  lang: Lang = "en",
): string {
  const sampledIssues = topN(issues, issueLimit);
  const sampledPrs = topN(prs, prLimit);

  return render(frameworkPromptTemplates, lang, {
    name: cfg.name,
    repo: cfg.repo,
    dateStr,
    releasesText: formatReleases(releases, lang),
    issuesText: sampledIssues.map((i) => formatItem(i, lang)).join("\n") || NONE[lang],
    prsText: sampledPrs.map((p) => formatItem(p, lang)).join("\n") || NONE[lang],
    issueNote: sampleNote(issues.length, sampledIssues.length, lang),
    prNote: sampleNote(prs.length, sampledPrs.length, lang),
    counts: { issues: issues.length, prs: prs.length },
    openIssues: issues.filter((i) => i.state === "open").length,
    closedIssues: issues.filter((i) => i.state === "closed").length,
    openPrs: prs.filter((p) => p.state === "open").length,
    mergedPrs: prs.filter((p) => p.state === "closed").length,
    releasesCount: releases.length,
  });
}

// ---------------------------------------------------------------------------
// 3. Community showcase (curated "awesome" list submissions)
// ---------------------------------------------------------------------------

interface ShowcasePayload {
  repo: string;
  repoName: string;
  dateStr: string;
  prsText: string;
  issuesText: string;
  prCount: number;
  issueCount: number;
  shownPrs: number;
  shownIssues: number;
}

const showcasePromptTemplates: Record<Lang, (p: ShowcasePayload) => string> = {
  en: (
    p,
  ) => `You are an analyst of the creative-coding community. The data below comes from github.com/${p.repo} (${p.repoName}), a curated list where every pull request proposes a new tool, library, studio, festival or learning resource for generative art and creative coding (data as of ${p.dateStr}).

## Repository context
This list is the community's shared inventory of the field: PRs are submissions waiting for review, issues are curation debates, broken-link reports and requests for categories that do not exist yet. Because review is slow, the comment count is the best available proxy for what the community genuinely cares about.

## Community submissions (pull requests, sorted by comments, ${p.prCount} total, showing top ${p.shownPrs})
${p.prsText}

## Curation issues and requests (sorted by comments, ${p.issueCount} total, showing top ${p.shownIssues})
${p.issuesText}

---

Write a community showcase report in English with these sections:

1. **Top Submissions** — the 5-8 most-discussed entries, each with what the tool/resource is, the language or medium it targets, and the current review state.
2. **What the Field Is Asking For** — the categories the community keeps proposing or requesting (e.g. pen plotters, shader playgrounds, audio-reactive visuals, 3D printing, teaching material) and what their absence says about the ecosystem.
3. **High-Potential Pending Entries** — active submissions that look likely to be merged soon and worth watching.
4. **Curation Signals** — recurring maintenance themes (dead links, reorganisation, category debates) that hint at how fast this field moves.
5. **Ecosystem Insight** — one sentence on the community's most concentrated need right now.

Style: concise and professional. Include a GitHub link for every item.
`,

  pt: (
    p,
  ) => `Você é um analista da comunidade de programação criativa. Os dados abaixo vêm de github.com/${p.repo} (${p.repoName}), uma lista curada em que cada pull request propõe uma nova ferramenta, biblioteca, estúdio, festival ou recurso de aprendizado para arte generativa e programação criativa (dados de ${p.dateStr}).

## Contexto do repositório
Essa lista é o inventário compartilhado da área: PRs são submissões aguardando revisão, e as issues são debates de curadoria, links quebrados e pedidos de categorias que ainda não existem. Como a revisão é lenta, o número de comentários é a melhor medida disponível do que a comunidade realmente valoriza.

## Submissões da comunidade (pull requests, ordenados por comentários, ${p.prCount} no total, mostrando os ${p.shownPrs} principais)
${p.prsText}

## Issues de curadoria e pedidos (ordenados por comentários, ${p.issueCount} no total, mostrando as ${p.shownIssues} principais)
${p.issuesText}

---

Escreva um relatório de vitrine da comunidade em português brasileiro com as seguintes seções:

1. **Principais submissões** — as 5-8 entradas mais discutidas, cada uma com o que a ferramenta/recurso faz, para qual linguagem ou mídia se destina e o estado atual da revisão.
2. **O que a área está pedindo** — as categorias que a comunidade insiste em propor ou pedir (por exemplo, plotters de caneta, playgrounds de shader, visuais reativos a áudio, impressão 3D, material didático) e o que a ausência delas diz sobre o ecossistema.
3. **Entradas pendentes com alto potencial** — submissões ativas que provavelmente serão aceitas em breve e merecem atenção.
4. **Sinais de curadoria** — temas recorrentes de manutenção (links mortos, reorganização, debates de categorias) que indicam a velocidade com que a área muda.
5. **Insight do ecossistema** — uma frase sobre a necessidade mais concentrada da comunidade hoje.

Estilo: conciso e profissional. Inclua link do GitHub em cada item.
`,

  zh: (
    p,
  ) => `你是一位创意编程社区分析师。以下数据来自 github.com/${p.repo}（${p.repoName}），这是一个精选清单仓库：每个 Pull Request 都在为生成艺术与创意编程提交新工具、库、工作室、艺术节或学习资源（数据截止 ${p.dateStr}）。

## 仓库说明
这份清单是该领域社区共享的索引：PR 是等待审核的提交，Issue 则是策展讨论、失效链接报告以及"希望新增分类"的请求。由于审核较慢，评论数最能反映社区真正关心什么。

## 社区提交（Pull Requests，按评论数排序，共 ${p.prCount} 条，展示前 ${p.shownPrs} 条）
${p.prsText}

## 策展 Issues 与请求（按评论数排序，共 ${p.issueCount} 条，展示前 ${p.shownIssues} 条）
${p.issuesText}

---

请生成一份中文的社区展示报告，包含以下部分：

1. **热门提交** — 讨论最热烈的 5~8 个条目，说明该工具/资源的用途、面向的语言或媒介，以及当前审核状态。
2. **领域需求信号** — 社区反复提交或请求的分类（如笔式绘图仪、Shader 演练场、音频可视化、3D 打印、教学素材），以及这些缺口反映出什么。
3. **高潜力待收录条目** — 活跃且可能很快被合并、值得关注的提交。
4. **策展信号** — 反复出现的维护主题（失效链接、清单重组、分类争论），反映该领域的变化速度。
5. **生态洞察** — 用一句话总结社区当前最集中的诉求。

语言要求：简洁专业，每个条目附上 GitHub 链接。
`,
};

export function buildShowcasePrompt(
  prs: GitHubItem[],
  issues: GitHubItem[],
  showcaseRepo: string,
  showcaseName: string,
  dateStr: string,
  lang: Lang = "en",
): string {
  const topPrs = topN(prs, 20);
  const topIssues = topN(issues, 15);

  return render(showcasePromptTemplates, lang, {
    repo: showcaseRepo,
    repoName: showcaseName,
    dateStr,
    prsText: topPrs.map((p) => formatItem(p, lang)).join("\n") || NONE[lang],
    issuesText: topIssues.map((i) => formatItem(i, lang)).join("\n") || NONE[lang],
    prCount: prs.length,
    issueCount: issues.length,
    shownPrs: topPrs.length,
    shownIssues: topIssues.length,
  });
}

// ---------------------------------------------------------------------------
// 4. Cross-tool comparison
// ---------------------------------------------------------------------------

interface ComparisonPayload {
  dateStr: string;
  sections: string;
}

const toolComparisonTemplates: Record<Lang, (p: ComparisonPayload) => string> = {
  en: (
    p,
  ) => `You are a senior analyst of the creative-coding tool landscape — the applications and CLIs artists use to produce generative art, animation, pixel work, sound and plotter output. Below are the ${p.dateStr} community digest summaries for each tracked tool:

${p.sections}

---

Write a cross-tool comparison report in English with these sections:

1. **Landscape Overview** — 3-5 sentences on the overall state of open-source creative tooling today.
2. **Activity Comparison** — a table comparing issues, PRs, releases and an overall health score for each tool.
3. **Shared Needs Across Tools** — requests that appear in several communities (note which tools and the specific need), e.g. scripting/automation, non-destructive workflows, GPU rendering, better export formats, plugin ecosystems.
4. **Differentiation** — how the tools differ in medium (raster, vector, audio, animation, plotter), target user and technical approach.
5. **Community Momentum & Maturity** — which communities are rapidly iterating, which are consolidating, and what that means for people choosing tools.
6. **Trend Signals** — what these communities collectively tell us about where creative tooling is heading.

Style: concise and professional, backed by the data above, aimed at artists, studio technical directors and tool developers.
`,

  pt: (
    p,
  ) => `Você é um analista sênior do cenário de ferramentas de programação criativa — os aplicativos e CLIs que artistas usam para produzir arte generativa, animação, pixel art, som e saída para plotter. Abaixo estão os resumos de comunidade de ${p.dateStr} para cada ferramenta acompanhada:

${p.sections}

---

Escreva um relatório comparativo em português brasileiro com as seguintes seções:

1. **Panorama geral** — 3-5 frases sobre o estado atual das ferramentas criativas open source.
2. **Comparação de atividade** — uma tabela comparando issues, PRs, releases e uma avaliação geral de saúde para cada ferramenta.
3. **Necessidades compartilhadas** — pedidos que aparecem em várias comunidades (indique quais ferramentas e a necessidade específica), por exemplo scripting/automação, fluxos não destrutivos, renderização por GPU, melhores formatos de exportação, ecossistema de plugins.
4. **Diferenciação** — como as ferramentas diferem em mídia (raster, vetor, áudio, animação, plotter), público-alvo e abordagem técnica.
5. **Momento e maturidade das comunidades** — quais estão em iteração acelerada, quais estão consolidando, e o que isso significa para quem escolhe ferramentas.
6. **Sinais de tendência** — o que essas comunidades, em conjunto, dizem sobre para onde as ferramentas criativas estão indo.

Estilo: conciso e profissional, apoiado nos dados acima, voltado a artistas, diretores técnicos de estúdio e desenvolvedores de ferramentas.
`,

  zh: (
    p,
  ) => `你是一位专注于创意编程工具格局的资深分析师——这些应用与 CLI 是艺术家创作生成艺术、动画、像素画、声音与绘图仪作品时使用的工具。以下是 ${p.dateStr} 各工具的社区动态摘要：

${p.sections}

---

请生成一份中文的横向对比报告，包含以下部分：

1. **整体格局** — 用 3~5 句话概括当前开源创意工具的整体态势。
2. **活跃度对比** — 以表格汇总各工具的 Issues 数、PR 数、Release 情况及整体健康度评估。
3. **各工具共同需求** — 多个社区同时出现的要求（注明涉及哪些工具与具体诉求），例如脚本与自动化、非破坏性工作流、GPU 渲染、更好的导出格式、插件生态。
4. **差异化定位** — 各工具在媒介（位图、矢量、音频、动画、绘图仪）、目标用户与技术路线上的差异。
5. **社区热度与成熟度** — 哪些社区在快速迭代，哪些进入巩固阶段，这对选择工具的人意味着什么。
6. **趋势信号** — 这些社区共同指向创意工具的下一个方向。

语言要求：简洁专业，有数据支撑，面向艺术家、工作室技术负责人与工具开发者。
`,
};

export function buildToolComparisonPrompt(digests: RepoDigest[], dateStr: string, lang: Lang = "en"): string {
  const sections = digests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${hasData ? d.summary : NO_ACTIVITY[lang]}`;
    })
    .join("\n\n---\n\n");

  return render(toolComparisonTemplates, lang, { dateStr, sections });
}

// ---------------------------------------------------------------------------
// 5. Framework ecosystem comparison (flagship vs peers)
// ---------------------------------------------------------------------------

interface FrameworkComparisonPayload {
  dateStr: string;
  flagshipName: string;
  flagshipRepo: string;
  flagshipSummary: string;
  peerSections: string;
  peerCount: number;
}

const frameworkComparisonTemplates: Record<Lang, (p: FrameworkComparisonPayload) => string> = {
  en: (
    p,
  ) => `You are a senior analyst of the open-source creative-coding framework ecosystem. Below are ${p.dateStr} community digest summaries, starting with the reference project.

## ${p.flagshipName} (flagship reference, github.com/${p.flagshipRepo})
${p.flagshipSummary}

---

${p.peerSections}

---

Generate a cross-framework comparison report in English with these sections:

1. **Ecosystem Overview** — 3-5 sentences on the state of creative-coding frameworks: web-first p5/three-style tooling, native C++/Rust/Kotlin environments, education-driven projects.
2. **Activity Comparison** — a table with issues, PRs, release status and a health score for the flagship and each of the ${p.peerCount} peer frameworks.
3. **Position of ${p.flagshipName}** — strengths against the peers: community size, teaching role, accessibility, rendering stack (WebGL/WebGPU), contribution onboarding.
4. **Shared Technical Directions** — needs emerging across several frameworks: GPU/WebGPU migration, shader ergonomics, variable fonts and typography, performance on laptops, accessibility, packaging for classrooms.
5. **Differentiation** — target audience, medium and technical architecture differences (browser, desktop, live-performance, installation work).
6. **Community Momentum & Maturity** — activity tiers: rapid iteration, steady maintenance, dormancy risk.
7. **Trend Signals** — what these communities reveal about where creative coding is going, for artists, educators and studios.

Style: concise, data-backed and professional.
`,

  pt: (
    p,
  ) => `Você é um analista sênior do ecossistema open source de frameworks de programação criativa. Abaixo estão os resumos de comunidade de ${p.dateStr}, começando pelo projeto de referência.

## ${p.flagshipName} (referência principal, github.com/${p.flagshipRepo})
${p.flagshipSummary}

---

${p.peerSections}

---

Gere um relatório comparativo em português brasileiro com as seguintes seções:

1. **Panorama do ecossistema** — 3-5 frases sobre o estado dos frameworks de programação criativa: ferramentas web (p5/three), ambientes nativos em C++/Rust/Kotlin e projetos voltados ao ensino.
2. **Comparação de atividade** — uma tabela com issues, PRs, situação de releases e uma nota de saúde para o projeto principal e para cada um dos ${p.peerCount} frameworks pares.
3. **Posição do ${p.flagshipName}** — pontos fortes frente aos pares: tamanho da comunidade, papel didático, acessibilidade, stack de renderização (WebGL/WebGPU), facilidade de contribuir.
4. **Direções técnicas compartilhadas** — necessidades que surgem em vários frameworks: migração para GPU/WebGPU, ergonomia de shaders, fontes variáveis e tipografia, desempenho em notebooks, acessibilidade, empacotamento para uso em sala de aula.
5. **Diferenciação** — público-alvo, mídia e diferenças de arquitetura técnica (navegador, desktop, performance ao vivo, instalações).
6. **Momento e maturidade das comunidades** — faixas de atividade: iteração acelerada, manutenção estável, risco de estagnação.
7. **Sinais de tendência** — o que essas comunidades revelam sobre os rumos da programação criativa para artistas, educadores e estúdios.

Estilo: conciso, com base em dados, profissional.
`,

  zh: (
    p,
  ) => `你是一位专注于开源创意编程框架生态的资深分析师。以下是 ${p.dateStr} 各项目的社区动态摘要，以参考项目开头。

## ${p.flagshipName}（核心参照，github.com/${p.flagshipRepo}）
${p.flagshipSummary}

---

${p.peerSections}

---

请生成一份中文的横向对比报告，包含以下部分：

1. **生态全景** — 用 3~5 句话概括创意编程框架的现状：Web 路线（p5/three 类）、C++/Rust/Kotlin 原生环境，以及以教学为导向的项目。
2. **活跃度对比** — 以表格汇总核心项目与 ${p.peerCount} 个同赛道框架的 Issues 数、PR 数、Release 情况与健康度评分。
3. **${p.flagshipName} 的定位** — 与同类相比的优势：社区规模、教学地位、可访问性、渲染栈（WebGL/WebGPU）、贡献上手难度。
4. **共同技术方向** — 多个框架共同涌现的需求：GPU/WebGPU 迁移、Shader 易用性、可变字体与排版、笔记本性能、可访问性、课堂教学的分发打包。
5. **差异化定位** — 目标用户、媒介与技术架构差异（浏览器、桌面、现场演出、装置作品）。
6. **社区热度与成熟度** — 活跃度分层：快速迭代、稳定维护、停滞风险。
7. **趋势信号** — 这些社区对艺术家、教育者与工作室所揭示的行业走向。

语言要求：简洁、有数据支撑、专业。
`,
};

export function buildFrameworkComparisonPrompt(
  flagshipDigest: RepoDigest,
  peerDigests: RepoDigest[],
  dateStr: string,
  lang: Lang = "en",
): string {
  const peerSections = peerDigests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${hasData ? d.summary : NO_ACTIVITY[lang]}`;
    })
    .join("\n\n---\n\n");

  return render(frameworkComparisonTemplates, lang, {
    dateStr,
    flagshipName: flagshipDigest.config.name,
    flagshipRepo: flagshipDigest.config.repo,
    flagshipSummary: flagshipDigest.summary,
    peerSections,
    peerCount: peerDigests.length,
  });
}

// ---------------------------------------------------------------------------
// 6. Generative art open-source trends
// ---------------------------------------------------------------------------

interface TrendingPayload {
  dateStr: string;
  trendingSection: string;
  searchSection: string;
  trendingCount: number;
  trendingTotal: number;
  searchCount: number;
  topicList: string;
}

const trendingTemplates: Record<Lang, (p: TrendingPayload) => string> = {
  en: (
    p,
  ) => `You are a technical analyst for the generative art and creative-coding open-source ecosystem. Below is ${p.dateStr} GitHub data for art-related repositories. Filter, categorise and analyse the trends.

## Data sources
- **Trending list** (github.com/trending, today's stars are the most reliable signal): the repository list was already pre-filtered by art keywords, but it may still contain false positives.
- **Topic search** (GitHub Search API): repositories active in the last 7 days under these topics: ${p.topicList}.

---

## GitHub trending today (${p.trendingCount} of ${p.trendingTotal} listed repos matched the art filter)
${p.trendingSection}

---

## Art topic search results (${p.searchCount} repositories, deduplicated)
${p.searchSection}

---

Produce a structured "Generative Art Open Source Trends" report:

**Step 1 (Filter)** — drop anything that is not plausibly about art, generative design, creative coding, graphics, sound or creative tooling (ignore generic AI model wrappers, enterprise tooling, games, frontend boilerplate).

**Step 2 (Categorise)** — group the remaining projects into these dimensions (a project may fit several; choose the primary one):
- 🎨 Generative & algorithmic art (procedural systems, plotter art, pattern generation)
- 🖌️ Creative coding frameworks & libraries (p5.js, openFrameworks, canvas, sketching tools)
- 🎛️ Live coding, audio & audiovisual performance (shaders on stage, sound synthesis, music tools)
- 🧊 3D, WebGL/WebGPU & rendering (three.js, ray marching, GPU pipelines)
- 🛠️ Art tools & production pipelines (editors, animation, printing, asset and export tooling)

**Step 3 (Report)** with these sections:

1. **Today's Highlights** — 3-5 sentences on the most noteworthy developments.
2. **Top Projects by Dimension** — for each dimension, 3-8 representative projects with: name and link, star data (total + today), and one sentence on what it is and why it matters today.
3. **Trend Signal Analysis** — 200-300 words: which kind of art tooling is getting explosive attention, which stacks are appearing for the first time, and how that connects to recent releases or events (festivals, new GPU APIs, hardware).
4. **Community Focus** — a bullet list of 3-5 projects or directions artists should watch, with a short reason each.

Style: English, professional and concise. Every project must include its GitHub link.
`,

  pt: (
    p,
  ) => `Você é um analista técnico do ecossistema open source de arte generativa e programação criativa. Abaixo estão dados do GitHub de ${p.dateStr} para repositórios ligados a arte. Filtre, categorize e analise as tendências.

## Fontes de dados
- **Lista de trending** (github.com/trending, as estrelas do dia são o sinal mais confiável): a lista já passou por um pré-filtro por palavras-chave de arte, mas ainda pode conter falsos positivos.
- **Busca por tópicos** (GitHub Search API): repositórios ativos nos últimos 7 dias nos tópicos: ${p.topicList}.

---

## Trending do GitHub hoje (${p.trendingCount} de ${p.trendingTotal} repositórios listados passaram no filtro de arte)
${p.trendingSection}

---

## Resultados da busca por tópicos de arte (${p.searchCount} repositórios, sem duplicatas)
${p.searchSection}

---

Produza um relatório estruturado "Tendências Open Source de Arte Generativa":

**Etapa 1 (Filtro)** — descarte o que não for plausivelmente sobre arte, design generativo, programação criativa, gráficos, som ou ferramental criativo (ignore wrappers genéricos de IA, ferramentas corporativas, jogos e boilerplate de frontend).

**Etapa 2 (Categorização)** — agrupe os projetos restantes nestas dimensões (um projeto pode se encaixar em várias; escolha a principal):
- 🎨 Arte generativa e algorítmica (sistemas procedurais, arte com plotter, geração de padrões)
- 🖌️ Frameworks e bibliotecas de programação criativa (p5.js, openFrameworks, canvas, ferramentas de sketch)
- 🎛️ Live coding, áudio e performance audiovisual (shaders no palco, síntese sonora, ferramentas musicais)
- 🧊 3D, WebGL/WebGPU e renderização (three.js, ray marching, pipelines de GPU)
- 🛠️ Ferramentas de arte e produção (editores, animação, impressão, ferramental de exportação)

**Etapa 3 (Relatório)** com estas seções:

1. **Destaques do dia** — 3-5 frases sobre os desenvolvimentos mais notáveis.
2. **Principais projetos por dimensão** — para cada dimensão, 3-8 projetos representativos com: nome e link, dados de estrelas (total + hoje) e uma frase sobre o que é e por que importa hoje.
3. **Análise dos sinais de tendência** — 200-300 palavras: que tipo de ferramental artístico está recebendo atenção explosiva, quais stacks aparecem pela primeira vez e como isso se conecta a lançamentos ou eventos recentes (festivais, novas APIs de GPU, hardware).
4. **Foco da comunidade** — lista de 3-5 projetos ou direções que artistas devem acompanhar, com uma breve justificativa.

Estilo: português brasileiro, profissional e conciso. Todo projeto deve incluir o link do GitHub.
`,

  zh: (
    p,
  ) => `你是一位专注于生成艺术与创意编程开源生态的技术分析师。以下是 ${p.dateStr} 与艺术相关的 GitHub 仓库数据，请进行筛选、分类与趋势分析。

## 数据说明
- **Trending 榜单**（github.com/trending，今日新增 stars 最可信）：该榜单已按艺术关键词预筛选，但仍可能存在误判。
- **主题搜索**（GitHub Search API）：最近 7 天活跃的相关主题：${p.topicList}。

---

## GitHub 今日 Trending（${p.trendingTotal} 个上榜仓库中有 ${p.trendingCount} 个通过艺术筛选）
${p.trendingSection}

---

## 艺术主题搜索结果（共 ${p.searchCount} 个仓库，已去重）
${p.searchSection}

---

请生成一份结构清晰的《生成艺术开源趋势日报》：

**第一步（过滤）**：剔除与艺术、生成设计、创意编程、图形、声音或创意工具明显无关的项目（忽略通用 AI 包装、企业工具、游戏与前端脚手架）。

**第二步（分类）**：将剩余项目归入以下维度（一个项目可属多类，取最主要的一类）：
- 🎨 生成艺术与算法艺术（程序化系统、绘图仪艺术、图案生成）
- 🖌️ 创意编程框架与库（p5.js、openFrameworks、canvas、草图工具）
- 🎛️ Live Coding、音频与视听演出（舞台 Shader、声音合成、音乐工具）
- 🧊 3D、WebGL/WebGPU 与渲染（three.js、光线步进、GPU 管线）
- 🛠️ 艺术工具与制作流程（编辑器、动画、打印、素材与导出工具）

**第三步（输出报告）**，包含以下部分：

1. **今日速览** — 用 3~5 句话概括今日最值得关注的动向。
2. **各维度热门项目** — 每个维度列出 3~8 个代表项目：名称与链接、stars 数据（总量 + 今日新增）、一句话说明它是什么以及为何今天值得关注。
3. **趋势信号分析** — 200~300 字：哪类艺术工具正获得爆发式关注，有哪些技术栈首次出现，以及它们与近期发布或事件（艺术节、新 GPU API、硬件）的关联。
4. **社区关注热点** — 以 bullet 列出 3~5 个艺术家值得关注的项目或方向，并给出简短理由。

语言要求：中文，专业简洁，每个项目必须附 GitHub 链接。
`,
};

export function buildTrendingPrompt(data: TrendingData, dateStr: string, lang: Lang = "en"): string {
  const noTrending: Record<Lang, string> = {
    en: "(today's GitHub trending list could not be fetched)",
    pt: "(não foi possível obter a lista de trending do GitHub hoje)",
    zh: "（未能抓取今日 GitHub Trending 榜单）",
  };
  const noSearch: Record<Lang, string> = {
    en: "(no search results)",
    pt: "(sem resultados de busca)",
    zh: "（无搜索结果）",
  };

  const trendingSection =
    data.trendingFetchSuccess && data.trendingRepos.length > 0
      ? data.trendingRepos
          .map(
            (r) =>
              `- [${r.fullName}](${r.url})` +
              (r.language ? ` [${r.language}]` : "") +
              ` ⭐${r.totalStars.toLocaleString()}` +
              (r.todayStars > 0 ? ` (+${r.todayStars} today)` : "") +
              (r.forks > 0 ? ` 🍴${r.forks.toLocaleString()}` : "") +
              (r.description ? `\n  ${r.description}` : ""),
          )
          .join("\n")
      : noTrending[lang];

  const searchSection =
    data.searchRepos.length > 0
      ? data.searchRepos
          .map(
            (r) =>
              `- [${r.fullName}](${r.url})` +
              (r.language ? ` [${r.language}]` : "") +
              ` ⭐${r.stargazersCount.toLocaleString()}` +
              ` [topic:${r.searchQuery}]` +
              (r.description ? `\n  ${r.description}` : ""),
          )
          .join("\n")
      : noSearch[lang];

  return render(trendingTemplates, lang, {
    dateStr,
    trendingSection,
    searchSection,
    trendingCount: data.trendingRepos.length,
    trendingTotal: data.trendingTotal,
    searchCount: data.searchRepos.length,
    topicList: [...new Set(data.searchRepos.map((r) => r.searchQuery))].join(", ") || "—",
  });
}

// ---------------------------------------------------------------------------
// 7. Art & creative tool news (blogs / feeds)
// ---------------------------------------------------------------------------

interface NewsPayload {
  dateStr: string;
  firstRunNote: string;
  siteSections: string;
  isFirstRun: boolean;
}

const newsTemplates: Record<Lang, (p: NewsPayload) => string> = {
  en: (
    p,
  ) => `You are a deep content analyst for digital art and creative tooling, skilled at extracting signals from release notes, foundation posts, developer blogs and product announcements.

The content below was collected on ${p.dateStr} from the blogs and news feeds of the tracked art tools and foundations. ${p.firstRunNote}

${p.siteSections}

---

Generate a detailed "Art & Creative Tool News" report in English with these sections:

1. **Today's Highlights** — 3-5 sentences on the most important announcements, releases or direction changes.
2. **Per-Source Highlights** — organised by source, 2-4 sentences per relevant article: what changed, which artists or workflows it affects, and the technical detail worth knowing. Include the publication date and the original link.
3. **Tooling & Workflow Signals** — what this news reveals about the direction of the tools: rendering or engine changes, new export/import paths, GPU or platform support, licensing and funding, community governance.
4. **For Artists** — a short practical takeaway list: what to try, what to watch before upgrading, what changes for studios and classrooms.
5. **Notable Details** — subtle signals from wording and timing: features in beta, deprecations, hardware requirements, changes in foundation priorities.
${p.isFirstRun ? "6. **Landscape Overview** — first full crawl only: summarise what each source publishes and how it communicates (release notes, dev diaries, foundation reports, tutorials), so readers know where to look.\n" : ""}
Style: English, professional and detailed, aimed at artists, studio technical directors and creative-tool developers. Every item must include its original link.
`,

  pt: (
    p,
  ) => `Você é um analista de conteúdo aprofundado em arte digital e ferramental criativo, capaz de extrair sinais de notas de versão, publicações de fundações, blogs de desenvolvimento e anúncios de produto.

O conteúdo abaixo foi coletado em ${p.dateStr} a partir dos blogs e feeds de notícias das ferramentas e fundações acompanhadas. ${p.firstRunNote}

${p.siteSections}

---

Gere um relatório detalhado "Notícias de Arte e Ferramentas Criativas" em português brasileiro com as seguintes seções:

1. **Destaques do dia** — 3-5 frases sobre os anúncios, lançamentos ou mudanças de direção mais importantes.
2. **Destaques por fonte** — organizados por fonte, 2-4 frases por artigo relevante: o que mudou, quais artistas ou fluxos de trabalho são afetados e o detalhe técnico que vale a pena saber. Inclua a data de publicação e o link original.
3. **Sinais de ferramental e fluxo de trabalho** — o que as notícias revelam sobre a direção das ferramentas: mudanças de renderização ou engine, novos caminhos de exportação/importação, suporte a GPU e plataformas, licenciamento e financiamento, governança da comunidade.
4. **Para artistas** — uma lista prática e curta: o que experimentar, o que observar antes de atualizar, o que muda para estúdios e salas de aula.
5. **Detalhes notáveis** — sinais sutis no texto e no timing: recursos em beta, descontinuações, requisitos de hardware, mudanças de prioridade das fundações.
${p.isFirstRun ? "6. **Panorama do conteúdo** — apenas na primeira coleta: resuma o que cada fonte publica e como se comunica (notas de versão, diários de desenvolvimento, relatórios de fundação, tutoriais), para o leitor saber onde procurar.\n" : ""}
Estilo: português brasileiro, profissional e detalhado, para artistas, diretores técnicos de estúdio e desenvolvedores de ferramentas criativas. Cada item deve incluir o link original.
`,

  zh: (
    p,
  ) => `你是一位专注于数字艺术与创意工具的深度内容分析师，擅长从版本说明、基金会公告、开发者博客与产品发布中提炼信号。

以下是 ${p.dateStr} 从所跟踪艺术工具与基金会博客/新闻源采集的内容。${p.firstRunNote}

${p.siteSections}

---

请生成一份详实的《艺术与创意工具资讯》报告，包含以下部分：

1. **今日速览** — 用 3~5 句话概括最重要的公告、版本发布或方向调整。
2. **各来源要点** — 按来源整理，每条相关内容 2~4 句话：改了什么、影响哪些艺术家或工作流、值得了解的技术细节。标注发布日期与原文链接。
3. **工具与工作流信号** — 这些资讯反映出工具的方向：渲染或引擎变化、新的导入导出路径、GPU 与平台支持、授权与资金、社区治理。
4. **给艺术家的建议** — 简短的实用清单：值得尝试什么、升级前应注意什么、对工作室与课堂教学的影响。
5. **值得留意的细节** — 从措辞与时序中提取隐含信号：Beta 功能、弃用计划、硬件要求、基金会优先级变化。
${p.isFirstRun ? "6. **内容格局总览** — 仅首次抓取：概述各来源发布什么内容、以何种方式沟通（版本说明、开发日志、基金会报告、教程），方便读者知道去哪里找信息。\n" : ""}
语言要求：中文，专业详实，面向艺术家、工作室技术负责人与创意工具开发者。每个条目必须附原文链接。
`,
};

export function buildNewsPrompt(results: WebFetchResult[], dateStr: string, lang: Lang = "en"): string {
  const isFirstRun = results.some((r) => r.isFirstRun);

  const siteSections = results
    .map(({ siteName, isFirstRun: siteFirstRun, newItems, totalDiscovered, error }) => {
      if (error) {
        const failed: Record<Lang, string> = {
          en: `(source unavailable this run: ${error})`,
          pt: `(fonte indisponível nesta execução: ${error})`,
          zh: `（本次抓取失败：${error}）`,
        };
        return `## ${siteName}\n\n${failed[lang]}`;
      }

      const mode: Record<Lang, string> = {
        en: siteFirstRun
          ? `first full crawl — ${totalDiscovered} entries in the feed, showing the latest ${newItems.length}`
          : `incremental update — ${newItems.length} new entries`,
        pt: siteFirstRun
          ? `primeira coleta completa — ${totalDiscovered} entradas no feed, exibindo as ${newItems.length} mais recentes`
          : `atualização incremental — ${newItems.length} novas entradas`,
        zh: siteFirstRun
          ? `首次全量抓取——信息源共 ${totalDiscovered} 条，展示最新 ${newItems.length} 条`
          : `今日增量更新——新增 ${newItems.length} 条`,
      };

      if (newItems.length === 0) {
        const nothing: Record<Lang, string> = {
          en: "Nothing new since the last run.",
          pt: "Nada novo desde a última execução.",
          zh: "自上次运行以来没有新内容。",
        };
        return `## ${siteName} (${mode[lang]})\n\n${nothing[lang]}`;
      }

      const unable: Record<Lang, string> = {
        en: "(text could not be extracted)",
        pt: "(não foi possível extrair o texto)",
        zh: "（无法提取正文）",
      };
      const dateLabel: Record<Lang, string> = { en: "Published", pt: "Publicado", zh: "发布" };

      const itemsText = newItems
        .map((item) =>
          [
            `### [${item.title || item.url}](${item.url})`,
            `- ${dateLabel[lang]}: ${item.lastmod.slice(0, 10) || "—"} | ${item.category}`,
            `- ${item.content || unable[lang]}`,
          ].join("\n"),
        )
        .join("\n\n");

      return `## ${siteName} (${mode[lang]})\n\n${itemsText}`;
    })
    .join("\n\n---\n\n");

  const firstRunNote: Record<Lang, string> = {
    en: isFirstRun
      ? "This is the first full crawl: focus on the overall content landscape, the recurring themes and the historical context of each source rather than on single articles."
      : "This is an incremental update: focus on what is new today and judge its significance in context.",
    pt: isFirstRun
      ? "Esta é a primeira coleta completa: concentre-se no panorama geral de conteúdo, nos temas recorrentes e no contexto histórico de cada fonte, em vez de artigos isolados."
      : "Esta é uma atualização incremental: concentre-se no que é novo hoje e avalie sua importância no contexto.",
    zh: isFirstRun
      ? "本次为首次全量抓取：请重点梳理各来源的内容格局、反复出现的主题与历史脉络，而非单篇文章。"
      : "本次为增量更新：请聚焦今日新增内容，并结合上下文判断其意义。",
  };

  return render(newsTemplates, lang, { dateStr, firstRunNote: firstRunNote[lang], siteSections, isFirstRun });
}

// ---------------------------------------------------------------------------
// 8. Hacker News art & tech digest
// ---------------------------------------------------------------------------

interface HnPayload {
  dateStr: string;
  storiesText: string;
  storyCount: number;
  windowHours: number;
  scanned: number;
}

const hnTemplates: Record<Lang, (p: HnPayload) => string> = {
  en: (
    p,
  ) => `You are an analyst of the art-and-technology community. Below are Hacker News stories from the last ${p.windowHours} hours that matched the art / creative-coding keyword filter (sorted by score, ${p.storyCount} stories kept out of ${p.scanned} hits), as of ${p.dateStr}:

---

${p.storiesText}

---

Generate a structured "Hacker News Art & Tech Digest" in English:

1. **Today's Highlights** — 3-5 sentences on what the art/creative-coding crowd is discussing and the mood of the threads.

2. **Top Discussions by Category** — organised by category, 2-5 items per category, each with:
   - Title (original link) + HN discussion link
   - Score and comment count
   - One sentence on why it matters and how the community typically reacts

   Categories:
   - 🎨 Generative art & creative coding (procedural work, sketches, plotter art, showcases)
   - 🛠️ Graphics, shaders & tooling (rendering, GPU APIs, open-source art tools, engineering practice)
   - 🖼️ Art world & culture (museums, exhibitions, funding, copyright, industry news)
   - 💬 Opinions & debates (Ask HN, Show HN, heated threads about AI and authorship, craft vs automation)

3. **Community Sentiment** — 100-200 words on the mood: which topics drew the most engagement, points of consensus or controversy (especially around AI-generated imagery), and whether the focus has shifted since the last cycle.

4. **Worth Reading Deeply** — 2-3 pieces most worth an artist's or researcher's time, with a brief reason.

Style: English, concise and professional. Preserve every original link.
`,

  pt: (
    p,
  ) => `Você é um analista da comunidade de arte e tecnologia. Abaixo estão histórias do Hacker News das últimas ${p.windowHours} horas que passaram no filtro de palavras-chave de arte / programação criativa (ordenadas por pontuação, ${p.storyCount} mantidas de ${p.scanned} resultados), em ${p.dateStr}:

---

${p.storiesText}

---

Gere um "Hacker News: Arte e Tecnologia" estruturado em português brasileiro:

1. **Destaques do dia** — 3-5 frases sobre o que a comunidade de arte/programação criativa está discutindo e o clima das conversas.

2. **Principais discussões por categoria** — organizadas por categoria, 2-5 itens por categoria, cada um com:
   - Título (link original) + link da discussão no HN
   - Pontuação e número de comentários
   - Uma frase sobre por que importa e como a comunidade costuma reagir

   Categorias:
   - 🎨 Arte generativa e programação criativa (trabalhos procedurais, sketches, arte com plotter, mostras)
   - 🛠️ Gráficos, shaders e ferramentas (renderização, APIs de GPU, ferramentas open source, prática de engenharia)
   - 🖼️ Mundo da arte e cultura (museus, exposições, financiamento, direitos autorais, indústria)
   - 💬 Opiniões e debates (Ask HN, Show HN, discussões acaloradas sobre IA e autoria, artesanato vs automação)

3. **Sentimento da comunidade** — 100-200 palavras sobre o clima: quais temas geraram mais engajamento, pontos de consenso ou controvérsia (especialmente sobre imagens geradas por IA) e se o foco mudou desde o ciclo anterior.

4. **Leitura recomendada** — 2-3 conteúdos que mais valem o tempo de um artista ou pesquisador, com breve justificativa.

Estilo: português brasileiro, conciso e profissional. Preserve todos os links originais.
`,

  zh: (
    p,
  ) => `你是艺术与技术社区的分析师。以下是 ${p.dateStr} 从 Hacker News 抓取的过去 ${p.windowHours} 小时内通过艺术/创意编程关键词筛选的帖子（按分数降序，从 ${p.scanned} 条结果中保留 ${p.storyCount} 条）：

---

${p.storiesText}

---

请生成一份结构清晰的《Hacker News 艺术与技术社区动态》，要求：

1. **今日速览** — 3~5 句话，概括今日 HN 上艺术与创意编程社区最热门的讨论方向与情绪。

2. **分类热门讨论** — 按以下分类整理，每类 2~5 条，每条包含：
   - 标题（附原文链接）+ HN 讨论链接
   - 分数和评论数
   - 一句话说明：为何值得关注，社区典型反应如何

   分类：
   - 🎨 生成艺术与创意编程（程序化作品、Sketch、绘图仪艺术、作品展示）
   - 🛠️ 图形、Shader 与工具（渲染、GPU API、开源艺术工具、工程实践）
   - 🖼️ 艺术世界与文化（美术馆、展览、资助、版权、行业动态）
   - 💬 观点与争议（Ask HN、Show HN、关于 AI 与作者身份、手工与自动化的热议）

3. **社区情绪信号** — 100~200 字，分析今日讨论的整体情绪：哪些话题互动最多，共识或争议点何在（尤其是 AI 生成图像相关），与上周期相比关注方向是否变化。

4. **值得深读** — 列出 2~3 条最值得艺术家或研究者深入阅读的内容，简述理由。

语言要求：中文，简洁专业，保留所有原文链接。
`,
};

export function buildHnPrompt(data: HnData, dateStr: string, lang: Lang = "en"): string {
  const storiesText = data.stories
    .map((s, i) => {
      const labels: Record<
        Lang,
        { link: string; discussion: string; score: string; comments: string; author: string; time: string }
      > = {
        en: {
          link: "Link",
          discussion: "Discussion",
          score: "Score",
          comments: "Comments",
          author: "Author",
          time: "Time",
        },
        pt: {
          link: "Link",
          discussion: "Discussão",
          score: "Pontos",
          comments: "Comentários",
          author: "Autor",
          time: "Data",
        },
        zh: {
          link: "链接",
          discussion: "讨论",
          score: "分数",
          comments: "评论",
          author: "作者",
          time: "时间",
        },
      };
      const l = labels[lang];
      return (
        `${i + 1}. **${s.title}**\n` +
        `   ${l.link}: ${s.url}\n` +
        `   ${l.discussion}: ${s.hnUrl}\n` +
        `   ${l.score}: ${s.points} | ${l.comments}: ${s.comments} | ${l.author}: @${s.author} | ${l.time}: ${s.createdAt.slice(0, 16)}`
      );
    })
    .join("\n\n");

  return render(hnTemplates, lang, {
    dateStr,
    storiesText,
    storyCount: data.stories.length,
    windowHours: data.windowHours,
    scanned: data.scanned,
  });
}

// ---------------------------------------------------------------------------
// 9. Weekly rollup
// ---------------------------------------------------------------------------

const weeklyTemplates: Record<Lang, (p: { weekStr: string; entries: string }) => string> = {
  en: (
    p,
  ) => `You are a technical analyst covering the generative art and creative-coding open-source ecosystem. Below are the daily digests from the past 7 days (${p.weekStr}) of art tool and framework community activity. Write a comprehensive weekly recap.

${p.entries}

---

Generate an "Art Radar Weekly" report with these sections:

1. **Week's Top Stories** — 5-8 most important events, releases and community developments, each with its date.
2. **Tools Progress** — what changed across the tracked artist tools (Cables, Graphite, Aseprite, Sonic Pi, Manim, vpype, …).
3. **Framework Ecosystem** — key movements in p5.js and the peer frameworks: releases, API changes, community debates.
4. **Open Source Trends** — the technical directions that stood out on GitHub and in the art-topic search this week.
5. **Community & Culture** — highlights from Hacker News, the curated-list submissions and anything about funding, exhibitions or education.
6. **Tool News** — notable announcements from the tracked art-tool blogs and foundations.
7. **Signals for Next Week** — what the coming days are likely to bring and what to watch.

Style: English, concise and professional, so an artist or studio lead can catch up in five minutes.
`,

  pt: (
    p,
  ) => `Você é um analista técnico do ecossistema open source de arte generativa e programação criativa. Abaixo estão os resumos diários dos últimos 7 dias (${p.weekStr}) sobre a atividade das comunidades de ferramentas e frameworks. Escreva uma retrospectiva semanal abrangente.

${p.entries}

---

Gere um relatório "Art Radar Semanal" em português brasileiro com as seguintes seções:

1. **Principais notícias da semana** — 5-8 eventos, lançamentos e movimentos da comunidade mais importantes, cada um com sua data.
2. **Progresso das ferramentas** — o que mudou nas ferramentas artísticas acompanhadas (Cables, Graphite, Aseprite, Sonic Pi, Manim, vpype, …).
3. **Ecossistema de frameworks** — movimentos importantes no p5.js e nos frameworks pares: lançamentos, mudanças de API, debates da comunidade.
4. **Tendências open source** — as direções técnicas que se destacaram no GitHub e na busca por tópicos de arte nesta semana.
5. **Comunidade e cultura** — destaques do Hacker News, das submissões da lista curada e de temas como financiamento, exposições e educação.
6. **Notícias de ferramentas** — anúncios relevantes dos blogs e fundações acompanhados.
7. **Sinais para a próxima semana** — o que os próximos dias devem trazer e o que observar.

Estilo: português brasileiro, conciso e profissional, para que um artista ou líder de estúdio se atualize em cinco minutos.
`,

  zh: (
    p,
  ) => `你是一位专注于生成艺术与创意编程开源生态的技术分析师。以下是过去 7 天（${p.weekStr}）艺术工具与框架社区的每日动态摘要，请生成本周综合回顾。

${p.entries}

---

请生成《艺术雷达周报》，包含以下部分：

1. **本周要闻** — 本周最重要的 5~8 条事件、发布与社区动向，每条附日期。
2. **工具进展** — 所跟踪的艺术家工具（Cables、Graphite、Aseprite、Sonic Pi、Manim、vpype 等）本周的变化。
3. **框架生态** — p5.js 与同赛道框架的关键动向：版本发布、API 变化、社区讨论。
4. **开源趋势** — 本周 GitHub 与艺术主题搜索中最突出的技术方向。
5. **社区与文化** — Hacker News 热点、精选清单提交，以及资助、展览、教育相关话题。
6. **工具资讯** — 所跟踪博客与基金会的重要公告。
7. **下周信号** — 预判未来几天的动态与值得关注的事件。

语言要求：中文，简洁专业，让艺术家或工作室负责人五分钟内掌握一周动态。
`,
};

export function buildWeeklyPrompt(
  dailyDigests: Record<string, string>,
  weekStr: string,
  lang: Lang = "en",
): string {
  const entries = Object.entries(dailyDigests)
    .map(([date, content]) => `## ${date}\n\n${content}`)
    .join("\n\n---\n\n");
  return render(weeklyTemplates, lang, { weekStr, entries });
}

// ---------------------------------------------------------------------------
// 10. Monthly rollup
// ---------------------------------------------------------------------------

const monthlyTemplates: Record<Lang, (p: { monthStr: string; count: number; entries: string }) => string> = {
  en: (
    p,
  ) => `You are a technical analyst covering the generative art and creative-coding open-source ecosystem. Below are the ${p.monthStr} digests (${p.count} reports). Write a comprehensive monthly review.

${p.entries}

---

Generate an "Art Radar Monthly" report with these sections:

1. **Month in Review** — 5-10 most important events and milestones, in chronological order.
2. **Tools Monthly Progress** — development trajectory, major releases and community growth for the tracked artist tools.
3. **Framework Ecosystem** — landscape shifts, emerging projects and notable signals around p5.js and peers.
4. **Technical Trends** — the most significant technical directions and paradigm shifts in creative coding this month (GPU/WebGPU, shaders for beginners, AI-assisted workflows, physical output).
5. **Community Health** — activity comparison across the main projects, contribution and maintainer dynamics, education and accessibility efforts.
6. **Art World & Tool News** — strategic reading of the announcements from the tracked blogs and foundations.
7. **Looking Ahead** — what to watch next month.

Style: English, in-depth, data-driven, useful for retrospectives and planning.
`,

  pt: (
    p,
  ) => `Você é um analista técnico do ecossistema open source de arte generativa e programação criativa. Abaixo estão os resumos de ${p.monthStr} (${p.count} relatórios). Escreva uma retrospectiva mensal abrangente.

${p.entries}

---

Gere um relatório "Art Radar Mensal" em português brasileiro com as seguintes seções:

1. **O mês em revista** — 5-10 eventos e marcos mais importantes, em ordem cronológica.
2. **Progresso mensal das ferramentas** — trajetória de desenvolvimento, lançamentos importantes e crescimento das comunidades das ferramentas acompanhadas.
3. **Ecossistema de frameworks** — mudanças no cenário, projetos emergentes e sinais relevantes em torno do p5.js e dos pares.
4. **Tendências técnicas** — as direções técnicas e mudanças de paradigma mais significativas na programação criativa neste mês (GPU/WebGPU, shaders para iniciantes, fluxos assistidos por IA, saída física).
5. **Saúde da comunidade** — comparação de atividade entre os principais projetos, dinâmica de contribuidores e mantenedores, esforços de educação e acessibilidade.
6. **Mundo da arte e notícias de ferramentas** — leitura estratégica dos anúncios dos blogs e fundações acompanhados.
7. **Perspectivas** — o que observar no próximo mês.

Estilo: português brasileiro, aprofundado, baseado em dados, útil para retrospectivas e planejamento.
`,

  zh: (
    p,
  ) => `你是一位专注于生成艺术与创意编程开源生态的技术分析师。以下是 ${p.monthStr} 的动态汇总（共 ${p.count} 份报告），请生成本月综合回顾。

${p.entries}

---

请生成《艺术雷达月报》，包含以下部分：

1. **月度要闻** — 本月最重要的 5~10 条事件与里程碑，按时间排列。
2. **工具月度进展** — 所跟踪艺术家工具的发展轨迹、重要版本与社区规模变化。
3. **框架生态** — p5.js 及同赛道项目的格局变化、新兴项目与值得关注的信号。
4. **技术趋势** — 本月创意编程领域最显著的技术方向与范式变化（GPU/WebGPU、面向初学者的 Shader、AI 辅助流程、实体输出）。
5. **社区健康度** — 主要项目的活跃度对比、贡献者与维护者动态、教育与可访问性工作。
6. **艺术世界与工具资讯** — 对所跟踪博客与基金会公告的战略解读。
7. **下月展望** — 下个月值得重点关注的方向。

语言要求：中文，深入分析，数据驱动，适合月度复盘与规划。
`,
};

export function buildMonthlyPrompt(
  sourceDigests: Record<string, string>,
  monthStr: string,
  lang: Lang = "en",
): string {
  const entries = Object.entries(sourceDigests)
    .map(([key, content]) => `## ${key}\n\n${content}`)
    .join("\n\n---\n\n");
  return render(monthlyTemplates, lang, { monthStr, count: Object.keys(sourceDigests).length, entries });
}
