export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  hsnCode?: string;
  unit?: string;
}

export interface TaxDetail {
  label: string; // e.g., "CGST", "SGST", "IGST", "VAT", "Sales Tax"
  rate: number; // Percentage
  amount: number;
}

export interface BusinessInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  gstin?: string;
  pan?: string;
  logo?: string; // Base64 or GitHub raw URL
}

export interface ClientInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  gstin?: string;
}

export interface BillData {
  id: string;
  templateId: string;
  billNumber: string;
  billDate: string; // ISO date
  dueDate?: string; // ISO date
  business: BusinessInfo;
  client: ClientInfo;
  items: LineItem[];
  subtotal: number;
  taxes: TaxDetail[];
  discount: number;
  discountType: "fixed" | "percentage";
  shippingCharges: number;
  totalAmount: number;
  currency: string; // ISO 4217 code
  notes?: string;
  terms?: string;
  status: "draft" | "final";
}

export interface BillMeta {
  id: string;
  billNumber: string;
  clientName: string;
  totalAmount: number;
  currency: string;
  templateId: string;
  status: "draft" | "final";
  createdAt: string;
  updatedAt: string;
}

export type TemplateType =
  | "standard-invoice"
  | "gst-invoice"
  | "proforma-invoice"
  | "receipt"
  | "quotation"
  | "delivery-challan"
  | "credit-note"
  | "freelancer-invoice";

export interface BillTemplate {
  id: TemplateType | string;
  name: string;
  description: string;
  category: "invoice" | "receipt" | "quotation" | "other";
  icon: string; // Lucide icon name
  fields: TemplateField[];
  showTax: boolean;
  showDiscount: boolean;
  showShipping: boolean;
  showDueDate: boolean;
  showHsnCode: boolean;
  showGstin: boolean;
  defaultCurrency: string;
}

export interface TemplateField {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "textarea" | "select";
  required: boolean;
  placeholder?: string;
  options?: string[]; // For select fields
  section: "business" | "client" | "bill" | "items" | "summary";
}

export interface UserMetadata {
  nextBillNumber: number;
  defaultBusiness?: BusinessInfo;
  savedClients: ClientInfo[];
  customTemplates: string[]; // IDs of custom templates
  preferences: {
    defaultCurrency: string;
    defaultTemplate: string;
    dateFormat: string;
  };
}
