# Portfolio

Astro 5 personal portfolio site.

## Structure

- `src/pages/` - Astro pages (index, blog, project/[id], styleguide)
- `src/components/` - Reusable Astro components
- `src/data/` - Content collections (blog, projects, technologies) - markdown files
- `src/layouts/` - Page layouts
- `src/styles/` - Global CSS

## Design

Design rules are defined in DESIGN.md, but the font used is Jetbrains monospace instead of Berkeley Mono

## Content

Content is stored as markdown files in `src/data/`:

- `project/*.md` - Project entries with frontmatter (title, description, githubLink, technologies[], is_hidden)
- `technology/*.md` - Tech badges (label, icon, link, foregroundColor, backgroundColor)
- `blog/*.md` - Blog posts

## CI/Deploy

- GitHub Actions deploys to Hostinger on push to `main`
- Build runs `npm run build` which includes `astro check`

## Prettier config

Custom: `semi: false`, `singleQuote: true`, trailing comma in ES5 style
