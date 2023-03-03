import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TasksStoreSlice, {getTask, getTasks, deleteTask, updateTask} from "../store/tasks-store-slice";
import {TasksTable} from "../components/tasks-table-component/tasks-table";
import Eventbus from "../eventbus";
import {EventTypeConstants} from "../eventbus/event-type.constants";
import {Modal} from "../components/modal-component/modal";
import {TaskDetail} from "../components/task-detail-component/task-detail";
import {TaskOptionalRequestDTO} from "../integration/tasks/business/dtos/task-optional-request.dto";

export function HomePage(): JSX.Element {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [requestTaskID, setRequestTaskID] = useState('');
    const [deleteTaskID, setDeleteTaskID] = useState('');

    const initialUpdateTaskRequest:TaskOptionalRequestDTO = {};
    const [updateTaskRequest, setUpdateTaskRequest] = useState(initialUpdateTaskRequest);

    // @ts-ignore
    const { tasks, task } = useSelector(state => state.tasksStoreSlice);
    const { clearTask } = TasksStoreSlice.actions;

    // @ts-ignore
    //dispatch(getTasks());
    useEffect(() => {
        // @ts-ignore
        dispatch(getTasks());
    },[]);

    useEffect(() => {
        if(!requestTaskID){
           return;
        }

        // @ts-ignore
        dispatch(getTask(requestTaskID));
    }, [requestTaskID]);

    useEffect(() => {
        if(!deleteTaskID) {
            return;
        }

        // @ts-ignore
        dispatch(deleteTask(deleteTaskID));
    }, [deleteTaskID]);


    useEffect(() => {
        if(!updateTaskRequest.id) {
            return;
        }

        // @ts-ignore
        dispatch(updateTask(updateTaskRequest));

    }, [updateTaskRequest]);


    // @ts-ignore
    Eventbus.on(EventTypeConstants.OPEN_MODAL, (taskID: string) => {
        setRequestTaskID(taskID);
        setShowModal(true);
    });

    // @ts-ignore
    Eventbus.on(EventTypeConstants.CLOSE_MODAL, () => {
        setShowModal(false);
        setRequestTaskID('');
        dispatch(clearTask());
    });

    // @ts-ignore
    Eventbus.on(EventTypeConstants.DELETE_TASK, (taskID: string) => {
        setDeleteTaskID(taskID);
    });

    // @ts-ignore
    Eventbus.on(EventTypeConstants.UPDATE_TASK, (updateRequest: TaskOptionalRequestDTO) => {
        setUpdateTaskRequest(updateRequest);
    });

    // @ts-ignore
    return(<div>

        <TasksTable tasks={tasks} />
        <Modal showModal={showModal}>
            <TaskDetail task={task} />
        </Modal>

    </div>);
}
