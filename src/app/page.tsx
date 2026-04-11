"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { LoginCard } from "@/components/auth/LoginCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Zap,
  Shield,
  Download,
  Users,
  Globe,
  ArrowRight,
  IndianRupee,
  ClipboardList,
  Receipt,
  Calculator,
  Truck,
  RotateCcw,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const FEATURES = [
  {
    icon: FileText,
    title: "8+ Bill Templates",
    description: "Standard Invoice, GST Invoice, Receipt, Quotation, and more — all professionally designed.",
  },
  {
    icon: Zap,
    title: "Instant PDF Generation",
    description: "Generate and download high-quality PDFs right from your browser. No server processing needed.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your bills are stored in your own private repository. Only you can access them.",
  },
  {
    icon: Download,
    title: "Always Available",
    description: "Access all your past bills anytime. Re-download, duplicate, or modify as needed.",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Save client details for quick re-use. Never re-type the same information.",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: "Support for 9+ currencies with automatic formatting. Perfect for global businesses.",
  },
];

const TEMPLATES = [
  { icon: FileText, name: "Standard Invoice", desc: "Clean & professional" },
  { icon: IndianRupee, name: "GST Invoice", desc: "India GST compliant" },
  { icon: ClipboardList, name: "Proforma Invoice", desc: "Pre-delivery billing" },
  { icon: Receipt, name: "Payment Receipt", desc: "Payment acknowledgment" },
  { icon: Calculator, name: "Quotation", desc: "Cost estimates" },
  { icon: Truck, name: "Delivery Challan", desc: "Goods shipment" },
  { icon: RotateCcw, name: "Credit Note", desc: "Returns & corrections" },
  { icon: UserCircle, name: "Freelancer Invoice", desc: "For consultants" },
];

const STEPS = [
  { step: "1", title: "Sign In", description: "Quick login with Google or GitHub — no lengthy signup forms." },
  { step: "2", title: "Choose & Fill", description: "Pick a template and fill in your business & client details." },
  { step: "3", title: "Download & Save", description: "Generate PDF instantly. Your bill is auto-saved for later." },
];

export default function HomePage() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  // Auto-close login modal and redirect after successful login
  useEffect(() => {
    if (user && showLogin) {
      setShowLogin(false);
    }
  }, [user, showLogin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            e<span className="text-primary">Bills</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button>
                  Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button onClick={() => setShowLogin(true)}>Get Started</Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">
            100% Free — No Credit Card Required
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Create Professional Bills
            <br />
            <span className="text-primary">In Seconds</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Free online bill generator with 8+ templates. Create invoices, GST
            bills, receipts, quotations — generate PDF instantly and keep all
            your bills organized.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 h-14">
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="text-lg px-8 h-14"
                onClick={() => setShowLogin(true)}
              >
                Start Creating Bills <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Professional Templates for Every Need
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose from our collection of professionally designed templates
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TEMPLATES.map((t) => (
              <Card key={t.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 pb-4">
                  <t.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold text-sm">{t.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Bill Like a Pro
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <Card key={f.title} className="border-0 shadow-none">
                <CardContent className="pt-6">
                  <f.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Three Steps. That&apos;s It.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your First Bill?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join eBills — completely free. No hidden fees, no limitations on
            bill generation.
          </p>
          {user ? (
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 h-14">
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              className="text-lg px-8 h-14"
              onClick={() => setShowLogin(true)}
            >
              Get Started — It&apos;s Free{" "}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} eBills. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:support@ebills.co.in" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLogin(false);
          }}
        >
          <LoginCard />
        </div>
      )}
    </div>
  );
}
