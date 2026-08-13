import React, { useState, useEffect } from 'react';
import { ExamViewMode, Language, StudentInfo, OfficeAppSection } from './types';
import { EXAM_MODULES, MODEL_ANSWER_RUBRIC } from './data/examData';
import { PPT_EXAM_MODULES, PPT_MODEL_ANSWER_RUBRIC } from './data/powerpointExamData';
import { EXCEL_EXAM_MODULES, EXCEL_MODEL_ANSWER_RUBRIC } from './data/excelExamData';
import { ACCESS_EXAM_MODULES, ACCESS_MODEL_ANSWER_RUBRIC } from './data/accessExamData';
import { Header } from './components/Header';
import { OfficeSuiteHome, OFFICE_APPS } from './components/OfficeSuiteHome';
import { ExamHero } from './components/ExamHero';
import { ModuleCard } from './components/ModuleCard';
import { WordSimulator } from './components/WordSimulator';
import { PowerPointSimulator } from './components/PowerPointSimulator';
import { ExcelSimulator } from './components/ExcelSimulator';
import { AccessSimulator } from './components/AccessSimulator';
import { PrintableExam } from './components/PrintableExam';
import { DataPackModal } from './components/DataPackModal';
import { AnswerKeyModal } from './components/AnswerKeyModal';
import { ScoreModal } from './components/ScoreModal';
import { ComingSoonModal } from './components/ComingSoonModal';
import { getTranslation } from './data/translations';
import { BookOpen, Sparkles, CheckCircle2, Award, Printer, ArrowLeft, Presentation, FileSpreadsheet, Database } from 'lucide-react';

