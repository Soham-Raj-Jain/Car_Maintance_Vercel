"use client";

import { StatCards } from "./stat-cards";
import { RecentServices } from "./recent-services";
import { SpendingCharts } from "./spending-charts";
import { RemindersList } from "./reminders-list";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your vehicle maintenance
        </p>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SpendingCharts />
        <RemindersList />
      </div>

      <RecentServices />
    </div>
  );
}
