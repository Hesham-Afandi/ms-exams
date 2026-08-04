import React, { useState, useEffect } from 'react';
import { ExamViewMode, StudentInfo, OfficeAppSection } from './types';
import { EXAM_MODULES } from './data/examData';
import { Header } from './components/Header';
import { OfficeSuiteHome, OFFICE_APPS } from './components/OfficeSuiteHome';
import { ExamHero } from './components/ExamHero';
import { ModuleCard } from './components/ModuleCard';
import { WordSimulator } from './components/WordSimulator';
import { PrintableExam } from './components/PrintableExam';
import { DataPackModal } from './components/DataPackModal';
import { AnswerKeyModal } from './components/AnswerKeyModal';
import { ScoreModal } from './components/ScoreModal';
import { ComingSoonModal } from './components/ComingSoonModal';
import { MODEL_ANSWER_RUBRIC } from './data/examData';
import { BookOpen, Sparkles, CheckCircle2, Award, Printer, ArrowLeft } from 'lucide-react';

export function App() {

  const [viewMode, setViewMode] = useState<ExamViewMode>('home');
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  
  // Timer state (60 minutes default = 3600 seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(3600);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Student info state
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    seatNumber: '',
    institution: '',
    group: 'Group A',
    date: new Date().toISOString().split('T')[0],
    instructorName: 'Mr. Mohammed Hesham',
  });

  // Modal states
  const [isDataPackOpen, setIsDataPackOpen] = useState<boolean>(false);
  const [isAnswerKeyOpen, setIsAnswerKeyOpen] = useState<boolean>(false);
  const [isScoreReportOpen, setIsScoreReportOpen] = useState<boolean>(false);
  
  // Coming soon modal for Excel / PowerPoint / Access
  const [selectedComingSoonApp, setSelectedComingSoonApp] = useState<OfficeAppSection | null>(null);

  // Simulator highlight scroll link
  const [highlightedCheckId, setHighlightedCheckId] = useState<string | undefined>(undefined);

  // Total tasks & points calculation
  const allTasks = EXAM_MODULES.flatMap(m => m.tasks);
  const totalTasksCount = allTasks.length;
  const totalPoints = EXAM_MODULES.reduce((sum, m) => sum + m.totalPoints, 0);

  const earnedPoints = allTasks
    .filter(t => completedTaskIds.includes(t.id))
    .reduce((sum, t) => sum + t.points, 0);

  // Timer Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleToggleTaskCompleted = (taskId: string) => {
    setCompletedTaskIds(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Auto check task from Word simulator action
  const handleAutoCheckTask = (autoCheckId: string) => {
    const matchingTask = allTasks.find(t => t.autoCheckId === autoCheckId);
    if (matchingTask && !completedTaskIds.includes(matchingTask.id)) {
      setCompletedTaskIds(prev => [...prev, matchingTask.id]);
    }
  };

  const handleOpenSimulatorForTask = (autoCheckId?: string) => {
    setHighlightedCheckId(autoCheckId);
    setViewMode('simulator');
  };

  const handleResetExam = () => {
    if (window.confirm('Are you sure you want to reset all exam progress and retake the exam?')) {
      setCompletedTaskIds([]);
      setTimerSeconds(3600);
      setIsTimerRunning(true);
    }
  };

  const handleSelectApp = (appId: 'word' | 'excel' | 'powerpoint' | 'access') => {
    if (appId === 'word') {
      setViewMode('exam');
    } else {
      const appData = OFFICE_APPS.find(a => a.id === appId) || null;
      setSelectedComingSoonApp(appData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white" dir="ltr">
      
      {/* Top Header Navigation */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        resetTimer={() => setTimerSeconds(3600)}
        completedTaskIds={completedTaskIds}
        totalTasksCount={totalTasksCount}
        earnedPoints={earnedPoints}
        totalPoints={totalPoints}
        onOpenDataPack={() => setIsDataPackOpen(true)}
        onOpenAnswerKey={() => setIsAnswerKeyOpen(true)}
        onOpenScoreReport={() => setIsScoreReportOpen(true)}
        onResetProgress={handleResetExam}
        studentInfo={studentInfo}
      />

      {/* MAIN VIEW CONTENT AREA */}
      <main className="flex-1 pb-16">
        
        {/* VIEW 1: HOME OFFICE SUITE PORTAL */}
        {viewMode === 'home' && (
          <OfficeSuiteHome
            onSelectApp={handleSelectApp}
            earnedPoints={earnedPoints}
            totalPoints={totalPoints}
            completedTasksCount={completedTaskIds.length}
            totalTasksCount={totalTasksCount}
          />
        )}

        {/* VIEW 2: EXAM TASKS LIST VIEW */}
        {viewMode === 'exam' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Back Button to Suite */}
            <div className="mb-4">
              <button
                onClick={() => setViewMode('home')}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Office Suite Portal</span>
              </button>
            </div>

            {/* Hero Student Registration */}
            <ExamHero
              studentInfo={studentInfo}
              setStudentInfo={setStudentInfo}
              onStartExam={() => setViewMode('simulator')}
              onOpenDataPack={() => setIsDataPackOpen(true)}
              completedTasksCount={completedTaskIds.length}
              totalTasksCount={totalTasksCount}
              totalPoints={totalPoints}
              earnedPoints={earnedPoints}
            />

            {/* Exam Modules Section */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Exam Modules Checklist (6 Modules • 100 Points)
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Click task checkboxes or try inside Live Simulator
              </span>
            </div>

            <div className="space-y-6">
              {EXAM_MODULES.map((module, idx) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  completedTaskIds={completedTaskIds}
                  onToggleTaskCompleted={handleToggleTaskCompleted}
                  onOpenSimulatorForTask={handleOpenSimulatorForTask}
                  defaultExpanded={idx === 0}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: LIVE INTERACTIVE WORD SIMULATOR */}
        {viewMode === 'simulator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <button
                  onClick={() => setViewMode('exam')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition mb-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Exam Question List</span>
                </button>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>Microsoft Word Live Interactive Simulator</span>
                </h2>
              </div>
              
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Auto-Grading Progress:</span>
                <span className="text-base font-bold text-emerald-600 font-mono">
                  {earnedPoints} / {totalPoints} Pts Earned
                </span>
              </div>
            </div>

            <WordSimulator
              completedTaskIds={completedTaskIds}
              onAutoCheckTask={handleAutoCheckTask}
              highlightedCheckId={highlightedCheckId}
            />
          </div>
        )}

        {/* VIEW 4: PRINTABLE PAPER EXAM SHEET */}
        {viewMode === 'printable' && (
          <PrintableExam
            studentInfo={studentInfo}
            earnedPoints={earnedPoints}
            totalPoints={totalPoints}
          />
        )}

        {/* VIEW 5: TEACHER RUBRIC & ANSWER KEY VIEW */}
        {viewMode === 'teacher' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">
                      Teacher Guide & Model Evaluation Rubric
                    </h2>
                    <p className="text-xs text-slate-500">Official criteria and command paths for grading MS Word practical exams</p>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition hover:bg-slate-800"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Rubric</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold">
                      <th className="p-3">Module Name</th>
                      <th className="p-3">Evaluation Criteria</th>
                      <th className="p-3">Command & Ribbon Steps</th>
                      <th className="p-3 text-center">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODEL_ANSWER_RUBRIC.map((rubric, idx) => (
                      <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{rubric.module}</td>
                        <td className="p-3 text-slate-700">{rubric.criteria}</td>
                        <td className="p-3 font-mono text-blue-900 bg-slate-50">{rubric.steps}</td>
                        <td className="p-3 font-mono font-bold text-center text-purple-700">{rubric.score} Pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 no-print" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="font-semibold text-slate-300">Microsoft Office Practical Exams Portal 2026</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span>Created by</span>
            <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-lg border border-blue-500/30 font-bold tracking-wide">
              Mr. Mohammed Hesham
            </span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <DataPackModal
        isOpen={isDataPackOpen}
        onClose={() => setIsDataPackOpen(false)}
      />

      <AnswerKeyModal
        isOpen={isAnswerKeyOpen}
        onClose={() => setIsAnswerKeyOpen(false)}
      />

      <ScoreModal
        isOpen={isScoreReportOpen}
        onClose={() => setIsScoreReportOpen(false)}
        earnedPoints={earnedPoints}
        totalPoints={totalPoints}
        completedTaskIds={completedTaskIds}
        studentInfo={studentInfo}
        onResetExam={handleResetExam}
        onGoToHome={() => {
          setIsScoreReportOpen(false);
          setViewMode('home');
        }}
      />

      <ComingSoonModal
        app={selectedComingSoonApp}
        isOpen={selectedComingSoonApp !== null}
        onClose={() => setSelectedComingSoonApp(null)}
        onStartWordExam={() => setViewMode('exam')}
      />

    </div>
  );
}

export default App;

