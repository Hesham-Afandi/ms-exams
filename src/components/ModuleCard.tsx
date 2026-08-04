import React from 'react';
import { ExamModule } from '../types';
import { QuestionItem } from './QuestionItem';
import { 
  FileText, 
  Type, 
  Table, 
  Image as ImageIcon, 
  BookOpen, 
  Send, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface ModuleCardProps {
  module: ExamModule;
  completedTaskIds: string[];
  onToggleTaskCompleted: (taskId: string) => void;
  onOpenSimulatorForTask?: (autoCheckId?: string) => void;
  defaultExpanded?: boolean;
}

const moduleIconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-6 h-6 text-blue-600" />,
  Type: <Type className="w-6 h-6 text-emerald-600" />,
  Table: <Table className="w-6 h-6 text-indigo-600" />,
  Image: <ImageIcon className="w-6 h-6 text-amber-600" />,
  BookOpen: <BookOpen className="w-6 h-6 text-purple-600" />,
  Send: <Send className="w-6 h-6 text-rose-600" />,
};

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  completedTaskIds,
  onToggleTaskCompleted,
  onOpenSimulatorForTask,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  const completedModuleTasks = module.tasks.filter(t => completedTaskIds.includes(t.id));
  const isModuleComplete = completedModuleTasks.length === module.tasks.length;
  const moduleEarnedPoints = completedModuleTasks.reduce((acc, t) => acc + t.points, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden mb-6" dir="ltr">
      {/* Module Header Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
          isModuleComplete ? 'bg-emerald-50/80 hover:bg-emerald-100/60' : 'bg-slate-50 hover:bg-slate-100/80'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
            {moduleIconMap[module.iconName] || <FileText className="w-6 h-6 text-blue-600" />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                Module {module.moduleNumber}
              </span>
              <span className="text-xs text-slate-500 font-mono">{module.subtitle}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{module.title}</h3>
            <p className="text-xs text-slate-600">{module.description}</p>
          </div>
        </div>

        {/* Module Progress & Controls */}
        <div className="flex items-center gap-4 self-end sm:self-auto">
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">
              Score: <span className="font-bold text-slate-800">{moduleEarnedPoints} / {module.totalPoints} pts</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {completedModuleTasks.length} / {module.tasks.length} tasks completed
            </div>
          </div>

          <button
            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition"
            aria-label="Expand module"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Module Questions List */}
      {isExpanded && (
        <div className="p-5 border-t border-slate-200 bg-slate-50/30 space-y-4">
          {module.tasks.map(task => (
            <QuestionItem
              key={task.id}
              task={task}
              isCompleted={completedTaskIds.includes(task.id)}
              onToggleCompleted={onToggleTaskCompleted}
              onOpenSimulatorForTask={onOpenSimulatorForTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};
