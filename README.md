# Euro Nexusion website

Static German-first B2B website with an English display option. Production: https://euro-nexusion.de/ on Hostinger, connected to this repository's `main` branch. See [deployment notes](HOSTINGER_DEPLOY.md).

Manufacturer pages are crawlable HTML, generated with `node scripts/build-brands.cjs`. Shared navigation and translation are in `assets/app.js`; local photography and motion are in `assets/premium.js`, `assets/motion.js` and `assets/scroll-journey.js`. Brand names are displayed as text because logo licensing and partnership status are not independently established. Legacy brand image files are retained in source but are not rendered by the current brand components.

Run `node scripts/check-site.cjs` and `node --check` on changed JavaScript. GitHub Actions also checks PHP syntax. Preview with a local static server; actual form delivery requires PHP hosting or Netlify Forms and must be verified separately. Never infer inbox receipt from a successful HTTP response.

The legal address is Osloring 43, 24109 Kiel, Germany. Marketing addresses Germany and Europe. Existing proprietor, tax ID and registration statements are retained from the supplied source; no new registration or manufacturer authorization is asserted.
