import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Tasks from "../../integration/tasks";
import type {TaskDTO} from "../../integration/tasks/business/dtos/task.dto";
import Eventbus from "../../eventbus";
import {EventTypeConstants} from "../../eventbus/event-type.constants";
import {TaskOptionalRequestDTO} from "../../integration/tasks/business/dtos/task-optional-request.dto";

const initialState: object = {
    tasks: <TaskDTO[]>[],
    task: <TaskDTO>{}
};

export const getTasks = createAsyncThunk(
    'get-tasks',
    async () => {
        return await Tasks.getTasks();
    });

export const getTask = createAsyncThunk(
    'get-task',
    async (taskId: string) => {
        return await Tasks.getTask(taskId);
    });

export const deleteTask = createAsyncThunk(
    'delete-task',
    async (taskId: string, { dispatch }) => {
        await Tasks.deleteTask(taskId);
        Eventbus.emit(EventTypeConstants.CLOSE_MODAL);
        dispatch(getTasks());
        return;
    });

export const updateTask = createAsyncThunk(
    'update-task',
    async (updateTaskRequestDTO: TaskOptionalRequestDTO, { dispatch }) => {
        await Tasks.createOrUpdateTask(updateTaskRequestDTO);
        Eventbus.emit(EventTypeConstants.CLOSE_MODAL);
        dispatch(getTasks());
        return;
    });

// @ts-ignore
function builderProcessor(builder) {
    // @ts-ignore
    builder.addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
    });

    // @ts-ignore
    builder.addCase(getTask.fulfilled, (state, action) => {
        state.task = action.payload;
    });

    // @ts-ignore
    builder.addCase(deleteTask.fulfilled, (state) => {
        state.task = <TaskDTO>{};
    });

    // @ts-ignore
    builder.addCase(updateTask.fulfilled, () => {
        return;
    });
}

// @ts-ignore
function clearTask(state):void {
    state.task = <TaskDTO>{};
}

export default createSlice({
    name: 'tasks-store-slice',
    initialState,
    reducers: {
        clearTask
    },
    extraReducers: builderProcessor
});
