# N.F. Studio

A pixel-art portfolio for software projects and creative experiments. The upper garden highlights work; the cave below holds the full, expandable project list.

## Run with Docker

```sh
docker compose up -d --build
```

Open [http://localhost:8080](http://localhost:8080). To use another local port, set `PORTFOLIO_HTTP_PORT` before starting Compose.

Stop the site with:

```sh
docker compose down
```

## Local development

```sh
npm ci
npm run dev
```

Project details, links, and highlighted projects are in `src/data.js`. The highlighted area displays at most four projects; the underground All Projects list includes every non-highlighted project.

## Search indexing

The page title and introduction use the N.F. monogram. HTML metadata and the web server both send `noindex` directives so search engines can remove the site from results after they crawl it again. This does not control external profiles linked from the site.
