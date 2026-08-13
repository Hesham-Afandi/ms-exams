import { ExamModule } from '../types';

export const RAW_EXCEL_DATASET = `Microsoft Excel Practical Examination 2026
Sheet 1: Student Academic Performance & Grade System

Student ID | Candidate Name   | Dept | Midterm (30) | Final Exam (50) | Practical (20) | Total Score | Grade | Status
STU-1001   | Ahmed Al-Mansoor | CS   | 28           | 45              | 18             | =SUM(D4:F4) | =IF(G4>=85,"A",IF(G4>=75,"B",IF(G4>=65,"C","D"))) | =IF(G4>=60,"Passed","Failed")
STU-1002   | Sara Al-Otaibi   | IT   | 25           | 42              | 17             | 84          | B     | Passed
STU-1003   | Khaled Mahmoud   | CS   | 18           | 28              | 12             | 58          | D     | Failed
STU-1004   | Fatima Al-Zahrani| IS   | 29           | 48              | 19             | 96          | A     | Passed
STU-1005   | Omar Al-Dossari  | IT   | 22           | 38              | 15             | 75          | B     | Passed
STU-1006   | Layla Al-Ghamdi  | IS   | 27           | 44              | 18             | 89          | A     | Passed

Sheet 2: Grade Lookup Scale Table ($G$4:$H$7)
Min Score | Letter Grade
0         | F
60        | C
75        | B
85        | A

Sheet 3: Department Summary Statistics
Total Students: =COUNTA(B4:B9)
Average Total Score: =AVERAGE(G4:G9)
Highest Score: =MAX(G4:G9)
Lowest Score: =MIN(G4:G9)
Passed Count: =COUNTIF(I4:I9, "Passed")
CS Dept Avg: =AVERAGEIF(C4:C9, "CS", G4:G9)`;

