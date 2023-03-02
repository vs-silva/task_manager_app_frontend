import type {TaskDTO} from "../business/dtos/task.dto";

export interface TasksServiceDriverPort {
    getTasks(): Promise<TaskDTO[]>;
    getTask(taskID: string): Promise<TaskDTO>;
}
