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
  Check,
  Paintbrush,
  Moon,
  Smartphone,
  Lock,
  Clock,
  Layers,
  Home,
  ShoppingBag,
  RefreshCw,
  ShoppingCart,
  Wallet,
  Heart,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

/* ─── Animated Hero Demo ─── */
function HeroAnimation() {
  const [step, setStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 7 steps: 0=blank, 1=logo drops, 2=fields fill, 3=items fill, 4=pdf shrink, 5=email sent, 6=downloaded
  useEffect(() => {
    const DURATIONS = [800, 1000, 1200, 1000, 1000, 1200, 2000]; // ms per step
    function advance() {
      setStep((s) => {
        const next = (s + 1) % 7;
        timerRef.current = setTimeout(advance, DURATIONS[next]);
        return next;
      });
    }
    timerRef.current = setTimeout(advance, DURATIONS[0]);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto" aria-hidden="true">
      {/* Glow background */}
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-2xl" />

      <div className="relative bg-background border rounded-2xl shadow-2xl overflow-hidden">
        {/* Mock title bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/60 border-b">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-[10px] text-muted-foreground font-mono">ebills.co.in — Create Invoice</span>
        </div>

        <div className="p-5 sm:p-6 space-y-4 min-h-[280px]">
          {/* Step 1 — Logo drops in */}
          <div className="flex items-center justify-between">
            <div
              className={`w-12 h-12 rounded-lg bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center transition-all duration-500 ${
                step >= 1 ? "opacity-100 translate-y-0 border-solid border-primary bg-primary/20" : "opacity-40 -translate-y-4"
              }`}
            >
              {step >= 1 ? (
                <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              ) : (
                <span className="text-[8px] text-muted-foreground">Logo</span>
              )}
            </div>
            <div className={`text-right transition-all duration-700 ${step >= 2 ? "opacity-100" : "opacity-30"}`}>
              <div className="text-[10px] text-muted-foreground">Invoice #</div>
              <div className={`text-sm font-bold font-mono ${step >= 2 ? "text-foreground" : "text-transparent"}`}>
                <span className={step >= 2 ? "inline" : "hidden"}>INV-00042</span>
                {step < 2 && <span className="bg-muted rounded w-16 h-4 inline-block" />}
              </div>
            </div>
          </div>

          {/* Step 2 — Business & client fields fill */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className={`h-2.5 rounded-full transition-all duration-500 ${step >= 2 ? "bg-primary/60 w-3/4" : "bg-muted w-1/2"}`} />
              <div className={`h-2 rounded-full transition-all duration-700 delay-100 ${step >= 2 ? "bg-muted-foreground/30 w-full" : "bg-muted w-2/3"}`} />
              <div className={`h-2 rounded-full transition-all duration-700 delay-200 ${step >= 2 ? "bg-muted-foreground/20 w-5/6" : "bg-muted w-1/2"}`} />
            </div>
            <div className="space-y-1.5">
              <div className={`h-2.5 rounded-full transition-all duration-600 delay-300 ${step >= 2 ? "bg-blue-400/60 w-2/3" : "bg-muted w-1/3"}`} />
              <div className={`h-2 rounded-full transition-all duration-700 delay-400 ${step >= 2 ? "bg-muted-foreground/30 w-full" : "bg-muted w-2/3"}`} />
              <div className={`h-2 rounded-full transition-all duration-700 delay-500 ${step >= 2 ? "bg-muted-foreground/20 w-4/5" : "bg-muted w-1/2"}`} />
            </div>
          </div>

          {/* Step 3 — Items table fills */}
          <div className={`border rounded-lg overflow-hidden transition-all duration-500 ${step >= 3 ? "opacity-100" : "opacity-40"}`}>
            <div className="bg-muted/50 px-3 py-1.5 flex gap-2">
              <div className="h-2 rounded bg-muted-foreground/40 w-1/3" />
              <div className="h-2 rounded bg-muted-foreground/40 w-1/6" />
              <div className="h-2 rounded bg-muted-foreground/40 w-1/6" />
              <div className="h-2 rounded bg-muted-foreground/40 w-1/4" />
            </div>
            {[0, 1, 2].map((row) => (
              <div
                key={row}
                className={`px-3 py-1.5 flex gap-2 border-t transition-all duration-500`}
                style={{ transitionDelay: `${row * 150}ms`, opacity: step >= 3 ? 1 : 0.3 }}
              >
                <div className={`h-2 rounded w-1/3 ${step >= 3 ? "bg-foreground/20" : "bg-muted"}`} />
                <div className={`h-2 rounded w-1/6 ${step >= 3 ? "bg-foreground/15" : "bg-muted"}`} />
                <div className={`h-2 rounded w-1/6 ${step >= 3 ? "bg-foreground/15" : "bg-muted"}`} />
                <div className={`h-2 rounded w-1/4 ${step >= 3 ? "bg-primary/40 font-bold" : "bg-muted"}`} />
              </div>
            ))}
            <div className={`px-3 py-2 border-t bg-primary/5 flex justify-end gap-2 transition-all duration-500 ${step >= 3 ? "opacity-100" : "opacity-30"}`}>
              <span className="text-[9px] font-semibold text-muted-foreground">Total:</span>
              <div className={`h-2.5 rounded w-16 ${step >= 3 ? "bg-primary/50" : "bg-muted"}`} />
            </div>
          </div>

          {/* Step 4-6 — Result actions */}
          <div className={`flex items-center justify-center gap-6 pt-2 transition-all duration-700 ${step >= 4 ? "opacity-100" : "opacity-0 translate-y-4"}`}>
            {/* PDF generated */}
            <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${step >= 4 ? "scale-100" : "scale-50"}`}>
              <div className={`w-10 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${step >= 4 ? "bg-red-500/15 text-red-500" : "bg-muted text-muted-foreground"}`}>
                <svg className="w-5 h-6" viewBox="0 0 20 24" fill="currentColor">
                  <path d="M0 2C0 .9.9 0 2 0h10l6 6v16c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2zm12 0v6h6L12 2zM4 14h10v1.5H4V14zm0 3h7v1.5H4V17z"/>
                </svg>
              </div>
              <span className="text-[8px] font-medium text-muted-foreground">PDF Ready</span>
              {step >= 4 && (
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center animate-bounce">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            {/* Email sent */}
            <div className={`flex flex-col items-center gap-1 transition-all duration-500 delay-300 ${step >= 5 ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
              </div>
              <span className="text-[8px] font-medium text-muted-foreground">Emailed</span>
              {step >= 5 && (
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center animate-bounce" style={{ animationDelay: "200ms" }}>
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            {/* Downloaded */}
            <div className={`flex flex-col items-center gap-1 transition-all duration-500 delay-500 ${step >= 6 ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
              <div className="w-10 h-10 rounded-lg bg-green-500/15 text-green-500 flex items-center justify-center">
                <Download className="w-5 h-5 animate-bounce" />
              </div>
              <span className="text-[8px] font-medium text-muted-foreground">Downloaded</span>
              {step >= 6 && (
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center animate-bounce" style={{ animationDelay: "400ms" }}>
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Typing cursor blinking on step 2-3 */}
        {(step === 2 || step === 3) && (
          <div className="absolute bottom-20 right-8 w-0.5 h-4 bg-primary animate-pulse" />
        )}
      </div>

      {/* Step labels */}
      <div className="flex justify-center gap-1.5 mt-4">
        {["Logo", "Details", "Items", "PDF", "Email", "Save", "Done"].map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === step ? "bg-primary scale-125" : i < step ? "bg-primary/40" : "bg-muted"
            }`} />
            <span className={`text-[7px] transition-colors duration-300 ${i === step ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Template data with SEO-rich descriptions ─── */
const TEMPLATES = [
  {
    id: "standard-invoice",
    icon: FileText,
    name: "Standard Invoice",
    shortDesc: "Clean & professional",
    color: "#1e293b",
    longDesc:
      "A clean, professional invoice template suitable for any business. Includes business details, client info, itemized line items, taxes, discounts, and total calculation. Perfect for product sales, service billing, and general invoicing.",
    useCases: ["Product sales", "Service billing", "B2B invoicing", "Freelance work"],
  },
  {
    id: "gst-invoice",
    icon: IndianRupee,
    name: "GST Invoice",
    shortDesc: "India GST compliant",
    color: "#7c3aed",
    longDesc:
      "Fully GST-compliant tax invoice with GSTIN fields, HSN/SAC codes, CGST/SGST/IGST breakdowns, and amount in words. Mandatory for registered Indian businesses under the Goods & Services Tax Act.",
    useCases: ["Indian businesses", "GST filing", "Tax compliance", "B2B & B2C sales"],
  },
  {
    id: "proforma-invoice",
    icon: ClipboardList,
    name: "Proforma Invoice",
    shortDesc: "Pre-delivery billing",
    color: "#0f766e",
    longDesc:
      "Issue a proforma invoice before delivering goods or services. Serves as a declaration of intent, helping buyers arrange payments and import licenses. Not a demand for payment but a commitment to deliver.",
    useCases: ["International trade", "Pre-payment requests", "Customs declarations", "Advance billing"],
  },
  {
    id: "receipt",
    icon: Receipt,
    name: "Payment Receipt",
    shortDesc: "Payment acknowledgment",
    color: "#059669",
    longDesc:
      "Generate professional payment receipts to acknowledge payments received. Includes payment method, date, amount, and payer details. Essential for cash transactions, rent payments, and service fee collections.",
    useCases: ["Cash payments", "Rent receipts", "Service fee confirmation", "Donation receipts"],
  },
  {
    id: "quotation",
    icon: Calculator,
    name: "Quotation / Estimate",
    shortDesc: "Cost estimates & proposals",
    color: "#d97706",
    longDesc:
      "Create detailed quotations and cost estimates for potential clients. List services, products, rates, and terms. Convert accepted quotes to invoices with one click. Great for contractors, agencies, and consultants.",
    useCases: ["Project proposals", "Cost estimates", "Service quotes", "Tender responses"],
  },
  {
    id: "delivery-challan",
    icon: Truck,
    name: "Delivery Challan",
    shortDesc: "Goods shipment document",
    color: "#dc2626",
    longDesc:
      "A delivery challan accompanies goods in transit when no sale is involved — for job work, samples, exhibitions, or branch transfers. Includes consignee details, transport info, and itemized goods list.",
    useCases: ["Job work delivery", "Sample shipments", "Branch transfers", "Exhibition goods"],
  },
  {
    id: "credit-note",
    icon: RotateCcw,
    name: "Credit Note",
    shortDesc: "Returns & adjustments",
    color: "#e11d48",
    longDesc:
      "Issue credit notes for returned goods, billing errors, or post-sale discounts. References the original invoice and clearly shows the credited amount. Required under GST for tax adjustments.",
    useCases: ["Sales returns", "Billing corrections", "GST adjustments", "Post-sale discounts"],
  },
  {
    id: "freelancer-invoice",
    icon: UserCircle,
    name: "Freelancer Invoice",
    shortDesc: "For consultants & freelancers",
    color: "#2563eb",
    longDesc:
      "Designed for freelancers, consultants, and independent contractors. Features project summary, hourly rate display, milestone tracking, and a clean modern layout that looks great on any project.",
    useCases: ["Consulting fees", "Hourly billing", "Project milestones", "Contract work"],
  },
  {
    id: "rent-receipt",
    icon: Home,
    name: "Rent Receipt",
    shortDesc: "Landlord & tenant",
    color: "#854d0e",
    longDesc:
      "Generate rent receipts for monthly payments. Includes tenant name, property address, rental period, landlord PAN, and amount in words. Essential for HRA tax exemption claims in India.",
    useCases: ["Monthly rent", "HRA claims", "Landlord records", "Tenant proof"],
  },
  {
    id: "shopping-receipt",
    icon: ShoppingBag,
    name: "Shopping Receipt",
    shortDesc: "Retail & store billing",
    color: "#c026d3",
    longDesc:
      "Retail shopping receipt for stores, supermarkets, and shops. Includes itemized list with quantities, prices, tax, and total. Clean, compact format that looks like a real point-of-sale receipt.",
    useCases: ["Retail stores", "Supermarkets", "Boutiques", "Online shops"],
  },
  {
    id: "subscription-invoice",
    icon: RefreshCw,
    name: "Subscription Invoice",
    shortDesc: "Recurring billing",
    color: "#4f46e5",
    longDesc:
      "Invoice for recurring subscriptions, SaaS products, gym memberships, and service plans. Shows billing cycle, period start/end dates, plan details, and next payment date.",
    useCases: ["SaaS billing", "Gym memberships", "Service plans", "Recurring fees"],
  },
  {
    id: "purchase-order",
    icon: ShoppingCart,
    name: "Purchase Order",
    shortDesc: "Procurement & buying",
    color: "#0369a1",
    longDesc:
      "Official purchase order for procurement departments. Includes vendor details, delivery date, payment terms, shipping address, itemized goods list, and approval signatures.",
    useCases: ["Corporate procurement", "Vendor orders", "Supply chain", "Bulk buying"],
  },
  {
    id: "expense-report",
    icon: Wallet,
    name: "Expense Report",
    shortDesc: "Employee reimbursement",
    color: "#9333ea",
    longDesc:
      "Employee expense claim form for reimbursement. List all expenses with categories, dates, and amounts. Suitable for travel claims, office supplies, client entertainment, and business meals.",
    useCases: ["Travel claims", "Office expenses", "Client meals", "Reimbursement"],
  },
  {
    id: "donation-receipt",
    icon: Heart,
    name: "Donation Receipt",
    shortDesc: "Charities & nonprofits",
    color: "#be123c",
    longDesc:
      "Tax-deductible donation receipt for charities, NGOs, and nonprofits. Includes donor details, purpose, 80G registration number, and amount in words. Valid for Indian tax deductions.",
    useCases: ["Charity donations", "NGO funding", "80G tax deduction", "Fundraisers"],
  },
  {
    id: "service-invoice",
    icon: Wrench,
    name: "Service Invoice",
    shortDesc: "Service providers",
    color: "#ea580c",
    longDesc:
      "Professional service invoice for plumbers, electricians, mechanics, agencies, and consultants. Includes service description, labor hours, parts/materials, and total with tax.",
    useCases: ["Plumbing", "Electrical work", "Repair services", "Agency billing"],
  },
  {
    id: "export-invoice",
    icon: Globe,
    name: "Export Invoice",
    shortDesc: "International trade",
    color: "#065f46",
    longDesc:
      "International export invoice with customs details. Includes port of loading/discharge, country of origin/destination, IEC code, HSN codes, incoterms, and IGST. Essential for cross-border trade.",
    useCases: ["International exports", "Customs clearance", "Cross-border trade", "Foreign buyers"],
  },
];

const FEATURES = [
  { icon: FileText, title: "16 Professional Templates", desc: "Invoice, GST Invoice, Receipt, Quotation, Proforma, Delivery Challan, Credit Note, Freelancer, Rent Receipt, Shopping Receipt, Subscription, Purchase Order, Expense Report, Donation Receipt, Service Invoice, Export Invoice — plus custom templates." },
  { icon: Zap, title: "Instant PDF Download", desc: "Generate high-quality A4 PDFs directly in your browser. No server upload needed. Your data stays private." },
  { icon: Shield, title: "Secure Cloud Storage", desc: "Every bill is auto-saved to your private, encrypted cloud repository. Access from any device, anytime." },
  { icon: Users, title: "Client Address Book", desc: "Save client details once, reuse everywhere. Smart search and one-click autofill across all your bills." },
  { icon: Paintbrush, title: "Drag & Drop Builder", desc: "Build custom bill layouts by dragging sections. Choose colors, reorder blocks, add custom text. Your brand, your way." },
  { icon: Globe, title: "Multi-Currency Support", desc: "USD, EUR, GBP, INR, AUD, CAD, JPY, SGD, AED — 9+ currencies with automatic locale formatting." },
  { icon: Moon, title: "Dark Mode", desc: "Work comfortably day or night. System-aware dark mode that respects your OS preferences." },
  { icon: Smartphone, title: "Mobile Friendly & PWA", desc: "Works on phone, tablet, or desktop. Install as an app for quick access — even works offline." },
  { icon: Lock, title: "100% Free, No Limits", desc: "No hidden fees, no paid plans, no bill limits. Create as many bills as you need. Forever free." },
  { icon: Download, title: "Duplicate & Reuse", desc: "Clone any existing bill with one click. Perfect for recurring invoices or similar clients." },
  { icon: Clock, title: "Auto Bill Numbering", desc: "Smart per-template auto-numbering: INV-00001, GST-00001, RCT-00001. Never duplicate a number." },
  { icon: Layers, title: "Logo & Branding", desc: "Upload your business logo. It appears on every bill. Drag-drop or click to upload — up to 500KB." },
];

const STEPS = [
  { step: "1", title: "Sign In Free", desc: "One-click login with Google or GitHub. No forms, no credit card, no email verification." },
  { step: "2", title: "Pick a Template & Fill", desc: "Choose from 16 templates or build your own. Fill business, client, items — live preview updates instantly." },
  { step: "3", title: "Download, Save & Share", desc: "Download a professional A4 PDF. Your bill is auto-saved. Duplicate, edit, or re-download anytime." },
];

const FAQ = [
  { q: "Is eBills really free?", a: "Yes, 100% free. No hidden charges, no premium tiers, no bill limits. We believe billing tools should be accessible to everyone." },
  { q: "What bill types can I create?", a: "Standard Invoices, GST Tax Invoices (India-compliant), Proforma Invoices, Payment Receipts, Quotations/Estimates, Delivery Challans, Credit Notes, and Freelancer Invoices." },
  { q: "Is my data secure?", a: "Absolutely. Your bills are stored in your own private cloud repository. We use OAuth authentication — we never see or store your password." },
  { q: "Can I use it on mobile?", a: "Yes! eBills works on any device — phone, tablet, or desktop. You can even install it as a PWA (Progressive Web App) for quick access." },
  { q: "Does it support GST billing?", a: "Yes. Our GST Invoice template includes GSTIN fields, HSN/SAC codes, CGST/SGST/IGST tax breakdowns, and amount in words — fully compliant with Indian GST requirements." },
  { q: "Can I add my logo?", a: "Yes. Upload your business logo (up to 500KB) and it will appear on all your bills. Supports JPG, PNG, and SVG." },
];

/* ─── Structured Data for SEO ─── */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "eBills",
        url: "https://ebills.co.in",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        description:
          "Free online bill generator and invoice maker. Create GST invoices, receipts, quotations, delivery challans, credit notes & freelancer invoices. Download PDF instantly.",
        featureList: [
          "Invoice Generator",
          "GST Invoice",
          "Payment Receipt",
          "Quotation Maker",
          "Rent Receipt Generator",
          "Shopping Receipt",
          "Subscription Invoice",
          "Purchase Order",
          "Expense Report",
          "Donation Receipt",
          "Service Invoice",
          "Export Invoice",
          "PDF Download",
          "Multi-Currency",
          "Client Management",
          "Custom Template Builder",
        ],
      },
      {
        "@type": "Organization",
        name: "eBills",
        url: "https://ebills.co.in",
        logo: "https://ebills.co.in/icons/icon-192.svg",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://ebills.co.in" },
          { "@type": "ListItem", position: 2, name: "Dashboard", item: "https://ebills.co.in/dashboard" },
          { "@type": "ListItem", position: 3, name: "Create Bill", item: "https://ebills.co.in/dashboard/bills/new" },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── Fake company logos for social proof marquee ─── */
const FAKE_COMPANIES = [
  { name: "NovaTech Solutions", abbr: "NT", color: "#2563eb" },
  { name: "GreenLeaf Exports", abbr: "GL", color: "#059669" },
  { name: "UrbanCraft Studios", abbr: "UC", color: "#d97706" },
  { name: "PrimeEdge Consulting", abbr: "PE", color: "#7c3aed" },
  { name: "SwiftLogix", abbr: "SL", color: "#dc2626" },
  { name: "Dharma Enterprises", abbr: "DE", color: "#0f766e" },
  { name: "BlueRiver Finance", abbr: "BR", color: "#1d4ed8" },
  { name: "Sampark Media", abbr: "SM", color: "#c026d3" },
  { name: "Pinnacle Traders", abbr: "PT", color: "#ea580c" },
  { name: "CloudNest Systems", abbr: "CN", color: "#4f46e5" },
  { name: "Aura Retail Co.", abbr: "AR", color: "#be123c" },
  { name: "VeloCity Freight", abbr: "VF", color: "#854d0e" },
  { name: "Nexus Infotech", abbr: "NI", color: "#0369a1" },
  { name: "SilverOak Interiors", abbr: "SO", color: "#9333ea" },
  { name: "Kunal Electricals", abbr: "KE", color: "#065f46" },
  { name: "ZenithWare Labs", abbr: "ZW", color: "#e11d48" },
];

/* ─── Fake testimonials ─── */
const TESTIMONIALS = [
  {
    quote: "eBills completely changed how we send invoices. We used to spend hours on Excel — now it takes 2 minutes. The GST template is spot on for our Indian clients.",
    name: "Priya Malhotra",
    initials: "PM",
    role: "Founder",
    company: "GreenLeaf Exports",
    color: "#059669",
  },
  {
    quote: "As a freelancer, I needed something simple and free. eBills nails it — I pick a template, fill in the details, and download a professional PDF. My clients love it.",
    name: "Arjun Desai",
    initials: "AD",
    role: "Freelance Designer",
    company: "Self-employed",
    color: "#2563eb",
  },
  {
    quote: "We generate over 500 bills a month and eBills handles it beautifully. The auto-numbering and client address book save us so much time. Best part — it's completely free!",
    name: "Sneha Reddy",
    initials: "SR",
    role: "Operations Lead",
    company: "Pinnacle Traders",
    color: "#ea580c",
  },
  {
    quote: "The rent receipt generator is perfect for our property management business. Tenants get professional receipts and we have a record of every payment. Brilliant tool.",
    name: "Vikram Joshi",
    initials: "VJ",
    role: "Director",
    company: "SilverOak Interiors",
    color: "#9333ea",
  },
  {
    quote: "I run a small repair shop and the service invoice template is exactly what I needed. Logo upload, itemized parts list, tax — everything is there. No more handwritten bills!",
    name: "Ravi Kumar",
    initials: "RK",
    role: "Owner",
    company: "Kunal Electricals",
    color: "#065f46",
  },
  {
    quote: "Our NGO needed donation receipts with 80G details for our donors. eBills made it effortless. We switched from paid software and haven't looked back.",
    name: "Meera Iyer",
    initials: "MI",
    role: "Program Manager",
    company: "Dharma Enterprises",
    color: "#0f766e",
  },
];

export default function HomePage() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(0);

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

  const cta = user ? (
    <Link href="/dashboard">
      <Button size="lg" className="text-lg px-8 h-14">
        Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  ) : (
    <Button size="lg" className="text-lg px-8 h-14" onClick={() => setShowLogin(true)}>
      Start Creating Bills — Free <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );

  const t = TEMPLATES[activeTemplate];

  return (
    <div className="min-h-screen">
      <JsonLd />

      {/* ── Nav ── */}
      <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            e<span className="text-primary">Bills</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <Button size="sm">Dashboard <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button>
              </Link>
            ) : (
              <Button size="sm" onClick={() => setShowLogin(true)}>Get Started Free</Button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative py-12 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Trust badges + Animation — shows first on mobile */}
            <div className="order-1 lg:order-2">
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> No signup fees</span>
                <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> Unlimited bills</span>
                <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> Instant PDF</span>
                <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> GST compliant</span>
                <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> Works offline</span>
              </div>
              <HeroAnimation />
            </div>

            {/* Text content — shows second on mobile */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
                100% Free — No Credit Card — No Limits
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Create Professional
                <br />
                <span className="text-primary">Bills &amp; Invoices</span>
                <br />
                In Seconds
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                Free online bill generator with <strong>16 templates</strong> — Invoice, GST Invoice,
                Receipt, Quotation, Rent Receipt, Shopping Receipt, Subscription Invoice,
                Purchase Order, Expense Report, Donation Receipt &amp; more.
              </p>
              <p className="text-base text-muted-foreground mb-8">
                Generate PDF instantly. Save all bills securely. Client address book. Multi-currency.
                Drag-and-drop template builder. Dark mode. Works on mobile.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                {cta}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Counter ── */}
      <section className="py-12 border-y bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,50,000+", label: "Bills Generated" },
              { value: "48,000+", label: "Active Users" },
              { value: "12,000+", label: "Companies" },
              { value: "9+", label: "Currencies Supported" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted By — Scrolling Logos ── */}
      <section className="py-10 overflow-hidden bg-muted/30">
        <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
          Trusted by businesses across India &amp; worldwide
        </p>
        <div className="relative">
          <div className="flex animate-marquee gap-12 items-center whitespace-nowrap">
            {[...FAKE_COMPANIES, ...FAKE_COMPANIES].map((c, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c.color }}>
                  {c.abbr}
                </div>
                <span className="text-sm font-medium text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg">Thousands of businesses trust eBills for their billing needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: t.color }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Templates — Interactive Tabs ── */}
      <section id="templates" className="py-16 lg:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Professional Bill Templates for Every Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose a template below to see details. Every template generates a print-ready A4 PDF with your branding.
            </p>
          </div>

          {/* Template Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {TEMPLATES.map((tmpl, i) => (
              <button
                key={tmpl.id}
                onClick={() => setActiveTemplate(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  i === activeTemplate
                    ? "text-white shadow-lg scale-105"
                    : "bg-background text-foreground border hover:shadow-md"
                }`}
                style={i === activeTemplate ? { backgroundColor: tmpl.color } : {}}
              >
                <tmpl.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tmpl.name}</span>
                <span className="sm:hidden">{tmpl.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Template Detail */}
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="h-1.5" style={{ backgroundColor: t.color }} />
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="p-3 rounded-xl text-white shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  <t.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{t.name}</h3>
                  <p className="text-muted-foreground mt-1">{t.longDesc}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Best For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {t.useCases.map((uc) => (
                    <Badge key={uc} variant="secondary" className="text-xs">
                      {uc}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                {user ? (
                  <Link href={`/dashboard/bills/new?template=${t.id}`}>
                    <Button style={{ backgroundColor: t.color }}>
                      Use This Template <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button style={{ backgroundColor: t.color }} onClick={() => setShowLogin(true)}>
                    Get Started with {t.name.split(" ")[0]} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO: hidden text for all templates (crawlable but not visually redundant) */}
          <div className="sr-only">
            <h3>All Bill Templates Available</h3>
            {TEMPLATES.map((tmpl) => (
              <div key={tmpl.id}>
                <h4>{tmpl.name}</h4>
                <p>{tmpl.longDesc}</p>
                <p>Use cases: {tmpl.useCases.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Everything You Need to Bill Like a Pro
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From invoice generation to client management — all features, all free.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <Card key={f.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <f.icon className="h-9 w-9 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-16 lg:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Three Steps. That&apos;s It.
            </h2>
            <p className="text-muted-foreground text-lg">
              Create your first professional bill in under 2 minutes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                  {s.step}
                </div>
                <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">{cta}</div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {FAQ.map((f, i) => (
              <div key={i} className="border-b pb-5">
                <h3 className="font-semibold text-lg mb-1">{f.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Create Your First Bill?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of freelancers, small businesses, and consultants who
            create professional bills with eBills. It&apos;s completely free — always.
          </p>
          {user ? (
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 h-14">
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button size="lg" variant="secondary" className="text-lg px-8 h-14" onClick={() => setShowLogin(true)}>
              Get Started — It&apos;s Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </section>

      {/* ── SEO-rich keyword section ── */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-lg mb-4">Create Bills Online — Free Invoice Generator</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            eBills is a <strong>free online bill generator</strong> and <strong>invoice maker</strong> that lets you create
            professional bills, invoices, and receipts in seconds. Whether you need a <strong>GST invoice</strong>,{" "}
            <strong>payment receipt</strong>, <strong>quotation</strong>, <strong>proforma invoice</strong>,{" "}
            <strong>delivery challan</strong>, <strong>credit note</strong>, or <strong>freelancer invoice</strong> —
            eBills has the perfect template. Create <strong>rent receipts</strong> for HRA claims,
            <strong>shopping receipts</strong> for retail stores, <strong>subscription invoices</strong> for SaaS,
            <strong>purchase orders</strong>, <strong>expense reports</strong>, <strong>donation receipts</strong> for 80G,
            <strong>service invoices</strong>, and <strong>export invoices</strong> for international trade.
            <strong>Download PDF</strong> instantly with your business logo and branding.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Perfect for <strong>small businesses</strong>, <strong>freelancers</strong>, <strong>consultants</strong>,{" "}
            <strong>startups</strong>, <strong>shop owners</strong>, and <strong>service providers</strong> across India and worldwide.
            Supports <strong>multi-currency billing</strong> (INR, USD, EUR, GBP, AUD, CAD, JPY, SGD, AED) with automatic formatting.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Features: <strong>bill generator</strong>, <strong>invoice template free</strong>,{" "}
            <strong>bill format download</strong>, <strong>receipt maker online</strong>,{" "}
            <strong>GST bill software free</strong>, <strong>online billing software</strong>,{" "}
            <strong>create invoice online free</strong>, <strong>professional invoice generator</strong>,{" "}
            <strong>rent receipt generator</strong>, <strong>rent receipt for income tax</strong>,{" "}
            <strong>shopping bill maker</strong>, <strong>subscription billing software</strong>,{" "}
            <strong>purchase order template</strong>, <strong>expense report template</strong>,{" "}
            <strong>donation receipt 80G</strong>, <strong>service invoice generator</strong>,{" "}
            <strong>export invoice format</strong>, <strong>billing app</strong>, <strong>estimate maker</strong>,{" "}
            <strong>quotation generator free</strong>.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">
                e<span className="text-primary">Bills</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Free online bill generator. Create invoices, receipts, quotations &amp; more with professional templates.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Templates</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Standard Invoice</li>
                <li>GST Tax Invoice</li>
                <li>Payment Receipt</li>
                <li>Quotation / Estimate</li>
                <li>Rent Receipt</li>
                <li>Shopping Receipt</li>
                <li>Subscription Invoice</li>
                <li>Purchase Order</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">More Templates</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>Proforma Invoice</li>
                <li>Delivery Challan</li>
                <li>Credit Note</li>
                <li>Freelancer Invoice</li>
                <li>Expense Report</li>
                <li>Donation Receipt</li>
                <li>Service Invoice</li>
                <li>Export Invoice</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Links</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li><a href="#templates" className="hover:text-foreground">Templates</a></li>
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground">How It Works</a></li>
                <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
                <li><a href="mailto:support@ebills.co.in" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} eBills. All rights reserved. Made in India.
            </p>
            <p className="text-xs text-muted-foreground">
              Free bill generator | Invoice maker | Receipt generator | GST billing software
            </p>
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
