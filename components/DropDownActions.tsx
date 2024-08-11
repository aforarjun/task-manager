"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoveHorizontalIcon } from '@/components/svg-icons'
import { Button } from '@/components/ui/button'
import { Task } from '@/lib/interface';
import { updateTask } from '@/firebase/tasks/updateTask';
import { deleteTask } from '@/firebase/tasks/deleteTask';


const DropDownActions = ({task, taskId}: {task: Task; taskId: string;}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const onEdit = () => {
        router.push(`/tasks/${taskId}`)
    }

    const onDelete = async () => {
        setLoading(true)
        await deleteTask(taskId);
        setLoading(false);
    }

    const onComplete = async () => {
        setLoading(true)
        await updateTask(taskId, {...task, isComplete: true});
        setLoading(false);
    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoveHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
            </Button>
        </DropdownMenuTrigger>
        {loading ? <p>Loading....</p> : (
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={onComplete}>{task.isComplete ? "Completed!" : "Mark as Complete"}</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        )}
    </DropdownMenu>
  )
}

export default DropDownActions