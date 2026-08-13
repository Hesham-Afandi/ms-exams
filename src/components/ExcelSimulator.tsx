import React, { useState } from 'react';
import { 
  Grid, Table, Calculator, Search, Filter, BarChart3, Shield, FileSpreadsheet,
  Check, ChevronDown, Lock, Eye, Download, Sparkles, Layers, RefreshCw, Plus,
  Sliders, PlusCircle, ArrowUpDown, CornerDownLeft
} from 'lucide-react';

interface ExcelSimulatorProps {
  completedTaskIds: string[];
  onAutoCheckTask: (taskId: string) => void;
  highlightedCheckId?: string | null;
}

interface CellData {
  value: string;
  formula?: string;
  displayValue?: string;
  isBold?: boolean;
  align?: 'left' | 'center' | 'right';
  bgColor?: string;
  textColor?: string;
  format?: 'number' | 'currency' | 'percentage' | 'text';
}

const INITIAL_GRID_DATA: CellData[][] = [
  // Row 0: Title Header (A1:I1)
  [
    { value: 'Academic Student Performance & Grade Assessment System 2026', isBold: true, align: 'center', bgColor: 'bg-blue-900', textColor: 'text-white' },
    { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }
  ],
  // Row 1: Subtitle / Instructions (A2:I2)
  [
    { value: 'Department of Computer Science & Information Technology', isBold: true, align: 'center', bgColor: 'bg-blue-50', textColor: 'text-blue-900' },
    { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }
  ],
  // Row 2: Table Column Headers (A3:I3)
  [
    { value: 'Student ID', isBold: true, align: 'center', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { value: 'Candidate Name', isBold: true, align: 'left', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { value: 'Dept', isBold: true, align: 'center', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { value: 'Midterm (30)', isBold: true, align: 'right', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { value: 'Final (50)', isBold: true, align: 'right', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { value: 'Practical (20)', isBold: true, align: 'right', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { value: 'Total Score', isBold: true, align: 'right', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { value: 'Grade', isBold: true, align: 'center', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { value: 'Status', isBold: true, align: 'center', bgColor: 'bg-blue-700', textColor: 'text-white' }
  ],
  // Row 3: STU-1001 (A4:I4)
  [
    { value: 'STU-1001', align: 'center' },
    { value: 'Ahmed Al-Mansoor', align: 'left' },
    { value: 'CS', align: 'center' },
    { value: '28', align: 'right' },
    { value: '45', align: 'right' },
    { value: '18', align: 'right' },
    { value: '=SUM(D4:F4)', formula: '=SUM(D4:F4)', displayValue: '91', align: 'right', isBold: true, bgColor: 'bg-emerald-50' },
    { value: '=VLOOKUP(G4,$K$4:$L$7,2,TRUE)', formula: '=VLOOKUP(G4,$K$4:$L$7,2,TRUE)', displayValue: 'A', align: 'center', isBold: true },
    { value: '=IF(G4>=60,"Passed","Failed")', formula: '=IF(G4>=60,"Passed","Failed")', displayValue: 'Passed', align: 'center', isBold: true, textColor: 'text-emerald-700', bgColor: 'bg-emerald-100' }
  ],
  // Row 4: STU-1002 (A5:I5)
  [
    { value: 'STU-1002', align: 'center' },
    { value: 'Sara Al-Otaibi', align: 'left' },
    { value: 'IT', align: 'center' },
    { value: '25', align: 'right' },
    { value: '42', align: 'right' },
    { value: '17', align: 'right' },
    { value: '84', displayValue: '84', align: 'right', isBold: true },
    { value: 'B', displayValue: 'B', align: 'center' },
    { value: 'Passed', displayValue: 'Passed', align: 'center', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50' }
  ],
  // Row 5: STU-1003 (A6:I6)
  [
    { value: 'STU-1003', align: 'center' },
    { value: 'Khaled Mahmoud', align: 'left' },
    { value: 'CS', align: 'center' },
    { value: '18', align: 'right' },
    { value: '28', align: 'right' },
    { value: '12', align: 'right' },
    { value: '58', displayValue: '58', align: 'right', isBold: true, bgColor: 'bg-rose-50' },
    { value: 'D', displayValue: 'D', align: 'center' },
    { value: 'Failed', displayValue: 'Failed', align: 'center', textColor: 'text-rose-700', bgColor: 'bg-rose-100' }
  ],
  // Row 6: STU-1004 (A7:I7)
  [
    { value: 'STU-1004', align: 'center' },
    { value: 'Fatima Al-Zahrani', align: 'left' },
    { value: 'IS', align: 'center' },
    { value: '29', align: 'right' },
    { value: '48', align: 'right' },
    { value: '19', align: 'right' },
    { value: '96', displayValue: '96', align: 'right', isBold: true, bgColor: 'bg-emerald-50' },
    { value: 'A', displayValue: 'A', align: 'center' },
    { value: 'Passed', displayValue: 'Passed', align: 'center', textColor: 'text-emerald-700', bgColor: 'bg-emerald-100' }
  ],
  // Row 7: STU-1005 (A8:I8)
  [
    { value: 'STU-1005', align: 'center' },
    { value: 'Omar Al-Dossari', align: 'left' },
    { value: 'IT', align: 'center' },
    { value: '22', align: 'right' },
    { value: '38', align: 'right' },
    { value: '15', align: 'right' },
    { value: '75', displayValue: '75', align: 'right', isBold: true },
    { value: 'B', displayValue: 'B', align: 'center' },
    { value: 'Passed', displayValue: 'Passed', align: 'center', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50' }
  ],
  // Row 8: STU-1006 (A9:I9)
  [
    { value: 'STU-1006', align: 'center' },
    { value: 'Layla Al-Ghamdi', align: 'left' },
    { value: 'IS', align: 'center' },
    { value: '27', align: 'right' },
    { value: '44', align: 'right' },
    { value: '18', align: 'right' },
    { value: '89', displayValue: '89', align: 'right', isBold: true, bgColor: 'bg-emerald-50' },
    { value: 'A', displayValue: 'A', align: 'center' },
    { value: 'Passed', displayValue: 'Passed', align: 'center', textColor: 'text-emerald-700', bgColor: 'bg-emerald-100' }
  ],
  // Row 9: Statistics Row 1 (A10:I10)
  [
    { value: 'Summary Statistics:', isBold: true, align: 'left' },
    { value: 'Average Score:', isBold: true, align: 'right' },
    { value: '=AVERAGE(G4:G9)', formula: '=AVERAGE(G4:G9)', displayValue: '82.2', isBold: true, align: 'left', textColor: 'text-blue-800' },
    { value: 'Highest Score:', isBold: true, align: 'right' },
    { value: '=MAX(G4:G9)', formula: '=MAX(G4:G9)', displayValue: '96', isBold: true, align: 'left', textColor: 'text-emerald-800' },
    { value: 'Lowest Score:', isBold: true, align: 'right' },
    { value: '=MIN(G4:G9)', formula: '=MIN(G4:G9)', displayValue: '58', isBold: true, align: 'left', textColor: 'text-rose-800' },
    { value: 'Passed Count:', isBold: true, align: 'right' },
    { value: '=COUNTIF(I4:I9,"Passed")', formula: '=COUNTIF(I4:I9,"Passed")', displayValue: '5', isBold: true, align: 'center', textColor: 'text-blue-900', bgColor: 'bg-blue-100' }
  ],
];

export const ExcelSimulator: React.FC<ExcelSimulatorProps> = ({
  onAutoCheckTask,
  highlightedCheckId,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'insert' | 'layout' | 'formulas' | 'data' | 'view'>('home');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number }>({ row: 3, col: 6 }); // G4 Total Score
  const [gridData, setGridData] = useState<CellData[][]>(INITIAL_GRID_DATA);
  const [formulaBarInput, setFormulaBarInput] = useState<string>('=SUM(D4:F4)');
  const [activeSheet, setActiveSheet] = useState<'sheet1' | 'sheet2' | 'sheet3'>('sheet1');
  
  // State toggles
  const [pageOrientation, setPageOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isTableFormatted, setIsTableFormatted] = useState<boolean>(false);
  const [isFreezePanes, setIsFreezePanes] = useState<boolean>(false);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [isSheetProtected, setIsSheetProtected] = useState<boolean>(false);
  const [showFormulas, setShowFormulas] = useState<boolean>(false);
  const [hasChartCreated, setHasChartCreated] = useState<boolean>(false);
  const [hasPivotTableCreated, setHasPivotTableCreated] = useState<boolean>(false);
  const [hasSlicerCreated, setHasSlicerCreated] = useState<boolean>(false);
  const [precedentsTraced, setPrecedentsTraced] = useState<boolean>(false);
  const [activeFilterDept, setActiveFilterDept] = useState<string>('ALL');

  const colNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  const getCellAddress = (row: number, col: number) => {
    return `${colNames[col]}${row + 1}`;
  };

  const handleSelectCell = (r: number, c: number) => {
    setSelectedCell({ row: r, col: c });
    const cell = gridData[r]?.[c];
    setFormulaBarInput(cell?.formula || cell?.value || '');
  };

  const handleFormulaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { row, col } = selectedCell;
    const input = formulaBarInput.trim();

    const updated = [...gridData.map(r => [...r])];
    let displayVal = input;

    if (input.startsWith('=')) {
      const upper = input.toUpperCase();
      if (upper.includes('SUM')) {
        displayVal = '91';
        onAutoCheckTask('excel_sum_formula');
      } else if (upper.includes('IF(') && upper.includes('PASSED')) {
        displayVal = 'Passed';
        onAutoCheckTask('excel_if_function');
      } else if (upper.includes('AVERAGE')) {
        displayVal = '82.2';
        onAutoCheckTask('excel_stats_functions');
      } else if (upper.includes('COUNTIF')) {
        displayVal = '5';
        onAutoCheckTask('excel_countif');
      } else if (upper.includes('VLOOKUP')) {
        displayVal = 'A';
        onAutoCheckTask('excel_vlookup');
      }
      updated[row][col] = {
        ...updated[row][col],
        value: input,
        formula: input,
        displayValue: displayVal,
      };
    } else {
      updated[row][col] = {
        ...updated[row][col],
        value: input,
        displayValue: input,
        formula: undefined,
      };
    }

    setGridData(updated);
  };

  // Ribbon Actions
  const handleFormatAsTable = () => {
    setIsTableFormatted(true);
    onAutoCheckTask('excel_table_style');
  };

  const handleSetLandscape = () => {
    setPageOrientation('landscape');
    onAutoCheckTask('excel_page_layout');
  };

  const handleFreezePanes = () => {
    setIsFreezePanes(!isFreezePanes);
    onAutoCheckTask('excel_freeze_panes');
  };

  const handleAutoSumClick = () => {
    setFormulaBarInput('=SUM(D4:F4)');
    handleFormulaSubmit({ preventDefault: () => {} } as React.FormEvent);
    onAutoCheckTask('excel_sum_formula');
  };

  const handleApplyVLookup = () => {
    setFormulaBarInput('=VLOOKUP(G4, $K$4:$L$7, 2, TRUE)');
    const { row, col } = selectedCell;
    const updated = [...gridData.map(r => [...r])];
    updated[row][col] = {
      ...updated[row][col],
      value: '=VLOOKUP(G4, $K$4:$L$7, 2, TRUE)',
      formula: '=VLOOKUP(G4, $K$4:$L$7, 2, TRUE)',
      displayValue: 'A',
      isBold: true
    };
    setGridData(updated);
    onAutoCheckTask('excel_vlookup');
  };

  const handleToggleFilter = () => {
    setIsFilterActive(!isFilterActive);
    onAutoCheckTask('excel_filter');
  };

  const handleDataValidation = () => {
    alert('Data Validation Rule Applied to Dept column: Allow List (CS, IT, IS)');
    onAutoCheckTask('excel_data_validation');
  };

  const handleConditionalFormatting = () => {
    alert('Conditional Formatting Applied: Scores >= 85 formatted in Light Green with Dark Green text.');
    onAutoCheckTask('excel_conditional_format');
  };

  const handleCustomSort = () => {
    alert('Multi-Level Custom Sort executed: Primary by Dept (A-Z), Secondary by Total Score (Highest to Lowest).');
    onAutoCheckTask('excel_sort');
  };

  const handleCreateChart = () => {
    setHasChartCreated(true);
    onAutoCheckTask('excel_chart');
  };

  const handleCreatePivotTable = () => {
    setHasPivotTableCreated(true);
    onAutoCheckTask('excel_pivottable');
  };

  const handleCreateSlicer = () => {
    setHasSlicerCreated(true);
    onAutoCheckTask('excel_slicer');
  };

  const handleProtectSheet = () => {
    setIsSheetProtected(!isSheetProtected);
    onAutoCheckTask('excel_protect_sheet');
  };

  const handleToggleShowFormulas = () => {
    setShowFormulas(!showFormulas);
    onAutoCheckTask('excel_show_formulas');
  };

  const handleNumberFormat = () => {
    onAutoCheckTask('excel_number_format');
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden font-sans" dir="ltr">
      {/* EXCEL TITLE BAR */}
      <div className="bg-emerald-900 px-4 py-2 flex items-center justify-between border-b border-emerald-700 text-white">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="w-5 h-5 text-emerald-300" />
          <span className="font-bold text-sm tracking-wide">
            Microsoft Excel 2026 - AcademicRegistration_Grades.xlsx [{pageOrientation.toUpperCase()}]
          </span>
          {isSheetProtected && (
            <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] rounded font-bold flex items-center gap-1">
              <Lock className="w-3 h-3" /> Protected
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button 
            onClick={handleSetLandscape}
            className={`px-2.5 py-1 rounded transition ${pageOrientation === 'landscape' ? 'bg-emerald-600 text-white font-bold' : 'bg-emerald-800 text-emerald-200 hover:bg-emerald-700'}`}
          >
            Landscape Mode
          </button>
          <button 
            onClick={handleFormatAsTable}
            className={`px-2.5 py-1 rounded transition ${isTableFormatted ? 'bg-emerald-600 text-white font-bold' : 'bg-emerald-800 text-emerald-200 hover:bg-emerald-700'}`}
          >
            Table Style Medium 9
          </button>
        </div>
      </div>

      {/* EXCEL RIBBON TABS */}
      <div className="bg-slate-800 border-b border-slate-700 flex items-center gap-1 px-3 pt-2 text-xs text-slate-300">
        {[
          { id: 'home', label: 'Home' },
          { id: 'insert', label: 'Insert' },
          { id: 'layout', label: 'Page Layout' },
          { id: 'formulas', label: 'Formulas' },
          { id: 'data', label: 'Data' },
          { id: 'view', label: 'View' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-1.5 rounded-t-lg font-medium transition ${
              activeTab === tab.id
                ? 'bg-emerald-700 text-white font-bold border-t-2 border-emerald-400'
                : 'hover:bg-slate-700 text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* EXCEL RIBBON TOOLBAR */}
      <div className="bg-slate-800 p-2 border-b border-slate-700 flex flex-wrap items-center gap-2 text-xs text-slate-200">
        {activeTab === 'home' && (
          <>
            <div className="flex items-center gap-1 bg-slate-700 p-1 rounded">
              <button onClick={() => onAutoCheckTask('excel_number_format')} className="px-2 py-1 font-bold hover:bg-slate-600 rounded">B</button>
              <button className="px-2 py-1 italic hover:bg-slate-600 rounded">I</button>
              <button className="px-2 py-1 underline hover:bg-slate-600 rounded">U</button>
            </div>
            <div className="h-5 w-px bg-slate-700" />
            <button 
              onClick={handleNumberFormat} 
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded flex items-center gap-1"
            >
              <span>$ Currency / %</span>
            </button>
            <button 
              onClick={handleFormatAsTable}
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition ${isTableFormatted ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              <Table className="w-3.5 h-3.5 text-blue-400" />
              <span>Format as Table</span>
            </button>
            <button 
              onClick={handleConditionalFormatting}
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Conditional Formatting</span>
            </button>
          </>
        )}

        {activeTab === 'insert' && (
          <>
            <button 
              onClick={handleCreateChart}
              className={`px-3 py-1 rounded flex items-center gap-1.5 font-bold transition ${hasChartCreated ? 'bg-emerald-600 text-white' : 'bg-emerald-800 hover:bg-emerald-700 text-emerald-100'}`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-300" />
              <span>Insert Clustered Column Chart</span>
            </button>
            <button 
              onClick={handleCreatePivotTable}
              className={`px-3 py-1 rounded flex items-center gap-1.5 font-bold transition ${hasPivotTableCreated ? 'bg-blue-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              <Grid className="w-4 h-4 text-blue-300" />
              <span>PivotTable</span>
            </button>
            <button 
              onClick={handleCreateSlicer}
              className={`px-3 py-1 rounded flex items-center gap-1.5 transition ${hasSlicerCreated ? 'bg-blue-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              <Sliders className="w-4 h-4 text-purple-300" />
              <span>Insert Slicer</span>
            </button>
          </>
        )}

        {activeTab === 'layout' && (
          <>
            <button 
              onClick={handleSetLandscape}
              className={`px-3 py-1 rounded font-bold transition ${pageOrientation === 'landscape' ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              Orientation: Landscape
            </button>
            <button 
              onClick={() => onAutoCheckTask('excel_page_layout')}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded"
            >
              Margins: Narrow
            </button>
            <button 
              onClick={() => onAutoCheckTask('excel_page_layout')}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded"
            >
              Print Gridlines: Checked
            </button>
          </>
        )}

        {activeTab === 'formulas' && (
          <>
            <button 
              onClick={handleAutoSumClick}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 font-bold rounded flex items-center gap-1 text-white"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>AutoSum (=SUM)</span>
            </button>
            <button 
              onClick={handleApplyVLookup}
              className="px-3 py-1 bg-blue-700 hover:bg-blue-600 font-bold rounded flex items-center gap-1 text-white"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Insert VLOOKUP</span>
            </button>
            <button 
              onClick={() => setPrecedentsTraced(!precedentsTraced)}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded"
            >
              Trace Precedents
            </button>
            <button 
              onClick={handleToggleShowFormulas}
              className={`px-3 py-1 rounded font-bold transition ${showFormulas ? 'bg-amber-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              Show Formulas (Ctrl + `)
            </button>
          </>
        )}

        {activeTab === 'data' && (
          <>
            <button 
              onClick={handleCustomSort}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded flex items-center gap-1"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
              <span>Custom Sort (Multi-Level)</span>
            </button>
            <button 
              onClick={handleToggleFilter}
              className={`px-3 py-1 rounded flex items-center gap-1 font-bold transition ${isFilterActive ? 'bg-blue-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>AutoFilter</span>
            </button>
            <button 
              onClick={handleDataValidation}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded"
            >
              Data Validation (CS, IT, IS)
            </button>
          </>
        )}

        {activeTab === 'view' && (
          <>
            <button 
              onClick={handleFreezePanes}
              className={`px-3 py-1 rounded font-bold transition ${isFreezePanes ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              Freeze Top Row (Header)
            </button>
            <button 
              onClick={handleProtectSheet}
              className={`px-3 py-1 rounded flex items-center gap-1 font-bold transition ${isSheetProtected ? 'bg-rose-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Protect Sheet</span>
            </button>
          </>
        )}
      </div>

      {/* FORMULA BAR */}
      <div className="bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center gap-3 text-xs">
        <div className="bg-slate-800 border border-slate-700 rounded px-3 py-1 text-emerald-400 font-mono font-bold min-w-[70px] text-center">
          {getCellAddress(selectedCell.row, selectedCell.col)}
        </div>
        <div className="text-slate-500 font-bold font-mono">fx</div>
        <form onSubmit={handleFormulaSubmit} className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={formulaBarInput}
            onChange={(e) => setFormulaBarInput(e.target.value)}
            placeholder="Type value or formula (e.g. =SUM(D4:F4), =IF(G4>=60, 'Passed', 'Failed'))"
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs flex items-center gap-1"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
            <span>Apply</span>
          </button>
        </form>
      </div>

      {/* SPREADSHEET GRID */}
      <div className="p-4 overflow-x-auto bg-slate-900 min-h-[380px]">
        {/* Visual Chart Overlay if created */}
        {hasChartCreated && (
          <div className="mb-4 bg-slate-800 border-2 border-emerald-500/50 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Academic Performance Comparison 2026 (Embedded Chart)
              </span>
              <span className="text-xs text-slate-400">Clustered Column Chart • 3D Render</span>
            </div>
            <div className="h-32 bg-slate-950 rounded-lg p-3 flex items-end justify-around gap-4 border border-slate-800">
              {[
                { name: 'Ahmed', mid: 28, fin: 45, prac: 18 },
                { name: 'Sara', mid: 25, fin: 42, prac: 17 },
                { name: 'Khaled', mid: 18, fin: 28, prac: 12 },
                { name: 'Fatima', mid: 29, fin: 48, prac: 19 },
                { name: 'Omar', mid: 22, fin: 38, prac: 15 },
              ].map((st, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex items-end gap-1 w-full h-24 justify-center">
                    <div className="w-3 bg-blue-500 rounded-t" style={{ height: `${(st.mid / 30) * 100}%` }} title={`Midterm: ${st.mid}`} />
                    <div className="w-3 bg-emerald-500 rounded-t" style={{ height: `${(st.fin / 50) * 100}%` }} title={`Final: ${st.fin}`} />
                    <div className="w-3 bg-purple-500 rounded-t" style={{ height: `${(st.prac / 20) * 100}%` }} title={`Practical: ${st.prac}`} />
                  </div>
                  <span className="text-[10px] text-slate-400 truncate max-w-[50px]">{st.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PivotTable & Slicer Overlay if created */}
        {hasPivotTableCreated && (
          <div className="mb-4 bg-slate-800 border border-blue-500/50 p-3 rounded-xl flex flex-wrap gap-4 items-center">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-xs text-slate-200">
              <span className="font-bold text-blue-400 block mb-1">PivotTable: Department Summary</span>
              <div className="space-y-1 font-mono">
                <div>CS Dept: Count = 2, Avg Score = 74.5</div>
                <div>IT Dept: Count = 2, Avg Score = 79.5</div>
                <div>IS Dept: Count = 2, Avg Score = 92.5</div>
              </div>
            </div>
            {hasSlicerCreated && (
              <div className="bg-blue-900/60 p-3 rounded-lg border border-blue-500 text-xs text-white">
                <span className="font-bold block mb-1 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> Department Slicer Filter
                </span>
                <div className="flex gap-1">
                  {['ALL', 'CS', 'IT', 'IS'].map(d => (
                    <button
                      key={d}
                      onClick={() => setActiveFilterDept(d)}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${activeFilterDept === d ? 'bg-blue-500 text-white' : 'bg-blue-950 text-blue-200'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MAIN SPREADSHEET TABLE GRID */}
        <table className="w-full text-xs border-collapse font-sans bg-white text-slate-900 rounded-lg overflow-hidden shadow-inner">
          <thead>
            <tr className="bg-slate-200 text-slate-700 border-b border-slate-300 font-mono">
              <th className="p-1 border border-slate-300 w-8 text-center bg-slate-300">#</th>
              {colNames.map((col, idx) => (
                <th key={col} className="p-1.5 border border-slate-300 text-center font-bold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gridData.map((row, rIdx) => {
              // Apply filter logic if active
              if (isFilterActive && activeFilterDept !== 'ALL' && rIdx >= 3 && rIdx <= 8) {
                const deptVal = row[2]?.value;
                if (deptVal !== activeFilterDept) return null;
              }

              return (
                <tr 
                  key={rIdx} 
                  className={`border-b border-slate-200 ${
                    isFreezePanes && rIdx === 2 ? 'border-b-4 border-emerald-500 sticky top-0 bg-blue-800 text-white font-bold' : ''
                  }`}
                >
                  <td className="p-1 border border-slate-300 text-center font-mono bg-slate-100 text-slate-500 font-bold select-none">
                    {rIdx + 1}
                  </td>
                  {row.map((cell, cIdx) => {
                    const isSelected = selectedCell.row === rIdx && selectedCell.col === cIdx;
                    return (
                      <td
                        key={cIdx}
                        onClick={() => handleSelectCell(rIdx, cIdx)}
                        className={`p-2 border border-slate-200 transition cursor-pointer select-none font-mono ${
                          cell.bgColor || ''
                        } ${cell.textColor || 'text-slate-800'} ${
                          cell.isBold ? 'font-bold' : ''
                        } ${
                          isSelected ? 'outline outline-2 outline-emerald-600 bg-emerald-50/80 z-10' : ''
                        }`}
                        style={{ textAlign: cell.align || 'left' }}
                      >
                        {showFormulas && cell.formula ? (
                          <span className="text-blue-700 font-bold">{cell.formula}</span>
                        ) : (
                          cell.displayValue || cell.value
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER STATS & AUTO-CHECK SUMMARY */}
      <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="font-bold text-slate-300">Sheet 1 of 3 (Active: Grades)</span>
          <span>Ready • Auto-Grader Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">100% Zoom</span>
        </div>
      </div>
    </div>
  );
};
