# Art Radar 🎨

[English](./README.md) | Português | [中文](./README.zh.md)

Um workflow do GitHub Actions que acorda toda manhã e lê o mundo da arte generativa e da programação
criativa por você: acompanha a atividade no GitHub das ferramentas que artistas usam, dos frameworks
com que as pessoas criam seus sketches, dos tópicos de arte em alta, das discussões de arte e tecnologia
no Hacker News e dos blogs das principais ferramentas open source de arte — e publica o resultado como
Issues do GitHub e arquivos Markdown versionados no repositório.

Os relatórios são gerados em **inglês, português e chinês** (configurável) e podem ser lidos como
Markdown, como Issues, pela interface web, por RSS ou por um servidor MCP.

## Interface web

**`https://<seu-usuario>.github.io/art_radar`**

Uma interface em tema escuro, sem login, que renderiza todos os relatórios deste repositório pelo
GitHub Pages, com alternância de idioma (EN / PT / 中文) por relatório e busca em texto completo.

## Feed RSS

**`https://<seu-usuario>.github.io/art_radar/feed.xml`**

Assine no Feedly, Reeder, NewsBlur ou qualquer outro leitor. O feed traz os 30 relatórios mais recentes
de todos os idiomas e tipos, atualizado a cada execução junto com o `manifest.json`.

## Servidor MCP

