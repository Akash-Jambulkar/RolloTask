export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  completed: boolean;
  category: 'work' | 'personal' | 'shopping' | 'health';
  rolledOver?: boolean;
}

export interface DayTasks {
  [date: string]: Task[];
}