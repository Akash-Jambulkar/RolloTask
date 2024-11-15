import React, { useState, useEffect } from 'react';
import { Task } from './types';
import { TaskColumn } from './components/TaskColumn';
import { AddTaskModal } from './components/AddTaskModal';
import { Search, Plus, Menu } from 'lucide-react';
import { addDays, isAfter, startOfDay } from 'date-fns';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeColumn, setActiveColumn] = useState<'ready' | 'in-progress' | 'review' | 'done'>('ready');

  // Check for overdue tasks and roll them over
  useEffect(() => {
    const checkAndRolloverTasks = () => {
      const today = startOfDay(new Date());
      
      setTasks(prevTasks => 
        prevTasks.map(task => {
          if (!task.isCompleted && isAfter(today, new Date(task.dueDate))) {
            return {
              ...task,
              dueDate: addDays(today, 1)
            };
          }
          return task;
        })
      );
    };

    checkAndRolloverTasks();
    const interval = setInterval(checkAndRolloverTasks, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [setTasks]);

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks(prev => [...prev, task]);
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    setActiveColumn(newStatus);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columnTitles = {
    ready: 'Task Ready',
    'in-progress': 'In Progress',
    review: 'Needs Review',
    done: 'Done'
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">RolloTask</h1>
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu size={24} />
            </button>
          </div>
          
          {showMobileMenu && (
            <div className="mt-4 md:hidden">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {Object.entries(columnTitles).map(([key, title]) => (
                  <button
                    key={key}
                    onClick={() => setActiveColumn(key as Task['status'])}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeColumn === key
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={20} className="mr-2" />
            Add Task
          </button>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TaskColumn
            title="Task Ready"
            tasks={filteredTasks.filter(t => t.status === 'ready')}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
          />
          <TaskColumn
            title="In Progress"
            tasks={filteredTasks.filter(t => t.status === 'in-progress')}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
          />
          <TaskColumn
            title="Needs Review"
            tasks={filteredTasks.filter(t => t.status === 'review')}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
          />
          <TaskColumn
            title="Done"
            tasks={filteredTasks.filter(t => t.status === 'done')}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
          />
        </div>

        <div className="md:hidden">
          <TaskColumn
            title={columnTitles[activeColumn]}
            tasks={filteredTasks.filter(t => t.status === activeColumn)}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
          />
        </div>
      </main>

      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;