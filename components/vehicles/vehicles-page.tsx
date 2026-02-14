"use client";

import { useState } from "react";
import { Plus, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { VehicleCard } from "./vehicle-card";
import { VehicleForm } from "./vehicle-form";
import type { Vehicle } from "@/lib/types";

export function VehiclesPage() {
  const vehicles = useStore((s) => s.vehicles);
  const serviceRecords = useStore((s) => s.serviceRecords);
  const deleteVehicle = useStore((s) => s.deleteVehicle);
  const [formOpen, setFormOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);

  const handleEdit = (vehicle: Vehicle) => {
    setEditVehicle(vehicle);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this vehicle and all its records?")) {
      deleteVehicle(id);
    }
  };

  const getServiceCount = (vehicleId: string) =>
    serviceRecords.filter((r) => r.vehicleId === vehicleId).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">Vehicles</h1>
          <p className="text-sm text-muted-foreground">
            Manage your fleet of {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditVehicle(null);
            setFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {vehicles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <Car className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">No vehicles yet</p>
          <p className="text-sm text-muted-foreground">Add your first vehicle to get started</p>
          <Button
            className="mt-4"
            onClick={() => {
              setEditVehicle(null);
              setFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, i) => (
            <div key={vehicle.id} className={`animate-fade-in animate-stagger-${(i % 4) + 1}`}>
              <VehicleCard
                vehicle={vehicle}
                serviceCount={getServiceCount(vehicle.id)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}

      <VehicleForm
        key={editVehicle?.id ?? "new"}
        open={formOpen}
        onOpenChange={setFormOpen}
        editVehicle={editVehicle}
      />
    </div>
  );
}
