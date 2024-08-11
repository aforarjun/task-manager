export interface User {
    uid: string;
    email: string;
    username: string;
}

export type PriorityLevel = 'high' | 'medium' | 'law';

export interface Task {
    id?: string;
    title?: string,
    description?: string,
    dueDate?: Date,
    priority?: PriorityLevel,
    location?: {
        points: { lat: number; lng: number } | null,
        value: string
    },
    isComplete?: boolean;
}