import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TEMPLATE_PAGES } from "@/data/template-pages";
import {
  FileText,
  ArrowRight,
  Check,
  HelpCircle,
  Zap,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import FaqAccordion from "./FaqAccordion";

/* ─── Static params for all 16 template pages ─── */
export function generateStaticParams() {
  return TEMPLATE_PAGES.map((p) => ({ slug: p.slug }));
}

/* ─── SEO Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = TEMPLATE_PAGES.find((p) => p.slug === slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `https://ebills.co.in/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://ebills.co.in/${page.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: page.h1 + " | eBills",
      description: page.description,
    },
  };
}

/* ─── Page ─── */
export default async function TemplateLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = TEMPLATE_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: page.h1,
    description: page.description,
    url: `https://ebills.co.in/${page.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    creator: {
      "@type": "Organization",
      name: "eBills",
      url: "https://ebills.co.in",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* ─── Header ─── */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <FileText className="h-5 w-5 text-primary" />
            eBills
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition hidden sm:inline"
            >
              Blog
            </Link>
            <Link
              href={`/dashboard/bills/new?template=${page.templateId}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
            >
              Create Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <section className="py-16 sm:py-24 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            100% Free — No Signup Fees
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {page.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {page.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/dashboard/bills/new?template=${page.templateId}`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg"
            >
              <Zap className="h-4 w-4" />
              Create {page.h1.replace("Free ", "")} — It&apos;s Free
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-1 px-6 py-3 rounded-xl border text-sm font-medium hover:bg-muted transition"
            >
              Learn More ↓
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-green-500" /> No Credit Card
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-green-500" /> No Hidden Fees
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-green-500" /> Instant PDF Download
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-green-500" /> Your Data, Your Control
            </span>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section id="features" className="py-16 px-4 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Why Choose eBills {page.h1.replace("Free ", "")}?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.features.map((f, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">{f.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How To Steps ─── */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            How to Create Your {page.h1.replace("Free ", "")}
          </h2>
          <ol className="space-y-4">
            {page.howToSteps.map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className="text-sm sm:text-base">{step}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="text-center mt-10">
            <Link
              href={`/dashboard/bills/new?template=${page.templateId}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition"
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Use Cases ─── */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Who Uses This Template?
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {page.useCases.map((uc, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg bg-background border"
              >
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{uc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Long Description (SEO) ─── */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">
            About {page.h1.replace("Free ", "")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {page.longDescription}
          </p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <FaqAccordion faqs={page.faqs} />
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Create Your {page.h1.replace("Free ", "")}?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of Indian businesses using eBills for free billing.
            No signup fees, no hidden charges — just professional invoicing.
          </p>
          <Link
            href={`/dashboard/bills/new?template=${page.templateId}`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg"
          >
            <Zap className="h-4 w-4" />
            Create Free {page.h1.replace("Free ", "")} Now
          </Link>
        </div>
      </section>

      {/* ─── Other templates ─── */}
      <section className="py-16 px-4 border-t">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-center mb-8">
            Explore Other Free Templates
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {TEMPLATE_PAGES.filter((p) => p.slug !== slug).map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="px-3 py-1.5 rounded-lg border text-xs hover:bg-muted transition"
              >
                {p.h1.replace("Free ", "")}
              </Link>
            ))}
          </div>
        </div>
      </section>

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
