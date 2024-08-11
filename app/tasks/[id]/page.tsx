import React from 'react'
import TaskForm from './ui/TaskForm';
import { getTask } from '@/firebase/tasks/getTask';
import { Task } from '@/lib/interface';

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    let res: { result: Task | null, error: any };

    if(id !== '_new'){
        res = await getTask(id);
    } else {
        res = { result: null, error: null };
    }

    const { result: task, error } = res;

    if(error){
        return <div>{error.message}</div>
    }

    if(!task && !error && id !== '_new' ){
        return (
            <main className='mt-20 flex flex-col flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-10'>
                <div>No such document exist, Go back</div>
            </main>
        )
    }

    return (
        <main className="mt-20 flex flex-col flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-10">
            <TaskForm task={task} />
        </main>
    )
}

export default page