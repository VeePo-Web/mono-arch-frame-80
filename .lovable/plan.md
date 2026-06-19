## Goal
Add `havencreekrenovations.ca` as a verified property in Parker's Google Search Console, using the META-tag verification flow (the only method that works for a Lovable-hosted site).

## Steps

1. **Link the connector to this project**
   - Call `standard_connectors--connect` with `connector_id: google_search_console` and have you pick "Parker's Google Search Console" so its credentials are injected into the project.

2. **Request a META verification token**
   - POST to the gateway `siteVerification/v1/token` for `identifier: https://havencreekrenovations.ca/`, method `META`.
   - Response gives the exact `content="..."` string for the meta tag.

3. **Embed the meta tag in `index.html`**
   - Add a single line in `<head>`:
     ```html
     <meta name="google-site-verification" content="<TOKEN>" />
     ```
   - This must be in the server-rendered HTML, so it goes in `index.html` (not a React component).

4. **Publish the site so Google can fetch the tag**
   - You'll need to click Publish so havencreekrenovations.ca serves the new tag. I'll pause and confirm with you before calling verify.

5. **Call Google to verify**
   - POST to `siteVerification/v1/webResource?verificationMethod=META` with the same identifier. 200 = verified.

6. **Add the site to Search Console**
   - PUT `webmasters/v3/sites/https%3A%2F%2Fhavencreekrenovations.ca%2F` so it appears in the property list.
   - Submit `/sitemap.xml` for the property in the same step.

## Notes / decisions for you
- The site has multiple custom domains (apex `.ca`, `www.ca`, `.xyz`, `.com`, etc.). Search Console treats each origin as a separate property. I'll verify **`https://havencreekrenovations.ca/`** as you asked. If you also want `https://www.havencreekrenovations.ca/` (the canonical used in the sitemap) verified, say the word and I'll repeat steps 2-6 for it — recommended, since that's the URL crawlers will actually see in `<link rel="canonical">` and `sitemap.xml`.
- No code changes besides one `<meta>` line in `index.html`. No app behaviour changes.
