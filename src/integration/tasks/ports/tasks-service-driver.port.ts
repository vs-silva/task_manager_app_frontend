import type {TaskDTO} from "../business/dtos/task.dto";
import {TaskOptionalRequestDTO} from "../business/dtos/task-optional-request.dto";

export interface TasksServiceDriverPort {
    getTasks(): Promise<TaskDTO[]>;
    getTask(taskID: string): Promise<TaskDTO>;
    deleteTask(taskID: string): Promise<void>;
    createOrUpdateTask(taskOptionalRequestDTO: TaskOptionalRequestDTO): Promise<void>;
}
