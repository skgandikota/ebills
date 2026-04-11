import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft, GitBranch, Shield, Zap, Heart, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About eBills — Free Online Bill & Invoice Generator",
  description:
    "Learn about eBills — the free online billing platform built with zero server costs. Our mission is to make professional invoicing accessible to every business in India.",
  alternates: { canonical: "https://ebills.co.in/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <FileText className="h-5 w-5 text-primary" />
            eBills
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About eBills</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe every business — from a freelancer working from home to a growing MSME —
            deserves professional invoicing without paying for expensive software.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            eBills was born from a simple frustration: why should small businesses and freelancers
            pay ₹500–2,000 per month just to generate a PDF invoice? We set out to build a
            full-featured billing platform that costs absolutely nothing — not &quot;free with limits,&quot;
            but genuinely, permanently free.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to democratize professional invoicing for Indian businesses. Whether
            you&apos;re creating GST invoices, rent receipts, export documents, or donation receipts,
            eBills gives you the tools to look professional without the price tag.
          </p>
        </section>

        {/* What makes us different */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">What Makes eBills Different</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GitBranch className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Your Data, Your Control</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unlike other billing tools, your invoices are stored in your own GitHub repository.
                  Not our database. Not our servers. If eBills disappears tomorrow, your data is
                  still safely in your account.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Zero Server Costs</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built on a fully serverless architecture — Next.js on GitHub Pages, Firebase Auth,
                  and Cloudflare Workers. Monthly hosting cost: ₹0. That&apos;s how we keep it free
                  forever.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <h3 className="font-semibold">No Vendor Lock-in</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your invoices are stored as standard files in GitHub. Export, migrate, or process
                  them any way you want. You&apos;re never locked into our platform.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Built for India</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  GST-compliant invoices with GSTIN, HSN codes, CGST/SGST/IGST. Rent receipts for
                  HRA exemption. Export invoices with LUT. Donation receipts with Section 80G. Made
                  for Indian business needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* By the numbers */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">eBills at a Glance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: "16", label: "Invoice Templates" },
              { num: "9+", label: "Currencies Supported" },
              { num: "₹0", label: "Monthly Cost" },
              { num: "100%", label: "Free Forever" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 rounded-lg bg-muted/50 border">
                <div className="text-2xl font-bold text-primary">{s.num}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            eBills is built with modern, open web technologies:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: "Next.js", desc: "React framework" },
              { name: "TypeScript", desc: "Type-safe code" },
              { name: "Tailwind CSS", desc: "Utility-first styling" },
              { name: "Firebase Auth", desc: "Secure login" },
              { name: "GitHub API", desc: "Data storage" },
              { name: "Cloudflare Workers", desc: "Token broker" },
              { name: "GitHub Pages", desc: "Free hosting" },
              { name: "jsPDF", desc: "PDF generation" },
              { name: "PWA", desc: "Installable app" },
            ].map((t) => (
              <div key={t.name} className="p-3 rounded-lg border bg-background">
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-10 px-6 rounded-xl bg-primary/5 border border-primary/20">
          <h2 className="text-2xl font-bold mb-3">Start Creating Free Invoices</h2>
          <p className="text-muted-foreground mb-6">
            No credit card. No subscription. No hidden fees. Just professional billing.
          </p>
          <Link
            href="/dashboard/bills/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition"
          >
            Create Free Invoice →
          </Link>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground mt-12">
        <p>
          © {new Date().getFullYear()} eBills — Free Online Bill & Invoice Generator —{" "}
          <Link href="/" className="underline hover:text-foreground">Home</Link>{" · "}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy</Link>{" · "}
          <Link href="/terms" className="underline hover:text-foreground">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
