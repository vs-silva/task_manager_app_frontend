import type {TasksServiceDriverPort} from "./ports/tasks-service-driver.port";
import type {TasksServiceDrivenPort} from "./ports/tasks-service-driven.port";
import type {TaskDTO} from "./business/dtos/task.dto";
import {TasksURIConstants} from "./business/constants/tasks.constants";
import {TasksMapperService} from "./business/mapper/tasks-mapper.service";

export function TasksService(reader: TasksServiceDrivenPort): TasksServiceDriverPort {

    async function getTasks(): Promise<TaskDTO[]> {
        const response = await reader.get(TasksURIConstants.TASKS);
        return await TasksMapperService.mapToTaskDTOCollection(response);
    }

    return {
      getTasks
    };
}
