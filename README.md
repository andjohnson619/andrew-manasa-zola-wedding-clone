# Andrew and Manasa wedding site (static clone)

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

```bash
cd "path/to/andrew-manasa-zola-wedding-clone"
git init
git add .
git commit -m "Initial static clone of Zola wedding site"
```

Create an empty repo on GitHub, add `origin`, and push. Enable GitHub Pages from the `main` branch if you want hosting.

## Note on the saved HTML file

`reference/saved-zola-page.html` is your full browser save and can include embedded Zola account fields (e.g. email in `__NEXT_DATA__`). For a **public** GitHub repo, remove that file from git history or replace it with a redacted copy. The live static site only reads `data/site.json`.
