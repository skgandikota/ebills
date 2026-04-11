"use client";

import { useState, useCallback } from "react";
import type { BillData, BillTemplate, LineItem } from "@/types/bill";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Save, Download } from "lucide-react";
import { BillPreview } from "@/components/templates/BillPreview";
import { generatePDF, downloadBlob, generateBillId } from "@/lib/pdf";

const CURRENCIES = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "INR", label: "INR (₹)" },
  { code: "AUD", label: "AUD (A$)" },
  { code: "CAD", label: "CAD (C$)" },
  { code: "JPY", label: "JPY (¥)" },
  { code: "SGD", label: "SGD (S$)" },
  { code: "AED", label: "AED (د.إ)" },
];

interface BillFormProps {
  template: BillTemplate;
  initialData?: BillData;
  billNumber: string;
  onSave: (bill: BillData) => Promise<void>;
}

function emptyBill(template: BillTemplate, billNumber: string): BillData {
  return {
    id: generateBillId(),
    templateId: template.id,
    billNumber,
    billDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    business: {
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
      website: "",
      gstin: "",
      pan: "",
      logo: "",
    },
    client: {
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
      gstin: "",
    },
    items: [
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        hsnCode: "",
        unit: "pcs",
      },
    ],
    subtotal: 0,
    taxes: template.showTax
      ? template.id === "gst-invoice"
        ? [
            { label: "CGST", rate: 9, amount: 0 },
            { label: "SGST", rate: 9, amount: 0 },
          ]
        : [{ label: "Tax", rate: 0, amount: 0 }]
      : [],
    discount: 0,
    discountType: "fixed",
    shippingCharges: 0,
    totalAmount: 0,
    currency: template.defaultCurrency,
    notes: "",
    terms: "",
    status: "draft",
  };
}

