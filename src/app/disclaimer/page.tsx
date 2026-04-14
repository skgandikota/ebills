import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "eBills Disclaimer — Important information about the use of our free online billing and invoicing platform.",
  alternates: { canonical: "https://ebills.co.in/disclaimer" },
};

export default function DisclaimerPage() {
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
        <h1 className="text-3xl font-bold mb-2">Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: 12 April 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. General Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided by eBills at <strong>ebills.co.in</strong> is for general
              informational and business documentation purposes only. All content, templates,
              invoices, and documents generated through our Service are provided &quot;as is&quot; without
              any warranties, express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Not Professional Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              eBills is a tool for generating business documents. It does <strong>not</strong>{" "}
              constitute legal, tax, financial, or accounting advice. The templates and formats
              provided are general in nature and may not meet the specific requirements of your
              jurisdiction, industry, or business situation.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We strongly recommend consulting with a qualified Chartered Accountant (CA), tax
              consultant, or legal professional for matters relating to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>GST compliance and filing requirements</li>
              <li>Income tax implications of invoices and receipts</li>
              <li>E-invoicing mandate compliance</li>
              <li>Export documentation and customs requirements</li>
              <li>HRA exemption eligibility and documentation</li>
              <li>Section 80G donation receipt compliance</li>
              <li>Any other tax or legal matter</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Accuracy of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to keep the information on our website and blog articles accurate and
              up-to-date, we make no representations or warranties about the completeness, accuracy,
              reliability, or suitability of the information. Tax laws, GST rates, and compliance
              requirements change frequently. Information that was accurate at the time of writing
              may become outdated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. User Responsibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You are solely responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>The accuracy and completeness of information entered into invoices</li>
              <li>Ensuring your documents comply with applicable laws and regulations</li>
              <li>Verifying GSTIN numbers, HSN codes, tax rates, and other compliance details</li>
              <li>Maintaining proper records as required by law</li>
              <li>Any consequences arising from the use of documents generated through eBills</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Blog Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our blog articles are educational in nature and intended to provide general guidance on
              billing, invoicing, and related business topics. Blog content should not be treated as
              professional advice. Always verify critical information with official government sources
              (e.g., CBIC, Income Tax Department) or qualified professionals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites or services. We have no control
              over and assume no responsibility for the content, privacy policies, or practices of
              any third-party sites. Visiting those links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              eBills shall not be held liable for any loss, damage, penalty, or consequence arising
              from the use of our Service, templates, or blog content. This includes but is not
              limited to: tax penalties, ITC rejection, GST notices, customs delays, or any other
              adverse outcome related to documents generated using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Disclaimer, contact us at:{" "}
              <a href="mailto:info@ebills.co.in" className="text-primary hover:underline">
                info@ebills.co.in
              </a>
            </p>
          </section>
        </div>
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
