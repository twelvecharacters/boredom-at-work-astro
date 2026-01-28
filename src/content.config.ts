import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const reviewSchema = z.object({
  rating: z.number().min(1).max(5), // 1-5 stars
  productName: z.string(),
  productBrand: z.string().optional(),
  priceRange: z.string().optional(), // e.g. "$200-$300"
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('bored chap'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    faq: z.array(faqSchema).optional(),
    tldr: z.string().optional(), // TL;DR summary for quick reading
    review: reviewSchema.optional(), // Product review data for Schema.org
    slug: z.string().optional(), // URL slug, overrides file path
  }),
});

export const collections = { blog };
