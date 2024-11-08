import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Task } from '../types';

interface CalendarProps {
  currentDate: Date;
  tasks: { [date: string]: Task[] };
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export default function Calendar({ currentDate, tasks, onDateSelect, selectedDate }: CalendarProps) {
  const [viewDate, setViewDate] = React.useState(currentDate);
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setViewDate(subMonths(viewDate, 1));
  const handleNextMonth = () => setViewDate(addMonths(viewDate, 1));
  const handleTodayClick = () => {
    setViewDate(new Date());
    onDateSelect(new Date());
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handleTodayClick}
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
            Today
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 w-32 text-center">
              {format(viewDate, 'MMMM yyyy')}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-slate-500 py-2">
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="p-2">
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dayTasks = tasks[dateStr] || [];
            const isSelected = format(selectedDate, 'yyyy-MM-dd') === dateStr;
            const hasIncompleteTasks = dayTasks.some(task => !task.completed);
            const hasCompletedTasks = dayTasks.some(task => task.completed);

            return (
              <button
                key={day.toString()}
                onClick={() => onDateSelect(day)}
                className={`
                  relative p-3 rounded-lg text-sm transition-all
                  ${!isSameMonth(day, viewDate) ? 'text-slate-300' : 'text-slate-700'}
                  ${isToday(day) ? 'bg-indigo-600 text-white font-semibold' : ''}
                  ${isSelected && !isToday(day) ? 'bg-indigo-50 text-indigo-600 font-semibold' : ''}
                  ${!isSelected && !isToday(day) ? 'hover:bg-slate-50' : ''}
                  ${isSelected ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}
                `}
              >
                <span className="relative z-10">{format(day, 'd')}</span>
                {(hasIncompleteTasks || hasCompletedTasks) && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {hasIncompleteTasks && (
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isToday(day) ? 'bg-white' : 'bg-amber-400'
                      }`} />
                    )}
                    {hasCompletedTasks && (
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isToday(day) ? 'bg-white' : 'bg-emerald-400'
                      }`} />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}