"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, ArrowLeft, ArrowRight, FileText, ChevronDown } from "lucide-react";

interface PostOverview {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  readTime: number;
}

const POSTS_PER_PAGE = 30;

const CAT_COLORS: Record<string, string> = {
  "GST & Tax Invoice": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "Rent Receipts & HRA": "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  "Freelance Billing": "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  "Export & Import": "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  "Small Business": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  "Digital Payments": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  "Tax Filing": "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  "Invoice Formats": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
  "Business Finance": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Legal Compliance": "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  "Receipt & Documentation": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "Industry Guides": "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  "Accounting Tips": "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300",
  "Startup Finance": "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  "E-Invoicing": "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
};

export default function BlogListClient({
  posts,
  categories,
}: {
  posts: PostOverview[];
  categories: string[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = posts;
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    // newest first
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [posts, search, category]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  function handleCategoryChange(cat: string) {
    setCategory(cat);
    setPage(1);
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    setPage(1);
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* ─── Header ─── */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <FileText className="h-5 w-5 text-primary" />
            eBills
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* ─── Hero ─── */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            eBills Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {posts.length.toLocaleString("en-IN")}+ articles on billing, invoicing, GST compliance,
            tax filing, and business finance for Indian businesses. Updated daily.
          </p>
        </div>

        {/* ─── Search & Filter ─── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* ─── Results count ─── */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {paginated.length} of {filtered.length.toLocaleString("en-IN")} articles
          {category !== "All" && ` in "${category}"`}
          {search && ` matching "${search}"`}
        </p>

        {/* ─── Posts Grid ─── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/30 group-hover:-translate-y-0.5">
                <CardContent className="p-5 flex flex-col h-full">
                  <Badge
                    variant="secondary"
                    className={`self-start mb-3 text-xs ${CAT_COLORS[post.category] || ""}`}
                  >
                    {post.category}
                  </Badge>
                  <h2 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {paginated.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p>No articles found. Try a different search term or category.</p>
          </div>
        )}

        {/* ─── Pagination ─── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            {/* Smart page range */}
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (page <= 4) {
                pageNum = i + 1;
              } else if (page >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = page - 3 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                    page === pageNum
                      ? "bg-primary text-primary-foreground"
                      : "border hover:bg-muted"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ─── SEO — hidden keyword-rich content ─── */}
        <section className="sr-only" aria-hidden="true">
          <h2>eBills Blog Categories</h2>
          <ul>
            {categories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p>
            Read {posts.length}+ free articles on billing, invoicing, GST invoice format, rent
            receipt for HRA, export invoice under LUT, freelance billing India, small business
            accounting, e-invoicing, tax filing, digital payments, and more.
          </p>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} eBills — Free Online Bill & Invoice Generator —{" "}
          <Link href="/" className="underline hover:text-foreground">
            Home
          </Link>
        </p>
      </footer>
    </div>
  );
}
