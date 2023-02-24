import {MouseEvent} from "react";
import type {TaskDTO} from "../../integration/tasks/business/dtos/task.dto";

export function TasksTable(props: {tasks: TaskDTO[]}): JSX.Element {

    const {tasks} = props;

    if(!tasks.length){
        return (<></>);
    }

    function openModal(taskID: string):void {
        console.log(taskID);
    }


    return (<>
        <p>Table component here!!</p>
        {JSON.stringify(tasks)}

        <table className="table-auto">
            <thead>
            <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Creation Date</th>
                <th>Edit / Delete</th>
            </tr>
            </thead>
            <tbody>
            {
                tasks.map((task: TaskDTO, index: number) => {
                    return(<tr id={task.id} key={task.id} data-test-id={`task-table-row-${index}`}>
                        <td>{task.title}</td>
                        <td>{task.priority}</td>
                        <td>{task.status}</td>
                        <td>{task.creationDate}</td>
                        <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event: MouseEvent<HTMLButtonElement>) => {
                            event.preventDefault();
                            openModal(task.id);
                        }
                        }>Edit/Delete</button></td>
                    </tr>)
                })
            }
            </tbody>
        </table>
    </>);
}
