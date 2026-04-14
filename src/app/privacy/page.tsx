import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "eBills Privacy Policy — Learn how we handle your data. Your invoices are stored in your own GitHub repository. We collect minimal data and never sell your information.",
  alternates: { canonical: "https://ebills.co.in/privacy" },
};

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: 12 April 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              eBills (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website{" "}
              <strong>ebills.co.in</strong> (the &quot;Service&quot;). This Privacy Policy explains how we
              collect, use, and protect your information when you use our free online billing and
              invoicing platform. We are committed to protecting your privacy and being transparent
              about our data practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
            <h3 className="text-base font-semibold mb-2">2.1 Account Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you sign in using Google or GitHub authentication, we receive your name, email
              address, and profile picture from the authentication provider. We do not collect or
              store your passwords.
            </p>
            <h3 className="text-base font-semibold mb-2">2.2 Invoice & Bill Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              All invoice data, bill content, client details, and business information you enter into
              eBills is stored <strong>exclusively in your own GitHub repository</strong>. We do not
              store, access, or process your invoice data on our servers. You maintain full ownership
              and control of your billing data at all times.
            </p>
            <h3 className="text-base font-semibold mb-2">2.3 Usage Data</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may collect anonymous usage statistics such as pages visited, feature usage
              patterns, and browser information to improve our Service. This data is aggregated and
              cannot be used to identify individual users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>To authenticate your identity and provide access to the Service</li>
              <li>To create and manage your GitHub repository for invoice storage</li>
              <li>To improve and optimize the Service</li>
              <li>To communicate important updates about the Service</li>
              <li>To respond to your inquiries and support requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Data Storage & Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              eBills uses a unique serverless architecture where your billing data is stored in your
              own GitHub repository. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Your data is protected by GitHub&apos;s enterprise-grade security</li>
              <li>You can access, export, or delete your data at any time directly from GitHub</li>
              <li>If eBills ceases to operate, your data remains safely in your GitHub account</li>
              <li>We never have direct access to your stored invoices or business data</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Authentication is handled by Firebase (Google) with industry-standard security
              protocols. Token brokering is processed through Cloudflare Workers with encrypted
              communications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              eBills integrates with the following third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Firebase Authentication</strong> (Google) — for user sign-in</li>
              <li><strong>GitHub</strong> — for data storage in your repository</li>
              <li><strong>Cloudflare Workers</strong> — for secure token brokering</li>
              <li><strong>GitHub Pages</strong> — for hosting the application</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Each of these services has its own privacy policy. We encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              eBills uses essential cookies only for authentication and session management. We do not
              use tracking cookies, advertising cookies, or third-party analytics cookies. No
              personal data is shared with advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do <strong>not</strong> sell, trade, rent, or share your personal information with
              third parties for marketing purposes. We may share information only if required by law
              or legal process, or to protect the rights and safety of eBills and its users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> You can access all your data directly from your GitHub repository</li>
              <li><strong>Deletion:</strong> You can delete your data by removing invoices from your GitHub repository or deleting the repository entirely</li>
              <li><strong>Export:</strong> Your data is stored as standard files in GitHub — export anytime</li>
              <li><strong>Account Deletion:</strong> Contact us to remove your authentication records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              eBills is not intended for use by individuals under the age of 18. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated &quot;Last updated&quot; date. Continued use of the Service after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, contact us at:{" "}
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
          <Link href="/terms" className="underline hover:text-foreground">Terms</Link>{" · "}
          <Link href="/about" className="underline hover:text-foreground">About</Link>
        </p>
      </footer>
    </div>
  );
}
