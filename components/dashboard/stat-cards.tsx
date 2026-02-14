"use client";

import { Car, Wrench, DollarSign, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export function StatCards() {
  const vehicles = useStore((s) => s.vehicles);
  const serviceRecords = useStore((s) => s.serviceRecords);
  const reminders = useStore((s) => s.reminders);

  const totalSpent = serviceRecords.reduce((sum, r) => sum + r.cost, 0);
  const overdueCount = reminders.filter((r) => r.status === "overdue").length;

  const stats = [
    {
      label: "Total Vehicles",
      value: vehicles.length.toString(),
      icon: Car,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Service Records",
      value: serviceRecords.length.toString(),
      icon: Wrench,
      color: "text-accent bg-accent/10",
    },
    {
      label: "Total Spent",
      value: formatCurrency(totalSpent),
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      label: "Overdue Reminders",
      value: overdueCount.toString(),
      icon: Bell,
      color: overdueCount > 0
        ? "text-red-600 bg-red-500/10 dark:text-red-400"
        : "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={stat.label} className={`animate-fade-in animate-stagger-${i + 1}`}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
