"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import type { Vehicle } from "@/lib/types";

interface VehicleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editVehicle?: Vehicle | null;
}

export function VehicleForm({ open, onOpenChange, editVehicle }: VehicleFormProps) {
  const { addVehicle, updateVehicle } = useStore();
  const [form, setForm] = useState({
    make: editVehicle?.make ?? "",
    model: editVehicle?.model ?? "",
    year: editVehicle?.year?.toString() ?? new Date().getFullYear().toString(),
    mileage: editVehicle?.mileage?.toString() ?? "",
    color: editVehicle?.color ?? "",
    licensePlate: editVehicle?.licensePlate ?? "",
    imageUrl: editVehicle?.imageUrl ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicleData = {
      make: form.make,
      model: form.model,
      year: parseInt(form.year),
      mileage: parseInt(form.mileage) || 0,
      color: form.color,
      licensePlate: form.licensePlate,
      imageUrl: form.imageUrl,
    };

    if (editVehicle) {
      updateVehicle(editVehicle.id, vehicleData);
    } else {
      addVehicle(vehicleData);
    }

    onOpenChange(false);
    setForm({
      make: "",
      model: "",
      year: new Date().getFullYear().toString(),
      mileage: "",
      color: "",
      licensePlate: "",
      imageUrl: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editVehicle ? "Edit Vehicle" : "Add Vehicle"}</DialogTitle>
          <DialogDescription>
            {editVehicle
              ? "Update the details for your vehicle."
              : "Add a new vehicle to track its maintenance."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                placeholder="Toyota"
                value={form.make}
                onChange={(e) => setForm({ ...form, make: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                placeholder="Camry"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max="2030"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                type="number"
                placeholder="25000"
                value={form.mileage}
                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                placeholder="Silver"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="plate">License Plate</Label>
              <Input
                id="plate"
                placeholder="ABC-1234"
                value={form.licensePlate}
                onChange={(e) => setForm({ ...form, licensePlate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{editVehicle ? "Save Changes" : "Add Vehicle"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
