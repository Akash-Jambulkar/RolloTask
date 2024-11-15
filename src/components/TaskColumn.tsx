import React from 'react';
import { Task } from '../types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function TaskColumn({ title, tasks, onStatusChange, onDelete, onComplete }: TaskColumnProps) {
  return (
    <div className="flex-1 min-w-[250px] bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <span className="text-sm text-gray-500">{tasks.length}</span>
      </div>
      
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks in this column
          </div>
        )}
      </div>
    </div>
  );
}