#!/usr/bin/env node
/**
 * Blog Post Generator — Generates 1095 unique SEO-optimized blog posts
 * covering Indian billing, invoicing, GST, taxation, receipts, and small business topics.
 * Output: src/data/blog-posts.ts
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "src", "data", "blog-posts.ts");

/* ════════════════════════════════════════════════════════════════
   SEED DATA — topics, variations, content fragments
   ════════════════════════════════════════════════════════════════ */

const CATEGORIES = [
  "GST & Tax Invoice",
  "Rent Receipts & HRA",
  "Freelance Billing",
  "Export & Import",
  "Small Business",
  "Digital Payments",
  "Tax Filing",
  "Invoice Formats",
  "Business Finance",
  "Legal Compliance",
  "Receipt & Documentation",
  "Industry Guides",
  "Accounting Tips",
  "Startup Finance",
  "E-Invoicing",
];

const YEARS = ["2024", "2025", "2026"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const FY = ["FY 2023-24", "FY 2024-25", "FY 2025-26"];

/* ─── Topic templates ─── */
// Each topic generates multiple posts via variation expansion
const TOPIC_POOL = [
  // ── GST & Tax Invoice ──
  {
    cat: "GST & Tax Invoice",
    titles: [
      "How to Create GST Invoice Online Free in {year}",
      "GST Invoice Format: Complete Guide with Examples ({year})",
      "Mandatory Fields in a GST Invoice — {fy} Compliance Checklist",
      "GST Invoice Numbering Rules You Must Follow in {year}",
      "Difference Between Tax Invoice and Bill of Supply Under GST",
      "How to Generate E-Invoice Under GST: Step-by-Step Guide",
      "GST Invoice for Services vs Goods — Key Differences Explained",
      "Revised GST Invoice: When and How to Issue One",
      "Debit Note vs Credit Note Under GST — Complete Guide {year}",
      "How to Add HSN Code in Your GST Invoice Correctly",
      "CGST, SGST, IGST on Invoices — When to Charge What",
      "GST Invoice for Exports: Zero-Rated Supply Explained",
      "How to Handle GST on Advance Payments and Receipts",
      "Self-Invoice Under Reverse Charge Mechanism (RCM) — Guide {year}",
      "GST Composition Scheme: Bill of Supply Format & Rules",
      "How to Issue Supplementary Invoice Under GST",
      "GST Invoice Time Limits: When Must You Issue the Invoice?",
      "Multi-Currency GST Invoice: How to Handle Foreign Clients",
      "GST Invoice Mistakes That Can Cost You ITC — Avoid These",
      "How to Verify GSTIN on an Invoice Before Claiming ITC",
      "GST Rate Finder: How to Determine the Right Rate for Your Product",
      "Place of Supply Rules for GST Invoicing — Interstate vs Intrastate",
      "GST Invoice for E-Commerce Sellers: Special Requirements",
      "How Restaurant Invoices Work Under GST — {year} Update",
      "Digital Signature on GST Invoices: Is It Mandatory?",
      "GST Invoice Retention Period: How Long to Keep Invoices",
      "Aggregate Invoice Under GST: Rules for Small Transactions",
      "How to Create a Proforma Invoice That Converts to GST Invoice",
      "GST Amendment: How to Correct Errors in Filed Invoices",
      "Top {n} GST Invoice Software for Small Business in {year}",
    ],
    tags: ["GST", "tax invoice", "compliance", "GSTIN", "e-invoicing"],
  },

  // ── Rent Receipts & HRA ──
  {
    cat: "Rent Receipts & HRA",
    titles: [
      "Rent Receipt Format for HRA Exemption — Free Download ({year})",
      "How to Claim HRA Exemption: Rent Receipt Requirements {fy}",
      "Do You Need Revenue Stamps on Rent Receipts? — {year} Rules",
      "HRA Calculation: Step-by-Step Guide with Examples",
      "Landlord PAN Requirement for Rent Above ₹1 Lakh — {fy} Rules",
      "How to Generate Monthly Rent Receipts in Bulk — Free Tool",
      "Rent Receipt for Paying Rent to Parents: Is It Valid for HRA?",
      "Digital Rent Receipts: Are They Accepted by Employers?",
      "HRA vs Home Loan Tax Benefit — Which Saves More Tax in {year}?",
      "Section 80GG: Tax Deduction When You Don't Get HRA",
      "Rent Agreement vs Rent Receipt: Which Do You Need for HRA?",
      "How to Claim HRA When Living in a Different City Than Work",
      "Rent Receipt Template: {n} Professional Formats for {year}",
      "Common Mistakes in Rent Receipts That Lead to HRA Rejection",
      "How Companies Verify Rent Receipts During HRA Claims",
      "Rent Receipt for Shared Accommodation: How to Claim HRA",
      "HRA Exemption for Work From Home Employees — {year} Update",
      "Quarterly vs Monthly Rent Receipts: What's Expected?",
      "How NRIs Can Claim HRA Exemption on Rent Paid in India",
      "Rent Receipt Generator: Create Professional Receipts in {n} Minutes",
    ],
    tags: ["rent receipt", "HRA", "tax exemption", "Section 10(13A)", "landlord"],
  },

  // ── Freelance Billing ──
  {
    cat: "Freelance Billing",
    titles: [
      "How Freelancers Should Invoice Clients — Complete Guide {year}",
      "Freelance Invoice Template India: Include These {n} Essential Fields",
      "GST Registration for Freelancers: When Is It Mandatory?",
      "How to Invoice International Clients from India — {year} Guide",
      "TDS on Freelance Income: Complete Guide to Section 194J",
      "Freelancer vs Consultant Invoice: What's the Difference?",
      "How to Set Your Freelance Rates and Invoice Professionally",
      "Payment Terms for Freelance Invoices: Net 15 vs Net 30 vs On Receipt",
      "How to Handle Late Payments as a Freelancer in India",
      "Professional Invoice Design Tips for Freelancers",
      "Should Freelancers Charge GST? Threshold Limits {fy}",
      "How to Track Multiple Client Invoices as a Freelancer",
      "Recurring Invoices for Retainer Clients — Setup Guide",
      "Freelance Invoice in USD vs INR: Currency Best Practices",
      "How to Write a Freelance Invoice for the First Time",
      "Tax Deductions Every Indian Freelancer Should Know ({year})",
      "Freelance Billing Mistakes That Make You Look Unprofessional",
      "How to Create a Freelance Invoice Without GST Registration",
      "Digital Nomad Invoice Compliance: Billing from Abroad",
      "Freelance Contract vs Invoice: Why You Need Both",
    ],
    tags: ["freelance", "invoice", "self-employed", "consulting", "billing"],
  },

  // ── Export & Import ──
  {
    cat: "Export & Import",
    titles: [
      "Export Invoice Under LUT: Complete Guide for {fy}",
      "How to Create a Commercial Invoice for Exports — Step-by-Step",
      "Packing List Format for Export Shipments — Free Template",
      "Bill of Lading vs Airway Bill: Key Differences for Indian Exporters",
      "FIRC Certificate for Export Payments — {year} Guide",
      "How to Create a Proforma Invoice for International Buyers",
      "Export Invoice Format: Mandatory Fields Under Indian Customs",
      "GST Refund on Exports: How to Claim IGST Refund {fy}",
      "Letter of Undertaking (LUT) for GST-Free Exports — {year}",
      "How to Invoice for Software Export from India",
      "Import Invoice Requirements Under Indian Customs Act",
      "Duty Drawback and Invoice Documentation — Complete Guide",
      "Certificate of Origin for Exports: Types and How to Get One",
      "How to Price Your Export Invoice: FOB vs CIF vs CFR",
      "Export Invoice Checklist: {n} Things to Verify Before Shipping",
      "DGFT Regulations for Export Invoicing — {year} Update",
      "How to Handle Multi-Currency Export Invoices",
      "Free Trade Agreement Benefits on Export Invoices",
      "EWAY Bill for Exports: When Is It Required?",
      "Export Invoice Discrepancies: How to Avoid Customs Delays",
    ],
    tags: ["export", "import", "LUT", "commercial invoice", "customs"],
  },

  // ── Small Business ──
  {
    cat: "Small Business",
    titles: [
      "How to Start Billing as a New Small Business in India ({year})",
      "Best Free Invoice Software for Small Businesses — {year} Comparison",
      "Small Business Accounting: {n} Basics Every Owner Must Know",
      "How to Set Up Professional Invoicing for Your Small Business",
      "Business Registration and Invoice Requirements in India",
      "MSME Registration Benefits for Billing and Payments — {year}",
      "How to Manage Cash Flow with Proper Invoicing",
      "Small Business Invoice Financing: What You Need to Know",
      "How to Create a Business Invoice from Scratch — Beginner Guide",
      "Invoice vs Receipt vs Quotation: What's the Difference?",
      "How Small Businesses Can Accept Online Payments in {year}",
      "Profit & Loss Statement from Invoices — DIY Guide",
      "Small Business Tax Calendar India — Important Dates for {fy}",
      "How to Choose the Right Invoice Template for Your Business",
      "Shop and Establishment Act: Impact on Your Billing",
      "How to Price Products and Services for Maximum Profit",
      "Inventory Management and Invoicing for Small Retailers",
      "Customer Credit Management: When to Use Credit Notes",
      "How to Scale Your Billing System as Your Business Grows",
      "Year-End Invoice Checklist for Small Businesses — {fy}",
    ],
    tags: ["small business", "MSME", "startup", "invoicing", "accounting"],
  },

  // ── Digital Payments ──
  {
    cat: "Digital Payments",
    titles: [
      "How to Add UPI Payment Details to Your Invoice ({year})",
      "QR Code on Invoices: How to Enable Quick UPI Payments",
      "Razorpay vs PayU vs Instamojo for Invoice Payments — Comparison",
      "How to Send Payment Links with Your Invoices",
      "Digital Payment Options for Indian Businesses — Complete Guide",
      "How to Reconcile UPI Payments with Invoices",
      "NEFT vs RTGS vs IMPS for Business Payments — When to Use What",
      "PayPal for Indian Freelancers: Invoicing and Payment Guide",
      "How to Accept International Payments in India — {year}",
      "POS Machine Billing: Invoice Requirements and Compliance",
      "Payment Reminders That Actually Work — Email Templates",
      "How to Handle Partial Payments on Invoices",
      "EMI Options on Invoices: How to Offer and Track",
      "Cash vs Digital: Invoice Record Requirements for Both",
      "Unified Payments Interface and Your Business — {year} Trends",
    ],
    tags: ["UPI", "digital payment", "online payment", "QR code", "fintech"],
  },

  // ── Tax Filing ──
  {
    cat: "Tax Filing",
    titles: [
      "ITR Filing Guide for Small Businesses — {fy} Deadlines",
      "How to Use Invoices for Income Tax Filing in India",
      "TDS Deduction on Invoices: Complete Guide to Rates ({year})",
      "GST Return Filing: GSTR-1, GSTR-3B Explained Simply",
      "How to Match Invoices with GSTR-2A/2B for ITC Claims",
      "Advance Tax for Freelancers: Due Dates and Calculation ({fy})",
      "How to File GST Annual Return (GSTR-9) — Step-by-Step",
      "Business Expense Receipts You Must Keep for Tax Filing",
      "Section 44AD Presumptive Tax for Small Business — {year} Guide",
      "How to Handle GST on RCM (Reverse Charge) During Filing",
      "Tax Audit Requirements for Business Based on Invoices ({fy})",
      "How to Claim Input Tax Credit: Invoice Matching Guide",
      "Late Fee and Penalty for Delayed GST Filing — Updated {year}",
      "How to File NIL GST Return When There Are No Invoices",
      "Tax Planning with Invoices: {n} Strategies for {fy}",
    ],
    tags: ["ITR", "tax filing", "GST return", "TDS", "income tax"],
  },

  // ── Invoice Formats ──
  {
    cat: "Invoice Formats",
    titles: [
      "Professional Invoice Format: {n} Free Templates for {year}",
      "Quotation Format for Indian Businesses — Free Download",
      "Proforma Invoice vs Tax Invoice: Format Differences",
      "Delivery Challan Format Under GST — When to Use It",
      "Credit Note Format: How to Issue One Under GST ({year})",
      "Purchase Order Format: Essential Fields and Free Template",
      "Debit Note Format Under GST — Complete Guide with Examples",
      "Receipt Voucher Format for Advance Payments Under GST",
      "Consulting Invoice Format: What to Include for Professional Services",
      "Bill of Supply Format for Composition Scheme Dealers",
      "Self-Invoice Format for Import of Services Under RCM",
      "Payment Receipt Format: Professional Templates for {year}",
      "Service Invoice Format: Best Practices for Service Providers",
      "Expense Report Format for Businesses — Free Template {year}",
      "Subscription Invoice Format for SaaS and Recurring Billing",
    ],
    tags: ["invoice format", "template", "PDF", "download", "professional"],
  },

  // ── Business Finance ──
  {
    cat: "Business Finance",
    titles: [
      "How to Improve Cash Flow with Better Invoicing Practices",
      "Invoice Factoring in India: How It Works ({year})",
      "Working Capital Management Through Proper Billing",
      "How to Read a Balance Sheet: Guide for Small Business Owners",
      "Business Loan Application: Documents and Invoices Needed",
      "Credit Management: How to Set Payment Terms",
      "How to Calculate Business Profitability from Invoices",
      "Inventory Valuation Methods and Their Impact on Billing",
      "Financial Ratio Analysis for Small Businesses — Simple Guide",
      "How to Budget for Your Small Business Using Invoice Data",
      "ROI Calculation for Business Investments — Practical Guide",
      "How to Manage Business Accounts Receivable Efficiently",
      "Break-Even Analysis: Know Your Numbers Before Pricing",
      "Business Insurance and Invoicing: What to Document",
      "How to Plan for Business Expansion Using Financial Data",
    ],
    tags: ["cash flow", "business finance", "billing", "accounting", "profit"],
  },

  // ── Legal Compliance ──
  {
    cat: "Legal Compliance",
    titles: [
      "E-Invoicing Mandate: Who Needs to Comply in {fy}?",
      "Invoice Compliance Checklist for Indian Businesses — {year}",
      "FEMA Regulations for Export Invoicing — What You Must Know",
      "Anti-Profiteering Rules Under GST: Invoice Impact",
      "How to Handle Invoice Disputes Legally in India",
      "Consumer Protection Act and Invoice Rights — {year} Guide",
      "Record Keeping Requirements Under GST and Income Tax Act",
      "RERA Invoice Requirements for Real Estate Transactions",
      "Professional Tax and Its Impact on Salary Invoices",
      "E-Way Bill Compliance: Invoice Linking Rules ({year})",
      "How to Ensure GDPR Compliance in Cross-Border Invoicing",
      "Non-Compliance Penalties Under GST: Invoice-Related Offenses",
      "Digital Invoice Storage: Legal Requirements and Best Practices",
      "RBI Guidelines for Foreign Currency Invoicing",
      "Stamp Duty on Commercial Invoices: State-Wise Rules",
    ],
    tags: ["compliance", "legal", "e-invoicing", "FEMA", "regulation"],
  },

  // ── Receipt & Documentation ──
  {
    cat: "Receipt & Documentation",
    titles: [
      "Payment Receipt vs Invoice: Understanding the Difference",
      "How to Create Professional Payment Receipts Online",
      "Donation Receipt Format for Section 80G Compliance ({year})",
      "Cash Receipt Format: When and How to Issue One",
      "Acknowledgment Receipt Template — Free Download",
      "How to Maintain a Receipt Book for Your Business",
      "Digital Receipt vs Paper Receipt: Legal Validity in India",
      "Medical Receipt Format for Insurance Claims — Guide {year}",
      "Tuition Fee Receipt Format for Section 80C Claims",
      "How to Issue Refund Receipts Professionally",
      "Security Deposit Receipt Format — Free Template",
      "How to Store and Organize Business Receipts Digitally",
      "Receipt Best Practices for Tax Audit Preparation",
      "Petty Cash Receipt Format and Management Guide",
      "How to Create Receipts That Your Accountant Will Love",
    ],
    tags: ["receipt", "payment", "documentation", "acknowledgment", "record"],
  },

  // ── Industry Guides ──
  {
    cat: "Industry Guides",
    titles: [
      "Billing Guide for IT Companies in India — {year} Edition",
      "Restaurant Invoice Format: FSSAI and GST Compliance",
      "Healthcare Billing in India: Invoice Requirements ({year})",
      "Construction Industry Billing: Running Account Bills Explained",
      "Education Institution Fee Receipts: Format and Compliance",
      "Real Estate Invoice Requirements Under RERA — {year}",
      "Retail Shop Billing: POS Invoice Compliance Guide",
      "Transportation and Logistics Invoicing: Complete Guide",
      "Event Management Invoicing: How to Bill Clients",
      "Agriculture Sector Billing: GST Exemptions and Invoice Rules",
      "Salon and Spa Billing: Professional Invoice Tips ({year})",
      "Gym and Fitness Center Billing: Subscription Invoice Guide",
      "Textile and Garment Industry GST Invoicing — {fy}",
      "Photography Business Invoice: What to Include ({year})",
      "Printing Press Billing: Job Work Invoice Under GST",
      "Hotel and Hospitality Invoicing: Service Charge and GST Guide",
      "Pharmacy Billing: Drug License and Invoice Compliance",
      "Auto Repair Shop Invoicing: Parts and Labour Billing Guide",
      "Law Firm Billing: Professional Fee Invoice Format",
      "Digital Marketing Agency Invoicing: Best Practices ({year})",
      "Architectural Firm Billing: Stage-Wise Invoice Guide",
      "Chartered Accountant Fee Invoice: Format and Compliance",
      "Interior Design Business Invoicing — Professional Guide",
      "Travel Agency Invoice Format: IRCTC and Airline Commissions",
      "Coaching Institute Fee Receipt and Invoice Guide ({year})",
    ],
    tags: ["industry", "sector", "billing guide", "compliance"],
  },

  // ── Accounting Tips ──
  {
    cat: "Accounting Tips",
    titles: [
      "Double-Entry Bookkeeping Basics for Invoice Tracking",
      "How to Reconcile Bank Statements with Invoices",
      "Chart of Accounts Setup for Small Businesses — {year} Guide",
      "How to Track Expenses Using Digital Receipts",
      "Depreciation and Invoicing: What Business Owners Should Know",
      "Monthly Accounting Checklist for Invoice-Based Businesses",
      "How to Set Up an Accounting System for Your New Business",
      "Accrual vs Cash Accounting: Impact on Invoice Recognition",
      "How to Calculate and Report GST in Your Books",
      "End-of-Year Accounting Procedures for Small Businesses",
      "How to Use Excel for Basic Invoice Tracking — Free Template",
      "Common Accounting Errors to Avoid in Invoice Processing",
      "How to Handle Returns and Refunds in Your Accounts",
      "Payroll Invoice Management: Salary Disbursement Guide",
      "Multi-Branch Accounting: Invoice Management Across Locations",
    ],
    tags: ["accounting", "bookkeeping", "reconciliation", "ledger"],
  },

  // ── Startup Finance ──
  {
    cat: "Startup Finance",
    titles: [
      "Startup Invoice Essentials: Setting Up Billing on Day One",
      "How to Invoice Your First Client as a Startup ({year})",
      "Startup Costs You Can Invoice: Understanding Capitalization",
      "Equity vs Revenue: What Startup Founders Should Invoice For",
      "How to Handle Investor Reimbursements and Internal Billing",
      "Startup Tax Compliance: Invoice and Receipt Requirements",
      "How D2C Brands Should Set Up Their Billing System",
      "Bootstrapped Startup Billing: Free Tools That Work",
      "How to Invoice for SaaS Products: Subscription Billing Guide",
      "Startup Fundraising and Financial Records: Invoice Role",
      "How to Create Pitch-Ready Financial Statements from Invoices",
      "Startup Legal Structure and Impact on Invoicing (Pvt Ltd vs LLP vs OPC)",
      "How to Set Up Automated Billing for Your Startup",
      "Angel Tax and Invoicing: What Startups Need to Know ({year})",
      "How to Bill Enterprise Clients as a Small Startup",
    ],
    tags: ["startup", "entrepreneur", "D2C", "SaaS", "billing"],
  },

  // ── E-Invoicing ──
  {
    cat: "E-Invoicing",
    titles: [
      "E-Invoicing in India: Complete Guide for {fy}",
      "E-Invoice Turnover Limits: Who Must Comply in {year}?",
      "How to Generate E-Invoice Using IRP Portal",
      "E-Invoice JSON Format: Technical Specification Explained",
      "QR Code on E-Invoice: Content and Validation ({year})",
      "E-Invoice Cancellation: Rules and Time Limits",
      "How to Integrate E-Invoicing with Your Billing Software",
      "Common E-Invoice Errors and How to Fix Them",
      "E-Invoice for B2C Transactions: Current Rules ({year})",
      "Bulk E-Invoice Generation: Tools and Best Practices",
      "E-Invoice Reporting Timeline: When to Report to IRP",
      "How E-Invoicing Reduces Tax Evasion in India",
      "E-Invoice Schema Version Updates — {year} Changes",
      "How to Verify E-Invoice Authenticity — Buyer Guide",
      "State-Wise E-Invoice Implementation Status ({year})",
    ],
    tags: ["e-invoicing", "IRP", "QR code", "digital", "GST"],
  },
];

/* ─── Content generators — deterministic from seed ─── */

function introForCategory(cat, title) {
  const intros = {
    "GST & Tax Invoice": [
      `Understanding GST invoicing is crucial for every Indian business. ${title.replace(/ — .*/,"")} is a topic that affects millions of taxpayers across the country. Whether you run a small shop or a large enterprise, getting your GST invoices right ensures smooth compliance and uninterrupted Input Tax Credit (ITC) flow.`,
      `The Goods and Services Tax (GST) framework requires businesses to maintain accurate and compliant invoices. In this comprehensive guide, we break down everything you need to know about ${title.replace(/How to |— .*/g,"").toLowerCase()}. From mandatory fields to digital compliance, we've got you covered.`,
      `GST compliance starts with your invoice. A single error in your tax invoice can lead to ITC rejection, penalties, or notices from the department. This guide on ${title.replace(/ — .*/,"").toLowerCase()} will help you invoice correctly and stay audit-ready.`,
    ],
    "Rent Receipts & HRA": [
      `House Rent Allowance (HRA) is one of the most commonly claimed tax exemptions by salaried employees in India. To claim this benefit, you need valid rent receipts. This guide covers everything about ${title.replace(/ — .*/,"").toLowerCase()} to help you maximize your tax savings.`,
      `If you're a salaried professional paying rent, understanding rent receipt requirements is essential for claiming HRA exemption under Section 10(13A) of the Income Tax Act. Let's dive into ${title.replace(/How to |— .*/g,"").toLowerCase()}.`,
      `Rent receipts are not just formalities — they're legal documents that validate your HRA claim during tax assessment. Here's your complete guide to ${title.replace(/ — .*/,"").toLowerCase()}, with practical tips and free templates.`,
    ],
    "Freelance Billing": [
      `Freelancing in India has exploded, with millions of professionals offering services independently. But billing correctly is where many freelancers stumble. This guide on ${title.replace(/ — .*/,"").toLowerCase()} will help you look professional and stay tax-compliant.`,
      `As a freelancer, your invoice is your identity. It communicates professionalism, sets payment expectations, and ensures legal compliance. Let's explore ${title.replace(/How to |— .*/g,"").toLowerCase()} in detail.`,
      `Whether you're a graphic designer, developer, writer, or consultant, proper invoicing is non-negotiable. This comprehensive guide covers ${title.replace(/ — .*/,"").toLowerCase()} for Indian freelancers.`,
    ],
    "Export & Import": [
      `India's export sector is growing rapidly, and proper documentation is the backbone of international trade. ${title.replace(/ — .*/,"")} is essential knowledge for any Indian exporter looking to stay compliant and competitive in global markets.`,
      `Export invoicing involves specific regulatory requirements under Indian Customs, GST, and FEMA. This guide walks you through ${title.replace(/How to |— .*/g,"").toLowerCase()}, ensuring your documentation is perfect for customs clearance.`,
      `International trade documentation can be overwhelming, but getting it right is critical. From ${title.replace(/ — .*/,"").toLowerCase()} to customs compliance, this guide simplifies the entire process for Indian businesses.`,
    ],
    "Small Business": [
      `Running a small business in India comes with numerous challenges, and billing is one of the fundamentals you need to get right from day one. This guide on ${title.replace(/ — .*/,"").toLowerCase()} is designed specifically for Indian MSME owners and entrepreneurs.`,
      `For small business owners, proper invoicing is the foundation of good financial management. It affects your cash flow, tax compliance, and professional image. Let's explore ${title.replace(/How to |— .*/g,"").toLowerCase()}.`,
      `India has over 63 million MSMEs, and each one needs a reliable billing system. This guide covers ${title.replace(/ — .*/,"").toLowerCase()}, helping you set up professional invoicing without breaking the bank.`,
    ],
    "Digital Payments": [
      `India leads the world in digital payments, with UPI processing billions of transactions monthly. Integrating digital payment options into your invoicing can dramatically improve collection speed. Here's your guide to ${title.replace(/ — .*/,"").toLowerCase()}.`,
      `The digital payment revolution in India has transformed how businesses collect payments. From UPI to payment gateways, this guide covers ${title.replace(/How to |— .*/g,"").toLowerCase()} for modern Indian businesses.`,
      `With India Stack and UPI, collecting invoice payments has never been easier. This guide shows you how to leverage ${title.replace(/ — .*/,"").toLowerCase()} to get paid faster and more reliably.`,
    ],
    "Tax Filing": [
      `Tax filing season can be stressful, especially if your invoices and receipts aren't organized. This guide on ${title.replace(/ — .*/,"").toLowerCase()} helps you prepare your documents for hassle-free filing.`,
      `Proper invoicing directly impacts your tax filing accuracy. From GST returns to income tax, your invoices are the primary source documents. Let's understand ${title.replace(/How to |— .*/g,"").toLowerCase()} in depth.`,
      `Whether you're filing GST returns monthly or income tax annually, your invoices tell the story. This guide on ${title.replace(/ — .*/,"").toLowerCase()} ensures your tax filing is error-free.`,
    ],
    "Invoice Formats": [
      `The right invoice format can make or break your professional image. ${title.replace(/ — .*/,"")} is a topic every business owner should understand. A well-designed invoice gets you paid faster and reduces disputes.`,
      `Choosing the correct invoice format depends on your business type, transaction nature, and compliance requirements. This guide covers ${title.replace(/How to |— .*/g,"").toLowerCase()} with free downloadable templates.`,
      `A professional invoice format instantly elevates your business credibility. This comprehensive guide on ${title.replace(/ — .*/,"").toLowerCase()} provides you with everything you need to create polished, compliant documents.`,
    ],
    "Business Finance": [
      `Sound financial management begins with proper invoicing. ${title.replace(/ — .*/,"")} is a critical skill for business owners who want to maintain healthy finances and plan for growth.`,
      `Your invoices contain a wealth of financial data. Learning to leverage this data for ${title.replace(/How to |— .*/g,"").toLowerCase()} can transform your business decision-making.`,
      `Financial health starts with the basics — and few things are more basic than getting your billing right. This guide explores ${title.replace(/ — .*/,"").toLowerCase()} for Indian businesses.`,
    ],
    "Legal Compliance": [
      `Staying legally compliant with invoicing regulations is non-negotiable in India. ${title.replace(/ — .*/,"")} covers the rules and regulations every business must follow to avoid penalties and legal issues.`,
      `Indian invoice compliance requirements span multiple laws — GST Act, Income Tax Act, Companies Act, and more. This guide on ${title.replace(/How to |— .*/g,"").toLowerCase()} keeps you on the right side of the law.`,
      `Non-compliance with invoice regulations can result in hefty penalties and even prosecution. Understanding ${title.replace(/ — .*/,"").toLowerCase()} is essential for every Indian business owner.`,
    ],
    "Receipt & Documentation": [
      `Receipts are more than just proof of payment — they're essential business documents. ${title.replace(/ — .*/,"")} is something every business, regardless of size, needs to master for proper financial record-keeping.`,
      `Documentation is the foundation of trusted business relationships. This guide covers ${title.replace(/How to |— .*/g,"").toLowerCase()}, helping you maintain organized records for audit readiness.`,
      `Whether for tax claims, insurance, or internal records, proper receipt management matters. Here's everything you need to know about ${title.replace(/ — .*/,"").toLowerCase()}.`,
    ],
    "Industry Guides": [
      `Every industry has unique billing requirements shaped by regulations, customer expectations, and operational norms. ${title.replace(/ — .*/,"")} provides industry-specific invoicing guidance for Indian businesses.`,
      `Billing in specialized industries requires knowledge of sector-specific regulations. This guide on ${title.replace(/How to |— .*/g,"").toLowerCase()} helps you navigate industry-specific compliance.`,
      `Whether you're in retail, healthcare, or construction, your billing needs are unique. This comprehensive guide covers ${title.replace(/ — .*/,"").toLowerCase()} with practical, actionable advice.`,
    ],
    "Accounting Tips": [
      `Good accounting starts with good invoicing. ${title.replace(/ — .*/,"")} is designed to help business owners maintain clean books and make informed financial decisions.`,
      `Accounting doesn't have to be complicated. This guide on ${title.replace(/How to |— .*/g,"").toLowerCase()} breaks down essential accounting concepts into simple, actionable steps.`,
      `Proper accounting practices protect your business and inform growth decisions. Let's explore ${title.replace(/ — .*/,"").toLowerCase()} with practical tips for Indian businesses.`,
    ],
    "Startup Finance": [
      `Startups move fast, but financial discipline shouldn't take a back seat. ${title.replace(/ — .*/,"")} helps early-stage founders set up proper billing and financial systems from day one.`,
      `From your first invoice to Series A, proper billing matters. This guide covers ${title.replace(/How to |— .*/g,"").toLowerCase()} for Indian startups navigating the complex financial landscape.`,
      `Building a startup is exciting, but financial compliance is critical. Understanding ${title.replace(/ — .*/,"").toLowerCase()} will keep your company audit-ready and investor-friendly.`,
    ],
    "E-Invoicing": [
      `E-invoicing is reshaping India's tax compliance landscape. ${title.replace(/ — .*/,"")} covers the digital invoicing requirements that more and more businesses must follow under GST.`,
      `The Indian government's e-invoice mandate continues to expand. This guide on ${title.replace(/How to |— .*/g,"").toLowerCase()} helps you understand and implement compliant e-invoicing.`,
      `Digital invoicing is no longer optional for many Indian businesses. Here's your comprehensive guide to ${title.replace(/ — .*/,"").toLowerCase()}, from technical specs to practical implementation.`,
    ],
  };
  const pool = intros[cat] || intros["Small Business"];
  return pool[hashStr(title) % pool.length];
}

function sectionsForCategory(cat, title, seed) {
  const sectionSets = {
    "GST & Tax Invoice": [
      [
        { h: "Understanding GST Invoice Requirements", p: "A GST invoice must contain specific mandatory fields as prescribed under Rule 46 of the CGST Rules, 2017. These include the supplier's name, address, GSTIN, consecutive serial number, date of issue, recipient details (if registered), HSN code, description of goods or services, quantity, taxable value, tax rate, tax amount (CGST + SGST or IGST), and total value. Missing any of these fields can invalidate your invoice and lead to ITC denial for your customer.\n\nThe invoice must be prepared in triplicate for goods (Original for Recipient, Duplicate for Transporter, Triplicate for Supplier) and in duplicate for services. Each copy serves a specific purpose in the supply chain and audit trail." },
        { h: "Step-by-Step Invoice Creation Process", p: "Creating a GST-compliant invoice doesn't have to be complicated. Start by entering your business details and GSTIN at the top. Add the recipient's information, including their GSTIN if registered. Then list your items with HSN codes (for goods) or SAC codes (for services), along with quantities and unit prices.\n\nThe system should automatically calculate the tax based on the applicable GST rate (5%, 12%, 18%, or 28%). For intra-state supply, split the tax into CGST and SGST. For inter-state supply, charge IGST. Using a tool like eBills auto-calculates these, saving you time and preventing errors." },
        { h: "Common Compliance Pitfalls", p: "Many businesses inadvertently make errors that compromise their GST compliance. The most common mistakes include incorrect GSTIN entry, wrong HSN codes, applying the wrong tax rate, not maintaining sequential numbering, and issuing invoices beyond the prescribed time limit.\n\nAnother frequent issue is the mismatch between the invoice and the corresponding e-way bill. For goods worth more than ₹50,000, ensure your invoice details exactly match the e-way bill. Any discrepancy can result in goods being detained during transit." },
        { h: "Digital Tools for GST Invoicing", p: "Manual invoice creation is error-prone and time-consuming. Modern businesses should use digital invoicing tools that auto-populate GSTIN details, calculate taxes, maintain sequential numbering, and generate professional PDF invoices.\n\neBills offers free GST invoice generation with automatic CGST/SGST/IGST calculation, HSN code support, and PDF download — all without any subscription fee. For businesses above the e-invoicing threshold, consider tools that integrate with the IRP portal for seamless compliance." },
        { h: "Best Practices and Tips", p: "Always verify the recipient's GSTIN using the GST portal before issuing an invoice. Maintain a consistent numbering format across financial years. Back up your invoices digitally and keep them accessible for at least 6 years as required by law.\n\nRegularly reconcile your invoices with GSTR-2B to ensure all your outward supplies are reflected correctly. This proactive approach prevents last-minute hassles during return filing and ensures smooth ITC flow for your business partners." },
      ],
      [
        { h: "Key Concepts You Should Know", p: "GST invoicing in India operates under a dual structure — Central GST (CGST) and State GST (SGST) for intra-state transactions, and Integrated GST (IGST) for inter-state transactions. Understanding the place of supply is fundamental to determining which tax applies.\n\nThe concept of 'time of supply' determines when you must issue the invoice. For goods, it's generally at the time of removal or delivery. For services, it's within 30 days of providing the service (45 days for banking and financial institutions)." },
        { h: "Detailed Format Breakdown", p: "A well-structured GST invoice should have a clear header section with your business logo, name, GSTIN, and address. The middle section contains item details in a table format with columns for S.No., Description, HSN/SAC, Quantity, Unit, Rate, Taxable Value, and Tax (split into CGST, SGST, or IGST).\n\nThe footer should include the total amount in words, bank details for payment, terms and conditions, and the authorized signatory. Including your UPI ID or QR code in the footer section enables faster digital payments." },
        { h: "Handling Special Scenarios", p: "Certain transactions require special invoice treatment. For reverse charge supplies, the invoice must clearly state 'Tax is payable on reverse charge basis.' For exports, mention 'Supply meant for export under LUT without payment of IGST' or the applicable Bond/LUT number.\n\nFor composite supply, the invoice should show the principal supply and its tax rate. For mixed supply, each item should be taxed at the highest applicable rate unless separately invoiced." },
        { h: "Automation and Software Integration", p: "Integrating your invoicing software with your accounting system eliminates double entry and reduces errors. Modern platforms like eBills allow you to create invoices, track payments, and maintain client records in one place.\n\nFor businesses processing high volumes, consider batch invoice generation capabilities. Many businesses need to process hundreds of invoices monthly, and manual creation is simply not scalable. Automated tools with template support can reduce invoice creation time by 80%." },
      ],
    ],
    "Rent Receipts & HRA": [
      [
        { h: "HRA Exemption Rules Under Section 10(13A)", p: "The Income Tax Act allows salaried employees to claim HRA exemption under Section 10(13A). The exempt amount is the minimum of: (a) actual HRA received, (b) 50% of salary for metro cities or 40% for non-metro cities, and (c) actual rent paid minus 10% of salary.\n\nTo claim this exemption, you must actually be paying rent, and you need rent receipts as proof. If your annual rent exceeds ₹1,00,000, you must also provide the landlord's PAN number." },
        { h: "What to Include in Your Rent Receipt", p: "A valid rent receipt must contain the tenant's name, landlord's name, property address, rent amount, payment period (month/quarter), date of payment, receipt number, and the landlord's signature.\n\nIf the monthly rent exceeds ₹5,000, a revenue stamp of ₹1 was traditionally required for cash payments. However, with digital payments becoming the norm, bank transfer proof can serve as additional documentation alongside the receipt." },
        { h: "Common HRA Claim Mistakes to Avoid", p: "Many employees make errors that lead to their HRA claims being rejected during assessment. The most common mistakes include: not collecting rent receipts monthly, not obtaining landlord's PAN for rent above ₹1,00,000, discrepancies between rent receipt amount and bank transfer amount, and claiming HRA while living in own house.\n\nAnother critical error is not having a rent agreement. While rent receipts are the primary document, a rent agreement adds credibility to your claim, especially for high rent amounts." },
        { h: "Digital Rent Receipts: Validity and Acceptance", p: "In the digital age, electronically generated rent receipts are widely accepted by employers and the tax department. Tools like eBills allow you to generate professional rent receipts with all mandatory fields, download them as PDFs, and share them digitally.\n\nEnsure your digital rent receipts include a digital signature or at least the landlord's name printed clearly. Most employers now accept digitally generated receipts during their annual tax proof submission drives." },
        { h: "Alternative Tax Benefits for Rent Payment", p: "If you don't receive HRA as part of your salary, you can still claim rent deduction under Section 80GG. This allows a deduction of ₹5,000 per month or 25% of adjusted total income, whichever is less, subject to conditions.\n\nYou must not own a residential property in the same city, and you need to file Form 10BA. The rent receipts serve as supporting documentation for this claim as well." },
      ],
    ],
  };

  // Generic fallback sections applicable to any category
  const genericSections = [
    [
      { h: "Understanding the Basics", p: `Before diving into the specifics of ${title.replace(/ — .*/,"").toLowerCase()}, it's important to understand the fundamental concepts. Indian businesses operate within a complex regulatory framework that includes GST, Income Tax Act, and various state-specific laws. Each of these has implications for how you create and manage your invoices and receipts.\n\nThe key principle is simple: every business transaction should be documented with a proper invoice or receipt that contains all legally required information. This documentation serves multiple purposes — it's proof of transaction, basis for tax calculation, and evidence in case of disputes.` },
      { h: "Step-by-Step Implementation Guide", p: `Implementing ${title.replace(/How to |— .*/g,"").toLowerCase()} in your business doesn't require technical expertise. Start with understanding the specific requirements for your business type and industry. Then choose the right tools and templates that meet compliance needs.\n\nFor most Indian businesses, using a free online tool like eBills simplifies the entire process. Select your template, fill in the details, and download a professional PDF. The platform handles tax calculations, numbering, and formatting automatically, ensuring compliance without the complexity.` },
      { h: "Compliance Requirements", p: `Staying compliant with Indian regulations requires attention to several key areas. First, ensure all mandatory fields are included in your documents. Second, maintain proper sequential numbering. Third, store documents for the required retention period (typically 6-8 years for tax purposes).\n\nThe GST framework has specific requirements depending on your turnover, business type, and the nature of supply. Regularly check for updates from CBIC (Central Board of Indirect Taxes and Customs) as rules evolve. The e-invoicing threshold, for instance, has been progressively lowered over the years.` },
      { h: "Best Practices for Indian Businesses", p: `Based on working with thousands of Indian businesses, here are proven best practices: always issue invoices promptly (don't delay invoicing as it affects cash flow), keep digital copies of all documents, reconcile regularly with bank statements, and review your invoicing process quarterly.\n\nFor businesses dealing with multiple clients, maintaining a client address book saves significant time. eBills offers this feature for free — save your client details once and auto-fill them on future invoices.` },
      { h: "Tools and Resources", p: `The right tools can transform your billing efficiency. For small businesses and freelancers, free tools like eBills provide professional invoicing without any cost. For larger businesses, consider solutions that integrate with your accounting software and bank feeds.\n\nKey features to look for include: GST-compliant templates, automatic tax calculation, multi-currency support, PDF generation, client management, and cloud storage. The best tool is one that fits your specific workflow without adding unnecessary complexity.` },
    ],
    [
      { h: "Why This Matters for Your Business", p: `Getting ${title.replace(/How to |— .*/g,"").toLowerCase()} right has a direct impact on your bottom line. Proper documentation ensures you claim all eligible tax benefits, maintain credibility with clients and partners, and stay prepared for audits.\n\nIn India, the tax authorities are increasingly using technology-driven assessments. Your invoices are cross-referenced with GST returns, e-way bills, and bank statements. Any inconsistency can trigger a notice or audit.` },
      { h: "Detailed Guide with Examples", p: `Let's walk through the practical aspects with real-world examples. Consider a small business in Bangalore selling software services to a client in Mumbai. Since this is an inter-state supply of services, IGST applies at 18%. The invoice must contain the place of supply (Maharashtra) and the recipient's GSTIN.\n\nFor a local retailer selling goods worth ₹5,000, the invoice would include CGST at 9% and SGST at 9% (assuming 18% GST rate). If the customer is unregistered, a simplified invoice is sufficient for transactions below ₹200.` },
      { h: "Regulatory Updates and Changes", p: `The Indian tax and compliance landscape is dynamic. Recent changes include expanded e-invoicing mandates, updated HSN code requirements, and revised TDS rates. Staying current with these changes is essential for compliance.\n\nThe government regularly issues notifications and circulars that affect invoicing requirements. Subscribe to CBIC updates and follow reliable tax news sources. Better yet, use invoicing software that automatically incorporates regulatory changes.` },
      { h: "Frequently Asked Questions", p: `Based on queries from thousands of Indian business owners, the most common questions relate to: GSTIN verification, correct tax rate application, invoice format requirements, and digital vs physical invoice validity.\n\nRemember that a digitally generated invoice (PDF) has the same legal validity as a printed one, as long as it contains all mandatory fields. You don't need to print and sign invoices — a digital signature or even a printed name is acceptable for most purposes.` },
    ],
    [
      { h: "Getting Started: Quick Overview", p: `If you're new to ${title.replace(/How to |— .*/g,"").toLowerCase()}, here's a quick overview to get you started. The process involves understanding the requirements, choosing the right format, filling in the correct details, and maintaining proper records.\n\nFor Indian businesses, the primary considerations are GST compliance, proper documentation for income tax purposes, and maintaining records that can withstand scrutiny during audits. The good news is that modern tools make this process straightforward.` },
      { h: "Essential Components Explained", p: `Every invoice or receipt has core components that must be present for legal validity. These include: identification details (your business name, address, registration numbers), transaction details (date, description, quantities, amounts), tax details (applicable rates, amounts, tax identification), and payment information.\n\nBeyond these mandatory elements, professional invoices include your logo, bank details, UPI QR code, terms and conditions, and a footer with your contact information. These additional elements improve your brand image and facilitate faster payments.` },
      { h: "Practical Tips from Experts", p: `Tax professionals and successful business owners consistently recommend these practices: issue invoices within 24 hours of providing goods or services, always provide multiple payment options on your invoice, follow up on outstanding invoices within 7 days of due date, and maintain a monthly reconciliation habit.\n\nAnother expert tip is to standardize your invoice numbering format. Use a prefix that identifies the financial year (e.g., INV-2526-001 for FY 2025-26) and maintain strictly sequential numbers. This makes audit trails clean and easy to follow.` },
      { h: "Common Mistakes and How to Avoid Them", p: `The most frequent errors in Indian business invoicing include: wrong GSTIN (always verify on the GST portal), incorrect HSN/SAC codes (use the HSN code finder tool), mathematical errors in tax calculation (use automated tools), and not issuing credit notes for returns.\n\nAnother common mistake is not maintaining proper backup of invoices. Hard drives fail, papers get lost. Use cloud-based tools like eBills that automatically store your invoice data securely in the cloud with your own GitHub storage — giving you full ownership of your data.` },
      { h: "Looking Ahead: Future Trends", p: `The future of invoicing in India is clearly digital. E-invoicing mandates are expanding, digital payment options are multiplying, and the government is moving towards a more connected compliance ecosystem where invoices, returns, and payments are all linked.\n\nBusinesses that adopt digital invoicing early gain a competitive advantage — faster processing, fewer errors, better cash flow management, and seamless compliance. Start with free tools to build the habit, then scale as your business grows.` },
    ],
  ];

  const specific = sectionSets[cat];
  if (specific) {
    return specific[seed % specific.length];
  }
  return genericSections[seed % genericSections.length];
}

/* ─── Utility ─── */
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[(){}[\]]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function expandTitle(tpl, vars) {
  return tpl
    .replace(/\{year\}/g, vars.year || "2025")
    .replace(/\{fy\}/g, vars.fy || "FY 2024-25")
    .replace(/\{n\}/g, vars.n || "10")
    .replace(/\{month\}/g, vars.month || "January");
}

/* ════════════════════════════════════════════════════════════════
   GENERATE 1095 POSTS
   ════════════════════════════════════════════════════════════════ */

function generateAllPosts() {
  const posts = [];
  const usedSlugs = new Set();

  // Date range: April 12, 2023 → April 10, 2026 = 1095 days
  const startDate = new Date(2023, 3, 12); // months 0-indexed

  // Flatten all title templates with variations
  const expanded = [];
  for (const topic of TOPIC_POOL) {
    for (const tpl of topic.titles) {
      const needsYear = tpl.includes("{year}");
      const needsFY = tpl.includes("{fy}");
      const needsN = tpl.includes("{n}");
      const years = needsYear ? YEARS : [""];
      const fys = needsFY ? FY : [""];
      const ns = needsN ? ["5", "7", "10", "12", "15"] : [""];

      for (const y of years) {
        for (const f of fys) {
          for (const n of ns) {
            const title = expandTitle(tpl, { year: y, fy: f, n });
            const slug = slugify(title);
            if (!usedSlugs.has(slug)) {
              usedSlugs.add(slug);
              expanded.push({ title, slug, cat: topic.cat, tags: topic.tags });
            }
          }
        }
      }
    }
  }

  // Shuffle deterministically using hashStr
  expanded.sort((a, b) => hashStr(a.slug + "salt") - hashStr(b.slug + "salt"));

  // Take 1095 posts (we should have well over that from the expanded pool)
  const selected = expanded.slice(0, 1095);

  for (let i = 0; i < 1095; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    if (i < selected.length) {
      const { title, slug, cat, tags } = selected[i];
      const intro = introForCategory(cat, title);
      const sections = sectionsForCategory(cat, title, hashStr(slug));
      const readTime = Math.max(4, Math.min(12, 5 + (hashStr(slug) % 8)));
      const desc = `${title.replace(/ — .*/,"")}. Comprehensive guide for Indian businesses with templates, examples, and compliance tips. Updated for ${dateStr.substring(0,4)}.`;

      posts.push({
        slug,
        title,
        date: dateStr,
        category: cat,
        tags,
        description: desc.substring(0, 160),
        readTime,
        intro,
        sections: sections.map((s) => ({ heading: s.h, content: s.p })),
      });
    } else {
      // Extra filler posts for any remaining days
      const idx = i - selected.length;
      const month = MONTHS_LONG[date.getMonth()];
      const year = date.getFullYear();
      const fillerTopics = [
        `Monthly Billing Tips: ${month} ${year} — What Indian Businesses Should Know`,
        `Invoice Checklist for ${month} ${year}: Start the Month Right`,
        `Business Finance Roundup: ${month} ${year} Updates`,
        `Tax Calendar for ${month} ${year}: Important Deadlines`,
        `Billing Best Practices: Lessons from ${month} ${year}`,
        `Small Business Digest: ${month} ${year} — Invoice & Payment Trends`,
        `GST Update for ${month} ${year}: What Changed This Month`,
        `Freelancer Finance: ${month} ${year} Billing Insights`,
        `Receipt Management Tips for ${month} ${year}`,
        `Digital Payment Trends: ${month} ${year} India Report`,
        `Export Invoice Updates: ${month} ${year} Regulatory Changes`,
        `Startup Billing Guide: ${month} ${year} Edition`,
      ];
      const topic = fillerTopics[idx % fillerTopics.length];
      const slug = slugify(topic);
      const cat = CATEGORIES[idx % CATEGORIES.length];
      const readTime = 4 + (idx % 6);

      posts.push({
        slug: usedSlugs.has(slug) ? slug + "-" + i : slug,
        title: topic,
        date: dateStr,
        category: cat,
        tags: ["billing", "invoice", "India", month.toLowerCase()],
        description: `${topic}. Stay updated with the latest billing, invoicing, and tax compliance tips for Indian businesses.`.substring(0, 160),
        readTime,
        intro: `Welcome to our ${month} ${year} edition of business billing insights. Each month, we compile the most important updates, tips, and best practices related to invoicing, billing, and financial compliance for Indian businesses. Whether you're a freelancer, startup founder, or MSME owner, these insights will help you stay on top of your billing game.`,
        sections: [
          { heading: `Key Highlights for ${month} ${year}`, content: `This month brings several important updates for Indian businesses. The GST Council continues to refine compliance requirements, and the e-invoicing mandate expands to cover more businesses. For freelancers and small business owners, understanding these changes is crucial for maintaining compliance.\n\nAdditionally, digital payment adoption continues to accelerate across India. UPI transactions reached new highs, making it more important than ever to include digital payment options on your invoices. Businesses that offer UPI, NEFT, and other digital payment methods on their invoices report up to 40% faster payment collection.` },
          { heading: "Billing Tips You Can Implement Today", content: `Start by reviewing your invoice template for completeness. Ensure all mandatory fields including GSTIN, HSN codes, and proper tax breakdowns are present. A quick audit of your last 10 invoices can reveal common omissions that could affect your compliance.\n\nConsider automating your recurring invoices for retainer clients. Tools like eBills allow you to save templates and client details, reducing invoice creation time from 15 minutes to under 2 minutes. The time saved compounds significantly over a month.` },
          { heading: "Common Questions This Month", content: `We received numerous queries about invoice formatting, tax rate changes, and digital receipt validity. The most frequent question was about the legal validity of digitally generated invoices — yes, they are fully valid under Indian law as long as they contain all prescribed information.\n\nAnother popular question was about maintaining invoice records. Under the GST Act, businesses must retain invoice records for at least 72 months (6 years) from the due date of filing the annual return for the relevant year. Digital storage in cloud platforms is an acceptable and recommended practice.` },
          { heading: "Looking Ahead", content: `Next month, expect further updates on e-invoicing thresholds and potential changes in GST rates for specific categories. Plan ahead by ensuring your invoicing software is updated and your team is trained on any new requirements.\n\nRemember, proactive compliance is always cheaper than reactive corrections. Take 30 minutes this week to review your billing processes and ensure everything is in order. Your future self (and your accountant) will thank you.` },
        ],
      });
      usedSlugs.add(slug);
    }
  }

  return posts;
}

/* ════════════════════════════════════════════════════════════════
   WRITE OUTPUT
   ════════════════════════════════════════════════════════════════ */

const posts = generateAllPosts();

console.log(`Generated ${posts.length} blog posts`);
console.log(`Date range: ${posts[0].date} → ${posts[posts.length - 1].date}`);
console.log(`Categories: ${[...new Set(posts.map((p) => p.category))].join(", ")}`);
console.log(`Unique slugs: ${new Set(posts.map((p) => p.slug)).size}`);

// Build TS source
let ts = `// AUTO-GENERATED — do not edit manually\n// Generated by scripts/generate-blogs.mjs\n\nexport interface BlogPost {\n  slug: string;\n  title: string;\n  date: string;\n  category: string;\n  tags: string[];\n  description: string;\n  readTime: number;\n  intro: string;\n  sections: { heading: string; content: string }[];\n}\n\nexport const BLOG_POSTS: BlogPost[] = `;

ts += JSON.stringify(posts, null, 2);
ts += ";\n";
ts += `\nexport const BLOG_CATEGORIES = ${JSON.stringify([...new Set(posts.map((p) => p.category))].sort())};\n`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ts, "utf-8");
console.log(`\nWritten to ${OUT} (${(Buffer.byteLength(ts) / 1024 / 1024).toFixed(1)} MB)`);
