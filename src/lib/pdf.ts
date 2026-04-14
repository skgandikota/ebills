import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDF(
  elementId: string,
  filename: string
): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element #${elementId} not found`);

  // Temporarily remove any scale transform on parent for accurate capture
  const scaledParent = element.closest("[class*='scale-']") as HTMLElement | null;
  const originalTransform = scaledParent?.style.transform;
  const originalWidth = scaledParent?.style.width;
  if (scaledParent) {
    scaledParent.style.transform = "none";
    scaledParent.style.width = "auto";
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  // Restore transform
  if (scaledParent) {
    scaledParent.style.transform = originalTransform || "";
    scaledParent.style.width = originalWidth || "";
  }

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const width = imgWidth * ratio;
  const height = imgHeight * ratio;

  const x = (pdfWidth - width) / 2;

  pdf.addImage(imgData, "PNG", x, 0, width, height);
  return pdf.output("blob");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(amount);
}

export function generateBillId(): string {
  return `bill_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function generateBillNumber(nextNumber: number, prefix: string = "INV"): string {
  return `${prefix}-${String(nextNumber).padStart(5, "0")}`;
}
