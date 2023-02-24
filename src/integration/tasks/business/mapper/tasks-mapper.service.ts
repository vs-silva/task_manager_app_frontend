import type {TasksMapperInterface} from "./tasks-mapper.interface";
import type {TaskDTO} from "../dtos/task.dto";
import {TasksRequestedFieldsConstants} from "../constants/tasks-requested-fields.constants";

async function mapToTaskDTOCollection(data: object[]): Promise<TaskDTO[]> {

    return data.map((task: object) => (<TaskDTO>{
        // @ts-ignore
        id: task[`${TasksRequestedFieldsConstants.ID}`],
        // @ts-ignore
        title: task[`${TasksRequestedFieldsConstants.TITLE}`],
        // @ts-ignore
        description: task[`${TasksRequestedFieldsConstants.DESCRIPTION}`],
        // @ts-ignore
        priority: task[`${TasksRequestedFieldsConstants.PRIORITY}`],
        // @ts-ignore
        status: task[`${TasksRequestedFieldsConstants.STATUS}`],
        // @ts-ignore
        creationDate: task[`${TasksRequestedFieldsConstants.CREATION_DATE}`],
        canDelete: true,
        canEdit: true
    }));
}

export const TasksMapperService: TasksMapperInterface = Object.freeze({
   mapToTaskDTOCollection
});
