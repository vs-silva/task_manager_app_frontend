import type {TasksServiceDrivenPort} from "../ports/tasks-service-driven.port";
import ApiEngine from "../../../infrastructure/api-engine";

export function TasksRestClientAdapter(): TasksServiceDrivenPort {

    const endpoint = 'https://quaint-bull-umbrella.cyclic.app';

    async function get(resourceURI: string): Promise<object[]> {
        const response = await ApiEngine.get(`${endpoint}${resourceURI}`);
        return response['data'];
    }

    return {
        get
    };
}
