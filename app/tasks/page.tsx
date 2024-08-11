import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { getTasks } from '@/firebase/tasks/getAllTasks'
import { Task } from '@/lib/interface'
import React from 'react'
import DropDownActions from '../../components/DropDownActions'
import Header from './ui/Header'
import { Checkbox } from '@/components/ui/checkbox'

async function page() {
  const { result: tasks, error } = await getTasks();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="mt-20 flex flex-col flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-10">
      <Card>
        <Header />

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks ? tasks?.map((task: Task, idx) => (
                  <TableRow key={task.id! + idx}>
                    <TableCell>
                      <Checkbox 
                        checked={task.isComplete ? true : false} 
                        disabled
                      />
                    </TableCell>

                    <TableCell>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">{task.description}</div>
                      {/* <div className="text-sm text-muted-foreground mt-4">{task.created}</div> */}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{task.dueDate?.toString()}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{task.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropDownActions taskId={task.id!} task={task} />
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>Loading...</TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}

export default page