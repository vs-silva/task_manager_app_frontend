import {describe, expect} from "vitest";
import {TasksTable} from "../tasks-table";
import type {TaskDTO} from "../../../integration/tasks/business/dtos/task.dto";
import {render} from "@testing-library/react";
import {faker} from "@faker-js/faker";

describe('Task table Tests', () => {

    it('Tasks table should not render html if an empty list of task items is provided', () => {

        const fakeTasks: TaskDTO[] = [];
        const {container, unmount} = render(<TasksTable tasks={fakeTasks}/>);

        expect(container.children.length).toEqual(0);

        unmount();
    });

    it('Tasks table should render html if a list of task items is provided', () => {

        const fakeTasks: TaskDTO[] = [{
            id: faker.datatype.uuid(),
            title: faker.lorem.word(2),
            description: faker.lorem.paragraph(),
            status: 'open',
            priority: 'low',
            creationDate: '2023-02-23',
            canDelete: true,
            canEdit: true
        }];

        const {container, getByTestId, unmount} = render(<TasksTable tasks={fakeTasks}/>);
        const table = getByTestId('task-table');
        const tableHead = getByTestId('task-table-head');
        const tableBody = getByTestId('task-table-body');

        expect(container.children.length).toBeGreaterThan(0);
        expect(table).not.toBeNull();
        expect(tableHead).not.toBeNull();
        expect(tableBody).not.toBeNull();

        expect(tableHead.children.length).toEqual(1);
        expect(tableBody.children.length).toEqual(1);

        unmount();
    });

});
