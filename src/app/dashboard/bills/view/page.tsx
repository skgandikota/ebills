"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getBill, saveBill, deleteBill } from "@/lib/github";
import { getTemplate } from "@/lib/templates";
import { BillPreview } from "@/components/templates/BillPreview";
import { BillForm } from "@/components/builder/BillForm";
import { generatePDF, downloadBlob } from "@/lib/pdf";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Pencil, Trash2, ArrowLeft, Copy } from "lucide-react";
import type { BillData, BillTemplate } from "@/types/bill";
import { toast } from "sonner";
import Link from "next/link";

function BillViewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const billId = searchParams.get("id");

  const [bill, setBill] = useState<BillData | null>(null);
  const [template, setTemplate] = useState<BillTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    async function load() {
      if (!billId) return;
      try {
        const data = await getBill(billId);
        setBill(data);
        const t = getTemplate(data.templateId);
        if (t) setTemplate(t);
      } catch {
        toast.error("Failed to load bill");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [billId]);

  const handleDownload = async () => {
    if (!bill) return;
    try {
      setActiveTab("preview");
      await new Promise((r) => setTimeout(r, 300));
      const blob = await generatePDF("bill-preview", `${bill.billNumber}.pdf`);
      downloadBlob(blob, `${bill.billNumber}.pdf`);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("PDF generation failed");
    }
  };

  const handleDelete = async () => {
    if (!billId || !confirm("Delete this bill permanently?")) return;
    try {
      await deleteBill(billId);
      toast.success("Bill deleted");
      router.push("/dashboard/bills");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSave = async (updatedBill: BillData) => {
    try {
      await saveBill(updatedBill);
      setBill(updatedBill);
      toast.success("Bill updated!");
      setActiveTab("preview");
    } catch {
      toast.error("Failed to save");
    }
  };

  if (!billId) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">No bill ID specified</p>
        <Link href="/dashboard/bills">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bills
          </Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        Loading bill...
      </div>
    );
  }

  if (!bill || !template) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">Bill not found</p>
        <Link href="/dashboard/bills">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bills
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/bills">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{bill.billNumber}</h1>
              <Badge variant={bill.status === "final" ? "default" : "secondary"}>
                {bill.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {bill.client.name || "No client"} —{" "}
              {new Date(bill.billDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              try {
                sessionStorage.setItem("duplicate-bill", JSON.stringify(bill));
              } catch { /* ignore */ }
              router.push(`/dashboard/bills/new?template=${bill.templateId}&duplicate=1`);
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => { if (v) setActiveTab(v); }}>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="edit">
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-6">
          <div className="overflow-auto border rounded-lg bg-gray-100 p-4">
            <BillPreview bill={bill} template={template} />
          </div>
        </TabsContent>
        <TabsContent value="edit" className="mt-6">
          <BillForm
            template={template}
            initialData={bill}
            billNumber={bill.billNumber}
            onSave={handleSave}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function BillViewPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-16 text-muted-foreground">
          Loading...
        </div>
      }
    >
      <BillViewContent />
    </Suspense>
  );
}