export function BillForm({ template, initialData, billNumber, onSave }: BillFormProps) {
  const [bill, setBill] = useState<BillData>(
    initialData || emptyBill(template, billNumber)
  );
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const recalculate = useCallback(
    (updatedBill: BillData): BillData => {
      const subtotal = updatedBill.items.reduce((sum, item) => sum + item.amount, 0);

      const discountAmount =
        updatedBill.discountType === "percentage"
          ? (subtotal * updatedBill.discount) / 100
          : updatedBill.discount;

      const afterDiscount = subtotal - discountAmount;

      const taxes = updatedBill.taxes.map((tax) => ({
        ...tax,
        amount: (afterDiscount * tax.rate) / 100,
      }));

      const taxTotal = taxes.reduce((sum, t) => sum + t.amount, 0);
      const totalAmount = afterDiscount + taxTotal + updatedBill.shippingCharges;

      return { ...updatedBill, subtotal, taxes, totalAmount };
    },
    []
  );

  const update = (partial: Partial<BillData>) => {
    setBill((prev) => recalculate({ ...prev, ...partial }));
  };

  const updateBusiness = (field: string, value: string) => {
    setBill((prev) =>
      recalculate({
        ...prev,
        business: { ...prev.business, [field]: value },
      })
    );
  };

  const updateClient = (field: string, value: string) => {
    setBill((prev) =>
      recalculate({
        ...prev,
        client: { ...prev.client, [field]: value },
      })
    );
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setBill((prev) => {
      const items = prev.items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        updated.amount = updated.quantity * updated.rate;
        return updated;
      });
      return recalculate({ ...prev, items });
    });
  };

  const addItem = () => {
    setBill((prev) =>
      recalculate({
        ...prev,
        items: [
          ...prev.items,
          {
            id: crypto.randomUUID(),
            description: "",
            quantity: 1,
            rate: 0,
            amount: 0,
            hsnCode: "",
            unit: "pcs",
          },
        ],
      })
    );
  };

  const removeItem = (id: string) => {
    setBill((prev) =>
      recalculate({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      })
    );
  };

  const updateTax = (index: number, field: "label" | "rate", value: string | number) => {
    setBill((prev) => {
      const taxes = [...prev.taxes];
      taxes[index] = { ...taxes[index], [field]: value };
      return recalculate({ ...prev, taxes });
    });
  };

  const handleSave = async (status: "draft" | "final") => {
    setSaving(true);
    try {
      const finalBill = recalculate({ ...bill, status });
      await onSave(finalBill);
      setBill(finalBill);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setShowPreview(true);
      // Wait for render
      await new Promise((r) => setTimeout(r, 300));
      const blob = await generatePDF("bill-preview", `${bill.billNumber}.pdf`);
      downloadBlob(blob, `${bill.billNumber}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Form Panel */}
      <div className="flex-1 space-y-6 max-w-2xl">
        {/* Bill Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bill Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billNumber">Bill Number</Label>
                <Input
                  id="billNumber"
                  value={bill.billNumber}
                  onChange={(e) => update({ billNumber: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={bill.currency}
                  onValueChange={(v) => { if (v) update({ currency: v }); }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billDate">Bill Date</Label>
                <Input
                  id="billDate"
                  type="date"
                  value={bill.billDate}
                  onChange={(e) => update({ billDate: e.target.value })}
                />
              </div>
              {template.showDueDate && (
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={bill.dueDate || ""}
                    onChange={(e) => update({ dueDate: e.target.value })}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Business</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Business Name</Label>
                <Input
                  value={bill.business.name}
                  onChange={(e) => updateBusiness("name", e.target.value)}
                  placeholder="Your Company Ltd."
                />
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input
                  value={bill.business.address}
                  onChange={(e) => updateBusiness("address", e.target.value)}
                  placeholder="123 Business St"
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={bill.business.city}
                  onChange={(e) => updateBusiness("city", e.target.value)}
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  value={bill.business.state}
                  onChange={(e) => updateBusiness("state", e.target.value)}
                />
              </div>
              <div>
                <Label>Postal Code</Label>
                <Input
                  value={bill.business.postalCode}
                  onChange={(e) => updateBusiness("postalCode", e.target.value)}
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={bill.business.country}
                  onChange={(e) => updateBusiness("country", e.target.value)}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={bill.business.phone || ""}
                  onChange={(e) => updateBusiness("phone", e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={bill.business.email || ""}
                  onChange={(e) => updateBusiness("email", e.target.value)}
                  type="email"
                />
              </div>
              {template.showGstin && (
                <>
                  <div>
                    <Label>GSTIN</Label>
                    <Input
                      value={bill.business.gstin || ""}
                      onChange={(e) => updateBusiness("gstin", e.target.value)}
                      placeholder="22AAAAA0000A1Z5"
                    />
                  </div>
                  <div>
                    <Label>PAN</Label>
                    <Input
                      value={bill.business.pan || ""}
                      onChange={(e) => updateBusiness("pan", e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Client Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bill To (Client)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Client Name</Label>
                <Input
                  value={bill.client.name}
                  onChange={(e) => updateClient("name", e.target.value)}
                  placeholder="Client Company"
                />
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input
                  value={bill.client.address}
                  onChange={(e) => updateClient("address", e.target.value)}
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={bill.client.city}
                  onChange={(e) => updateClient("city", e.target.value)}
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  value={bill.client.state}
                  onChange={(e) => updateClient("state", e.target.value)}
                />
              </div>
              <div>
                <Label>Postal Code</Label>
                <Input
                  value={bill.client.postalCode}
                  onChange={(e) => updateClient("postalCode", e.target.value)}
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={bill.client.country}
                  onChange={(e) => updateClient("country", e.target.value)}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={bill.client.phone || ""}
                  onChange={(e) => updateClient("phone", e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={bill.client.email || ""}
                  onChange={(e) => updateClient("email", e.target.value)}
                  type="email"
                />
              </div>
              {template.showGstin && (
                <div className="col-span-2">
                  <Label>GSTIN</Label>
                  <Input
                    value={bill.client.gstin || ""}
                    onChange={(e) => updateClient("gstin", e.target.value)}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bill.items.map((item, index) => (
              <div key={item.id} className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Item {index + 1}</span>
                  {bill.items.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      placeholder="Item description"
                    />
                  </div>
                  {template.showHsnCode && (
                    <div>
                      <Label>HSN Code</Label>
                      <Input
                        value={item.hsnCode || ""}
                        onChange={(e) =>
                          updateItem(item.id, "hsnCode", e.target.value)
                        }
                      />
                    </div>
                  )}
                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                  <div>
                    <Label>Rate</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(item.id, "rate", parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <Input value={item.amount.toFixed(2)} readOnly className="bg-muted" />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addItem} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </CardContent>
        </Card>

        {/* Tax & Discount */}
        {(template.showTax || template.showDiscount || template.showShipping) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tax, Discount & Shipping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {template.showDiscount && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Discount</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={bill.discount}
                      onChange={(e) =>
                        update({ discount: parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div>
                    <Label>Discount Type</Label>
                    <Select
                      value={bill.discountType}
                      onValueChange={(v) => {
                        if (v) update({ discountType: v as "fixed" | "percentage" });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {template.showTax && (
                <div className="space-y-3">
                  <Label>Taxes</Label>
                  {bill.taxes.map((tax, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3">
                      <Input
                        value={tax.label}
                        onChange={(e) =>
                          updateTax(index, "label", e.target.value)
                        }
                        placeholder="Tax name"
                      />
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={tax.rate}
                          onChange={(e) =>
                            updateTax(index, "rate", parseFloat(e.target.value) || 0)
                          }
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                      <Input
                        value={tax.amount.toFixed(2)}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  ))}
                </div>
              )}

              {template.showShipping && (
                <div>
                  <Label>Shipping Charges</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={bill.shippingCharges}
                    onChange={(e) =>
                      update({
                        shippingCharges: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Notes & Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes & Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Notes</Label>
              <Textarea
                value={bill.notes || ""}
                onChange={(e) => update({ notes: e.target.value })}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
            <div>
              <Label>Terms & Conditions</Label>
              <Textarea
                value={bill.terms || ""}
                onChange={(e) => update({ terms: e.target.value })}
                placeholder="Payment terms, conditions..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 sticky bottom-0 bg-background py-4 border-t">
          <Button onClick={() => handleSave("draft")} disabled={saving} variant="outline">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Draft"}
          </Button>
          <Button onClick={() => handleSave("final")} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save & Finalize"}
          </Button>
          <Button variant="secondary" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden"
          >
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
        </div>
      </div>

      {/* Preview Panel */}
      <div
        className={`flex-1 sticky top-4 h-fit ${
          showPreview ? "block" : "hidden lg:block"
        }`}
      >
        <div className="overflow-auto max-h-[90vh] border rounded-lg">
          <div className="transform scale-[0.6] origin-top-left w-[166.67%]">
            <BillPreview bill={bill} template={template} />
          </div>
        </div>
      </div>

      <Separator className="lg:hidden" />
    </div>
  );
}
