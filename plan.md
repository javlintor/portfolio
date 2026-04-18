# Table of Contents Sidebar - Implementation Plan

## Overview

Add a lateral Table of Contents (ToC) sidebar to project pages (`/project/[id]`) that displays all headers and subheaders from the markdown content as navigable links.

## Technical Approach

### 1. Extract Headings from Markdown Content

Astro's content collections provide access to rendered HTML. We'll parse the headings at build time using a **remark plugin** that injects heading data into the frontmatter or exports.

**Option A (Recommended): Use `rehype-slug` + custom extraction**

- Configure `rehype-slug` in `astro.config.mjs` to add IDs to headings
- Create a utility function that parses the rendered HTML to extract headings
- This keeps heading extraction decoupled and reusable

**Option B: Custom remark plugin**

- Write a remark plugin that extracts headings during markdown processing
- More complex but gives direct access during the build phase

### 2. Component Architecture

```
src/
  components/
    TableOfContents.astro    # Reusable ToC component
  pages/
    project/
      [id].astro             # Updated layout with sidebar
```

### 3. TableOfContents Component

The component will:

- Accept an array of headings with `text`, `slug`, and `depth` properties
- Render a nested list structure based on heading depth (h2, h3, etc.)
- Support smooth scrolling via anchor links
- Highlight the current section (optional - requires client-side JS)

**Props interface:**

```typescript
interface Heading {
  depth: number // 1-6
  slug: string // URL-friendly ID
  text: string // Heading text content
}
```

### 4. Page Layout Changes

Update `[id].astro` to use a two-column layout:

```
+----------------------------------+
|          Header                  |
+----------------------------------+
|  ToC Sidebar  |   Content        |
|  (sticky)     |   (scrollable)   |
|               |                  |
+----------------------------------+
```

**CSS considerations:**

- Desktop (>1024px): Side-by-side layout with sticky ToC
- Tablet (768-1024px): ToC above content or collapsible
- Mobile (<768px): ToC hidden or in expandable accordion

### 5. Heading ID Generation

For anchor links to work, headings must have `id` attributes. Options:

1. **Use `rehype-slug`** - Automatically adds slugified IDs to all headings
2. **Configure in astro.config.mjs** - Enable built-in heading ID generation

### 6. Implementation Steps

1. **Configure Astro for heading IDs**
   - Add `rehype-slug` to `astro.config.mjs`
   - This ensures all headings in markdown have unique IDs

2. **Create heading extraction utility**
   - Use Astro's `render()` function which returns `headings` array
   - Already available: `const { Content, headings } = await render(project)`

3. **Create `TableOfContents.astro` component**
   - Accepts `headings` prop
   - Renders hierarchical list with anchor links
   - Applies styling consistent with DESIGN.md

4. **Update `[id].astro` layout**
   - Add responsive two-column grid
   - Include TableOfContents component
   - Ensure proper spacing and overflow handling

5. **Add sticky positioning and scroll behavior**
   - ToC stays visible while scrolling
   - Smooth scroll to sections
   - Optional: Active section highlighting

6. **Responsive design**
   - Hide ToC on mobile or show as collapsible section
   - Adjust content width on different breakpoints

## File Changes

| File                                   | Action | Description                              |
| -------------------------------------- | ------ | ---------------------------------------- |
| `astro.config.mjs`                     | Modify | Add rehype-slug plugin (if needed)       |
| `src/components/TableOfContents.astro` | Create | New ToC component                        |
| `src/pages/project/[id].astro`         | Modify | Add sidebar layout and ToC component     |
| `src/styles/global.css`                | Modify | Add ToC-related CSS variables (optional) |

## Scalability Considerations

1. **Reusable component**: `TableOfContents.astro` can be used on any content page (blog posts, documentation, etc.)

2. **Configurable depth**: Allow filtering which heading levels to show (e.g., only h2 and h3)

3. **Empty state handling**: Gracefully handle content with no headings

4. **Performance**: Headings are extracted at build time, no runtime cost

5. **Accessibility**: Proper ARIA labels, keyboard navigation, semantic HTML

## Future Enhancements (Out of Scope)

- Active section highlighting with IntersectionObserver
- Collapsible nested sections
- Reading progress indicator
- "Back to top" button
