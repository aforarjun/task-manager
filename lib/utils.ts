import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Task } from "./interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


export const getCompletedTasks = (tasks: Task[]) => tasks?.filter((task) => task.isComplete) || [];

export const getOverDueTaks = (tasks: Task[]) => tasks?.filter((task) => new Date(task.dueDate!) < new Date()) || [];

export const getUpcomingTasks = (tasks: Task[]) => tasks.filter(task => new Date(task.dueDate!) > new Date());

export const getInProcessTasks = (tasks: Task[]) => tasks?.filter((task) => !task.isComplete) || []

export const getNextThreeUpcomingTasks = (tasks: Task[]) => {
  const upcomingTasks = getUpcomingTasks(tasks);
  upcomingTasks.sort((a, b) => {
    const dateA = new Date(a.dueDate!);
    const dateB = new Date(b.dueDate!);

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }

    return 0;
  });

  return upcomingTasks.slice(0, 3);
};

export const aggregateDataByMonth = (tasks: Task[]) => {
  const monthlyData = tasks.reduce((acc, task) => {
    const month = task?.dueDate!.toString().slice(0, 7); // Get the year-month part of the date
    if (!acc[month]) {
      acc[month] = { tasksCompleted: 0, tasksPending: 0, performanceScore: 0 };
    }
    if (task.isComplete) {
      acc[month].tasksCompleted += 1;
    } else {
      acc[month].tasksPending += 1;
    }
    return acc;
  }, {} as { [key: string]: { tasksCompleted: number, tasksPending: number, performanceScore: number } });

  // Calculate performance score (you can adjust the formula based on your needs)
  Object.keys(monthlyData).forEach(month => {
    const data = monthlyData[month];
    const totalTasks = data.tasksCompleted + data.tasksPending;
    data.performanceScore = totalTasks ? Math.round((data.tasksCompleted / totalTasks) * 100) : 0;
  });

  // Format the data for the chart
  const formattedData = Object.keys(monthlyData).map(month => ({
    date: month, // Keep the year-month format
    ...monthlyData[month],
  }));

  return formattedData;
};
