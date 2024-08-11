import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, ClockIcon, HourglassIcon, ListIcon, PlusIcon } from "@/components/svg-icons";
import { Piechart } from "@/components/PieChart";
import { LineChartView } from "@/components/LineChart";
import { getTasks } from "@/firebase/tasks/getAllTasks";
import { getCompletedTasks, getInProcessTasks, getNextThreeUpcomingTasks, getOverDueTaks, getUpcomingTasks } from "@/lib/utils";
import DropDownActions from "@/components/DropDownActions";

export default async function Home() {
  const { result: tasks, error } = await getTasks();

  const priority: Record<'high' | 'medium' | 'law', number> = {
    high: 0,
    medium: 0,
    law: 0,
  };

  const completedTaks = getCompletedTasks(tasks || []).length;
  const overdueTasks = getOverDueTaks(tasks || []).length;
  const inProcessTasks = (tasks?.length || 0) - completedTaks;
  const upCommingTasks = getUpcomingTasks(tasks || []).length;

  getInProcessTasks(tasks || []).forEach(task => ++priority[task.priority!]);
  
  return (
    <main className="mt-20 flex flex-col flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-10">
      <div className="grid w-full auto-rows-max gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
            <CardDescription>A summary of your tasks and their status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListIcon className="h-5 w-5" />
                  <span>Total Tasks</span>
                </div>
                <div className="font-semibold">{tasks?.length}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5" />
                  <span>Completed</span>
                </div>
                <div className="font-semibold">{completedTaks}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5" />
                  <span>Overdue</span>
                </div>
                <div className="font-semibold">{overdueTasks}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HourglassIcon className="h-5 w-5" />
                  <span>In Progress</span>
                </div>
                <div className="font-semibold">{inProcessTasks}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlusIcon className="h-5 w-5" />
                  <span>Up Comming Tasks</span>
                </div>
                <div className="font-semibold">{upCommingTasks}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ========================= Task prioritries Pie chart ========================= */}
        <Card>
          <CardHeader>
            <CardTitle>Task Priorities</CardTitle>
            <CardDescription>The distribution of task priorities.</CardDescription>
          </CardHeader>
          <CardContent>
            <Piechart className="aspect-square" priority={priority} />
          </CardContent>
        </Card>

        {/* ========================= Task prioritries Line chart ========================= */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>The progress of task completion over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChartView className="aspect-[9/4]" tasks={tasks || []} />
          </CardContent>
        </Card>
      </div>

      {/* ========================= 3 Top Upcoming tasks ========================= */}
      <div className="grid gap-4 md:col-span-2 lg:col-span-3 xl:col-span-4">
        <Card className="max-h-96 overflow-auto">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>A list of your upcoming tasks.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>
                    <span>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getNextThreeUpcomingTasks(tasks || []).map(task => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">{task.description}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{task.dueDate?.toString()}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{task.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropDownActions task={task} taskId={task.id!} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A timeline of your recent task activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckIcon className="h-4 w-4" />
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">Task Completed</div>
                  <div className="text-sm text-muted-foreground">
                    You completed the "Finish quarterly report" task.
                  </div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <PlusIcon className="h-4 w-4" />
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">New Task Created</div>
                  <div className="text-sm text-muted-foreground">
                    You created a new task: "Prepare for client meeting".
                  </div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <ClockIcon className="h-4 w-4" />
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">Task Overdue</div>
                  <div className="text-sm text-muted-foreground">
                    The "Implement new feature" task is now overdue.
                  </div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </main>
  );
}
