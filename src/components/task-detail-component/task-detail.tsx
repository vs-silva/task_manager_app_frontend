import {TaskDTO} from "../../integration/tasks/business/dtos/task.dto";
import Eventbus from "../../eventbus";
import {EventTypeConstants} from "../../eventbus/event-type.constants";
import {MouseEvent, ChangeEvent, useState} from "react";
import moment from "moment";
import {TasksStatusConstants} from "../../integration/tasks/business/constants/tasks-status.constants";
import {TasksPriorityConstants} from "../../integration/tasks/business/constants/tasks-priority.constants";
import {TaskOptionalRequestDTO} from "../../integration/tasks/business/dtos/task-optional-request.dto";

export function TaskDetail(props: {task: TaskDTO}): JSX.Element {

    const {task} = props;

    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [priorityValue, setPriorityValue] = useState('');

    return (<>
        <hr />
        <input id="taskTitle"
               type="text"
               className="w-full bg-white text-base font-semibold mb-2"
               disabled={task.canEdit}
               defaultValue={task.title}
               onChange={(event: ChangeEvent<HTMLInputElement>) => setTitleValue(event.target.value)}/>

        <textarea id="taskDescription"
                  defaultValue={task.description}
                  rows={4}
                  className="rounded-lg bg-gray resize-none w-full"
                  disabled={task.canEdit}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDescriptionValue(event.target.value)}/>

        <div><span className="mr-2">Status:</span><select
            defaultValue={task.status}
            disabled={task.canEdit}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setStatusValue(event.target.value)}>
            {
                Object.values(TasksStatusConstants).map(status => (
                    <option value={status} key={status}>{status}</option>
                ))
            }
        </select></div>

        <div><span className="mr-2">Priority:</span><select
            defaultValue={task.priority}
            disabled={task.canEdit}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setPriorityValue(event.target.value)}>
            {
                Object.values(TasksPriorityConstants).map(status => (
                    <option value={status} key={status}>{status}</option>
                ))
            }
        </select></div>

        <p><span className="mr-2">Creation date:</span>{moment(task.creationDate).format('YYYY-MM-DD')}</p>
        <hr />

        <div className="mt-2">
            <button type="button"
                    onClick={(event:MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        const canUpdate = (( titleValue || descriptionValue || statusValue || priorityValue ) !== '');

                        if(!canUpdate) {
                            return;
                        }

                        const optionalRequest: TaskOptionalRequestDTO = {
                            id: task.id,
                            title: titleValue || task.title,
                            description: descriptionValue || task.description,
                            status: statusValue || task.status,
                            priority: priorityValue || task.priority
                        };

                        Eventbus.emit(EventTypeConstants.UPDATE_TASK,optionalRequest);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">Update
            </button>

            <button type="button"
                    onClick={() => Eventbus.emit(EventTypeConstants.DELETE_TASK, task.id)}
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 ">Delete
            </button>
        </div>



    </>);
}
