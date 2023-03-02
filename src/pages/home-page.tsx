import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TasksStoreSlice, {getTask, getTasks} from "../store/tasks-store-slice";
import {TasksTable} from "../components/tasks-table-component/tasks-table";
import Eventbus from "../eventbus";
import {EventTypeConstants} from "../eventbus/event-type.constants";
import {Modal} from "../components/modal-component/modal";
import {TaskDetail} from "../components/task-detail-component/task-detail";

export function HomePage(): JSX.Element {

    const dispatch = useDispatch();
    const [requestTaskID, setRequestTaskID] = useState('');
    const [showModal, setShowModal] = useState(false);

    // @ts-ignore
    const { tasksRequestPayload, tasks, task } = useSelector(state => state.tasksStoreSlice);
    const { clearTask } = TasksStoreSlice.actions;

    useEffect(() => {
        // @ts-ignore
        dispatch(getTasks());
    }, [tasksRequestPayload]);

    useEffect(() => {
        // @ts-ignore
        dispatch(getTask(requestTaskID));
    }, [requestTaskID]);


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

    });




    // @ts-ignore
    return(<div>


        <TasksTable tasks={tasks} />
        <Modal showModal={showModal}>
            <TaskDetail task={task} />
        </Modal>


    </div>);
}
