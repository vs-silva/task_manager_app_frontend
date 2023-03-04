import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TasksStoreSlice, {getTask, getTasks, deleteTask, createORUpdateTask} from "../store/tasks-store-slice";
import {TasksTable} from "../components/tasks-table-component/tasks-table";
import Eventbus from "../eventbus";
import {EventTypeConstants} from "../eventbus/event-type.constants";
import {Modal} from "../components/modal-component/modal";
import {TaskDetail} from "../components/task-detail-component/task-detail";
import {TaskOptionalRequestDTO} from "../integration/tasks/business/dtos/task-optional-request.dto";
import {TaskCreate} from "../components/task-create-component/task-create";

export function HomePage(): JSX.Element {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [requestTaskID, setRequestTaskID] = useState('');
    const [deleteTaskID, setDeleteTaskID] = useState('');

    const initialCreateOrUpdateRequestDTO:TaskOptionalRequestDTO = {};
    const [createORUpdateTaskRequest, setCreateORUpdateTaskRequest] = useState(initialCreateOrUpdateRequestDTO);


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
        if(!createORUpdateTaskRequest.id && !createORUpdateTaskRequest.title) {
            return;
        }

        // @ts-ignore
        dispatch(createORUpdateTask(createORUpdateTaskRequest));
        return;

    }, [createORUpdateTaskRequest]);



    // @ts-ignore
    Eventbus.on(EventTypeConstants.OPEN_MODAL, (taskID?: string) => {
        if(taskID) {
            setRequestTaskID(taskID);
        }
        setShowModal(true);
    });

    // @ts-ignore
    Eventbus.on(EventTypeConstants.CLOSE_MODAL, () => {
        setShowModal(false);
        setRequestTaskID('');
        setCreateORUpdateTaskRequest(initialCreateOrUpdateRequestDTO);
        dispatch(clearTask());
    });

    // @ts-ignore
    Eventbus.on(EventTypeConstants.DELETE_TASK, (taskID: string) => {
        setDeleteTaskID(taskID);
    });

    // @ts-ignore
    Eventbus.on(EventTypeConstants.CREATE_UPDATE_TASK, (optionalRequestDTO: TaskOptionalRequestDTO) => {
        setCreateORUpdateTaskRequest(optionalRequestDTO);
    });


    // @ts-ignore
    return(<div>

        <TaskCreate />
        <TasksTable tasks={tasks} />
        <Modal showModal={showModal}>
            <TaskDetail task={task} />
        </Modal>

    </div>);
}
