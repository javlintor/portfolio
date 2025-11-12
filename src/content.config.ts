import { defineCollection, reference, z } from "astro:content";

import { file } from 'astro/loaders';

const projects = defineCollection({
	loader: file("src/data/projects.json"),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		githubLink: z.string(),
	})
});


export const collections = { projects }
