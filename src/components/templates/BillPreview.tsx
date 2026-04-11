"use client";

import type { BillData } from "@/types/bill";
import type { BillTemplate } from "@/types/bill";
import { formatCurrency } from "@/lib/pdf";

interface BillPreviewProps {
  bill: BillData;
  template: BillTemplate;
}

// Color themes per template type
const THEMES: Record<string, { primary: string; accent: string; headerBg: string; headerText: string; stripe: string }> = {
  "standard-invoice": { primary: "#1e293b", accent: "#3b82f6", headerBg: "#1e293b", headerText: "#ffffff", stripe: "#f8fafc" },
  "gst-invoice":      { primary: "#7c3aed", accent: "#8b5cf6", headerBg: "#7c3aed", headerText: "#ffffff", stripe: "#faf5ff" },
  "proforma-invoice": { primary: "#0f766e", accent: "#14b8a6", headerBg: "#0f766e", headerText: "#ffffff", stripe: "#f0fdfa" },
  "receipt":          { primary: "#059669", accent: "#34d399", headerBg: "#059669", headerText: "#ffffff", stripe: "#ecfdf5" },
  "quotation":        { primary: "#d97706", accent: "#fbbf24", headerBg: "#d97706", headerText: "#ffffff", stripe: "#fffbeb" },
  "delivery-challan": { primary: "#dc2626", accent: "#f87171", headerBg: "#dc2626", headerText: "#ffffff", stripe: "#fef2f2" },
  "credit-note":      { primary: "#e11d48", accent: "#fb7185", headerBg: "#e11d48", headerText: "#ffffff", stripe: "#fff1f2" },
  "freelancer-invoice": { primary: "#2563eb", accent: "#60a5fa", headerBg: "#2563eb", headerText: "#ffffff", stripe: "#eff6ff" },
};

const TITLE_MAP: Record<string, string> = {
  "standard-invoice": "INVOICE",
  "gst-invoice": "TAX INVOICE",
  "proforma-invoice": "PROFORMA INVOICE",
  receipt: "PAYMENT RECEIPT",
  quotation: "QUOTATION",
  "delivery-challan": "DELIVERY CHALLAN",
  "credit-note": "CREDIT NOTE",
  "freelancer-invoice": "INVOICE",
};

function numberToWords(num: number): string {
  if (num === 0) return "Zero";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const scales = ["", "Thousand", "Lakh", "Crore"];
  const n = Math.floor(Math.abs(num));
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + numberToWords(n % 100) : "");
  // Indian numbering: thousand, lakh, crore
  if (n < 100000) {
    const thousands = Math.floor(n / 1000);
    const remainder = n % 1000;
    return numberToWords(thousands) + " " + scales[1] + (remainder ? " " + numberToWords(remainder) : "");
  }
  if (n < 10000000) {
    const lakhs = Math.floor(n / 100000);
    const remainder = n % 100000;
    return numberToWords(lakhs) + " " + scales[2] + (remainder ? " " + numberToWords(remainder) : "");
  }
  const crores = Math.floor(n / 10000000);
  const remainder = n % 10000000;
  return numberToWords(crores) + " " + scales[3] + (remainder ? " " + numberToWords(remainder) : "");
}

