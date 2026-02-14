"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import { SERVICE_TYPES } from "@/lib/types";
import type { ServiceType } from "@/lib/types";

interface ServiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceForm({ open, onOpenChange }: ServiceFormProps) {
  const { vehicles, addServiceRecord } = useStore();
  const [form, setForm] = useState({
    vehicleId: "",
    type: "" as ServiceType | "",
    date: new Date().toISOString().split("T")[0],
    mileage: "",
    cost: "",
    shop: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicleId || !form.type) return;

    addServiceRecord({
      vehicleId: form.vehicleId,
      type: form.type as ServiceType,
      date: form.date,
      mileage: parseInt(form.mileage) || 0,
      cost: parseFloat(form.cost) || 0,
      shop: form.shop,
      notes: form.notes,
    });

    onOpenChange(false);
    setForm({
      vehicleId: "",
      type: "",
      date: new Date().toISOString().split("T")[0],
      mileage: "",
      cost: "",
      shop: "",
      notes: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Service Record</DialogTitle>
          <DialogDescription>
            Log a new maintenance or repair for one of your vehicles.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="vehicle-select">Vehicle</Label>
            <Select value={form.vehicleId} onValueChange={(v) => setForm({ ...form, vehicleId: v })}>
              <SelectTrigger id="vehicle-select">
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.year} {v.make} {v.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="service-type">Service Type</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as ServiceType })}>
              <SelectTrigger id="service-type">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="service-date">Date</Label>
              <Input
                id="service-date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="service-mileage">Mileage</Label>
              <Input
                id="service-mileage"
                type="number"
                placeholder="28000"
                value={form.mileage}
                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="service-cost">Cost ($)</Label>
              <Input
                id="service-cost"
                type="number"
                step="0.01"
                placeholder="65.00"
                value={form.cost}
                onChange={(e) => setForm({ ...form, cost: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="service-shop">Shop Name</Label>
              <Input
                id="service-shop"
                placeholder="QuickLube Express"
                value={form.shop}
                onChange={(e) => setForm({ ...form, shop: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="service-notes">Notes</Label>
            <Textarea
              id="service-notes"
              placeholder="Add any additional details..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.vehicleId || !form.type}>
              Save Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
