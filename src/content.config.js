import { defineCollection, reference, z } from 'astro:content'

import { glob } from 'astro/loaders'

const technologies = defineCollection({
  loader: glob({ base: './src/data/technology', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      label: z.string(),
      icon: image(),
      link: z.string(),
      foregroundColor: z.string(),
      backgroundColor: z.string(),
    }),
})

const projects = defineCollection({
  loader: glob({ base: './src/data/project', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    githubLink: z.string(),
    projectLink: z.string().optional(),
    technologies: z.array(reference('technologies')),
    is_hidden: z.boolean().default(false),
  }),
})

export const collections = { projects, technologies }
