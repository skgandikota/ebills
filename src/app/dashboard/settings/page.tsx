"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserMetadata, saveUserMetadata } from "@/lib/github";
import type { UserMetadata } from "@/types/bill";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [metadata, setMetadata] = useState<UserMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getUserMetadata();
        setMetadata(data);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    if (!metadata) return;
    setSaving(true);
    try {
      await saveUserMetadata(metadata);
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !metadata) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your default preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Default Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Business Name</Label>
              <Input
                value={metadata.defaultBusiness?.name || ""}
                onChange={(e) =>
                  setMetadata({
                    ...metadata,
                    defaultBusiness: {
                      ...metadata.defaultBusiness!,
                      name: e.target.value,
                      address: metadata.defaultBusiness?.address || "",
                      city: metadata.defaultBusiness?.city || "",
                      state: metadata.defaultBusiness?.state || "",
                      postalCode: metadata.defaultBusiness?.postalCode || "",
                      country: metadata.defaultBusiness?.country || "",
                    },
                  })
                }
                placeholder="Your Business Name"
              />
            </div>
            <div className="col-span-2">
              <Label>Address</Label>
              <Input
                value={metadata.defaultBusiness?.address || ""}
                onChange={(e) =>
                  setMetadata({
                    ...metadata,
                    defaultBusiness: {
                      ...metadata.defaultBusiness!,
                      name: metadata.defaultBusiness?.name || "",
                      address: e.target.value,
                      city: metadata.defaultBusiness?.city || "",
                      state: metadata.defaultBusiness?.state || "",
                      postalCode: metadata.defaultBusiness?.postalCode || "",
                      country: metadata.defaultBusiness?.country || "",
                    },
                  })
                }
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={metadata.defaultBusiness?.phone || ""}
                onChange={(e) =>
                  setMetadata({
                    ...metadata,
                    defaultBusiness: {
                      ...metadata.defaultBusiness!,
                      name: metadata.defaultBusiness?.name || "",
                      address: metadata.defaultBusiness?.address || "",
                      city: metadata.defaultBusiness?.city || "",
                      state: metadata.defaultBusiness?.state || "",
                      postalCode: metadata.defaultBusiness?.postalCode || "",
                      country: metadata.defaultBusiness?.country || "",
                      phone: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={metadata.defaultBusiness?.email || ""}
                onChange={(e) =>
                  setMetadata({
                    ...metadata,
                    defaultBusiness: {
                      ...metadata.defaultBusiness!,
                      name: metadata.defaultBusiness?.name || "",
                      address: metadata.defaultBusiness?.address || "",
                      city: metadata.defaultBusiness?.city || "",
                      state: metadata.defaultBusiness?.state || "",
                      postalCode: metadata.defaultBusiness?.postalCode || "",
                      country: metadata.defaultBusiness?.country || "",
                      email: e.target.value,
                    },
                  })
                }
                type="email"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Default Currency</Label>
              <Select
                value={metadata.preferences.defaultCurrency}
                onValueChange={(v) => {
                  if (!v) return;
                  setMetadata({
                    ...metadata,
                    preferences: {
                      ...metadata.preferences,
                      defaultCurrency: v,
                    },
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="AUD">AUD (A$)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Default Template</Label>
              <Select
                value={metadata.preferences.defaultTemplate}
                onValueChange={(v) => {
                  if (!v) return;
                  setMetadata({
                    ...metadata,
                    preferences: {
                      ...metadata.preferences,
                      defaultTemplate: v,
                    },
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard-invoice">Standard Invoice</SelectItem>
                  <SelectItem value="gst-invoice">GST Invoice</SelectItem>
                  <SelectItem value="proforma-invoice">Proforma Invoice</SelectItem>
                  <SelectItem value="receipt">Payment Receipt</SelectItem>
                  <SelectItem value="quotation">Quotation</SelectItem>
                  <SelectItem value="freelancer-invoice">Freelancer Invoice</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Next Bill Number</Label>
            <Input
              type="number"
              min="1"
              value={metadata.nextBillNumber}
              onChange={(e) =>
                setMetadata({
                  ...metadata,
                  nextBillNumber: parseInt(e.target.value) || 1,
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="gap-2">
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}
