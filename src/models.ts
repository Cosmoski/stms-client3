export enum TaskType{
    EMAIL,
    TELEFON,
    ZADANIE
}

export class Task{
    Id?: number;
    Description: string;
    TaskType: TaskType;
    Priority: number;
    Completed: boolean;
    Deleted: boolean;

    constructor( description: string, taskType: TaskType, priority: number, completed: boolean, deleted: boolean, id?:number)
    {
        this.Id = id;
        this.Description = description;
        this.TaskType = taskType;
        this.Priority = priority;
        this.Completed = completed;
        this.Deleted = deleted;
    }
}

export class NewTask{    
    Description: string;
    TaskType: TaskType;
    Priority: number;
    Completed: boolean;
    Deleted: boolean;

    constructor( description: string, taskType: TaskType, priority: number, completed: boolean, deleted: boolean)
    {
        this.Description = description;
        this.TaskType = taskType;
        this.Priority = priority;
        this.Completed = completed;
        this.Deleted = deleted;
    }
}

export class TaskQuery{   
    TaskType?: TaskType;
    Priority?: number;
    Completed?: boolean;

    constructor(taskType?: TaskType, priority?: number, completed?: boolean)
    {
        this.TaskType = taskType;
        this.Priority = priority;
        this.Completed = completed;
    }
}
