"use client";

import { Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";

const typeColors: Record<string, string> = {
  "Oil Change": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "Tire Rotation": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  "Brake Service": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  Inspection: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Battery: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Other Repairs": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
};

export function RecentServices() {
  const serviceRecords = useStore((s) => s.serviceRecords);
  const vehicles = useStore((s) => s.vehicles);

  const recent = [...serviceRecords]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getVehicleName = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "Unknown";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Wrench className="h-4 w-4 text-muted-foreground" />
          Recent Maintenance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No service records yet
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {recent.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{record.type}</span>
                    <Badge
                      variant="secondary"
                      className={typeColors[record.type] || ""}
                    >
                      {record.type}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {getVehicleName(record.vehicleId)} &middot; {formatDate(record.date)}
                  </span>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(record.cost)}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
