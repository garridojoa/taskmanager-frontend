export interface Task {
  taskId: number;
  description: string;
  completionDate: Date;
  status: string;
  userOwner: string
}