"use client";

import { Bell, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

const statusConfig = {
  overdue: {
    icon: AlertTriangle,
    variant: "danger" as const,
    label: "Overdue",
    border: "border-l-red-500",
  },
  soon: {
    icon: Clock,
    variant: "warning" as const,
    label: "Due Soon",
    border: "border-l-amber-500",
  },
  ok: {
    icon: CheckCircle2,
    variant: "success" as const,
    label: "On Track",
    border: "border-l-emerald-500",
  },
};

export function RemindersList() {
  const reminders = useStore((s) => s.reminders);
  const vehicles = useStore((s) => s.vehicles);

  const sortedReminders = [...reminders].sort((a, b) => {
    const priority = { overdue: 0, soon: 1, ok: 2 };
    return priority[a.status] - priority[b.status];
  });

  const getVehicleName = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "Unknown";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Bell className="h-4 w-4 text-muted-foreground" />
          Upcoming Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedReminders.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No reminders set
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedReminders.map((reminder) => {
              const config = statusConfig[reminder.status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={reminder.id}
                  className={`flex items-center justify-between rounded-lg border border-l-4 p-3 ${config.border} transition-colors hover:bg-muted/50`}
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">{reminder.type}</span>
                      <span className="text-xs text-muted-foreground">
                        {getVehicleName(reminder.vehicleId)} &middot; Due{" "}
                        {formatDate(reminder.dueDate)}
                      </span>
                    </div>
                  </div>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
