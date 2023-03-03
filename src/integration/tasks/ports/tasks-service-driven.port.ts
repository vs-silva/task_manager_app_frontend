import type {TaskOptionalRequestDTO} from "../business/dtos/task-optional-request.dto";

export interface TasksServiceDrivenPort {
    get(resourceURI: string): Promise<object[]>;
    remove(resourceURI: string): Promise<void>;
    save(resourceURI: string, requestPayload: TaskOptionalRequestDTO): Promise<void>;
}
