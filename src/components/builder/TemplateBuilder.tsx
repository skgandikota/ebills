"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GripVertical,
  Plus,
  Trash2,
  Save,
  Eye,
  Type,
  Table2,
  Calculator,
  StickyNote,
  Building2,
  User,
  Image as ImageIcon,
  Minus,
} from "lucide-react";
import { saveCustomTemplate, getUserMetadata, saveUserMetadata } from "@/lib/github";
import type { TemplateField, BillTemplate, TemplateType } from "@/types/bill";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type BlockType =
  | "header"
  | "business-info"
  | "client-info"
  | "items-table"
  | "totals"
  | "notes"
  | "terms"
  | "signature"
  | "divider"
  | "custom-text";

interface BuilderBlock {
  id: string;
  type: BlockType;
  label: string;
  visible: boolean;
  config: Record<string, string | boolean>;
}

const BLOCK_TYPES: { type: BlockType; label: string; icon: React.ElementType }[] = [
  { type: "header", label: "Document Header", icon: Type },
  { type: "business-info", label: "Business Info", icon: Building2 },
  { type: "client-info", label: "Client / Bill To", icon: User },
  { type: "items-table", label: "Items Table", icon: Table2 },
  { type: "totals", label: "Totals & Summary", icon: Calculator },
  { type: "notes", label: "Notes", icon: StickyNote },
  { type: "terms", label: "Terms & Conditions", icon: StickyNote },
  { type: "signature", label: "Signature Area", icon: User },
  { type: "divider", label: "Divider Line", icon: Minus },
  { type: "custom-text", label: "Custom Text Block", icon: Type },
];

const DEFAULT_BLOCKS: BuilderBlock[] = [
  { id: "blk-1", type: "header", label: "Document Header", visible: true, config: {} },
  { id: "blk-2", type: "business-info", label: "Business Info", visible: true, config: {} },
  { id: "blk-3", type: "client-info", label: "Bill To", visible: true, config: {} },
  { id: "blk-4", type: "divider", label: "Divider", visible: true, config: {} },
  { id: "blk-5", type: "items-table", label: "Items Table", visible: true, config: { showHsn: "false" } },
  { id: "blk-6", type: "totals", label: "Summary", visible: true, config: {} },
  { id: "blk-7", type: "notes", label: "Notes", visible: true, config: {} },
  { id: "blk-8", type: "terms", label: "Terms", visible: true, config: {} },
  { id: "blk-9", type: "signature", label: "Signature", visible: true, config: {} },
];

const COLOR_PRESETS = [
  { name: "Slate Blue", primary: "#1e293b", accent: "#3b82f6" },
  { name: "Purple", primary: "#7c3aed", accent: "#8b5cf6" },
  { name: "Teal", primary: "#0f766e", accent: "#14b8a6" },
  { name: "Emerald", primary: "#059669", accent: "#34d399" },
  { name: "Amber", primary: "#d97706", accent: "#fbbf24" },
  { name: "Red", primary: "#dc2626", accent: "#f87171" },
  { name: "Rose", primary: "#e11d48", accent: "#fb7185" },
  { name: "Blue", primary: "#2563eb", accent: "#60a5fa" },
];

