import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft, Mail, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the eBills team. Have questions, feedback, or feature requests? We'd love to hear from you.",
  alternates: { canonical: "https://ebills.co.in/contact" },
};

export default function ContactPage() {
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
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions, feedback, or feature requests? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">General Inquiries</h3>
              <a
                href="mailto:info@ebills.co.in"
                className="text-sm text-primary hover:underline"
              >
                info@ebills.co.in
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                For partnerships, press, and general questions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Support</h3>
              <a
                href="mailto:support@ebills.co.in"
                className="text-sm text-primary hover:underline"
              >
                support@ebills.co.in
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                For bug reports, help, and feedback
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">GitHub Issues</h3>
              <a
                href="https://github.com/skgandikota/ebills/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Open an Issue
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                For bug reports and feature requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-sm font-medium">Within 24 hours</p>
              <p className="text-xs text-muted-foreground mt-2">
                We aim to respond to all queries promptly
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "I found a bug. How do I report it?",
                a: "Please open an issue on our GitHub repository with steps to reproduce the bug. Include screenshots if possible.",
              },
              {
                q: "I have a feature request. Where do I submit it?",
                a: "Feature requests are welcome! Open a GitHub issue with the 'enhancement' label, or email us at support@ebills.co.in.",
              },
              {
                q: "I need help with my invoices. Can you help?",
                a: "We can help with technical questions about using eBills. For tax or legal advice about your invoices, please consult a qualified CA or tax professional.",
              },
              {
                q: "Can I contribute to eBills?",
                a: "We welcome contributions! Check our GitHub repository for open issues and contribution guidelines.",
              },
              {
                q: "Is there a phone number I can call?",
                a: "Currently, we provide support via email and GitHub issues. Email is the fastest way to reach us.",
              },
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-lg border bg-background">
                <h3 className="font-medium text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-10 px-6 rounded-xl bg-primary/5 border border-primary/20">
          <h2 className="text-xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Create professional invoices for free — no credit card required.
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
