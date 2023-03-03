import type {TasksServiceDriverPort} from "./ports/tasks-service-driver.port";
import type {TasksServiceDrivenPort} from "./ports/tasks-service-driven.port";
import type {TaskDTO} from "./business/dtos/task.dto";
import {TasksURIConstants} from "./business/constants/tasks.constants";
import {TasksMapperService} from "./business/mapper/tasks-mapper.service";
import {TaskOptionalRequestDTO} from "./business/dtos/task-optional-request.dto";

export function TasksService(adapter: TasksServiceDrivenPort): TasksServiceDriverPort {

    async function getTasks(): Promise<TaskDTO[]> {
        const response = await adapter.get(TasksURIConstants.TASKS);
        return await TasksMapperService.mapToTaskDTOCollection(response);
    }

    async function getTask(taskID: string): Promise<TaskDTO> {
        const response = await adapter.get(`${TasksURIConstants.TASKS}/${taskID}`);
        return await TasksMapperService.mapToTaskDTO(response);
    }

    async function deleteTask(taskID: string): Promise<void> {
        return await adapter.remove(`${TasksURIConstants.TASKS}/${taskID}`);
    }

    async function createOrUpdateTask(taskOptionalRequestDTO: TaskOptionalRequestDTO): Promise<void> {
        const resourceURI: string = taskOptionalRequestDTO.id ? `${TasksURIConstants.TASKS}/${taskOptionalRequestDTO.id}` : `${TasksURIConstants.TASKS}`;
        return await adapter.save(`${resourceURI}`, taskOptionalRequestDTO);
    }

    return {
      getTasks,
      getTask,
      deleteTask,
      createOrUpdateTask,
    };
}
