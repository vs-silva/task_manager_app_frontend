import {TaskDTO} from "../../integration/tasks/business/dtos/task.dto";
import Eventbus from "../../eventbus";
import {EventTypeConstants} from "../../eventbus/event-type.constants";

export function TaskDetail(props: {task: TaskDTO}): JSX.Element {

    const {task} = props;

    return (<>
        <hr />
        <input id="taskTitle" type="text" className="w-full bg-white text-base font-semibold mb-2" disabled={task.canEdit} defaultValue={task.title}/>

        <textarea id="taskDescription" defaultValue={task.description} rows={4} className="rounded-lg bg-gray resize-none w-full" disabled={task.canEdit}/>

        <p><span className="mr-2">Status:</span>{task.status}</p>
        <p><span className="mr-2">Priority:</span>{task.priority}</p>
        <p><span className="mr-2">Creation date:</span>{task.creationDate}</p>
        <hr />

        <div className="mt-2">
            <button type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">Update
            </button>

            <button type="button"
                    onClick={() => Eventbus.emit(EventTypeConstants.DELETE_TASK, task.id)}
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 ">Delete
            </button>
        </div>



    </>);
}
