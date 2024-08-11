import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Task } from '@/lib/interface';

interface Res {
    result: Task | null,
    error: null | any
}

export const getTask = async (taskId: string) => {
    const res: Res = { result: null, error: null }
    
    try {
        const taskRef = doc(db, 'tasks', taskId);
        const taskSnapshot = await getDoc(taskRef);
        
        // Check if the document exists
        if (taskSnapshot.exists()) {
            const taskData: Task = taskSnapshot.data();
            res.result = taskData;
        } else {
            console.log('No such document!');
            res.result = null;
        }

    } catch (e: any) {
        console.error('Error getting tasks: ', e.message);
        res.error = e;
    }

    return res;
};
