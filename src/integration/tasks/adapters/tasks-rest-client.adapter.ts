import type {TasksServiceDrivenPort} from "../ports/tasks-service-driven.port";
import ApiEngine from "../../../infrastructure/api-engine";

export function TasksRestClientAdapter(): TasksServiceDrivenPort {

    const endpoint = 'http://localhost:8000';

    async function get(resourceURI: string): Promise<object[]> {
        const response = await ApiEngine.get(`${endpoint}${resourceURI}`);
        return response['data'];
    }

    return {
        get
    };
}
