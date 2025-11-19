import { defineCollection, reference, z } from "astro:content";

import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/data/blog" })
});

const technologies = defineCollection({
	loader: glob({ base: "./src/data/technology", pattern: "**/*.md" }),
	schema: ({ image }) => z.object({
		label: z.string(),
		icon: image(),
		link: z.string(),
		foregroundColor: z.string(),
		backgroundColor: z.string(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: "./src/data/project", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		githubLink: z.string(),
		technologies: z.array(reference('technologies'))
	})
});



export const collections = { projects, technologies, blog }
