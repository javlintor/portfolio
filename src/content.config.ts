import { defineCollection, reference, z } from "astro:content";

import { file, glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/data/blog" })
})

const technologies = defineCollection({
	loader: file("src/data/technologies.json"),
	schema: z.object({
		label: z.string(),
		image: z.string(),
		link: z.string(),
		foregroundColor: z.string(),
		backgroundColor: z.string(),
	})
})

const projects = defineCollection({
	loader: glob({ pattern: "src/data/project/*.md" }),
	schema: z.object({
		title: z.string(),
		githubLink: z.string(),
		technologies: z.array(reference('technologies'))
	})
});



export const collections = { projects, technologies, blog }