export const EXCEL_EXAM_MODULES: ExamModule[] = [
  {
    id: 'excel_mod1',
    moduleNumber: 1,
    title: 'Workbook Setup, Formatting & Cell Styles',
    subtitle: 'Page Orientation, Number Formatting, Table Styles & Freeze Panes',
    totalPoints: 15,
    iconName: 'Grid',
    description: 'Configure workbook structure, page orientation, custom column widths, currency/percentage number formatting, table styles, and freeze header panes.',
    tasks: [
      {
        id: 'excel_t1_1',
        title: 'Set Worksheet Page Layout & Print Area',
        description: 'Set page orientation to Landscape, page margins to Narrow, and enable Gridlines and Row/Column Headings for printing.',
        points: 4,
        wordPath: 'Page Layout tab > Page Setup group > Orientation > Landscape | Check "Print" under Gridlines',
        tips: ['Landscape layout ensures all 8 data columns fit on a single printed page'],
        autoCheckId: 'excel_page_layout',
      },
      {
        id: 'excel_t1_2',
        title: 'Apply Number Formatting & Alignment',
        description: 'Format score columns as Number with 0 decimal places. Center align Student ID and Dept columns. Merge and Center the main title across columns A1:I1 with Accent 1 Cell Style.',
        points: 4,
        wordPath: 'Home tab > Alignment group > Merge & Center | Number group > Accounting/Number | Cell Styles > Accent 1',
        autoCheckId: 'excel_number_format',
      },
      {
        id: 'excel_t1_3',
        title: 'Format Range as Table & Banded Rows',
        description: 'Convert range A3:I9 into an official Excel Table with headers using "Table Style Medium 9" (Blue), and enable Banded Rows.',
        points: 4,
        wordPath: 'Home tab > Styles group > Format as Table > Table Style Medium 9 | Table Design tab',
        autoCheckId: 'excel_table_style',
      },
      {
        id: 'excel_t1_4',
        title: 'AutoFit Column Widths & Freeze Panes',
        description: 'AutoFit all column widths (A:I) so no text is clipped. Freeze Row 3 (Header Row) so column labels remain visible when scrolling down.',
        points: 3,
        wordPath: 'Home tab > Cells group > Format > AutoFit Column Width | View tab > Window group > Freeze Panes > Freeze Top Row',
        autoCheckId: 'excel_freeze_panes',
      },
    ],
  },
  {
    id: 'excel_mod2',
    moduleNumber: 2,
    title: 'Mathematical Formulas & Logical Functions',
    subtitle: 'SUM, AVERAGE, MAX, MIN, COUNTIF & Nested IF Functions',
    totalPoints: 20,
    iconName: 'Calculator',
    description: 'Master mathematical formulas, logical IF criteria, conditional aggregation functions, and formula copying using absolute cell referencing ($).',
    tasks: [
      {
        id: 'excel_t2_1',
        title: 'Calculate Total Student Scores with SUM Formula',
        description: 'In cell G4, insert formula `=SUM(D4:F4)` to calculate total score for the first student. Copy the formula down to range G5:G9 using AutoFill.',
        points: 5,
        wordPath: 'Formulas tab > Function Library > AutoSum > SUM (=SUM(D4:F4))',
        autoCheckId: 'excel_sum_formula',
      },
      {
        id: 'excel_t2_2',
        title: 'Determine Pass/Fail Status using IF Logical Function',
        description: 'In cell I4, insert logical formula `=IF(G4>=60, "Passed", "Failed")`. AutoFill down to row 9.',
        points: 5,
        wordPath: 'Formulas tab > Logical > IF (Logical_test: G4>=60, Value_if_true: "Passed", Value_if_false: "Failed")',
        autoCheckId: 'excel_if_function',
      },
      {
        id: 'excel_t2_3',
        title: 'Calculate Summary Statistics (AVERAGE, MAX, MIN, COUNTA)',
        description: 'In summary section: calculate Average Score (`=AVERAGE(G4:G9)`), Highest Score (`=MAX(G4:G9)`), Lowest Score (`=MIN(G4:G9)`), and Total Candidates (`=COUNTA(B4:B9)`).',
        points: 5,
        wordPath: 'Formulas tab > Function Library > Math & Trig / Statistical > AVERAGE, MAX, MIN, COUNTA',
        autoCheckId: 'excel_stats_functions',
      },
      {
        id: 'excel_t2_4',
        title: 'Apply Conditional Aggregation (COUNTIF & SUMIF)',
        description: 'Calculate total number of passed students using `=COUNTIF(I4:I9, "Passed")` and average score for CS department using `=AVERAGEIF(C4:C9, "CS", G4:G9)`.',
        points: 5,
        wordPath: 'Formulas tab > Statistical > COUNTIF & AVERAGEIF',
        autoCheckId: 'excel_countif',
      },
    ],
  },
  {
    id: 'excel_mod3',
    moduleNumber: 3,
    title: 'Lookup Functions, Data Validation & Conditional Formatting',
    subtitle: 'VLOOKUP, Absolute References ($), Data Rules & Color Formatting',
    totalPoints: 20,
    iconName: 'Search',
    description: 'Implement VLOOKUP lookups across tables, set up data entry validation dropdown lists, and apply dynamic conditional formatting color rules.',
    tasks: [
      {
        id: 'excel_t3_1',
        title: 'Assign Letter Grades using VLOOKUP & Absolute Cell Reference',
        description: 'In cell H4, insert lookup formula `=VLOOKUP(G4, $K$4:$L$7, 2, TRUE)` to retrieve letter grade from the lookup scale table using absolute cell references ($).',
        points: 6,
        wordPath: 'Formulas tab > Lookup & Reference > VLOOKUP (Lookup_value: G4, Table_array: $K$4:$L$7, Col_index_num: 2, Range_lookup: TRUE)',
        autoCheckId: 'excel_vlookup',
      },
      {
        id: 'excel_t3_2',
        title: 'Create Data Validation Dropdown List for Departments',
        description: 'Apply Data Validation to Dept column (C4:C9) restricting entry to a List source: `CS, IT, IS`. Add an Error Alert message for invalid entries.',
        points: 5,
        wordPath: 'Data tab > Data Tools group > Data Validation > Allow: List > Source: CS, IT, IS',
        autoCheckId: 'excel_data_validation',
      },
      {
        id: 'excel_t3_3',
        title: 'Apply Conditional Formatting Highlighting Rules',
        description: 'Apply Conditional Formatting to Total Score column (G4:G9): Highlight cells >= 85 with Light Green Fill and Dark Green Text. Highlight cells < 60 with Light Red Fill.',
        points: 5,
        wordPath: 'Home tab > Styles group > Conditional Formatting > Highlight Cells Rules > Greater Than 84 / Less Than 60',
        autoCheckId: 'excel_conditional_format',
      },
      {
        id: 'excel_t3_4',
        title: 'Apply Data Bars or Color Scale Visuals',
        description: 'Apply Blue Data Bars to Final Exam column (E4:E9) to visually represent comparative scores directly within cells.',
        points: 4,
        wordPath: 'Home tab > Styles group > Conditional Formatting > Data Bars > Gradient Fill > Blue Data Bar',
      },
    ],
  },
  {
    id: 'excel_mod4',
    moduleNumber: 4,
    title: 'Data Sorting, Multi-Level Filtering & Subtotals',
    subtitle: 'Custom Sort, Multi-Criteria AutoFilter, Subtotals & Outline Groups',
    totalPoints: 15,
    iconName: 'Filter',
    description: 'Sort dataset by multiple fields, apply advanced AutoFilter criteria, create outline groups, and insert automatic Subtotals.',
    tasks: [
      {
        id: 'excel_t4_1',
        title: 'Perform Multi-Level Custom Data Sort',
        description: 'Sort the table by Department (A to Z) as Primary level, and then by Total Score (Largest to Smallest) as Secondary level.',
        points: 4,
        wordPath: 'Data tab > Sort & Filter group > Sort > Add Level > Column: Dept (A-Z) | Then by: Total Score (Largest to Smallest)',
        autoCheckId: 'excel_sort',
      },
      {
        id: 'excel_t4_2',
        title: 'Apply AutoFilter with Multiple Criteria',
        description: 'Turn on AutoFilter. Filter the dataset to display only candidates in "CS" or "IT" departments who achieved "Passed" status.',
        points: 4,
        wordPath: 'Data tab > Sort & Filter group > Filter > Click Dept dropdown (Select CS, IT) > Status dropdown (Passed)',
        autoCheckId: 'excel_filter',
      },
      {
        id: 'excel_t4_3',
        title: 'Calculate Automatic Departmental Subtotals',
        description: 'Group dataset by Department and insert automatic Subtotal rows calculating AVERAGE Total Score for each department.',
        points: 4,
        wordPath: 'Data tab > Outline group > Subtotal > At each change in: Dept > Use function: Average > Add subtotal to: Total Score',
      },
      {
        id: 'excel_t4_4',
        title: 'Remove Duplicate Records & Group Columns',
        description: 'Use Remove Duplicates feature to eliminate redundant entries, and apply Grouping to collapse detail columns.',
        points: 3,
        wordPath: 'Data tab > Data Tools group > Remove Duplicates | Outline group > Group',
      },
    ],
  },
  {
    id: 'excel_mod5',
    moduleNumber: 5,
    title: 'Interactive Charts, PivotTables & Slicers',
    subtitle: 'Clustered Column Chart, Pie Chart, PivotTable Summaries & Interactive Slicers',
    totalPoints: 15,
    iconName: 'BarChart3',
    description: 'Build interactive clustered column charts, pie charts, PivotTables with calculated fields, and add interactive departmental Slicer controls.',
    tasks: [
      {
        id: 'excel_t5_1',
        title: 'Insert & Custom Style Clustered Column Chart',
        description: 'Create a 2D Clustered Column Chart comparing Midterm, Final, and Practical scores by Student Name. Set Chart Title to "Academic Performance Comparison 2026", move Legend to Top, and enable Data Labels.',
        points: 5,
        wordPath: 'Insert tab > Charts group > Column Chart > 2D Clustered Column | Chart Design tab > Add Chart Element > Chart Title / Data Labels',
        autoCheckId: 'excel_chart',
      },
      {
        id: 'excel_t5_2',
        title: 'Create Departmental Summary PivotTable',
        description: 'Insert a PivotTable on a new worksheet. Drag "Dept" to Rows, "Student Name" to Values (Count), and "Total Score" to Values (Average). Format average scores to 1 decimal place.',
        points: 5,
        wordPath: 'Insert tab > Tables group > PivotTable > PivotTable Fields > Drag Dept to Rows, Total Score to Values (Value Field Settings: Average)',
        autoCheckId: 'excel_pivottable',
      },
      {
        id: 'excel_t5_3',
        title: 'Insert Interactive Slicer Filter Control',
        description: 'Add a Slicer control for "Dept" to the PivotTable worksheet. Style the Slicer in Dark Blue to match the workbook theme.',
        points: 3,
        wordPath: 'PivotTable Analyze tab > Filter group > Insert Slicer > Check "Dept" > Slicer Styles',
        autoCheckId: 'excel_slicer',
      },
      {
        id: 'excel_t5_4',
        title: 'Insert 3D Pie Chart with Exploded Slice',
        description: 'Create a 3D Pie Chart showing percentage breakdown of Grades (A, B, C, D). Explode the "A" grade slice by 10% for visual emphasis.',
        points: 2,
        wordPath: 'Insert tab > Charts group > Pie Chart > 3D Pie > Format Data Series > Pie Explosion 10%',
      },
    ],
  },
  {
    id: 'excel_mod6',
    moduleNumber: 6,
    title: 'Workbook Protection, Formula Auditing & PDF Export',
    subtitle: 'Cell Locking, Protect Worksheet, Formula Auditing & PDF Export',
    totalPoints: 15,
    iconName: 'Shield',
    description: 'Unlock user input cells, protect worksheet structure with a password, audit formula precedents, and export final executive report as PDF.',
    tasks: [
      {
        id: 'excel_t6_1',
        title: 'Unlock Input Cells & Protect Worksheet',
        description: 'Select score input range D4:F9, open Format Cells > Protection, and uncheck "Locked". Then Protect Worksheet with password "1234", allowing selection of unlocked cells only.',
        points: 4,
        wordPath: 'Home tab > Cells > Format > Format Cells > Protection > Uncheck Locked | Review tab > Protect group > Protect Sheet',
        autoCheckId: 'excel_protect_sheet',
      },
      {
        id: 'excel_t6_2',
        title: 'Audit Formulas with Trace Precedents',
        description: 'Select Total Score cell G4 and click "Trace Precedents" to display visual arrows linking source components D4, E4, and F4.',
        points: 3,
        wordPath: 'Formulas tab > Formula Auditing group > Trace Precedents',
      },
      {
        id: 'excel_t6_3',
        title: 'Toggle Show Formulas View Mode',
        description: 'Toggle worksheet view mode to "Show Formulas" (Ctrl + `) to verify all underlying formulas, then toggle back to standard view.',
        points: 4,
        wordPath: 'Formulas tab > Formula Auditing group > Show Formulas',
        autoCheckId: 'excel_show_formulas',
      },
      {
        id: 'excel_t6_4',
        title: 'Configure Header/Footer & Export Executive PDF Report',
        description: 'Add Header with "Microsoft Excel Assessment 2026" and Footer with Page Number. Export entire workbook as a single PDF document.',
        points: 4,
        wordPath: 'Insert tab > Text group > Header & Footer | File menu > Export > Create PDF/XPS Document',
      },
    ],
  },
];