function SortableBlock({
  block,
  onToggle,
  onRemove,
  onUpdateConfig,
}: {
  block: BuilderBlock;
  onToggle: () => void;
  onRemove: () => void;
  onUpdateConfig: (key: string, val: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
        block.visible ? "bg-card border-border" : "bg-muted/50 border-dashed border-muted-foreground/30 opacity-60"
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {block.label}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-7 px-2 text-xs"
            >
              {block.visible ? "Hide" : "Show"}
            </Button>
            {block.type === "custom-text" && (
              <Button variant="ghost" size="sm" onClick={onRemove} className="h-7 px-2">
                <Trash2 className="h-3 w-3 text-destructive" />
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground capitalize">{block.type.replace(/-/g, " ")}</p>
        {/* Block-specific config */}
        {block.type === "custom-text" && block.visible && (
          <Input
            className="mt-2 text-xs"
            placeholder="Enter your custom text..."
            value={String(block.config.text || "")}
            onChange={(e) => onUpdateConfig("text", e.target.value)}
          />
        )}
        {block.type === "items-table" && block.visible && (
          <label className="flex items-center gap-2 mt-2 text-xs">
            <input
              type="checkbox"
              checked={block.config.showHsn === "true"}
              onChange={(e) => onUpdateConfig("showHsn", String(e.target.checked))}
            />
            Show HSN/SAC column
          </label>
        )}
      </div>
    </div>
  );
}

export function TemplateBuilder() {
  const router = useRouter();
  const [blocks, setBlocks] = useState<BuilderBlock[]>(DEFAULT_BLOCKS);
  const [templateName, setTemplateName] = useState("");
  const [colorPreset, setColorPreset] = useState(0);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((prev) => {
        const oldIdx = prev.findIndex((b) => b.id === active.id);
        const newIdx = prev.findIndex((b) => b.id === over.id);
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  }, []);

  const addBlock = (type: BlockType) => {
    const id = `blk-${Date.now()}`;
    const info = BLOCK_TYPES.find((b) => b.type === type);
    setBlocks((prev) => [
      ...prev,
      { id, type, label: info?.label || type, visible: true, config: {} },
    ]);
  };

  const toggleBlock = (id: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, visible: !b.visible } : b))
    );
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const updateConfig = (id: string, key: string, val: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, config: { ...b.config, [key]: val } } : b
      )
    );
  };

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast.error("Enter a template name");
      return;
    }

    setSaving(true);
    try {
      const color = COLOR_PRESETS[colorPreset];
      const fields: TemplateField[] = blocks
        .filter((b) => b.visible)
        .map((b, i) => ({
          id: b.id,
          type: b.type as TemplateField["type"],
          label: b.label,
          order: i,
          config: b.config,
        }));

      const customTemplate: BillTemplate = {
        id: `custom-${Date.now()}` as TemplateType,
        name: templateName,
        description: `Custom template: ${templateName}`,
        fields,
        showGstin: blocks.some(
          (b) => b.type === "items-table" && b.config.showHsn === "true"
        ),
        showHsnCode: blocks.some(
          (b) => b.type === "items-table" && b.config.showHsn === "true"
        ),
        showDueDate: true,
        showDiscount: true,
        showTax: true,
        showShipping: true,
        defaultCurrency: "INR",
        color: color.primary,
        accentColor: color.accent,
      };

      await saveCustomTemplate(customTemplate);
      toast.success("Template saved!");
      router.push("/dashboard/bills/new");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save template");
    } finally {
      setSaving(false);
    }
  };

  const visibleBlocks = blocks.filter((b) => b.visible);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Template Builder</h1>
        <p className="text-muted-foreground mt-1">
          Drag sections to reorder, toggle visibility, and customize your bill layout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Builder Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Template meta */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Template Name</Label>
                  <Input
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="My Custom Invoice"
                  />
                </div>
                <div>
                  <Label>Color Theme</Label>
                  <div className="flex gap-2 mt-2">
                    {COLOR_PRESETS.map((c, i) => (
                      <button
                        key={i}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          i === colorPreset ? "border-foreground scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.primary }}
                        onClick={() => setColorPreset(i)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={blocks.map((b) => b.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {blocks.map((block) => (
                    <SortableBlock
                      key={block.id}
                      block={block}
                      onToggle={() => toggleBlock(block.id)}
                      onRemove={() => removeBlock(block.id)}
                      onUpdateConfig={(k, v) => updateConfig(block.id, k, v)}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              {/* Add block */}
              <div className="pt-3 border-t">
                <p className="text-xs text-muted-foreground mb-2">Add new section:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { type: "divider" as BlockType, label: "Divider" },
                    { type: "custom-text" as BlockType, label: "Custom Text" },
                  ].map((b) => (
                    <Button
                      key={b.type}
                      variant="outline"
                      size="sm"
                      onClick={() => addBlock(b.type)}
                      className="gap-1 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                      {b.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Template"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? "Hide Preview" : "Preview"}
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div className={`${previewMode ? "block" : "hidden lg:block"}`}>
          <div className="sticky top-4">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Live Preview</h3>
            <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
              <div className="h-2" style={{ backgroundColor: COLOR_PRESETS[colorPreset].primary }} />
              <div className="p-4 text-[10px] space-y-3">
                {visibleBlocks.map((block) => (
                  <div key={block.id}>
                    {block.type === "header" && (
                      <div className="flex justify-between items-start pb-2 border-b" style={{ borderColor: COLOR_PRESETS[colorPreset].accent + "40" }}>
                        <div>
                          <div className="w-10 h-4 bg-gray-200 rounded mb-1" />
                          <p className="font-bold text-xs" style={{ color: COLOR_PRESETS[colorPreset].primary }}>
                            {templateName || "Your Business"}
                          </p>
                        </div>
                        <p className="font-extrabold text-sm" style={{ color: COLOR_PRESETS[colorPreset].primary }}>
                          INVOICE
                        </p>
                      </div>
                    )}
                    {block.type === "business-info" && (
                      <div className="space-y-0.5 text-gray-400">
                        <div className="w-24 h-2 bg-gray-100 rounded" />
                        <div className="w-32 h-2 bg-gray-100 rounded" />
                      </div>
                    )}
                    {block.type === "client-info" && (
                      <div className="p-2 rounded" style={{ backgroundColor: COLOR_PRESETS[colorPreset].accent + "10" }}>
                        <p className="font-bold mb-0.5" style={{ color: COLOR_PRESETS[colorPreset].accent, fontSize: "8px" }}>
                          BILL TO
                        </p>
                        <div className="w-20 h-2 bg-gray-200 rounded" />
                      </div>
                    )}
                    {block.type === "items-table" && (
                      <div>
                        <div className="flex gap-1 p-1 rounded text-white text-[8px]" style={{ backgroundColor: COLOR_PRESETS[colorPreset].primary }}>
                          <span className="flex-1">#</span>
                          <span className="flex-[3]">Description</span>
                          <span className="flex-1 text-right">Qty</span>
                          <span className="flex-1 text-right">Amt</span>
                        </div>
                        {[1, 2].map((r) => (
                          <div key={r} className="flex gap-1 p-1 border-b border-gray-100 text-gray-400">
                            <span className="flex-1">{r}</span>
                            <span className="flex-[3]">Item {r}</span>
                            <span className="flex-1 text-right">1</span>
                            <span className="flex-1 text-right">$0</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {block.type === "totals" && (
                      <div className="flex justify-end">
                        <div className="w-28 p-1.5 rounded text-white text-[9px] font-bold text-right" style={{ backgroundColor: COLOR_PRESETS[colorPreset].primary }}>
                          Total: $0.00
                        </div>
                      </div>
                    )}
                    {block.type === "notes" && (
                      <div className="text-gray-300"><span className="text-[8px] font-bold text-gray-400">NOTES</span><br />Your notes here...</div>
                    )}
                    {block.type === "terms" && (
                      <div className="text-gray-300"><span className="text-[8px] font-bold text-gray-400">TERMS</span><br />Terms &amp; conditions...</div>
                    )}
                    {block.type === "signature" && (
                      <div className="flex justify-between text-gray-300 mt-4 pt-2">
                        <div className="border-t border-gray-200 w-16 text-center pt-0.5">Receiver</div>
                        <div className="border-t border-gray-200 w-16 text-center pt-0.5">Authorized</div>
                      </div>
                    )}
                    {block.type === "divider" && (
                      <div className="h-px" style={{ backgroundColor: COLOR_PRESETS[colorPreset].accent + "30" }} />
                    )}
                    {block.type === "custom-text" && (
                      <p className="text-gray-500 italic">{block.config.text || "Custom text..."}</p>
                    )}
                  </div>
                ))}
                <p className="text-center text-[7px] text-gray-200 mt-4">
                  Generated by eBills
                </p>
              </div>
              <div className="h-1" style={{ backgroundColor: COLOR_PRESETS[colorPreset].accent, opacity: 0.5 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
