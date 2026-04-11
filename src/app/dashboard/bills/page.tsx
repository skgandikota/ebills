"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Plus, Search, Trash2 } from "lucide-react";
import { listBills, deleteBill } from "@/lib/github";
import type { BillMeta } from "@/types/bill";
import { formatCurrency } from "@/lib/pdf";
import { toast } from "sonner";

export default function BillsListPage() {
  const [bills, setBills] = useState<BillMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadBills();
  }, []);

  async function loadBills() {
    try {
      setLoading(true);
      const data = await listBills();
      setBills(data);
    } catch {
      toast.error("Failed to load bills");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete this bill permanently?")) return;
    setDeleting(id);
    try {
      await deleteBill(id);
      setBills((prev) => prev.filter((b) => b.id !== id));
      toast.success("Bill deleted");
    } catch {
      toast.error("Failed to delete bill");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = bills.filter((b) => {
    const matchesSearch =
      !search ||
      b.billNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.clientName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Bills</h1>
          <p className="text-muted-foreground mt-1">
            All your generated bills in one place
          </p>
        </div>
        <Link href="/dashboard/bills/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Bill
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by bill number or client..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="final">Final</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bills List */}
      {loading ? (
        <div className="text-center py-16 text-muted-foreground">
          Loading bills...
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-1">
              {bills.length === 0 ? "No bills yet" : "No matching bills"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {bills.length === 0
                ? "Create your first bill to get started!"
                : "Try adjusting your search or filter."}
            </p>
            {bills.length === 0 && (
              <Link href="/dashboard/bills/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Bill
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((bill) => (
            <Link
              key={bill.id}
              href={`/dashboard/bills/view?id=${bill.id}`}
              className="block"
            >
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">{bill.billNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {bill.clientName || "No client"} —{" "}
                        {new Date(bill.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        bill.status === "final" ? "default" : "secondary"
                      }
                    >
                      {bill.status}
                    </Badge>
                    <span className="font-semibold min-w-[80px] text-right">
                      {formatCurrency(bill.totalAmount, bill.currency)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDelete(bill.id, e)}
                      disabled={deleting === bill.id}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
