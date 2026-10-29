# Euro Nexusion website

## Premium interface and local assistant (29 October 2026)

The active interface uses `assets/navy-ui.css`, original SVG illustrations in `assets/visuals/`, and the manufacturer's existing locally hosted marks from the owner's October 27 update. See [asset provenance](ASSET_LICENSES.md); a locally hosted logo is still a trademark and is not represented as copyright-free.

The website assistant is a deterministic, multilingual guide using `assets/assistant-knowledge.js`, `assets/assistant-core.js` and `assets/assistant-ui.js`. It has no generative AI model, API key, paid API, external inference service, or persistent chat transcript. It supports manufacturer information, project preparation, site FAQs, shipping conditions and direct contact. Unknown questions receive an explicit fallback. Contact handoff uses a URL fragment so chat text is not sent in the initial HTTP request. Run `node scripts/test-assistant.cjs` after editing it.

Privacy controls (`assets/privacy-controls.js`) offer necessary-only, allow-display-preferences and custom-save choices. There are no advertising or analytics categories because those services are absent. Language and motion persistence are opt-in. The necessary consent record expires after 180 days. Existing PHP/contact delivery and DNS/email settings are unchanged.

Static German-first B2B website with an English display option. Production: https://euro-nexusion.de/ on Hostinger, connected to this repository's `main` branch. See [deployment notes](HOSTINGER_DEPLOY.md).

Manufacturer pages are crawlable HTML, generated with `node scripts/build-brands.cjs`. Shared navigation and translation are in `assets/app.js`; original technical illustrations and motion are in `assets/premium.js`, `assets/motion.js` and `assets/scroll-journey.js`. Manufacturer names and the owner's existing local logo assets identify the brands without asserting a partnership. Historical photographic assets remain in source for recovery and are no longer referenced by the current rendered components.

Run `node scripts/check-site.cjs` and `node --check` on changed JavaScript. GitHub Actions also checks PHP syntax. Preview with a local static server; actual form delivery requires PHP hosting or Netlify Forms and must be verified separately. Never infer inbox receipt from a successful HTTP response.

The legal address is Osloring 43, 24109 Kiel, Germany. Marketing addresses Germany and Europe. Existing proprietor, tax ID and registration statements are retained from the supplied source; no new registration or manufacturer authorization is asserted.
