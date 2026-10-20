# Euro Nexusion — Hostinger production deployment

Source: https://github.com/rudirasol33-del/euro-nexusion-website (branch main)
Destination: https://euro-nexusion.de/

## Setup (Hostinger web/cloud hosting, custom HTML/PHP)

1. In Hostinger hPanel open Websites → select euro-nexusion.de → Dashboard.
2. Take a backup of existing public_html content before replacing it.
3. Open Advanced → Git → Connect with GitHub.
4. Authorize the GitHub repository rudirasol33-del/euro-nexusion-website.
5. Select branch main and target directory public_html for the final production deployment.
6. Deploy, wait for completion, and verify the HTTPS address https://euro-nexusion.de.
7. Enable auto-deployment if your hosting plan offers it.

If the existing public_html is non-empty, preserve it first and use a clean deploy target according to Hostinger instructions. Do not delete live files or change DNS/NS/MX records without a tested backup and approved cutover.

This repo contains a static HTML/CSS/JS website and a PHP form handler (contact.php); PHP hosting is necessary to use the direct Hostinger form.
The old Netlify Forms integration remains available only on netlify.app preview hostnames.

## Post-deployment acceptance tests
- Check homepage desktop and mobile, German/English switch, navigation, 5-stage animation, reduced-motion/mobile fallback.
- Check impressum.html, privacy.html, cookies.html and agb.html; legal texts must be reviewed professionally.
- Submit one controlled test inquiry via contact.html, and confirm it actually ARRIVES at info@euro-nexusion.de.
- If PHP mail delivery is unreliable, configure authenticated SMTP/PHPMailer for production. Do not report customer form receipt based solely on mail() returning true.
- Review SSL certificate, redirects, sitemap.xml, robots.txt, open graph and page titles.
- Make sure the existing mail MX/SPF/DKIM/DMARC records stay intact when configuring hosting and DNS.

## Important limitations
This project was committed to GitHub from ChatGPT. It has **not** been deployed directly to Hostinger by ChatGPT because there is no authenticated Hostinger hosting deployment connection in the current tool session. GitHub commits do not prove the Hostinger production site updated.
