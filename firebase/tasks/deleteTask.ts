import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

interface Res {
    result: string | null,
    error: null | any
}

export const deleteTask = async (taskId: string) => {
    const res: Res = {result: null, error: null}

    try {
        await deleteDoc(doc(db, 'tasks', taskId));
        console.log('Task deleted successfully');
        res.result = taskId;
    } catch (e: any) {
        console.error('Error deleting task: ', e);
        res.error = e;
    }

    return res;
};
