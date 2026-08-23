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
  reviewBody: z.string().optional(), // Review summary for Schema.org reviewBody
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

// Paid placements. The presence of `sponsor` marks a post as sponsored content:
// it renders a disclosure box and, unless writtenBy is 'editorial', attributes
// the article to the sponsor instead of our editorial byline. Never set this on
// a post we published for our own reasons.
const sponsorSchema = z.object({
  name: z.string(), // Paying brand, e.g. "Great Learning"
  url: z.string().optional(), // Sponsor homepage, shown in the disclosure
  writtenBy: z.enum(['sponsor', 'editorial']).default('sponsor'), // Who wrote the copy
  byline: z.string().optional(), // Overrides the default "Paid content by X" byline
  disclosure: z.string().optional(), // Overrides the default disclosure wording
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Mehdi'),
    image: image().optional(),
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
    sponsor: sponsorSchema.optional(), // Paid placement, see sponsorSchema above
    slug: z.string().optional(), // URL slug, overrides file path
  }),
});

export const collections = { blog };
