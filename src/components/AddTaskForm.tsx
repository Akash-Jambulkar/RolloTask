import React, { useState } from 'react';
import { format } from 'date-fns';
import { PlusCircle } from 'lucide-react';

interface AddTaskFormProps {
  onAddTask: (task: { title: string; description: string; date: string }) => void;
  selectedDate: Date;
}

export default function AddTaskForm({ onAddTask, selectedDate }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      date: format(selectedDate, 'yyyy-MM-dd'),
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
      <h2 className="text-xl font-semibold mb-6 text-slate-800">Add New Task</h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400"
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-24 resize-none placeholder-slate-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <PlusCircle className="w-5 h-5" />
          Add Task
        </button>
      </div>
    </form>
  );
}