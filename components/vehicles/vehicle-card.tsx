"use client";

import { Car, Gauge, Palette, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Vehicle } from "@/lib/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  serviceCount: number;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

export function VehicleCard({ vehicle, serviceCount, onEdit, onDelete }: VehicleCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-shadow hover:shadow-md">
      {/* Vehicle color accent bar */}
      <div className="h-2 bg-gradient-to-r from-primary to-primary/60" />
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              {vehicle.licensePlate && (
                <span className="text-xs text-muted-foreground font-mono">
                  {vehicle.licensePlate}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(vehicle)} aria-label="Edit vehicle">
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(vehicle.id)} aria-label="Delete vehicle">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2.5">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Mileage</span>
              <span className="text-sm font-medium">
                {vehicle.mileage.toLocaleString()} mi
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2.5">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Color</span>
              <span className="text-sm font-medium">{vehicle.color || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Badge variant="secondary">
            {serviceCount} service{serviceCount !== 1 ? "s" : ""} recorded
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