export function App() {

  const [viewMode, setViewMode] = useState<ExamViewMode>('home');
  const [language, setLanguage] = useState<Language>('ar');
  const [selectedApp, setSelectedApp] = useState<'word' | 'excel' | 'powerpoint' | 'access'>('word');
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
  
  // Coming soon modal for unreleased features if any
  const [selectedComingSoonApp, setSelectedComingSoonApp] = useState<OfficeAppSection | null>(null);

  // Simulator highlight scroll link
  const [highlightedCheckId, setHighlightedCheckId] = useState<string | undefined>(undefined);

  // Active Modules & Tasks calculation based on selectedApp
  const activeModules = 
    selectedApp === 'excel' ? EXCEL_EXAM_MODULES :
    selectedApp === 'powerpoint' ? PPT_EXAM_MODULES :
    selectedApp === 'access' ? ACCESS_EXAM_MODULES :
    EXAM_MODULES;

  const activeRubric = 
    selectedApp === 'excel' ? EXCEL_MODEL_ANSWER_RUBRIC :
    selectedApp === 'powerpoint' ? PPT_MODEL_ANSWER_RUBRIC :
    selectedApp === 'access' ? ACCESS_MODEL_ANSWER_RUBRIC :
    MODEL_ANSWER_RUBRIC;

  const allTasks = activeModules.flatMap(m => m.tasks);
  const totalTasksCount = allTasks.length;
  const totalPoints = activeModules.reduce((sum, m) => sum + m.totalPoints, 0);

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

  // Auto check task from simulator action
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
    setSelectedApp(appId);
    setCompletedTaskIds([]);
    setViewMode('exam');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Top Header Navigation */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        language={language}
        setLanguage={setLanguage}
        selectedApp={selectedApp}
        onSelectApp={handleSelectApp}
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
            language={language}
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
                <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                <span>
                  {language === 'ar' ? 'العودة إلى بوابة أوفيس' : 'Return to Office Suite Portal'}
                </span>
              </button>
            </div>

            {/* Hero Student Registration */}
            <ExamHero
              studentInfo={studentInfo}
              setStudentInfo={setStudentInfo}
              language={language}
              selectedApp={selectedApp}
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
                {language === 'ar' 
                  ? `قائمة وحدات اختبار ${selectedApp === 'excel' ? 'اكسيل' : selectedApp === 'powerpoint' ? 'باوربوينت' : selectedApp === 'access' ? 'اكسس لقواعد البيانات' : 'وورد'} (6 وحدات • 100 درجة)`
                  : `${selectedApp === 'excel' ? 'Excel' : selectedApp === 'powerpoint' ? 'PowerPoint' : selectedApp === 'access' ? 'Access Database' : 'Word'} Exam Modules Checklist (6 Modules • 100 Points)`
                }
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'ar'
                  ? 'انقر على مربعات الاختيار أو استخدم المحاكي التفاعلي المباشر'
                  : 'Click task checkboxes or try inside Live Simulator'
                }
              </span>
            </div>

            <div className="space-y-6">
              {activeModules.map((module, idx) => (
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

        {/* VIEW 3: LIVE INTERACTIVE SIMULATOR (WORD or POWERPOINT) */}
        {viewMode === 'simulator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <button
                  onClick={() => setViewMode('exam')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition mb-1"
                >
                  <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  <span>
                    {language === 'ar' ? 'العودة لقائمة أسئلة الاختبار' : 'Back to Exam Question List'}
                  </span>
                </button>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>
                    {selectedApp === 'excel' 
                      ? (language === 'ar' ? 'المحاكي المباشر للجداول الإلكترونية مايكروسوفت اكسيل' : 'Microsoft Excel Live Interactive Simulator')
                      : selectedApp === 'powerpoint'
                      ? (language === 'ar' ? 'المحاكي المباشر لبرنامج مايكروسوفت باوربوينت' : 'Microsoft PowerPoint Live Interactive Simulator')
                      : selectedApp === 'access'
                      ? (language === 'ar' ? 'المحاكي المباشر لقواعد البيانات مايكروسوفت اكسس' : 'Microsoft Access Live Database Simulator')
                      : (language === 'ar' ? 'المحاكي المباشر لبرنامج مايكروسوفت وورد' : 'Microsoft Word Live Interactive Simulator')}
                  </span>
                </h2>
              </div>
              
              <div className="text-right">
                <span className="text-xs text-slate-500 block">
                  {language === 'ar' ? 'التقييم التلقائي:' : 'Auto-Grading Progress:'}
                </span>
                <span className="text-base font-bold text-emerald-600 font-mono">
                  {earnedPoints} / {totalPoints} Pts
                </span>
              </div>
            </div>

            {selectedApp === 'excel' ? (
              <ExcelSimulator
                completedTaskIds={completedTaskIds}
                onAutoCheckTask={handleAutoCheckTask}
                highlightedCheckId={highlightedCheckId}
              />
            ) : selectedApp === 'powerpoint' ? (
              <PowerPointSimulator
                completedTaskIds={completedTaskIds}
                onAutoCheckTask={handleAutoCheckTask}
                highlightedCheckId={highlightedCheckId}
              />
            ) : selectedApp === 'access' ? (
              <AccessSimulator
                completedTaskIds={completedTaskIds}
                onAutoCheckTask={handleAutoCheckTask}
                highlightedCheckId={highlightedCheckId}
              />
            ) : (
              <WordSimulator
                completedTaskIds={completedTaskIds}
                onAutoCheckTask={handleAutoCheckTask}
                highlightedCheckId={highlightedCheckId}
              />
            )}
          </div>
        )}

        {/* VIEW 4: PRINTABLE PAPER EXAM SHEET */}
        {viewMode === 'printable' && (
          <PrintableExam
            studentInfo={studentInfo}
            earnedPoints={earnedPoints}
            totalPoints={totalPoints}
            selectedApp={selectedApp}
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
                      {language === 'ar' 
                        ? `دليل المعلم ونموذج التقييم والإجابة (${selectedApp === 'powerpoint' ? 'باوربوينت' : 'وورد'})`
                        : `Teacher Guide & Model Evaluation Rubric (${selectedApp === 'powerpoint' ? 'PowerPoint' : 'Word'})`}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {language === 'ar' 
                        ? 'المعايير الرسمية ومسارات الأوامر لتقييم الاختبار العملي' 
                        : 'Official criteria and command paths for grading practical exams'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition hover:bg-slate-800"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'ar' ? 'طباعة الدليل' : 'Print Rubric'}</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold">
                      <th className="p-3">{language === 'ar' ? 'الوحدة' : 'Module Name'}</th>
                      <th className="p-3">{language === 'ar' ? 'معايير التقييم' : 'Evaluation Criteria'}</th>
                      <th className="p-3">{language === 'ar' ? 'خطوات الأوامر والشريط' : 'Command & Ribbon Steps'}</th>
                      <th className="p-3 text-center">{language === 'ar' ? 'الدرجة' : 'Score'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRubric.map((rubric, idx) => (
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
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 no-print" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="font-semibold text-slate-300">
              {language === 'ar' ? 'منصة الاختبارات العملية لمايكروسوفت أوفيس 2026' : 'Microsoft Office Practical Exams Portal 2026'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span>{language === 'ar' ? 'إعداد وتصميم:' : 'Created by'}</span>
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
        selectedApp={selectedApp}
      />

      <AnswerKeyModal
        isOpen={isAnswerKeyOpen}
        onClose={() => setIsAnswerKeyOpen(false)}
        selectedApp={selectedApp}
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

