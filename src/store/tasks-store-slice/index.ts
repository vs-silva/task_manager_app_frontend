import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Tasks from "../../integration/tasks";
import type {TaskDTO} from "../../integration/tasks/business/dtos/task.dto";
import type {TasksOptionalRequestPayloadDTO} from "./dtos/tasks-optional-request-payload.dto";

const initialState: object = {
    tasksRequestPayload: <TasksOptionalRequestPayloadDTO>{},
    tasks: <TaskDTO[]>[],
    task: <TaskDTO>{}
};

export const getTasks = createAsyncThunk(
    'get-tasks',
    async () => {
        return await Tasks.getTasks();
    });

// @ts-ignore
function builderProcessor(builder) {
    // @ts-ignore
    builder.addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
    });
}

export default createSlice({
    name: 'tasks-store-slice',
    initialState,
    reducers: {},
    extraReducers: builderProcessor
});
