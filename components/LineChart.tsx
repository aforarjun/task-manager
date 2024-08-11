"use client";

import React, { useCallback } from 'react';
import { ChartContainer } from "@/components/ui/chart";
import { CartesianGrid, XAxis, Line, LineChart, YAxis, Tooltip, Legend } from "recharts";
import { Task } from '@/lib/interface';
import { aggregateDataByMonth } from '@/lib/utils';

export const LineChartView = ({ className, tasks }: {className: string, tasks: Task[] }) => {
  const progressData = useCallback(() => {
    return aggregateDataByMonth(tasks);
  }, [tasks.length])

  return (
    <div className={className}>
      <ChartContainer
        config={{
          desktop: {
            label: "Tasks",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          width={600}
          height={400}
          data={progressData()}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tasksCompleted" stroke="#82ca9d" name="Tasks Completed" />
          <Line type="monotone" dataKey="tasksPending" stroke="#8884d8" name="Tasks Pending" />
          <Line type="monotone" dataKey="performanceScore" stroke="#ff7300" name="Performance Score" />
        </LineChart>
      </ChartContainer>
    </div>
  );
};
