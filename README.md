# Circular Economy Influencer for a Day — The MacBook Air M5

A static, single-page blog post analysing a MacBook Air through circular economy
thinking: product profile, lifecycle, materials, impact split, the three CE
principles, the butterfly diagram, and two circular business models.

## Stack

- Plain HTML5 + CSS + vanilla JS
- Bootstrap 5.3.8 via jsDelivr CDN (grid, navbar, pills, table)
- Google Fonts: Space Grotesk + Source Serif 4
- All diagrams are hand-written inline SVG — no image files, no chart library

## Structure

```
.
├── index.html
├── favicon.svg
├── .nojekyll
├── assets/
│   ├── css/style.css
│   └── js/main.js
└── img/            <- your photos (see img/README.md)
```

## Publishing on GitHub Pages

1. Create a public repository and push these files to the `main` branch, root folder.
2. Repository → **Settings** → **Pages**.
3. Under *Build and deployment* → *Source*, choose **Deploy from a branch**.
4. Pick branch `main`, folder `/ (root)`, then **Save**.
5. The site appears at `https://<user>.github.io/<repo>/` within a minute or two.

`.nojekyll` tells Pages to serve the files as-is instead of running Jekyll.

## Editing

- Byline and author name: search for `Ortiz Pérez Vertti` in `index.html`.
- Colours and type scale: the `:root` block at the top of `assets/css/style.css`.
- Missing photos degrade into a labelled placeholder instead of a broken image.
