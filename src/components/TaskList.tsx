import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Trash2, ArrowRight } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
  date: Date;
}

export default function TaskList({ tasks, onTaskComplete, onTaskDelete, date }: TaskListProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
      <h2 className="text-xl font-semibold mb-6 text-slate-800">
        Tasks for {format(date, 'MMMM d, yyyy')}
      </h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-lg transition-all ${
              task.completed
                ? 'bg-slate-50 opacity-75'
                : task.rolledOver
                ? 'bg-amber-50 border border-amber-100'
                : 'bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => onTaskComplete(task.id)}
                className={`transition-colors ${
                  task.completed
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
              <div className="flex-1">
                <div className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                  {task.title}
                  {task.rolledOver && (
                    <span className="inline-flex items-center ml-2 text-amber-600 text-sm">
                      <ArrowRight className="w-4 h-4 mr-1" />
                      Rolled over
                    </span>
                  )}
                </div>
                {task.description && (
                  <div className={`text-sm mt-1 ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                    {task.description}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => onTaskDelete(task.id)}
              className="ml-4 text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-slate-500 py-8 bg-slate-50 rounded-lg">
            No tasks for this day
          </div>
        )}
      </div>
    </div>
  );
}