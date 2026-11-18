# Rotary Club Skopje International redesign

A fully rendered, responsive Macedonian website inspired by rotaryskadarlija.com, using original RCSI content and photography. The implementation is static HTML, CSS, and JavaScript, with no production framework dependencies.

## Run and edit

```sh
npm run build
npm run check
npm run dev
```

Open http://localhost:4173. Node 20+ and Python 3 are sufficient for build, checks, and preview.

- `dist/content.json`: migrated content, articles, people, calendar snapshot, and image paths.
- `dist/render.mjs`: shared page templates.
- `dist/styles.css`: responsive design and typography.
- `dist/app.mjs`: navigation, search, archive filters, galleries, calendar, and contact/donation controls.
- `dist/assets`: original downloaded images, optimized WebP variants, and self-hosted fonts.
- `build.mjs`: generates every page, metadata, sitemap, and custom 404.
- `scripts/validate.py`: checks routes, local assets, headings, image alternatives, and migration counts.

Run `npm run build` after editing content or templates. CSS and client JavaScript updates apply directly. Publish the complete `dist` folder on a static host with directory index support. The current Sites identity is stored in `.openai/hosting.json`.

## Content migration

Reviewed the original homepage, WordPress sitemaps, all sitemap page URLs, linked navigation, popup content, biography content, calendar endpoint, and media references on 18 November 2026.

Migrated 8 project entries, 13 event reports, 9 visit reports, the World Polio Day announcement, 21 member profiles, 4 board members, 6 committees, 15 presidents, 7 honorary members, club history in Macedonian and English, contact details, membership copy, donation information and payment slips. Original language, names, dates, and substantive article text remain intact. New introduction and navigation copy is Macedonian.

Public legacy/test pages are retained under their original paths and linked from `/archive/`. Repeated navigation, tracking scripts, authoring notes, and executable legacy administration code are not copied. The old WordPress sample post is retained in the archive. Original member anchor IDs remain available. Additional individual article and biography routes make the former popups directly linkable.

The crawler downloaded 282 assets, including originals and an archive illustration. Optimized WebP copies are used for display. One referenced source image, `https://rcsi.mk/wp-content/uploads/2025/11/US-1.jpg`, returned HTTP 404 and could not be recovered. Remaining original gallery photos are present. Full local research evidence and screenshots are in `research/`, which is deliberately excluded from the published source.

## Service boundaries and launch work

This deployment is an owner-private hosted review version. It does not replace rcsi.mk or change its DNS.

- Contact and membership forms validate input and explicitly open the visitor's email application addressed to contact@rcsi.mk. They do not claim to submit to a server. Direct server-side delivery requires the club's hosting or approved email-provider access.
- Members-only sign-in and registration link to the existing RCSI portal. Accounts, private documents, and server data cannot be migrated through the public website.
- The redesigned calendar contains the public event snapshot retrieved on 18 November 2026 and links to the original live calendar. The original endpoint does not provide cross-origin access. Automated live synchronization and administrative edits require a backend integration.
- No payment processor was invented: donations preserve the original bank account and payment slips, with a copy-account action.
- Before domain cutover, configure the club's preferred hosting, update canonical and sitemap origins in `build.mjs`, connect backend services, and arrange redirects for any changed article URLs. Keep the existing member and calendar services reachable.

## Existing source inconsistencies

Source metadata is preserved rather than silently corrected:

- The upcoming cybersecurity entry points to an unrelated mental-health popup in the original site. The redesigned cybersecurity page retains that popup inside an expandable source-content section.
- Amsterdam visit listing: 17 November 2023; popup subtitle: 12 November 2023.
- Rade Hristovski visit listing: 22 November 2022; popup subtitle: 11 November 2022.
- Second technology forum listing: 27 March 2017; article text: 23 March 2017.
- Some membership terms differ from the president-history page, including the original `2026-2025` term. The current board roles follow the explicit 30 June 2026 handover report; original membership terms remain in individual profiles.
- Original biographies marked as forthcoming remain as supplied.

## Validation

Static checks cover every generated HTML page and internal asset/link reference. Browser verification uses Playwright with the installed Brave browser at desktop, tablet, and mobile widths (1440, 768, 390, 320). Checks exercise filters, empty states, member search, biographies, global search, gallery navigation and Escape handling, mobile menus, donation copying, calendar navigation, and required contact fields. Browser scripts under `scripts/` contain this workstation's Playwright and browser paths; adapt those paths to rerun on another machine.

The migration helper requires Beautiful Soup and Pillow plus the local `research/` crawl. It is an import tool, not part of the build. Normal editing and publication only require the included `dist/content.json` and assets.
# rcsi
