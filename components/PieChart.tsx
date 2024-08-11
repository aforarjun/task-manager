"use client"

import React from 'react';
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { Pie, PieChart } from "recharts"

export const Piechart = ({className, priority}: any) => {
  return (
    
    <div className={className}>
      <ChartContainer
        config={{
          visitors: {
            label: "Tasks Piority",
          },
          high: {
            label: "High",
            color: "hsl(var(--chart-1))",
          },
          medium: {
            label: "Medium",
            color: "hsl(var(--chart-2))",
          },
          law: {
            label: "Law",
            color: "hsl(var(--chart-3))",
          },
        }}
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={[
              { tasks: "high", visitors: priority.high, fill: "hsl(var(--chart-1))" },
              { tasks: "medium", visitors: priority.medium, fill: "hsl(var(--chart-2))" },
              { tasks: "law", visitors: priority.law, fill: "hsl(var(--chart-3))" },
            ]}
            dataKey="visitors"
            nameKey="tasks"
          />
        </PieChart>
      </ChartContainer>
    </div>
  )
}