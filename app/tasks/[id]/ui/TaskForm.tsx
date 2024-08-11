"use client"

import React, { useState } from 'react';
import { CalendarIcon } from '@/components/svg-icons';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import LocationAutocomplete from './LocationAutoComplete';
import { Task } from '@/lib/interface';
import { createTask } from '@/firebase/tasks/createTask';
import { toast } from '@/components/ui/use-toast';

const TaskForm = ({ task }: {task: Task | null}) => {
    const router = useRouter();
    const [taskData, setTaskData] = useState<Task | null>(task);
    const [loading, setLoading] = useState(false);

    const handleTaskSubmit = async () => {
        setLoading(true);
        const {result, error} = await createTask({...taskData, isComplete: false});
        
        if(result){
            toast({title: "Task Created"});
            router.push('/tasks')
        }
        if(error){
            console.log(error);
        }

        setLoading(false);
    }

  return (
    <div className="flex flex-col w-full max-w-[800px] m-auto">
        <div className="flex-1 overflow-auto p-6 md:p-10">
            <form className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title" 
                        placeholder="Enter task title" 
                        value={taskData?.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description" 
                        placeholder="Enter task description" 
                        value={taskData?.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                        required
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="justify-start w-full">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>{taskData?.dueDate ? taskData?.dueDate.toString() : 'Select due date'}</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-4">
                                <Calendar 
                                    mode="single"
                                    selected={taskData?.dueDate}
                                    onSelect={(e: any) => setTaskData({ ...taskData, dueDate: e.toISOString().split('T')[0] })}
                                    disabled={(date) => date < new Date(1)}
                                    required
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={taskData?.priority}
                            onValueChange={(e: any) => setTaskData({ ...taskData, priority: e })} // 
                            required
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="law">Law</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <LocationAutocomplete location={taskData?.location} setTask={setTaskData} />
                </div>

                <div className="border-t px-4 py-3 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button 
                        disabled={loading}
                        onClick={handleTaskSubmit}
                    >Save</Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default TaskForm