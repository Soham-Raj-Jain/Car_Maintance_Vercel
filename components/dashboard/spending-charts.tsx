"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const PIE_COLORS = [
  "hsl(213, 80%, 50%)",
  "hsl(25, 95%, 55%)",
  "hsl(150, 60%, 45%)",
  "hsl(280, 60%, 55%)",
  "hsl(340, 70%, 55%)",
  "hsl(45, 80%, 50%)",
];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload?: { name: string; value: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="rounded-lg border bg-popover p-2.5 text-popover-foreground shadow-md">
      <p className="text-sm font-medium">{data.payload?.name ?? data.name}</p>
      <p className="text-sm text-muted-foreground">
        {formatCurrency(data.value)}
      </p>
    </div>
  );
}

export function SpendingCharts() {
  const serviceRecords = useStore((s) => s.serviceRecords);

  // Pie chart data: cost by category
  const categoryData = serviceRecords.reduce(
    (acc, r) => {
      const existing = acc.find((item) => item.name === r.type);
      if (existing) {
        existing.value += r.cost;
      } else {
        acc.push({ name: r.type, value: r.cost });
      }
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  // Bar chart data: monthly spending
  const monthlyData = serviceRecords.reduce(
    (acc, r) => {
      const date = new Date(r.date);
      const monthKey = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
      const existing = acc.find((item) => item.month === monthKey);
      if (existing) {
        existing.amount += r.cost;
      } else {
        acc.push({ month: monthKey, amount: r.cost });
      }
      return acc;
    },
    [] as { month: string; amount: number }[]
  );

  // Sort monthly data by date
  monthlyData.sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Spending Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="category">
          <TabsList className="mb-4">
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="category">
            {categoryData.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No spending data yet
              </p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {categoryData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      formatter={(value: string) => (
                        <span className="text-xs text-foreground">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>
          <TabsContent value="monthly">
            {monthlyData.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No spending data yet
              </p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      className="fill-muted-foreground"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      className="fill-muted-foreground"
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="amount"
                      fill="hsl(213, 80%, 50%)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
