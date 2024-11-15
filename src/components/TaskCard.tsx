import React from 'react';
import { Trash2, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Task } from '../types';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function TaskCard({ task, onStatusChange, onDelete, onComplete }: TaskCardProps) {
  const statusOrder: Task['status'][] = ['ready', 'in-progress', 'review', 'done'];
  const currentIndex = statusOrder.indexOf(task.status);

  const handleMoveForward = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < statusOrder.length - 1) {
      onStatusChange(task.id, statusOrder[currentIndex + 1]);
    }
  };

  const handleMoveBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onStatusChange(task.id, statusOrder[currentIndex - 1]);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-4 ${task.isCompleted ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
          {task.category}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onComplete(task.id)}
            className={`${task.isCompleted ? 'text-green-500' : 'text-gray-400 hover:text-green-500'}`}
          >
            <CheckCircle size={20} />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      
      <div className="cursor-pointer">
        <h3 className={`text-gray-800 font-medium mb-2 ${task.isCompleted ? 'line-through' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
        )}
        
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
          <span className="text-xs px-2 py-1 rounded bg-gray-100">
            {task.status.replace('-', ' ')}
          </span>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={handleMoveBack}
            disabled={currentIndex === 0}
            className={`p-1 rounded ${
              currentIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleMoveForward}
            disabled={currentIndex === statusOrder.length - 1}
            className={`p-1 rounded ${
              currentIndex === statusOrder.length - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}