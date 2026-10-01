# N.F. Studio

A pixel-art portfolio with an animated garden and an expandable cave of projects.

## Run with Docker

```sh
docker compose up -d --build
```

Open [http://localhost:8080](http://localhost:8080). Set `PORTFOLIO_HTTP_PORT` to use another port. Stop with `docker compose down`.

## Update projects without rebuilding

Edit **`public/projects.json`** in the running site's checkout. Docker mounts the `public` folder into the web server. Save the JSON and the open page updates within 30 seconds, or immediately when you reload or return to the tab. There is no frontend rebuild or container restart for content edits.

To add a project, put its image in `public/assets`, then add an object to the JSON array:

```json
{
  "slug": "my-new-project",
  "title": "My New Project",
  "status": "ongoing",
  "year": 2026,
  "tags": ["Web", "React"],
  "summary": "A short description for the card.",
  "body": "The full story shown on the project's page.",
  "highlighted": false,
  "img": "/assets/my-new-project.jpg",
  "url": "https://example.com",
  "linkLabel": "Visit project"
}
```

- Use a unique lowercase `slug` with hyphens; this becomes the project's URL.
- `status` is `completed`, `ongoing`, or `abandoned`.
- `highlighted: true` puts a project on the surface. The surface shows at most four featured projects; the cave shows all remaining projects with no count limit.
- `img` is optional; use a local `/assets/` path. The original card images are preserved and displayed in square frames.
- `imageFit` is optional: `cover` fills the square frame; `contain` shows the complete image.
- `url` and `linkLabel` are optional. Project links must use HTTPS.
- Array order determines card order. Remove an object to remove its card and detail page.
- Invalid JSON or invalid entries keep the last successfully loaded catalog on an already open page. Fix the file and the next refresh picks it up. On a fresh visit, a load message appears until the file is valid.

For a non-Docker host, upload `projects.json` and new images to the site's root and `assets/` folder; no JavaScript rebuild is needed.

The catalog is read-only over HTTP. To edit it, use your server's filesystem access. Never store private data or credentials in it.

## Local development

```sh
npm ci
npm run dev
```

Skills remain in `src/data.js`. Scenery sprites are in `src/Scenery.jsx`.

## Search indexing

The site branding and page metadata use N.F. The introduction matches the wording on n.com.hr, as requested. HTML metadata and the web server send `noindex` directives. Search engines can remove existing results after recrawling; links to external profiles keep their own visibility settings.
