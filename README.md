# aioo-tools

Crypto micro-tool matrix — one tool per SEO landing page (static HTML).
加密货币微型工具矩阵站：一个工具一个落地页（纯静态）。

- Live: https://aioo.duckdns.org
- Deploy: VPS cron `git pull` every 5 min — see `site-deploy/pull.sh` in the agent workspace. Never edit on the server.
- Realtime data via local cache proxy: `/api/*` (see `site-deploy/api-proxy`). Frontend must NOT call third-party APIs directly.
- Each tool page: standalone `<title>` / meta description / JSON-LD (+ FAQ), bilingual (zh + en).
