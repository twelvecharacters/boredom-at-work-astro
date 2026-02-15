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

const videoSchema = z.object({
  youtubeId: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.string().optional(), // ISO 8601, e.g. "PT1M"
});

const howToStepSchema = z.object({
  name: z.string(),
  text: z.string(),
});

const howToSchema = z.object({
  totalTime: z.string().optional(), // ISO 8601, e.g. "PT30M"
  steps: z.array(howToStepSchema).min(2),
});

const softwareAppSchema = z.object({
  name: z.string(),
  operatingSystem: z.string().optional(), // e.g. "Web, Windows, macOS, iOS, Android"
  category: z.string().optional(), // e.g. "BusinessApplication", "EducationalApplication"
  rating: z.number().min(1).max(5).optional(),
  ratingCount: z.number().optional(),
  priceRange: z.string().optional(), // e.g. "$0-$20/mo"
  url: z.string().optional(), // Official product URL
});

const courseSchema = z.object({
  name: z.string(),
  description: z.string(),
  provider: z.string().optional(), // e.g. "Coursera", "Google"
  providerUrl: z.string().optional(),
  duration: z.string().optional(), // ISO 8601, e.g. "PT10H"
  language: z.string().default('en'),
  isFree: z.boolean().optional(),
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
    isListicle: z.boolean().default(false), // Enable ItemList Schema for listicles
    video: videoSchema.optional(), // YouTube video for VideoObject schema
    howTo: howToSchema.optional(), // HowTo schema for tutorial articles
    softwareApp: softwareAppSchema.optional(), // SoftwareApplication schema for tool reviews
    course: courseSchema.optional(), // Course schema for learning guides
    slug: z.string().optional(), // URL slug, overrides file path
  }),
});

export const collections = { blog };
