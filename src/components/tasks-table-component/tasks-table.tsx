import {MouseEvent} from "react";
import type {TaskDTO} from "../../integration/tasks/business/dtos/task.dto";
import Eventbus from "../../eventbus";
import {EventTypeConstants} from "../../eventbus/event-type.constants";
import moment from "moment";

export function TasksTable(props: {tasks: TaskDTO[]}): JSX.Element {

    const {tasks} = props;

    if(!tasks.length){
        return (<></>);
    }

    return (<>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">Title</th>
                                <th scope="col" className="px-6 py-4">Priority</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                                <th scope="col" className="px-6 py-4">Creation Date</th>
                                <th scope="col" className="px-6 py-4">Edit / Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                tasks.map((task: TaskDTO, index: number) => {
                                    return(<tr id={task.id} key={task.id} data-test-id={`task-table-row-${index}`} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{task.title}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{task.priority}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{task.status}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{moment(task.creationDate).format('YYYY-MM-DD')}</td>
                                        <td className="whitespace-nowrap px-6 py-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                            event.preventDefault();
                                            Eventbus.emit(EventTypeConstants.OPEN_MODAL, task.id);
                                        }
                                        }>Edit/Delete</button></td>
                                    </tr>)
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
