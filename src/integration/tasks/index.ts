import {TasksService} from "./tasks.service";
import {TasksRestClientAdapter} from "./adapters/tasks-rest-client.adapter";

export default TasksService(TasksRestClientAdapter());
