# Andrew and Manasa wedding site (static clone)

**Project location:** `Cursor AI\andrew-manasa-zola-wedding-clone` (this repo). It was moved here from the Cary `AI Outputs` folder.

If a **duplicate empty folder** still appears under `Cary - Documents\...\Andrew\AI Outputs\andrew-manasa-zola-wedding-clone` (Windows can keep a lock until Explorer or an editor releases it), close those apps and run `scripts\delete-old-cary-copy.cmd`, or delete that folder manually in File Explorer.

---

This folder is a **static remake** of the Zola wedding site theme **Jessenia (Pale Sage)** for [andrewandmanasa](https://www.zola.com/wedding/andrewandmanasa), built from:

- Your saved page export: `reference/saved-zola-page.html` (includes full `__NEXT_DATA__` from Zola)
- A trimmed public config: `data/site.json` (no account emails or IDs)

## Edit content

- **`data/site.json`**: names, date, city, hero image URLs, schedule copy, travel/FAQ HTML snippets, registry note.
- **`css/styles.css`**: colors (`--bg`, `--text`), typography.
- **`index.html`**: section order and landmarks.

Hero photos load from Zola CDN URLs in `site.json`. Replace those URLs if you self-host images.

## Preview locally

`site.json` is loaded with `fetch()`, so open the site over HTTP (not `file://`):

```bash
npx --yes serve .
```

Then open the URL shown in the terminal (e.g. `http://localhost:3000`).

## Push to GitHub

This directory is already a git repository. Create an empty repo on GitHub, then:

```bash
cd "C:\Users\Andrew S Johnson\OneDrive - McKinsey & Company\Cursor AI\andrew-manasa-zola-wedding-clone"
git remote add origin <your-repo-url>
git push -u origin master
```

Rename the branch to `main` on GitHub if you prefer. Enable GitHub Pages from that branch if you want hosting.

## Note on the saved HTML file

`reference/saved-zola-page.html` is your full browser save and can include embedded Zola account fields (e.g. email in `__NEXT_DATA__`). For a **public** GitHub repo, remove that file from git history or replace it with a redacted copy. The live static site only reads `data/site.json`.