export function BillPreview({ bill, template }: BillPreviewProps) {
  const theme = THEMES[template.id] || THEMES["standard-invoice"];
  const title = TITLE_MAP[template.id] || "INVOICE";
  const isGST = template.id === "gst-invoice";
  const isReceipt = template.id === "receipt";
  const isFreelancer = template.id === "freelancer-invoice";
  const isCreditNote = template.id === "credit-note";
  const isDeliveryChallan = template.id === "delivery-challan";

  return (
    <div
      id="bill-preview"
      className="bg-white text-black w-[210mm] min-h-[297mm] mx-auto shadow-lg text-sm relative"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {/* Colored top bar */}
      <div className="h-2" style={{ backgroundColor: theme.primary }} />

      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            {bill.business.logo && (
              <img
                src={bill.business.logo}
                alt="Logo"
                className="h-16 mb-3 object-contain"
              />
            )}
            <h2 className="text-xl font-bold" style={{ color: theme.primary }}>
              {bill.business.name || "Your Business Name"}
            </h2>
            {bill.business.address && (
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                {bill.business.address}
                {bill.business.city && `, ${bill.business.city}`}
                {bill.business.state && `, ${bill.business.state}`}
                {bill.business.postalCode && ` - ${bill.business.postalCode}`}
                {bill.business.country && `, ${bill.business.country}`}
              </p>
            )}
            {bill.business.phone && (
              <p className="text-gray-500 text-xs">Tel: {bill.business.phone}</p>
            )}
            {bill.business.email && (
              <p className="text-gray-500 text-xs">{bill.business.email}</p>
            )}
            {bill.business.website && (
              <p className="text-gray-500 text-xs">{bill.business.website}</p>
            )}
            {template.showGstin && bill.business.gstin && (
              <p className="text-xs font-semibold mt-1" style={{ color: theme.primary }}>
                GSTIN: {bill.business.gstin}
              </p>
            )}
            {template.showGstin && bill.business.pan && (
              <p className="text-xs text-gray-600">PAN: {bill.business.pan}</p>
            )}
          </div>
          <div className="text-right">
            <h1
              className="text-3xl font-extrabold tracking-wider"
              style={{ color: theme.primary }}
            >
              {title}
            </h1>
            {isCreditNote && (
              <p className="text-xs text-red-500 font-medium mt-1">
                (This is a Credit Note)
              </p>
            )}
            <div className="mt-4 space-y-1.5 text-xs">
              <div className="flex justify-end gap-2">
                <span className="text-gray-500">No:</span>
                <span className="font-semibold">{bill.billNumber || "---"}</span>
              </div>
              <div className="flex justify-end gap-2">
                <span className="text-gray-500">Date:</span>
                <span className="font-semibold">
                  {bill.billDate ? new Date(bill.billDate).toLocaleDateString() : "---"}
                </span>
              </div>
              {template.showDueDate && bill.dueDate && (
                <div className="flex justify-end gap-2">
                  <span className="text-gray-500">Due:</span>
                  <span className="font-semibold">
                    {new Date(bill.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="h-px mb-6" style={{ backgroundColor: theme.accent, opacity: 0.3 }} />

        {/* Bill To / Ship To */}
        <div className={`grid ${isDeliveryChallan ? "grid-cols-2" : "grid-cols-1"} gap-6 mb-6`}>
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme.stripe }}>
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: theme.accent }}>
              {isReceipt ? "Received From" : isDeliveryChallan ? "Consignee (Ship To)" : "Bill To"}
            </h3>
            <p className="font-bold text-sm">
              {bill.client.name || "Client Name"}
            </p>
            {bill.client.address && (
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                {bill.client.address}
                {bill.client.city && `, ${bill.client.city}`}
                {bill.client.state && `, ${bill.client.state}`}
                {bill.client.postalCode && ` - ${bill.client.postalCode}`}
                {bill.client.country && `, ${bill.client.country}`}
              </p>
            )}
            {bill.client.phone && (
              <p className="text-gray-500 text-xs">Tel: {bill.client.phone}</p>
            )}
            {bill.client.email && (
              <p className="text-gray-500 text-xs">{bill.client.email}</p>
            )}
            {template.showGstin && bill.client.gstin && (
              <p className="text-xs font-semibold mt-1" style={{ color: theme.primary }}>
                GSTIN: {bill.client.gstin}
              </p>
            )}
          </div>
          {isDeliveryChallan && (
            <div className="p-4 rounded-lg" style={{ backgroundColor: theme.stripe }}>
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: theme.accent }}>
                Delivery Details
              </h3>
              <p className="text-xs text-gray-600">
                Mode of Transport: Road<br />
                Vehicle No: _______________<br />
                Date of Supply: {bill.billDate ? new Date(bill.billDate).toLocaleDateString() : "---"}<br />
                Place of Supply: {bill.client.state || "_______________"}
              </p>
            </div>
          )}
        </div>

        {/* Freelancer: project summary box */}
        {isFreelancer && (
          <div className="mb-6 p-4 border rounded-lg" style={{ borderColor: theme.accent + "40" }}>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-500 block">Project</span>
                <span className="font-medium">{bill.items[0]?.description || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Hours</span>
                <span className="font-medium">{bill.items.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Rate</span>
                <span className="font-medium">{bill.items[0] ? formatCurrency(bill.items[0].rate, bill.currency) + "/hr" : "—"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Items Table */}
        <table className="w-full mb-6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: theme.headerBg, color: theme.headerText }}>
              <th className="p-2.5 text-left text-[11px] font-semibold w-8 rounded-tl">#</th>
              <th className="p-2.5 text-left text-[11px] font-semibold">Description</th>
              {template.showHsnCode && (
                <th className="p-2.5 text-center text-[11px] font-semibold w-20">HSN/SAC</th>
              )}
              <th className="p-2.5 text-center text-[11px] font-semibold w-16">Qty</th>
              <th className="p-2.5 text-right text-[11px] font-semibold w-24">Rate</th>
              {isGST && (
                <>
                  <th className="p-2.5 text-right text-[11px] font-semibold w-20">CGST</th>
                  <th className="p-2.5 text-right text-[11px] font-semibold w-20">SGST</th>
                </>
              )}
              <th className="p-2.5 text-right text-[11px] font-semibold w-28 rounded-tr">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bill.items.length === 0 && (
              <tr>
                <td
                  colSpan={isGST ? 8 : template.showHsnCode ? 6 : 5}
                  className="p-4 text-center text-gray-400 text-xs"
                >
                  No items added yet
                </td>
              </tr>
            )}
            {bill.items.map((item, index) => (
              <tr
                key={item.id}
                style={{ backgroundColor: index % 2 === 1 ? theme.stripe : "white" }}
                className="border-b border-gray-100"
              >
                <td className="p-2.5 text-xs text-gray-500">{index + 1}</td>
                <td className="p-2.5 text-xs font-medium">{item.description || "—"}</td>
                {template.showHsnCode && (
                  <td className="p-2.5 text-center text-xs text-gray-500">{item.hsnCode || "—"}</td>
                )}
                <td className="p-2.5 text-center text-xs">
                  {item.quantity} {item.unit || ""}
                </td>
                <td className="p-2.5 text-right text-xs">
                  {formatCurrency(item.rate, bill.currency)}
                </td>
                {isGST && (
                  <>
                    <td className="p-2.5 text-right text-xs text-gray-500">
                      {bill.taxes.find(t => t.label === "CGST") ? bill.taxes.find(t => t.label === "CGST")!.rate + "%" : "—"}
                    </td>
                    <td className="p-2.5 text-right text-xs text-gray-500">
                      {bill.taxes.find(t => t.label === "SGST") ? bill.taxes.find(t => t.label === "SGST")!.rate + "%" : "—"}
                    </td>
                  </>
                )}
                <td className="p-2.5 text-right text-xs font-semibold">
                  {formatCurrency(item.amount, bill.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end mb-6">
          <div className="w-80">
            <div className="flex justify-between py-1.5 text-xs border-b border-gray-100">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{formatCurrency(bill.subtotal, bill.currency)}</span>
            </div>

            {template.showDiscount && bill.discount > 0 && (
              <div className="flex justify-between py-1.5 text-xs border-b border-gray-100" style={{ color: "#059669" }}>
                <span>
                  Discount{bill.discountType === "percentage" ? ` (${bill.discount}%)` : ""}
                </span>
                <span>
                  - {formatCurrency(
                    bill.discountType === "percentage"
                      ? (bill.subtotal * bill.discount) / 100
                      : bill.discount,
                    bill.currency
                  )}
                </span>
              </div>
            )}

            {template.showTax &&
              bill.taxes.map((tax, i) => (
                <div key={i} className="flex justify-between py-1.5 text-xs border-b border-gray-100">
                  <span className="text-gray-500">
                    {tax.label} @ {tax.rate}%
                  </span>
                  <span>{formatCurrency(tax.amount, bill.currency)}</span>
                </div>
              ))}

            {template.showShipping && bill.shippingCharges > 0 && (
              <div className="flex justify-between py-1.5 text-xs border-b border-gray-100">
                <span className="text-gray-500">Shipping</span>
                <span>{formatCurrency(bill.shippingCharges, bill.currency)}</span>
              </div>
            )}

            <div
              className="flex justify-between py-2.5 mt-1 font-bold text-base rounded-md px-3 -mx-3"
              style={{ backgroundColor: theme.primary, color: theme.headerText }}
            >
              <span>{isCreditNote ? "Credit Total" : "Total"}</span>
              <span>{formatCurrency(bill.totalAmount, bill.currency)}</span>
            </div>

            {/* Amount in words for GST invoice */}
            {isGST && bill.totalAmount > 0 && (
              <p className="text-[10px] text-gray-500 mt-2 italic">
                Amount in words: {numberToWords(bill.totalAmount)} Only
              </p>
            )}
          </div>
        </div>

        {/* Receipt: payment method box */}
        {isReceipt && (
          <div className="mb-6 p-4 border-2 border-dashed rounded-lg" style={{ borderColor: theme.accent + "60" }}>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: theme.accent }}>
              Payment Details
            </h4>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block">Method</span>
                <span className="font-medium">Cash / Bank Transfer</span>
              </div>
              <div>
                <span className="text-gray-500 block">Status</span>
                <span className="font-medium text-green-600">PAID</span>
              </div>
              <div>
                <span className="text-gray-500 block">Date</span>
                <span className="font-medium">{bill.billDate ? new Date(bill.billDate).toLocaleDateString() : "—"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bank Details for invoices */}
        {(template.id === "standard-invoice" || isGST || isFreelancer) && (
          <div className="mb-6 p-4 rounded-lg border border-gray-200">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-400">
              Bank Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>Bank: _______________</div>
              <div>A/C No: _______________</div>
              <div>IFSC: _______________</div>
              <div>Branch: _______________</div>
            </div>
          </div>
        )}

        {/* Notes & Terms */}
        {(bill.notes || bill.terms) && (
          <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
            {bill.notes && (
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Notes</h4>
                <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">{bill.notes}</p>
              </div>
            )}
            {bill.terms && (
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Terms & Conditions</h4>
                <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">{bill.terms}</p>
              </div>
            )}
          </div>
        )}

        {/* Signature area */}
        <div className="flex justify-between items-end mt-12 pt-4">
          <div className="text-xs text-gray-400">
            <div className="border-t border-gray-300 pt-1 w-40 text-center">
              Receiver&apos;s Signature
            </div>
          </div>
          <div className="text-xs text-right">
            <p className="font-semibold text-sm mb-8" style={{ color: theme.primary }}>
              For {bill.business.name || "Your Business"}
            </p>
            <div className="border-t border-gray-300 pt-1 w-40 text-center text-gray-400">
              Authorized Signatory
            </div>
          </div>
        </div>

        {/* Footer watermark */}
        <div className="mt-8 text-center">
          <p className="text-[9px] text-gray-300">
            Generated by eBills — ebills.co.in
          </p>
        </div>
      </div>

      {/* Bottom colored bar */}
      <div className="h-1 absolute bottom-0 left-0 right-0" style={{ backgroundColor: theme.accent, opacity: 0.5 }} />
    </div>
  );
}
