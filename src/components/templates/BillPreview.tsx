"use client";

import type { BillData } from "@/types/bill";
import type { BillTemplate } from "@/types/bill";
import { formatCurrency } from "@/lib/pdf";

interface BillPreviewProps {
  bill: BillData;
  template: BillTemplate;
}

export function BillPreview({ bill, template }: BillPreviewProps) {
  const titleMap: Record<string, string> = {
    "standard-invoice": "INVOICE",
    "gst-invoice": "TAX INVOICE",
    "proforma-invoice": "PROFORMA INVOICE",
    receipt: "PAYMENT RECEIPT",
    quotation: "QUOTATION",
    "delivery-challan": "DELIVERY CHALLAN",
    "credit-note": "CREDIT NOTE",
    "freelancer-invoice": "INVOICE",
  };

  const title = titleMap[template.id] || "INVOICE";

  return (
    <div
      id="bill-preview"
      className="bg-white text-black p-8 w-[210mm] min-h-[297mm] mx-auto shadow-lg text-sm"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-6">
        <div className="flex-1">
          {bill.business.logo && (
            <img
              src={bill.business.logo}
              alt="Logo"
              className="h-16 mb-2 object-contain"
            />
          )}
          <h2 className="text-xl font-bold text-gray-900">
            {bill.business.name || "Your Business Name"}
          </h2>
          {bill.business.address && (
            <p className="text-gray-600 text-xs mt-1">
              {bill.business.address}
              {bill.business.city && `, ${bill.business.city}`}
              {bill.business.state && `, ${bill.business.state}`}
              {bill.business.postalCode && ` - ${bill.business.postalCode}`}
            </p>
          )}
          {bill.business.phone && (
            <p className="text-gray-600 text-xs">Phone: {bill.business.phone}</p>
          )}
          {bill.business.email && (
            <p className="text-gray-600 text-xs">Email: {bill.business.email}</p>
          )}
          {template.showGstin && bill.business.gstin && (
            <p className="text-gray-600 text-xs font-semibold">
              GSTIN: {bill.business.gstin}
            </p>
          )}
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
            {title}
          </h1>
          <div className="mt-3 space-y-1">
            <p className="text-xs">
              <span className="font-semibold">No:</span> {bill.billNumber || "---"}
            </p>
            <p className="text-xs">
              <span className="font-semibold">Date:</span>{" "}
              {bill.billDate
                ? new Date(bill.billDate).toLocaleDateString()
                : "---"}
            </p>
            {template.showDueDate && bill.dueDate && (
              <p className="text-xs">
                <span className="font-semibold">Due:</span>{" "}
                {new Date(bill.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-6 bg-gray-50 p-4 rounded">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Bill To
        </h3>
        <p className="font-bold text-base">
          {bill.client.name || "Client Name"}
        </p>
        {bill.client.address && (
          <p className="text-gray-600 text-xs mt-1">
            {bill.client.address}
            {bill.client.city && `, ${bill.client.city}`}
            {bill.client.state && `, ${bill.client.state}`}
            {bill.client.postalCode && ` - ${bill.client.postalCode}`}
          </p>
        )}
        {bill.client.phone && (
          <p className="text-gray-600 text-xs">Phone: {bill.client.phone}</p>
        )}
        {bill.client.email && (
          <p className="text-gray-600 text-xs">Email: {bill.client.email}</p>
        )}
        {template.showGstin && bill.client.gstin && (
          <p className="text-gray-600 text-xs font-semibold">
            GSTIN: {bill.client.gstin}
          </p>
        )}
      </div>

      {/* Items Table */}
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-800 text-white text-xs">
            <th className="p-2 text-left w-8">#</th>
            <th className="p-2 text-left">Description</th>
            {template.showHsnCode && (
              <th className="p-2 text-center">HSN</th>
            )}
            <th className="p-2 text-center w-16">Qty</th>
            <th className="p-2 text-right w-24">Rate</th>
            <th className="p-2 text-right w-28">Amount</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.length === 0 && (
            <tr className="border-b border-gray-200">
              <td colSpan={template.showHsnCode ? 6 : 5} className="p-3 text-center text-gray-400 text-xs">
                No items added yet
              </td>
            </tr>
          )}
          {bill.items.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="p-2 text-xs">{index + 1}</td>
              <td className="p-2 text-xs">{item.description || "—"}</td>
              {template.showHsnCode && (
                <td className="p-2 text-center text-xs">
                  {item.hsnCode || "—"}
                </td>
              )}
              <td className="p-2 text-center text-xs">
                {item.quantity} {item.unit || ""}
              </td>
              <td className="p-2 text-right text-xs">
                {formatCurrency(item.rate, bill.currency)}
              </td>
              <td className="p-2 text-right text-xs font-medium">
                {formatCurrency(item.amount, bill.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end mb-6">
        <div className="w-72">
          <div className="flex justify-between py-1 text-xs">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatCurrency(bill.subtotal, bill.currency)}</span>
          </div>

          {template.showDiscount && bill.discount > 0 && (
            <div className="flex justify-between py-1 text-xs text-green-700">
              <span>
                Discount
                {bill.discountType === "percentage"
                  ? ` (${bill.discount}%)`
                  : ""}
              </span>
              <span>
                -{" "}
                {formatCurrency(
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
              <div key={i} className="flex justify-between py-1 text-xs">
                <span className="text-gray-600">
                  {tax.label} ({tax.rate}%)
                </span>
                <span>{formatCurrency(tax.amount, bill.currency)}</span>
              </div>
            ))}

          {template.showShipping && bill.shippingCharges > 0 && (
            <div className="flex justify-between py-1 text-xs">
              <span className="text-gray-600">Shipping</span>
              <span>
                {formatCurrency(bill.shippingCharges, bill.currency)}
              </span>
            </div>
          )}

          <div className="flex justify-between py-2 mt-1 border-t-2 border-gray-800 font-bold text-base">
            <span>Total</span>
            <span>{formatCurrency(bill.totalAmount, bill.currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(bill.notes || bill.terms) && (
        <div className="border-t border-gray-200 pt-4 space-y-3">
          {bill.notes && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase">
                Notes
              </h4>
              <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                {bill.notes}
              </p>
            </div>
          )}
          {bill.terms && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase">
                Terms & Conditions
              </h4>
              <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                {bill.terms}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer watermark */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-[10px] text-gray-300">
          Generated by eBills — ebills.co.in
        </p>
      </div>
    </div>
  );
}
