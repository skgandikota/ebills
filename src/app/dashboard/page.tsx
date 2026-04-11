"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  ArrowRight,
  IndianRupee,
  ClipboardList,
  Receipt,
  Calculator,
  Truck,
  RotateCcw,
  UserCircle,
} from "lucide-react";
import { listBills } from "@/lib/github";
import { templates } from "@/lib/templates";
import type { BillMeta } from "@/types/bill";
import { formatCurrency } from "@/lib/pdf";

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

export default function DashboardPage() {
  const [bills, setBills] = useState<BillMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBills() {
      try {
        const data = await listBills();
        setBills(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load bills");
      } finally {
        setLoading(false);
      }
    }
    loadBills();
  }, []);

  const totalBilled = bills
    .filter((b) => b.status === "final")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const thisMonthBills = bills.filter((b) => {
    const d = new Date(b.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your billing activity
          </p>
        </div>
        <Link href="/dashboard/bills/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Bill
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading ? "—" : bills.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading ? "—" : thisMonthBills.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Billed (Finalized)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading ? "—" : formatCurrency(totalBilled, "USD")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Create */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Create</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {templates.map((t) => {
            const Icon = TEMPLATE_ICONS[t.id] || FileText;
            return (
              <Link key={t.id} href={`/dashboard/bills/new?template=${t.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-4 pb-3 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{t.name}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Bills */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Bills</h2>
          <Link href="/dashboard/bills">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading your bills...
          </div>
        ) : error ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-2">
                {error.includes("Not authenticated")
                  ? "Setting up your workspace..."
                  : error}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : bills.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-1">No bills yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first bill to get started!
              </p>
              <Link href="/dashboard/bills/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Bill
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {bills.slice(0, 5).map((bill) => (
              <Link
                key={bill.id}
                href={`/dashboard/bills/view?id=${bill.id}`}
                className="block"
              >
                <Card className="hover:shadow-sm transition-shadow">
                  <CardContent className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">
                          {bill.billNumber}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {bill.clientName || "No client"} —{" "}
                          {new Date(bill.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          bill.status === "final" ? "default" : "secondary"
                        }
                      >
                        {bill.status}
                      </Badge>
                      <span className="font-semibold text-sm">
                        {formatCurrency(bill.totalAmount, bill.currency)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