export const EXCEL_MODEL_ANSWER_RUBRIC = [
  {
    module: 'Module 1: Setup & Formatting',
    criteria: 'Landscape orientation, Narrow margins, Number 0 decimals, Table Style Medium 9, Freeze Top Row.',
    steps: 'Page Layout > Orientation > Landscape | Home > Number format | Home > Format as Table | View > Freeze Panes.',
    points: 15,
  },
  {
    module: 'Module 2: Formulas & Logic',
    criteria: '=SUM(D4:F4) for total, =IF(G4>=60, "Passed", "Failed"), AVERAGE, MAX, MIN, COUNTA, COUNTIF.',
    steps: 'Formulas > AutoSum > SUM | Formulas > Logical > IF | Formulas > Statistical > AVERAGE, COUNTIF.',
    points: 20,
  },
  {
    module: 'Module 3: VLOOKUP & Formatting',
    criteria: '=VLOOKUP(G4, $K$4:$L$7, 2, TRUE), Data Validation List CS,IT,IS, Conditional Formatting >=85 Green.',
    steps: 'Formulas > Lookup & Reference > VLOOKUP | Data > Data Validation > List | Home > Conditional Formatting.',
    points: 20,
  },
  {
    module: 'Module 4: Sort & Filter',
    criteria: 'Multi-level sort (Dept A-Z, Total Score Desc), Filter Dept CS/IT & Passed status, Subtotals.',
    steps: 'Data > Sort > Add Level | Data > Filter | Data > Subtotal.',
    points: 15,
  },
  {
    module: 'Module 5: Charts & PivotTables',
    criteria: 'Clustered Column Chart with title, PivotTable Dept Rows / Total Score Avg Values, Slicer Dept.',
    steps: 'Insert > Column Chart | Insert > PivotTable | PivotTable Analyze > Insert Slicer.',
    points: 15,
  },
  {
    module: 'Module 6: Protection & Export',
    criteria: 'Unlock D4:F9, Protect Sheet, Formula Auditing Trace Precedents, Header/Footer & Export PDF.',
    steps: 'Home > Format Cells > Protection | Review > Protect Sheet | Formulas > Trace Precedents | File > Export.',
    points: 15,
  },
];
