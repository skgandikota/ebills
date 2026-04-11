"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { templates } from "@/lib/templates";
import { getTemplate } from "@/lib/templates";
import { BillForm } from "@/components/builder/BillForm";
import { saveBill, getUserMetadata, saveUserMetadata, listCustomTemplates } from "@/lib/github";
import { generateBillNumber } from "@/lib/pdf";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BillData, BillTemplate } from "@/types/bill";
import {
  FileText,
  IndianRupee,
  ClipboardList,
  Receipt,
  Calculator,
  Truck,
  RotateCcw,
  UserCircle,
  Home,
  ShoppingBag,
  RefreshCw,
  ShoppingCart,
  Wallet,
  Heart,
  Wrench,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const TEMPLATE_ICONS: Record<string, React.ElementType> = {
  "standard-invoice": FileText,
  "gst-invoice": IndianRupee,
  "proforma-invoice": ClipboardList,
  receipt: Receipt,
  quotation: Calculator,
  "delivery-challan": Truck,
  "credit-note": RotateCcw,
  "freelancer-invoice": UserCircle,
  "rent-receipt": Home,
  "shopping-receipt": ShoppingBag,
  "subscription-invoice": RefreshCw,
  "purchase-order": ShoppingCart,
  "expense-report": Wallet,
  "donation-receipt": Heart,
  "service-invoice": Wrench,
  "export-invoice": Globe,
};

const TEMPLATE_PREFIXES: Record<string, string> = {
  "standard-invoice": "INV",
  "gst-invoice": "GST",
  "proforma-invoice": "PI",
  receipt: "RCT",
  quotation: "QTN",
  "delivery-challan": "DC",
  "credit-note": "CN",
  "freelancer-invoice": "FRL",
  "rent-receipt": "RNT",
  "shopping-receipt": "SHP",
  "subscription-invoice": "SUB",
  "purchase-order": "PO",
  "expense-report": "EXP",
  "donation-receipt": "DON",
  "service-invoice": "SRV",
  "export-invoice": "EXI",
};

function NewBillContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");
  const isDuplicate = searchParams.get("duplicate") === "1";
  const [selectedTemplate, setSelectedTemplate] = useState<BillTemplate | null>(
    null
  );
  const [billNumber, setBillNumber] = useState("");
  const [duplicateData, setDuplicateData] = useState<BillData | undefined>();
  const [customTemplates, setCustomTemplates] = useState<BillTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const meta = await getUserMetadata();
        const counters = meta.templateCounters || {};

        if (templateId) {
          const t = getTemplate(templateId);
          if (t) setSelectedTemplate(t);
          // Use template-specific counter
          const prefix = TEMPLATE_PREFIXES[templateId] || "INV";
          const count = (counters[templateId] || 0) + 1;
          setBillNumber(generateBillNumber(count, prefix));
        } else {
          setBillNumber(generateBillNumber(meta.nextBillNumber));
        }

        // Load custom templates
        try {
          const ct = await listCustomTemplates();
          setCustomTemplates(ct);
          // If templateId matches a custom template
          if (templateId && !getTemplate(templateId)) {
            const customMatch = ct.find((c) => c.id === templateId);
            if (customMatch) {
              setSelectedTemplate(customMatch);
              const count = (counters[templateId] || 0) + 1;
              setBillNumber(generateBillNumber(count, "CUS"));
            }
          }
        } catch { /* no custom templates yet */ }

        // Load duplicated bill data
        if (isDuplicate) {
          try {
            const raw = sessionStorage.getItem("duplicate-bill");
            if (raw) {
              const parsed = JSON.parse(raw) as BillData;
              const prefix = TEMPLATE_PREFIXES[parsed.templateId] || "INV";
              const count = (counters[parsed.templateId] || 0) + 1;
              parsed.id = "";
              parsed.billNumber = generateBillNumber(count, prefix);
              parsed.billDate = new Date().toISOString().split("T")[0];
              parsed.dueDate = "";
              parsed.status = "draft";
              setDuplicateData(parsed);
              sessionStorage.removeItem("duplicate-bill");
            }
          } catch { /* ignore parse errors */ }
        }
      } catch {
        setBillNumber(generateBillNumber(1));
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [templateId, isDuplicate]);

  const handleSave = async (bill: BillData) => {
    try {
      await saveBill(bill);
      // Update both global and per-template counters
      const meta = await getUserMetadata();
      meta.nextBillNumber += 1;
      if (!meta.templateCounters) meta.templateCounters = {};
      meta.templateCounters[bill.templateId] = (meta.templateCounters[bill.templateId] || 0) + 1;
      await saveUserMetadata(meta);
      toast.success(
        bill.status === "final" ? "Bill finalized & saved!" : "Draft saved!"
      );
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save bill. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        Preparing bill editor...
      </div>
    );
  }

  // Template selection
  if (!selectedTemplate) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Bill</h1>
          <p className="text-muted-foreground mt-1">
            Choose a template to get started
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((t) => {
            const Icon = TEMPLATE_ICONS[t.id] || FileText;
            return (
              <Card
                key={t.id}
                className="cursor-pointer hover:shadow-lg transition-shadow hover:border-primary"
                onClick={() => setSelectedTemplate(t)}
              >
                <CardContent className="pt-6 text-center">
                  <Icon className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
          {/* Custom templates */}
          {customTemplates.map((t) => (
            <Card
              key={t.id}
              className="cursor-pointer hover:shadow-lg transition-shadow hover:border-primary relative"
              onClick={() => setSelectedTemplate(t)}
            >
              <CardContent className="pt-6 text-center">
                <div
                  className="h-12 w-12 mx-auto mb-3 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: t.color || "#3b82f6" }}
                >
                  {t.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold mb-1">{t.name}</h3>
                <p className="text-sm text-muted-foreground">Custom template</p>
              </CardContent>
              <span className="absolute top-2 right-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                Custom
              </span>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{selectedTemplate.name}</h1>
          <p className="text-muted-foreground mt-1">
            Fill in the details below. Preview updates live.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setSelectedTemplate(null)}
        >
          Change Template
        </Button>
      </div>
      <BillForm
        template={selectedTemplate}
        initialData={duplicateData}
        billNumber={billNumber}
        onSave={handleSave}
      />
    </div>
  );
}

export default function NewBillPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-16 text-muted-foreground">
          Loading...
        </div>
      }
    >
      <NewBillContent />
    </Suspense>
  );
}
