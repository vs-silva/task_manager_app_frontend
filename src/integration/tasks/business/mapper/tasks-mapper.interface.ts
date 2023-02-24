import {TaskDTO} from "../dtos/task.dto";

export interface TasksMapperInterface {
    mapToTaskDTOCollection(data: object[]): Promise<TaskDTO[]>;
}
