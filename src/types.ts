export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: 'ready' | 'in-progress' | 'review' | 'done';
  category: string;
  isCompleted: boolean;
}