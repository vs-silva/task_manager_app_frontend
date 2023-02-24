export interface TasksServiceDrivenPort {
    get(resourceURI: string): Promise<object[]>;
}
