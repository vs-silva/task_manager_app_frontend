import type {TasksServiceDrivenPort} from "../ports/tasks-service-driven.port";
import ApiEngine from "../../../infrastructure/api-engine";
import {TaskOptionalRequestDTO} from "../business/dtos/task-optional-request.dto";

export function TasksRestClientAdapter(): TasksServiceDrivenPort {

    const endpoint = 'https://quaint-bull-umbrella.cyclic.app';

    async function get(resourceURI: string): Promise<object[]> {
        const response = await ApiEngine.get(`${endpoint}${resourceURI}`);
        return response['data'];
    }

    async function remove(resourceURI: string): Promise<void> {
        return await ApiEngine.delete(`${endpoint}${resourceURI}`);
    }

    async function save(resourceURI: string, requestPayload: TaskOptionalRequestDTO): Promise<void> {

        if(requestPayload.id) {
            return await ApiEngine.put(`${endpoint}${resourceURI}`, requestPayload);
        }

        return await ApiEngine.post(`${endpoint}${resourceURI}`, requestPayload);
    }

    return {
        get,
        remove,
        save
    };
}
