"use client";

import { useState, useEffect } from "react";
import type { ClientInfo } from "@/types/bill";
import { getUserMetadata, saveUserMetadata } from "@/lib/github";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Plus, Trash2, Check } from "lucide-react";
import { toast } from "sonner";

interface ClientPickerProps {
  onSelect: (client: ClientInfo) => void;
  currentClient?: ClientInfo;
}

export function ClientPicker({ onSelect, currentClient }: ClientPickerProps) {
  const [clients, setClients] = useState<ClientInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) return;
    loadClients();
  }, [open]);

  async function loadClients() {
    try {
      const meta = await getUserMetadata();
      setClients(meta.savedClients || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function saveCurrentClient() {
    if (!currentClient?.name) {
      toast.error("Fill in client name first");
      return;
    }
    try {
      const meta = await getUserMetadata();
      const exists = meta.savedClients.some(
        (c) => c.name === currentClient.name && c.email === currentClient.email
      );
      if (exists) {
        toast.info("Client already saved");
        return;
      }
      meta.savedClients.push(currentClient);
      await saveUserMetadata(meta);
      setClients(meta.savedClients);
      toast.success(`Saved "${currentClient.name}"`);
    } catch {
      toast.error("Failed to save client");
    }
  }

  async function deleteClient(index: number) {
    try {
      const meta = await getUserMetadata();
      meta.savedClients.splice(index, 1);
      await saveUserMetadata(meta);
      setClients([...meta.savedClients]);
      toast.success("Client removed");
    } catch {
      toast.error("Failed to delete");
    }
  }

  const filtered = clients.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Saved Clients
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Saved Clients</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
          />
          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Loading...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              {clients.length === 0
                ? 'No saved clients. Use "Save Client" to add one.'
                : "No matching clients."}
            </p>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {filtered.map((client, i) => (
                <Card key={i} className="cursor-pointer hover:shadow-sm">
                  <CardContent className="py-3 flex items-center justify-between">
                    <button
                      className="flex-1 text-left"
                      onClick={() => {
                        onSelect(client);
                        setOpen(false);
                        toast.success(`Selected "${client.name}"`);
                      }}
                    >
                      <p className="font-medium text-sm">{client.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {[client.email, client.phone, client.city]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </button>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onSelect(client);
                          setOpen(false);
                        }}
                      >
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteClient(i)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
      {currentClient?.name && (
        <Button variant="ghost" size="sm" onClick={saveCurrentClient} className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Save Client
        </Button>
      )}
    </div>
  );
}
