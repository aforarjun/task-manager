import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Task } from '@/lib/interface';

interface Res {
    result: Task | null,
    error: null | any
}

export const updateTask = async (taskId: string, updatedTask: any) => {
    const res: Res = { result: null, error: null }

    try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, updatedTask);
        console.log('Task updated successfully with ID: ', taskId);

        // Return the updated task data with the ID
        res.result = { id: taskId, ...updatedTask };
    } catch (e: any) {
        console.error('Error updating task: ', e);
        res.error = e;
    }

    return res;
};
