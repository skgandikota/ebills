import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import {
  FileText,
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Static generation for all 1095 slugs ─── */
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

/* ─── Per-page SEO metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `https://ebills.co.in/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://ebills.co.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["eBills"],
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

/* ─── Page ─── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);

  // Find related posts (same category, different slug)
  const related = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  ).slice(0, 3);

  // Previous / Next by date
  const sorted = [...BLOG_POSTS].sort((a, b) => a.date.localeCompare(b.date));
  const sortIdx = sorted.findIndex((p) => p.slug === slug);
  const prev = sortIdx > 0 ? sorted[sortIdx - 1] : null;
  const next = sortIdx < sorted.length - 1 ? sorted[sortIdx + 1] : null;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // JSON-LD for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "eBills", url: "https://ebills.co.in" },
    publisher: {
      "@type": "Organization",
      name: "eBills",
      url: "https://ebills.co.in",
    },
    mainEntityOfPage: `https://ebills.co.in/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* ─── Header ─── */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <FileText className="h-5 w-5 text-primary" />
            eBills
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Articles
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-10">
        {/* ─── JSON-LD ─── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ─── Article Header ─── */}
        <header className="mb-10">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              {post.tags.slice(0, 3).join(", ")}
            </span>
          </div>
        </header>

        {/* ─── Intro ─── */}
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-10 border-l-4 border-primary/30 pl-4">
          {post.intro}
        </p>

        {/* ─── Table of Contents ─── */}
        <nav className="mb-10 p-4 rounded-lg bg-muted/50 border">
          <h2 className="font-semibold text-sm mb-2">In this article</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            {post.sections.map((s, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="hover:text-foreground transition underline-offset-2 hover:underline"
                >
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ─── Sections ─── */}
        {post.sections.map((section, i) => (
          <section key={i} id={`section-${i}`} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">{section.heading}</h2>
            {section.content.split("\n\n").map((para, j) => (
              <p
                key={j}
                className="text-base leading-relaxed text-muted-foreground mb-4"
              >
                {para}
              </p>
            ))}
          </section>
        ))}

        {/* ─── CTA ─── */}
        <div className="my-12 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <h3 className="font-bold text-lg mb-2">
            Ready to create your invoice?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            eBills lets you generate professional invoices, receipts, and bills for
            free. No signup fees, no hidden charges.
          </p>
          <Link
            href="/dashboard/bills/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition"
          >
            Create Free Invoice →
          </Link>
        </div>

        {/* ─── Related Articles ─── */}
        {related.length > 0 && (
          <section className="mb-10">
            <h3 className="font-bold text-lg mb-4">Related Articles</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="p-4 rounded-lg border hover:border-primary/30 hover:shadow-sm transition group"
                >
                  <Badge variant="secondary" className="text-xs mb-2">
                    {r.category}
                  </Badge>
                  <h4 className="text-sm font-medium group-hover:text-primary transition line-clamp-2">
                    {r.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(r.date)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── Prev / Next ─── */}
        <nav className="flex gap-4 mt-10 pt-6 border-t">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="flex-1 p-4 rounded-lg border hover:bg-muted/50 transition group text-left"
            >
              <span className="text-xs text-muted-foreground">← Previous</span>
              <p className="text-sm font-medium group-hover:text-primary transition line-clamp-1 mt-1">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="flex-1 p-4 rounded-lg border hover:bg-muted/50 transition group text-right"
            >
              <span className="text-xs text-muted-foreground">Next →</span>
              <p className="text-sm font-medium group-hover:text-primary transition line-clamp-1 mt-1">
                {next.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </article>

      {/* ─── Footer ─── */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} eBills — Free Online Bill & Invoice Generator —{" "}
          <Link href="/" className="underline hover:text-foreground">
            Home
          </Link>{" "}
          ·{" "}
          <Link href="/blog" className="underline hover:text-foreground">
            Blog
          </Link>
        </p>
      </footer>
    </div>
  );
}
