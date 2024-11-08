import React, { useState, useEffect } from 'react';
import { format, startOfToday, isAfter, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, Bell } from 'lucide-react';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { Task, DayTasks } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(startOfToday());
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [tasks, setTasks] = useState<DayTasks>({});
  const [notification, setNotification] = useState('');

  // Immediate rollover of tasks
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const updatedTasks = { ...tasks };
    let rolledOverCount = 0;

    Object.entries(tasks).forEach(([date, dateTasks]) => {
      if (date < today) {
        const incompleteTasks = dateTasks.filter(task => !task.completed);
        if (incompleteTasks.length > 0) {
          updatedTasks[date] = dateTasks.filter(task => task.completed);
          
          updatedTasks[today] = [
            ...(updatedTasks[today] || []),
            ...incompleteTasks.map(task => ({
              ...task,
              date: today,
              id: `${task.id}-${Date.now()}`,
              rolledOver: true
            }))
          ];
          
          rolledOverCount += incompleteTasks.length;
        }
      }
    });

    if (rolledOverCount > 0) {
      setNotification(`${rolledOverCount} task${rolledOverCount > 1 ? 's' : ''} rolled over to today`);
      setTimeout(() => setNotification(''), 5000);
    }

    setTasks(updatedTasks);
  }, [tasks]);

  const handleAddTask = (taskData: { title: string; description: string; date: string }) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: taskData.title,
      description: taskData.description,
      date: taskData.date,
      completed: false,
      category: 'personal',
      rolledOver: false
    };

    setTasks(prev => ({
      ...prev,
      [taskData.date]: [...(prev[taskData.date] || []), newTask]
    }));
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach(date => {
        newTasks[date] = newTasks[date].map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
      });
      return newTasks;
    });
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach(date => {
        newTasks[date] = newTasks[date].filter(task => task.id !== taskId);
        if (newTasks[date].length === 0) {
          delete newTasks[date];
        }
      });
      return newTasks;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-6 px-6 shadow-lg relative">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-8 h-8" />
            <h1 className="text-3xl font-bold tracking-tight">RolloTask</h1>
          </div>
          {notification && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-amber-100 text-amber-900 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
              <Bell className="w-4 h-4" />
              {notification}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Calendar
              currentDate={currentDate}
              tasks={tasks}
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
            <AddTaskForm onAddTask={handleAddTask} selectedDate={selectedDate} />
          </div>
          
          <div className="lg:col-span-2">
            <TaskList
              tasks={tasks[format(selectedDate, 'yyyy-MM-dd')] || []}
              onTaskComplete={handleTaskComplete}
              onTaskDelete={handleTaskDelete}
              date={selectedDate}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;