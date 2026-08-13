import React, { useState } from 'react';
import { 
  Database, GitMerge, Filter, Layout, Printer, Table, Key, Plus,
  Sparkles, Layers, Shield, Search, ArrowRight, Play, CheckCircle2,
  FileSpreadsheet, Sliders, ChevronRight, FileText, Check, AlertCircle, Edit3
} from 'lucide-react';

interface AccessSimulatorProps {
  completedTaskIds: string[];
  onAutoCheckTask: (taskId: string) => void;
  highlightedCheckId?: string | null;
}

export const AccessSimulator: React.FC<AccessSimulatorProps> = ({
  onAutoCheckTask,
  highlightedCheckId,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'create' | 'external' | 'tools'>('home');
  const [activeView, setActiveView] = useState<'datasheet' | 'design' | 'relationships' | 'query' | 'form' | 'report'>('datasheet');
  const [selectedObject, setSelectedObject] = useState<string>('tbl_Students');
  
  // State toggles for Access tasks
  const [hasPrimaryKeySet, setHasPrimaryKeySet] = useState<boolean>(false);
  const [hasValidationRuleSet, setHasValidationRuleSet] = useState<boolean>(false);
  const [hasInputMaskSet, setHasInputMaskSet] = useState<boolean>(false);
  const [hasReferentialIntegrity, setHasReferentialIntegrity] = useState<boolean>(false);
  const [hasQueryRun, setHasQueryRun] = useState<boolean>(false);
  const [hasCalculatedField, setHasCalculatedField] = useState<boolean>(false);
  const [hasUpdateQueryRun, setHasUpdateQueryRun] = useState<boolean>(false);
  const [hasFormCreated, setHasFormCreated] = useState<boolean>(false);
  const [hasSubformEmbedded, setHasSubformEmbedded] = useState<boolean>(false);
  const [hasReportWizardRun, setHasReportWizardRun] = useState<boolean>(false);

  // Sample Student Data
  const [studentsData, setStudentsData] = useState([
    { id: 'STU-2001', name: 'Khalid Ibrahim', dept: 'CS', date: '2024-09-01', gpa: '3.85', status: 'Yes' },
    { id: 'STU-2002', name: 'Reem Abdullah', dept: 'IT', date: '2024-09-01', gpa: '3.60', status: 'Yes' },
    { id: 'STU-2003', name: 'Tariq Al-Sayed', dept: 'CS', date: '2025-01-15', gpa: '2.40', status: 'No' },
    { id: 'STU-2004', name: 'Mona Al-Hassan', dept: 'IS', date: '2024-09-01', gpa: '3.95', status: 'Yes' },
    { id: 'STU-2005', name: 'Faisal Al-Shammari', dept: 'IT', date: '2025-01-15', gpa: '3.10', status: 'Yes' },
  ]);

  // Ribbon Action Handlers
  const handleSetPrimaryKey = () => {
    setHasPrimaryKeySet(true);
    onAutoCheckTask('access_create_table');
  };

  const handleApplyValidationRule = () => {
    setHasValidationRuleSet(true);
    onAutoCheckTask('access_field_properties');
  };

  const handleApplyInputMask = () => {
    setHasInputMaskSet(true);
    onAutoCheckTask('access_input_mask');
  };

  const handleEnforceReferentialIntegrity = () => {
    setHasReferentialIntegrity(true);
    setActiveView('relationships');
    onAutoCheckTask('access_relationship_students');
    onAutoCheckTask('access_referential_integrity');
    onAutoCheckTask('access_relationship_courses');
  };

  const handleRunQuery = () => {
    setHasQueryRun(true);
    setActiveView('query');
    onAutoCheckTask('access_query_design');
    onAutoCheckTask('access_query_criteria');
  };

  const handleAddCalculatedField = () => {
    setHasCalculatedField(true);
    onAutoCheckTask('access_calculated_field');
  };

  const handleRunUpdateQuery = () => {
    setHasUpdateQueryRun(true);
    onAutoCheckTask('access_update_query');
    onAutoCheckTask('access_aggregate_query');
  };

  const handleCreateForm = () => {
    setHasFormCreated(true);
    setHasSubformEmbedded(true);
    setActiveView('form');
    onAutoCheckTask('access_form_wizard');
    onAutoCheckTask('access_subform');
    onAutoCheckTask('access_command_buttons');
  };

  const handleCreateReport = () => {
    setHasReportWizardRun(true);
    setActiveView('report');
    onAutoCheckTask('access_report_wizard');
    onAutoCheckTask('access_report_summary');
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden font-sans text-slate-100" dir="ltr">
      {/* ACCESS TITLE BAR */}
      <div className="bg-rose-950 px-4 py-2 flex items-center justify-between border-b border-rose-800 text-white">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-rose-300" />
          <span className="font-bold text-sm tracking-wide">
            Microsoft Access 2026 - AcademicRegistrationDB.accdb [Relational Engine]
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button 
            onClick={() => setActiveView('relationships')}
            className={`px-3 py-1 rounded transition flex items-center gap-1 ${activeView === 'relationships' ? 'bg-rose-600 font-bold' : 'bg-rose-900 hover:bg-rose-800'}`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>Relationships Diagram</span>
          </button>
        </div>
      </div>

      {/* ACCESS RIBBON TABS */}
      <div className="bg-slate-800 border-b border-slate-700 flex items-center gap-1 px-3 pt-2 text-xs text-slate-300">
        {[
          { id: 'home', label: 'Home' },
          { id: 'create', label: 'Create' },
          { id: 'external', label: 'External Data' },
          { id: 'tools', label: 'Database Tools' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-1.5 rounded-t-lg font-medium transition ${
              activeTab === tab.id
                ? 'bg-rose-700 text-white font-bold border-t-2 border-rose-400'
                : 'hover:bg-slate-700 text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACCESS TOOLBAR */}
      <div className="bg-slate-800 p-2 border-b border-slate-700 flex flex-wrap items-center gap-2 text-xs text-slate-200">
        {activeTab === 'home' && (
          <>
            <button 
              onClick={() => setActiveView('datasheet')}
              className={`px-3 py-1 rounded font-bold transition flex items-center gap-1 ${activeView === 'datasheet' ? 'bg-rose-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              <Table className="w-3.5 h-3.5" /> Datasheet View
            </button>
            <button 
              onClick={() => setActiveView('design')}
              className={`px-3 py-1 rounded font-bold transition flex items-center gap-1 ${activeView === 'design' ? 'bg-rose-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              <Edit3 className="w-3.5 h-3.5" /> Design View
            </button>
            <div className="h-5 w-px bg-slate-700" />
            <button onClick={handleSetPrimaryKey} className="px-3 py-1 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded flex items-center gap-1">
              <Key className="w-3.5 h-3.5" /> Set Primary Key (StudentID)
            </button>
          </>
        )}

        {activeTab === 'create' && (
          <>
            <button 
              onClick={handleRunQuery}
              className="px-3 py-1 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded flex items-center gap-1"
            >
              <Filter className="w-3.5 h-3.5" /> Query Design (Multi-Table)
            </button>
            <button 
              onClick={handleAddCalculatedField}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded"
            >
              Add Calculated Field (TotalTuition)
            </button>
            <button 
              onClick={handleCreateForm}
              className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded flex items-center gap-1"
            >
              <Layout className="w-3.5 h-3.5" /> Form Wizard + Subform
            </button>
            <button 
              onClick={handleCreateReport}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> Report Wizard (Grouped)
            </button>
          </>
        )}

        {activeTab === 'external' && (
          <>
            <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded flex items-center gap-1">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" /> Import Excel Dataset
            </button>
            <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded">Export PDF Report</button>
          </>
        )}

        {activeTab === 'tools' && (
          <>
            <button 
              onClick={handleEnforceReferentialIntegrity}
              className="px-3 py-1 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded flex items-center gap-1"
            >
              <GitMerge className="w-3.5 h-3.5" /> Relationships & Referential Integrity
            </button>
            <button onClick={handleRunUpdateQuery} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded">
              Run Update Action Query (+10% Fees)
            </button>
          </>
        )}
      </div>

      {/* MAIN CONTAINER: LEFT NAVIGATION PANE + WORKSPACE */}
      <div className="flex flex-col md:flex-row min-h-[420px]">
        {/* LEFT ACCESS NAVIGATION PANE */}
        <div className="w-full md:w-64 bg-slate-950 p-3 border-r border-slate-800 text-xs shrink-0">
          <div className="font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 flex items-center justify-between border-b border-slate-800 pb-2">
            <span>All Access Objects</span>
            <Database className="w-3.5 h-3.5 text-rose-400" />
          </div>

          <div className="space-y-4 font-mono">
            {/* Tables Section */}
            <div>
              <span className="font-bold text-rose-400 block mb-1 text-[11px]">Tables (4)</span>
              {['tbl_Students', 'tbl_Courses', 'tbl_Enrollments', 'tbl_Departments'].map(tbl => (
                <button
                  key={tbl}
                  onClick={() => { setSelectedObject(tbl); setActiveView('datasheet'); }}
                  className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 transition ${
                    selectedObject === tbl && activeView === 'datasheet' ? 'bg-rose-900/80 text-white font-bold border-l-2 border-rose-400' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Table className="w-3 h-3 text-rose-400 shrink-0" />
                  <span className="truncate">{tbl}</span>
                </button>
              ))}
            </div>

            {/* Queries Section */}
            <div>
              <span className="font-bold text-blue-400 block mb-1 text-[11px]">Queries (3)</span>
              {['qry_HighHonorsStudents', 'qry_DepartmentSummary', 'qry_SearchByDept'].map(qry => (
                <button
                  key={qry}
                  onClick={() => { setSelectedObject(qry); setActiveView('query'); }}
                  className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 transition ${
                    selectedObject === qry && activeView === 'query' ? 'bg-blue-900/80 text-white font-bold border-l-2 border-blue-400' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Filter className="w-3 h-3 text-blue-400 shrink-0" />
                  <span className="truncate">{qry}</span>
                </button>
              ))}
            </div>

            {/* Forms Section */}
            <div>
              <span className="font-bold text-purple-400 block mb-1 text-[11px]">Forms (2)</span>
              {['frm_StudentRegistration', 'frm_CourseDetails'].map(frm => (
                <button
                  key={frm}
                  onClick={() => { setSelectedObject(frm); setActiveView('form'); }}
                  className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 transition ${
                    selectedObject === frm && activeView === 'form' ? 'bg-purple-900/80 text-white font-bold border-l-2 border-purple-400' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Layout className="w-3 h-3 text-purple-400 shrink-0" />
                  <span className="truncate">{frm}</span>
                </button>
              ))}
            </div>

            {/* Reports Section */}
            <div>
              <span className="font-bold text-emerald-400 block mb-1 text-[11px]">Reports (2)</span>
              {['rpt_DepartmentStudents', 'rpt_GradeSummary'].map(rpt => (
                <button
                  key={rpt}
                  onClick={() => { setSelectedObject(rpt); setActiveView('report'); }}
                  className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 transition ${
                    selectedObject === rpt && activeView === 'report' ? 'bg-emerald-900/80 text-white font-bold border-l-2 border-emerald-400' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Printer className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{rpt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* WORKSPACE AREA */}
        <div className="flex-1 bg-slate-900 p-4 overflow-x-auto">
          {/* VIEW 1: DATASHEET VIEW */}
          {activeView === 'datasheet' && (
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-rose-400">
                  <Table className="w-4 h-4" />
                  <span>{selectedObject} [Datasheet View]</span>
                </div>
                {hasPrimaryKeySet && (
                  <span className="text-xs bg-amber-900/60 text-amber-300 border border-amber-600 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                    <Key className="w-3 h-3" /> PK: StudentID
                  </span>
                )}
              </div>

              <table className="w-full text-xs font-mono border-collapse bg-slate-950 text-slate-200 rounded-lg overflow-hidden border border-slate-800">
                <thead>
                  <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                    <th className="p-2 border border-slate-700 text-left font-bold flex items-center gap-1">
                      {hasPrimaryKeySet && <Key className="w-3 h-3 text-amber-400" />} StudentID
                    </th>
                    <th className="p-2 border border-slate-700 text-left font-bold">FullName</th>
                    <th className="p-2 border border-slate-700 text-center font-bold">Department</th>
                    <th className="p-2 border border-slate-700 text-center font-bold">EnrollmentDate</th>
                    <th className="p-2 border border-slate-700 text-right font-bold">GPA</th>
                    <th className="p-2 border border-slate-700 text-center font-bold">ActiveStatus</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsData.map((st, i) => (
                    <tr key={i} className="border-b border-slate-800 hover:bg-slate-900/80">
                      <td className="p-2 border border-slate-800 font-bold text-rose-400">{st.id}</td>
                      <td className="p-2 border border-slate-800 text-slate-100">{st.name}</td>
                      <td className="p-2 border border-slate-800 text-center text-blue-300">{st.dept}</td>
                      <td className="p-2 border border-slate-800 text-center text-slate-400">{st.date}</td>
                      <td className="p-2 border border-slate-800 text-right font-bold text-emerald-400">{st.gpa}</td>
                      <td className="p-2 border border-slate-800 text-center text-emerald-300">{st.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VIEW 2: RELATIONSHIPS DIAGRAM VIEW */}
          {activeView === 'relationships' && (
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-rose-400">
                  <GitMerge className="w-4 h-4" />
                  <span>Relational Database Schema & Relationships</span>
                </div>
                <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded font-mono font-bold">
                  Referential Integrity Enforced
                </span>
              </div>

              {/* VISUAL SCHEMA CONNECTOR NODES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-950 rounded-xl border border-slate-800 relative">
                {/* Table 1: tbl_Students */}
                <div className="bg-slate-900 border-2 border-rose-500/80 rounded-lg overflow-hidden shadow-xl">
                  <div className="bg-rose-900 px-3 py-1.5 font-bold text-xs text-white flex items-center justify-between">
                    <span>tbl_Students</span>
                    <span className="text-[10px] bg-rose-950 px-1.5 py-0.5 rounded">Primary Table (1)</span>
                  </div>
                  <div className="p-2 space-y-1 font-mono text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-950/40 p-1 rounded">
                      <Key className="w-3 h-3" /> StudentID (PK)
                    </div>
                    <div className="p-1 text-slate-300">FullName</div>
                    <div className="p-1 text-slate-300">Department</div>
                    <div className="p-1 text-slate-300">EnrollmentDate</div>
                    <div className="p-1 text-slate-300">GPA</div>
                  </div>
                </div>

                {/* Table 2: tbl_Enrollments (Junction Table) */}
                <div className="bg-slate-900 border-2 border-blue-500/80 rounded-lg overflow-hidden shadow-xl">
                  <div className="bg-blue-900 px-3 py-1.5 font-bold text-xs text-white flex items-center justify-between">
                    <span>tbl_Enrollments</span>
                    <span className="text-[10px] bg-blue-950 px-1.5 py-0.5 rounded">Foreign Table (∞)</span>
                  </div>
                  <div className="p-2 space-y-1 font-mono text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-400 p-1">
                      <Key className="w-3 h-3" /> EnrollmentID (PK)
                    </div>
                    <div className="p-1 text-blue-300 font-bold bg-blue-950/40 rounded">StudentID (FK)</div>
                    <div className="p-1 text-blue-300 font-bold bg-blue-950/40 rounded">CourseID (FK)</div>
                    <div className="p-1 text-slate-300">Semester</div>
                    <div className="p-1 text-slate-300">Score</div>
                  </div>
                </div>

                {/* Table 3: tbl_Courses */}
                <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-lg overflow-hidden shadow-xl">
                  <div className="bg-emerald-900 px-3 py-1.5 font-bold text-xs text-white flex items-center justify-between">
                    <span>tbl_Courses</span>
                    <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded">Primary Table (1)</span>
                  </div>
                  <div className="p-2 space-y-1 font-mono text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-950/40 p-1 rounded">
                      <Key className="w-3 h-3" /> CourseID (PK)
                    </div>
                    <div className="p-1 text-slate-300">CourseTitle</div>
                    <div className="p-1 text-slate-300">CreditHours</div>
                    <div className="p-1 text-slate-300">CostPerCredit</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: QUERY DESIGN VIEW */}
          {activeView === 'query' && (
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-400">
                  <Filter className="w-4 h-4" />
                  <span>qry_HighHonorsStudents [Query Design Grid]</span>
                </div>
                <button 
                  onClick={handleRunQuery}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" /> Run Query (!)
                </button>
              </div>

              {/* QUERY DESIGN GRID */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs">
                <table className="w-full border-collapse border border-slate-800">
                  <thead>
                    <tr className="bg-slate-800 text-slate-300">
                      <th className="p-2 border border-slate-700 text-left font-bold">Field:</th>
                      <td className="p-2 border border-slate-700 font-bold text-rose-400">FullName</td>
                      <td className="p-2 border border-slate-700 font-bold text-blue-400">Department</td>
                      <td className="p-2 border border-slate-700 font-bold text-emerald-400">GPA</td>
                      <td className="p-2 border border-slate-700 font-bold text-amber-400">TotalTuition (Calc)</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="p-2 border border-slate-700 text-left bg-slate-900 text-slate-400">Table:</th>
                      <td className="p-2 border border-slate-700 text-slate-400">tbl_Students</td>
                      <td className="p-2 border border-slate-700 text-slate-400">tbl_Students</td>
                      <td className="p-2 border border-slate-700 text-slate-400">tbl_Students</td>
                      <td className="p-2 border border-slate-700 text-slate-400">tbl_Courses</td>
                    </tr>
                    <tr>
                      <th className="p-2 border border-slate-700 text-left bg-slate-900 text-slate-400">Criteria:</th>
                      <td className="p-2 border border-slate-700 text-slate-500">-</td>
                      <td className="p-2 border border-slate-700 text-blue-300 font-bold font-sans">"CS" Or "IT"</td>
                      <td className="p-2 border border-slate-700 text-emerald-300 font-bold">&gt;= 3.50</td>
                      <td className="p-2 border border-slate-700 text-slate-500">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 4: FORM VIEW */}
          {activeView === 'form' && (
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-purple-400">
                  <Layout className="w-4 h-4" />
                  <span>frm_StudentRegistration [Interactive Form + Embedded Subform]</span>
                </div>
              </div>

              <div className="max-w-2xl mx-auto bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-2xl">
                <div className="bg-purple-900 p-3 rounded-xl mb-4 text-white font-bold flex items-center justify-between">
                  <span>Student Registration & Course Enrollment Form</span>
                  <span className="text-xs bg-purple-950 px-2 py-0.5 rounded font-mono">Record 1 of 5</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-xs font-sans">
                  <div>
                    <label className="text-slate-400 block mb-1">Student ID:</label>
                    <input type="text" readOnly value="STU-2001" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-rose-400 font-bold font-mono" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Candidate Full Name:</label>
                    <input type="text" readOnly value="Khalid Ibrahim" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-bold" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Department:</label>
                    <input type="text" readOnly value="Computer Science (CS)" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-blue-300 font-bold" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Academic GPA:</label>
                    <input type="text" readOnly value="3.85 (Honors)" className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-emerald-400 font-bold" />
                  </div>
                </div>

                {/* Embedded Subform */}
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 mb-4">
                  <span className="text-xs font-bold text-purple-300 block mb-2">subfrm_CourseEnrollments (Related Records)</span>
                  <table className="w-full text-xs font-mono text-slate-200">
                    <thead>
                      <tr className="bg-slate-800 text-slate-400">
                        <th className="p-1.5 text-left">CourseID</th>
                        <th className="p-1.5 text-left">Semester</th>
                        <th className="p-1.5 text-right">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-800">
                        <td className="p-1.5 text-rose-400 font-bold">CS101</td>
                        <td className="p-1.5">Fall 2025</td>
                        <td className="p-1.5 text-right text-emerald-400 font-bold">92</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Command Buttons */}
                <div className="flex justify-end gap-2 text-xs">
                  <button className="px-3 py-1.5 bg-purple-700 text-white font-bold rounded">Add New Record</button>
                  <button className="px-3 py-1.5 bg-emerald-700 text-white font-bold rounded">Save Record</button>
                  <button className="px-3 py-1.5 bg-slate-800 text-slate-300 font-bold rounded">Close Form</button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5: REPORT VIEW */}
          {activeView === 'report' && (
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <Printer className="w-4 h-4" />
                  <span>rpt_DepartmentStudents [Grouped Academic Report]</span>
                </div>
              </div>

              <div className="bg-white text-slate-900 p-6 rounded-2xl max-w-3xl mx-auto shadow-2xl font-sans">
                <div className="border-b-2 border-slate-900 pb-3 mb-4 text-center">
                  <h3 className="text-lg font-black text-slate-900">Official Departmental Academic Summary 2026</h3>
                  <p className="text-xs text-slate-500">Microsoft Access Relational Database Report Output</p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Department Group CS */}
                  <div className="border border-slate-300 rounded-lg p-3 bg-slate-50">
                    <div className="font-bold text-slate-900 bg-blue-100 p-1.5 rounded mb-2 text-sm">
                      Department: Computer Science (CS)
                    </div>
                    <table className="w-full text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-400 text-slate-600">
                          <th className="p-1 text-left">StudentID</th>
                          <th className="p-1 text-left">FullName</th>
                          <th className="p-1 text-right">GPA</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-1 font-bold text-rose-700">STU-2001</td>
                          <td className="p-1">Khalid Ibrahim</td>
                          <td className="p-1 text-right font-bold text-emerald-700">3.85</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-2 pt-1 border-t border-slate-300 text-right font-bold text-blue-900">
                      Summary Footer: Total Students = 2 • Dept Avg GPA = 3.12
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Object: {selectedObject}</span>
        <span>Auto-Grader Engine Active</span>
      </div>
    </div>
  );
};
