import { defineCollection, z } from "astro:content";

import { file } from 'astro/loaders';

const projects = defineCollection({
	loader: file("src/data/projects.json"),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		link: z.string(),
		technologies: z.array(z.string())
	})
});


export const coleections = { projects }
