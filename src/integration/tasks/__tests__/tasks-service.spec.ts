/**
 * @vitest-environment node
 */
import {describe, it, vi, expect, expectTypeOf } from "vitest";
import type {TaskDTO} from "../business/dtos/task.dto";
import Tasks from "../index";

describe('Tasks service integration tests', () => {

    const timeout:number = 60 * 1000;

    describe('Tasks service driver port tests', () => {

        it('getTasks should return an array of TaskDTO objects', async () => {

            const spy = vi.spyOn(Tasks, 'getTasks');
            const result = await Tasks.getTasks();

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith();
            expect(result.length).toBeGreaterThan(0);

            expect(result).toEqual(expect.arrayContaining(<TaskDTO[]>[
                expect.objectContaining(<TaskDTO>{
                id: expect.any(String),
                title: expect.any(String),
                description: expect.any(String),
                priority: expect.any(String),
                status: expect.any(String),
                creationDate: expect.any(String),
                canEdit: expect.any(Boolean),
                canDelete: expect.any(Boolean)
                })
            ]));

            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            const priorityOptionsRegex = /high|low|medium/i;
            const statusOptionsRegex = /open|closed/i;

            for (const task of result) {
                expect(task.id).toMatch(uuidRegex);
                expect(task.priority).toMatch(priorityOptionsRegex);
                expect(task.status).toMatch(statusOptionsRegex);
            }

        }, { timeout });

    });

});
