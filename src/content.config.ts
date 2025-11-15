import { defineCollection, reference, z } from "astro:content";

import { file } from 'astro/loaders';

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
	loader: file("src/data/projects.json"),
	schema: z.object({
		title: z.string(),
		image: z.string(),
		imageDescription: z.string(),
		imageWidth: z.string().optional(),
		imageHeight: z.string().optional(),
		description: z.string(),
		githubLink: z.string(),
		technologies: z.array(reference('technologies'))
	})
});



export const collections = { projects, technologies }
