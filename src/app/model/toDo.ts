import { Priority } from './priority'

export interface ToDo {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    dateCreated: Date;
    dateCompleted: Date;
    priority: Priority;
}

