export interface TaskDTO {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    creationDate: string;
    canEdit: boolean;
    canDelete: boolean;
}
