import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "eBills Terms of Service — Rules and guidelines for using our free online billing and invoicing platform.",
  alternates: { canonical: "https://ebills.co.in/terms" },
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: 12 April 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using eBills at <strong>ebills.co.in</strong> (the &quot;Service&quot;), you
              agree to be bound by these Terms of Service. If you do not agree to these terms, please
              do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              eBills is a free online billing and invoicing platform that allows users to create
              invoices, receipts, quotations, and other business documents. The Service stores user
              data in the user&apos;s own GitHub repository. eBills is provided &quot;as is&quot; and &quot;as
              available&quot; without charge.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. User Accounts</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>You must sign in using a valid Google or GitHub account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must be at least 18 years old to use the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You agree not to use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Create fraudulent, misleading, or illegal invoices or documents</li>
              <li>Violate any applicable laws, regulations, or tax compliance requirements</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Service or its infrastructure</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Use the Service for any unlawful or prohibited purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. User Data & Ownership</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong>You own your data.</strong> All invoices, receipts, and business documents you
              create using eBills are stored in your own GitHub repository. You retain full ownership
              and intellectual property rights over your content.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              eBills does not claim any ownership rights over the invoices or documents you create.
              You are solely responsible for the accuracy, legality, and tax compliance of the
              documents you generate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Invoices & Legal Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              eBills provides templates and tools for creating business documents. However, we do not
              provide legal, tax, or accounting advice. You are solely responsible for ensuring that
              your invoices comply with applicable GST, income tax, and other regulatory requirements
              in your jurisdiction. We recommend consulting a qualified tax professional for
              compliance matters.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              eBills is provided free of charge and we make reasonable efforts to keep the Service
              available. However, we do not guarantee uninterrupted or error-free operation. The
              Service may be temporarily unavailable due to maintenance, updates, or circumstances
              beyond our control. Since your data is stored in your GitHub repository, it remains
              accessible even if the eBills website is temporarily down.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The eBills name, logo, website design, templates, and code are the intellectual
              property of eBills. You may not copy, modify, distribute, or create derivative works
              based on our Service without express written permission, except for the invoices and
              documents you create for your own business use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, eBills and its creators shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages, including but
              not limited to loss of profits, data, or business opportunities, arising from your use
              of the Service. Our total liability for any claim shall not exceed ₹0 (zero), as the
              Service is provided entirely free of charge.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind,
              either express or implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and non-infringement. We do not
              warrant that the Service will meet your requirements, be accurate, or be error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your access to the Service at our
              discretion if you violate these Terms. You may stop using the Service at any time. Upon
              termination, your data remains in your GitHub repository and is fully accessible to
              you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">12. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms from time to time. Changes will be posted on this page with
              an updated date. Continued use of the Service after changes constitutes acceptance of
              the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">13. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India.
              Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">14. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, contact us at:{" "}
              <a href="mailto:info@ebills.co.in" className="text-primary hover:underline">
                info@ebills.co.in
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} eBills — Free Online Bill & Invoice Generator —{" "}
          <Link href="/" className="underline hover:text-foreground">Home</Link>{" · "}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy</Link>{" · "}
          <Link href="/about" className="underline hover:text-foreground">About</Link>
        </p>
      </footer>
    </div>
  );
}
