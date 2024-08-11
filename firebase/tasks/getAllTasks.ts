import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Task } from '@/lib/interface';

interface Res {
    result: Task[] | null,
    error: null | any
}

export const getTasks = async () => {
    const res: Res = { result: null, error: null }
    
    try {
        const querySnapshot = await getDocs(collection(db, 'tasks'));
        const tasks: Task[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.result = tasks;
    } catch (e: any) {
        console.error('Error getting tasks: ', e.message);
        res.error = e;
    }

    return res;
};
