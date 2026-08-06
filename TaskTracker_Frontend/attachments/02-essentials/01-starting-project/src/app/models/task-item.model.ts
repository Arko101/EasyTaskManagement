export interface TaskItem {
  id: number;
  userId: number;
  title: string;
  summary: string;
  dueDate: string;
  completed?: boolean;
}
