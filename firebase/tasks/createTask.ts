import { collection, addDoc, DocumentReference } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Task } from '@/lib/interface';

interface Res {
    result: Task | null,
    error: null | any
}

export const createTask = async (task: any) => {
    const res: Res = {result: null, error: null}

    try {
        const docRef: DocumentReference = await addDoc(collection(db, 'tasks'), task);
        
        const createdTask = { id: docRef.id, ...task };
        res.result = createdTask;
    } catch (e:any) {
        console.error('Error adding document: ', e);
        res.error = e;
    }

    return res;
};
