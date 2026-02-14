"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Wrench, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ServiceForm } from "./service-form";

const typeColors: Record<string, string> = {
  "Oil Change": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "Tire Rotation": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  "Brake Service": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  Inspection: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Battery: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Other Repairs": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
};

export function ServicesPage() {
  const vehicles = useStore((s) => s.vehicles);
  const serviceRecords = useStore((s) => s.serviceRecords);
  const deleteServiceRecord = useStore((s) => s.deleteServiceRecord);
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterVehicle, setFilterVehicle] = useState("all");

  const getVehicleName = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "Unknown";
  };

  const filteredRecords = useMemo(() => {
    let records = [...serviceRecords];

    if (filterVehicle !== "all") {
      records = records.filter((r) => r.vehicleId === filterVehicle);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      records = records.filter(
        (r) =>
          r.type.toLowerCase().includes(query) ||
          r.shop.toLowerCase().includes(query) ||
          r.notes.toLowerCase().includes(query) ||
          getVehicleName(r.vehicleId).toLowerCase().includes(query)
      );
    }

    return records.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [serviceRecords, filterVehicle, search, vehicles]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service record?")) {
      deleteServiceRecord(id);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-balance">Service History</h1>
          <p className="text-sm text-muted-foreground">
            {serviceRecords.length} record{serviceRecords.length !== 1 ? "s" : ""} across all vehicles
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterVehicle} onValueChange={setFilterVehicle}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Filter by vehicle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vehicles</SelectItem>
            {vehicles.map((v) => (
              <SelectItem key={v.id} value={v.id}>
                {v.year} {v.make} {v.model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Service Records Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            Service Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Wrench className="h-10 w-10 text-muted-foreground/50" />
              <p className="mt-3 text-sm text-muted-foreground">No records found</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-muted-foreground">Date</th>
                      <th className="pb-3 font-medium text-muted-foreground">Vehicle</th>
                      <th className="pb-3 font-medium text-muted-foreground">Type</th>
                      <th className="pb-3 font-medium text-muted-foreground">Cost</th>
                      <th className="pb-3 font-medium text-muted-foreground">Shop</th>
                      <th className="pb-3 font-medium text-muted-foreground">Mileage</th>
                      <th className="pb-3 font-medium text-muted-foreground">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b last:border-b-0 transition-colors hover:bg-muted/50"
                      >
                        <td className="py-3">{formatDate(record.date)}</td>
                        <td className="py-3">{getVehicleName(record.vehicleId)}</td>
                        <td className="py-3">
                          <Badge variant="secondary" className={typeColors[record.type] || ""}>
                            {record.type}
                          </Badge>
                        </td>
                        <td className="py-3 font-medium">{formatCurrency(record.cost)}</td>
                        <td className="py-3 text-muted-foreground">{record.shop}</td>
                        <td className="py-3 text-muted-foreground font-mono text-xs">
                          {record.mileage.toLocaleString()} mi
                        </td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(record.id)}
                            aria-label="Delete record"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List */}
              <div className="flex flex-col gap-3 md:hidden">
                {filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={typeColors[record.type] || ""}>
                            {record.type}
                          </Badge>
                          <span className="text-sm font-semibold">
                            {formatCurrency(record.cost)}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {getVehicleName(record.vehicleId)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(record.date)} &middot; {record.shop}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(record.id)}
                        aria-label="Delete record"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    {record.notes && (
                      <p className="mt-2 text-xs text-muted-foreground">{record.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <ServiceForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