Publique o servidor [Model Context Protocol](https://modelcontextprotocol.io) que está em `mcp/` e
qualquer cliente MCP (Claude Desktop, OpenClaw, …) poderá consultar o radar diretamente.

| Ferramenta | Descrição |
|------------|-----------|
| `list_reports` | Lista datas e tipos de relatório disponíveis (últimos N dias) |
| `get_latest` | Busca o relatório mais recente de um tipo |
| `get_report` | Busca um relatório específico por data e tipo |
| `search` | Busca por palavra-chave nos relatórios recentes |

```bash
cd mcp
pnpm install
wrangler deploy
```

Depois adicione ao seu cliente, por exemplo no Claude Desktop:

```json
{
  "mcpServers": {
    "art-radar": { "url": "https://art-radar-mcp.<seu-subdominio>.workers.dev" }
  }
}
```

## Notificações no Telegram

Configure `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` e cada execução envia uma mensagem curta com links
para os relatórios do dia em todos os idiomas gerados.

## Fontes monitoradas

### Ferramentas de artista — aplicativos e CLIs que artistas realmente usam

| Ferramenta | Repositório | Mídia |
|------------|-------------|-------|
| Cables.gl | [cables-gl/cables](https://github.com/cables-gl/cables) | visuais generativos em nós |
| Graphite | [GraphiteEditor/Graphite](https://github.com/GraphiteEditor/Graphite) | vetores / design procedural |
| Aseprite | [aseprite/aseprite](https://github.com/aseprite/aseprite) | pixel art e animação de sprites |
| Sonic Pi | [sonic-pi-net/sonic-pi](https://github.com/sonic-pi-net/sonic-pi) | música em live coding |
| Manim | [3b1b/manim](https://github.com/3b1b/manim) | animação programática |
| vpype | [abey79/vpype](https://github.com/abey79/vpype) | fluxo de trabalho para plotter de caneta |

### Framework principal + pares

O [p5.js](https://github.com/processing/p5.js) é o projeto principal: recebe uma análise aprofundada e é
comparado aos frameworks pares — three.js, openFrameworks, Processing 4, OPENRNDR, nannou, PixiJS,
raylib, LÖVE e Babylon.js. Tudo configurável no `config.yml`.

### Vitrine da comunidade

[terkelg/awesome-creative-coding](https://github.com/terkelg/awesome-creative-coding) — uma lista curada
em que cada pull request propõe uma nova ferramenta, biblioteca, estúdio, festival ou recurso de
aprendizado. Ordenada por discussão, não por data, mostrando o que a comunidade realmente pede.

### Tópicos de arte no GitHub

Repositórios ativos nos últimos 7 dias em: `creative-coding`, `generative-art`, `procedural-generation`,
`glsl`, `shader`, `p5js`, `processing`, `plotter`, `livecoding`, `art`. A página diária do GitHub
Trending também é lida e pré-filtrada por palavras-chave de arte.

### Hacker News

Posts de arte e programação criativa das últimas 24 h (ampliado para 72 h quando o assunto está quieto),
buscados na API Algolia com consultas específicas e filtrados por uma lista de palavras-chave de arte.

### Feeds de notícias das ferramentas de arte

Blender · Blender Developers Blog · Krita · Processing Foundation (p5.js) · Inkscape.

Feeds têm prioridade (o texto do artigo vem no próprio feed, sem baixar páginas nem esbarrar em bot
walls); sitemaps também são suportados para sites sem feed.

## Relatórios

| Relatório | Arquivos (EN / PT / ZH) | Observações |
|-----------|------------------------|-------------|
| Radar de Ferramentas Criativas | `art-tools.md` · `art-tools-pt.md` · `art-tools-zh.md` | Relatórios por ferramenta + comparação + vitrine |
| Radar de Frameworks Criativos | `art-frameworks[-lang].md` | Análise do p5.js + comparação com os pares |
| Notícias de Arte e Ferramentas Criativas | `art-news[-lang].md` | A partir dos feeds; ignorado quando não há novidade |
| Tendências Open Source de Arte Generativa | `art-trending[-lang].md` | GitHub Trending (filtrado) + busca por tópicos |
| Hacker News: Arte e Tecnologia | `art-hn[-lang].md` | Principais posts, sentimento e leitura recomendada |
| Art Radar Semanal | `art-weekly[-lang].md` | Toda segunda-feira, a partir dos 7 relatórios diários |
| Art Radar Mensal | `art-monthly[-lang].md` | No dia 1º, a partir dos semanais (ou diários amostrados) |

Estrutura de `art-tools-pt.md`:

```
# Radar de Ferramentas Criativas YYYY-MM-DD

## Comparação entre ferramentas
  Panorama / Tabela de atividade / Necessidades compartilhadas / Diferenciação /
  Momento das comunidades / Sinais de tendência

## Vitrine da comunidade
  Principais submissões / O que a área está pedindo / Entradas pendentes / Sinais de curadoria

## Relatórios por ferramenta
  <details> Cables.gl   — Destaques / Lançamentos / Issues / PRs / Fluxos / Dores
  <details> Graphite    — ...
```

Estrutura de `art-frameworks-pt.md`:

```
# Radar de Frameworks Criativos YYYY-MM-DD

## Análise aprofundada: p5.js
  Panorama / Lançamentos / Progresso / Temas quentes / Bugs /
  Sinais de roadmap / Retorno de artistas e educadores / Pendências

## Comparação entre frameworks
  Panorama do ecossistema / Tabela de atividade / Posição do principal /
  Direções compartilhadas / Diferenciação / Maturidade / Sinais

## Relatórios dos frameworks pares
  <details> three.js — ...   <details> openFrameworks — ...   <details> ...
```

As Issues recebem etiquetas por relatório e idioma: `art-tools`, `art-tools-pt`, `art-tools-zh`,
`art-frameworks`, `art-frameworks-pt`, … além de `art-weekly` e `art-monthly`.

## Configuração

### 1. Faça um fork do repositório

Ative o GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) para disponibilizar a
interface web e o `feed.xml`.

### 2. Ajuste o `config.yml` (opcional)

O `config.yml` é totalmente comentado e controla tudo: ferramentas, projeto principal, frameworks
pares, repositório da vitrine, tópicos do GitHub, consultas e palavras-chave do Hacker News, feeds de
notícias, idiomas e o fuso usado na data do relatório. Apague uma seção para voltar aos padrões.

### 3. Verifique as fontes

```bash
export GITHUB_TOKEN=ghp_xxxxx
pnpm probe
```

O `pnpm probe` checa cada repositório, tópico, consulta do HN e feed configurado e imprime um relatório
de saúde (`❌` indica uma fonte quebrada). Também existe um workflow **Source health check** para rodar
isso na CI.

### 4. Configure os segredos

**Settings → Secrets and variables → Actions:**

| Segredo | Obrigatório | Descrição |
|---------|-------------|-----------|
| `OPENAI_API_KEY` | ✅ | Chave de API de qualquer endpoint compatível com `chat/completions` |
| `OPENAI_BASE_URL` | opcional | Endpoint alternativo (padrão `https://api.openai.com/v1`) |
| `OPENAI_MODEL` | opcional | Nome do modelo (padrão `gpt-4.1-mini`) |
| `REPORT_LANGS` | opcional | Ex.: `en,pt,zh` — sobrepõe o `report_langs` do config.yml |
| `PAGES_URL` | recomendado | URL pública do site, ex.: `https://seu-usuario.github.io/art_radar` |
| `TELEGRAM_BOT_TOKEN` | opcional | Notificações no Telegram |
| `TELEGRAM_CHAT_ID` | opcional | ID do chat/canal do Telegram |

`ANTHROPIC_API_KEY` / `ANTHROPIC_BASE_URL` / `ANTHROPIC_MODEL` continuam funcionando como apelidos, e o
`GITHUB_TOKEN` é fornecido automaticamente pelo Actions.

> **Custo:** cada entrada de repositório gera uma chamada de LLM por idioma, então uma execução completa
> em inglês + português + chinês com a configuração padrão faz cerca de 60 chamadas por dia. Reduza
> `tools` / `peers` ou use `report_langs: [pt]` para diminuir.

### 5. Escolha o horário

| Workflow | Cron (UTC) | Horário em São Paulo |
|----------|-----------|----------------------|
| Digest diário | `0 10 * * *` | 07:00 |
| Resumo semanal | `0 11 * * 1` | segunda, 08:00 |
| Resumo mensal | `0 12 1 * *` | dia 1º, 09:00 |

Edite os crons em `.github/workflows/` e o `timezone_offset` no `config.yml` conforme o seu fuso.

## Desenvolvimento local

```bash
pnpm install
pnpm start          # executa o digest completo
pnpm probe          # verifica todas as fontes configuradas
pnpm test           # testes unitários
pnpm typecheck      # tsc --noEmit
pnpm lint           # ESLint
pnpm manifest       # reconstrói manifest.json + feed.xml
pnpm weekly         # resumo semanal
pnpm monthly        # resumo mensal
pnpm notify         # envia a notificação do Telegram
```

Variáveis de ambiente para execução local:

```bash
export GITHUB_TOKEN=ghp_xxxxx
export OPENAI_API_KEY=sk-xxxxx
export DIGEST_REPO=owner/art_radar   # omita para não criar Issues
export REPORT_LANGS=en,pt,zh         # opcional
```

## O que mudou em relação ao fork original

Este repositório nasceu como fork de um “Big Model Radar” de IA/LLMs. Todas as camadas foram reescritas
para o domínio da arte: fontes monitoradas, conjunto e nomes dos relatórios, prompts (agora em três
idiomas), tópicos de trending, filtro do Hacker News, feeds de notícias, além da interface web, do feed
RSS, do servidor MCP e das notificações no Telegram. Os antigos resumos de IA foram removidos.
