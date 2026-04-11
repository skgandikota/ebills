import { Metadata } from "next";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog-posts";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog — Free Billing, Invoicing & GST Guides for Indian Businesses",
  description:
    "1000+ articles on GST invoicing, rent receipts, HRA exemption, export invoices, freelance billing, small business accounting, and tax compliance in India. Updated daily.",
  keywords: [
    "billing blog",
    "GST invoice guide",
    "rent receipt HRA",
    "freelance invoice India",
    "small business billing",
    "e-invoicing India",
    "tax filing guide",
    "export invoice LUT",
  ],
  alternates: { canonical: "https://ebills.co.in/blog" },
  openGraph: {
    title: "eBills Blog — Free Billing & Invoicing Guides",
    description:
      "1000+ articles on GST invoicing, rent receipts, HRA exemption, export invoices, freelance billing, and tax compliance in India.",
    url: "https://ebills.co.in/blog",
    type: "website",
  },
};

export default function BlogPage() {
  // Pass minimal data to client component for interactivity (search, filter, pagination)
  const postsOverview = BLOG_POSTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    category: p.category,
    tags: p.tags,
    description: p.description,
    readTime: p.readTime,
  }));

  return <BlogListClient posts={postsOverview} categories={BLOG_CATEGORIES} />;
}
