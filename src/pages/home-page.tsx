import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getTasks} from "../store/tasks-store-slice";
import {TasksTable} from "../components/tasks-table-component/tasks-table";

export function HomePage(): JSX.Element {

    const dispatch = useDispatch();

    // @ts-ignore
    const { tasksRequestPayload, tasks } = useSelector(state => state.tasksStoreSlice);

    useEffect(() => {
        // @ts-ignore
        dispatch(getTasks());
    }, [tasksRequestPayload]);


    // @ts-ignore
    return(<div>
        <h1 className="text-3xl font-bold underline">Home page here!</h1>
        <TasksTable tasks={tasks} />
    </div>);
}
