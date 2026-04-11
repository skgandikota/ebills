"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { templates } from "@/lib/templates";
import { getTemplate } from "@/lib/templates";
import { BillForm } from "@/components/builder/BillForm";
import { saveBill, getUserMetadata, saveUserMetadata } from "@/lib/github";
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
};

function NewBillContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");
  const [selectedTemplate, setSelectedTemplate] = useState<BillTemplate | null>(
    null
  );
  const [billNumber, setBillNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const meta = await getUserMetadata();
        setBillNumber(generateBillNumber(meta.nextBillNumber));

        if (templateId) {
          const t = getTemplate(templateId);
          if (t) setSelectedTemplate(t);
        }
      } catch {
        setBillNumber(generateBillNumber(1));
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [templateId]);

  const handleSave = async (bill: BillData) => {
    try {
      await saveBill(bill);
      // Update bill number counter
      const meta = await getUserMetadata();
      meta.nextBillNumber += 1;
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
