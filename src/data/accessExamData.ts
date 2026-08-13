import { ExamModule } from '../types';

export const RAW_ACCESS_DATASET = `Microsoft Access Relational Database Examination 2026
Database Name: AcademicRegistrationDB.accdb

Table 1: tbl_Students (Primary Key: StudentID)
StudentID (Short Text, PK) | FullName (Short Text) | Department (Short Text) | EnrollmentDate (Date/Time) | GPA (Number/Double) | ActiveStatus (Yes/No)
STU-2001                   | Khalid Ibrahim       | CS                     | 2024-09-01                 | 3.85               | Yes
STU-2002                   | Reem Abdullah        | IT                     | 2024-09-01                 | 3.60               | Yes
STU-2003                   | Tariq Al-Sayed       | CS                     | 2025-01-15                 | 2.40               | No
STU-2004                   | Mona Al-Hassan       | IS                     | 2024-09-01                 | 3.95               | Yes
STU-2005                   | Faisal Al-Shammari   | IT                     | 2025-01-15                 | 3.10               | Yes

Table 2: tbl_Courses (Primary Key: CourseID)
CourseID (Short Text, PK)  | CourseTitle (Short Text)  | CreditHours (Number)   | Department (Short Text) | CostPerCredit (Currency)
CS101                      | Intro to Programming      | 3                      | CS                     | $150.00
IT202                      | Database Management       | 4                      | IT                     | $150.00
IS303                      | Systems Analysis          | 3                      | IS                     | $160.00
CS404                      | Artificial Intelligence    | 3                      | CS                     | $180.00

Table 3: tbl_Enrollments (Primary Key: EnrollmentID AutoNumber, Foreign Keys: StudentID, CourseID)
EnrollmentID (AutoNumber, PK) | StudentID (Short Text, FK) | CourseID (Short Text, FK) | Semester (Short Text) | Score (Number)
1                             | STU-2001                  | CS101                     | Fall 2025            | 92
2                             | STU-2001                  | IT202                     | Fall 2025            | 88
3                             | STU-2002                  | IT202                     | Fall 2025            | 85
4                             | STU-2004                  | IS303                     | Fall 2025            | 96
5                             | STU-2005                  | CS101                     | Fall 2025            | 78

Relationships:
tbl_Students.StudentID (1) -------- (∞) tbl_Enrollments.StudentID [Enforce Referential Integrity]
tbl_Courses.CourseID (1) ---------- (∞) tbl_Enrollments.CourseID [Enforce Referential Integrity]`;

export const ACCESS_EXAM_MODULES: ExamModule[] = [
  {
    id: 'access_mod1',
    moduleNumber: 1,
    title: 'Database Creation, Table Design & Data Types',
    subtitle: 'Primary Keys, Short Text, Currency, Input Masks & Validation Rules',
    totalPoints: 15,
    iconName: 'Database',
    description: 'Create relational tables, set primary key fields, configure field data types, input masks, default values, and field validation rules.',
    tasks: [
      {
        id: 'access_t1_1',
        title: 'Create tbl_Students Table & Design Primary Key',
        description: 'Create a new table named `tbl_Students`. Set `StudentID` field as Primary Key with Short Text data type (Field Size: 10).',
        points: 4,
        wordPath: 'Create tab > Tables group > Table Design > Field Name: StudentID > Data Type: Short Text > Primary Key button',
        tips: ['Primary Key prevents duplicate student ID entries'],
        autoCheckId: 'access_create_table',
      },
      {
        id: 'access_t1_2',
        title: 'Configure Field Properties, Formats & Default Values',
        description: 'Set `GPA` field data type to Number (Double, 2 decimal places, Validation Rule: `>=0.00 AND <=4.00`). Set `ActiveStatus` to Yes/No with Default Value: `Yes`.',
        points: 4,
        wordPath: 'Table Design view > Field Properties > Field Size: Double > Format: Fixed > Decimals: 2 > Validation Rule: >=0 AND <=4',
        autoCheckId: 'access_field_properties',
      },
      {
        id: 'access_t1_3',
        title: 'Apply Input Mask for StudentID Field',
        description: 'Apply an Input Mask to `StudentID` enforcing the format `STU-0000` (4 uppercase letters followed by hyphen and 4 digits).',
        points: 4,
        wordPath: 'Table Design view > Field Properties > Input Mask > >LLLL\-0000;0;_*',
        autoCheckId: 'access_input_mask',
      },
      {
        id: 'access_t1_4',
        title: 'Enter Records in Datasheet View',
        description: 'Switch to Datasheet View and enter the 5 student records from the database exam outline.',
        points: 3,
        wordPath: 'Home tab > Views group > View > Datasheet View > Type records in grid',
        autoCheckId: 'access_datasheet_records',
      },
    ],
  },
  {
    id: 'access_mod2',
    moduleNumber: 2,
    title: 'Table Relationships & Referential Integrity',
    subtitle: 'Primary-Foreign Key Links, One-to-Many Relationships & Cascade Updates',
    totalPoints: 20,
    iconName: 'GitMerge',
    description: 'Establish relational schema links between tables, enforce referential integrity with cascade updates, and import external data.',
    tasks: [
      {
        id: 'access_t2_1',
        title: 'Establish 1-to-Many Relationship between Students & Enrollments',
        description: 'Open Relationships window. Drag `StudentID` from `tbl_Students` to `StudentID` in `tbl_Enrollments` to establish a 1-to-Many relationship.',
        points: 6,
        wordPath: 'Database Tools tab > Relationships group > Relationships > Add Tables > Drag StudentID to StudentID',
        autoCheckId: 'access_relationship_students',
      },
      {
        id: 'access_t2_2',
        title: 'Enforce Referential Integrity & Cascade Update Related Fields',
        description: 'In Edit Relationships dialog, check "Enforce Referential Integrity", "Cascade Update Related Fields", and "Cascade Delete Related Records".',
        points: 5,
        wordPath: 'Edit Relationships window > Check "Enforce Referential Integrity" > Check "Cascade Update Related Fields"',
        autoCheckId: 'access_referential_integrity',
      },
      {
        id: 'access_t2_3',
        title: 'Connect Courses & Enrollments Tables',
        description: 'Link `CourseID` in `tbl_Courses` to `CourseID` in `tbl_Enrollments` with Referential Integrity enabled.',
        points: 5,
        wordPath: 'Relationships window > Drag CourseID from tbl_Courses to tbl_Enrollments > Enforce Referential Integrity',
        autoCheckId: 'access_relationship_courses',
      },
      {
        id: 'access_t2_4',
        title: 'Import External Excel Data into Access Table',
        description: 'Import external spreadsheet dataset `Courses_List.xlsx` as a new table `tbl_Courses_Imported` with first row as headers.',
        points: 4,
        wordPath: 'External Data tab > Import & Link group > Excel > Browse file > Check "First Row Contains Column Headings"',
      },
    ],
  },
  {
    id: 'access_mod3',
    moduleNumber: 3,
    title: 'Multi-Table Select Queries & Calculated Fields',
    subtitle: 'Query Criteria Filters, Wildcards, Calculated Fields & Parameter Queries',
    totalPoints: 20,
    iconName: 'Filter',
    description: 'Design multi-table select queries, apply wildcard criteria filters, create custom calculated fields, and build parameter prompts.',
    tasks: [
      {
        id: 'access_t3_1',
        title: 'Create Multi-Table Select Query for High Honors Students',
        description: 'Create query `qry_HighHonorsStudents` joining `tbl_Students` and `tbl_Enrollments`. Include FullName, Department, GPA, and CourseID.',
        points: 5,
        wordPath: 'Create tab > Queries group > Query Design > Add tbl_Students & tbl_Enrollments > Double-click fields',
        autoCheckId: 'access_query_design',
      },
      {
        id: 'access_t3_2',
        title: 'Apply Query Criteria Filters & Wildcard Logic',
        description: 'Set Criteria on Department field to `"CS" OR "IT"`, and Criteria on GPA to `>=3.50`. Sort results by GPA Descending.',
        points: 5,
        wordPath: 'Query Design grid > Department Criteria: "CS" Or "IT" > GPA Criteria: >=3.50 > Sort: Descending',
        autoCheckId: 'access_query_criteria',
      },
      {
        id: 'access_t3_3',
        title: 'Create Calculated Field in Query (Total Tuition Fee)',
        description: 'In query design grid, add a calculated field `TotalTuition: [CreditHours] * [CostPerCredit]`. Format field as Currency.',
        points: 5,
        wordPath: 'Query Design grid > Field: TotalTuition: [CreditHours]*[CostPerCredit] > Property Sheet > Format: Currency',
        autoCheckId: 'access_calculated_field',
      },
      {
        id: 'access_t3_4',
        title: 'Create Interactive Parameter Query Prompt',
        description: 'Create parameter query `qry_SearchByDept` with Department criteria `[Enter Department Code (CS/IT/IS):]`.',
        points: 5,
        wordPath: 'Query Design grid > Department Criteria: [Enter Department Code (CS/IT/IS):]',
      },
    ],
  },
  {
    id: 'access_mod4',
    moduleNumber: 4,
    title: 'Aggregate Totals, Update Queries & Action Queries',
    subtitle: 'Group By Totals, Update Queries, Append Queries & Delete Queries',
    totalPoints: 15,
    iconName: 'Zap',
    description: 'Build aggregate queries with Group By, Sum, and Avg functions, and create action queries (Update, Append, Delete).',
    tasks: [
      {
        id: 'access_t4_1',
        title: 'Create Departmental Aggregate Totals Query',
        description: 'Create query `qry_DepartmentSummary`. Group by `Department`, calculate `Count(StudentID)` as TotalStudents, and `Avg(GPA)` as AverageGPA.',
        points: 5,
        wordPath: 'Query Design > Click Totals button (Σ) > Department: Group By > StudentID: Count > GPA: Avg',
        autoCheckId: 'access_aggregate_query',
      },
      {
        id: 'access_t4_2',
        title: 'Create & Run Update Action Query (Course Fee Increase)',
        description: 'Create an Update Query `qry_UpdateFees` on `tbl_Courses`. Update `CostPerCredit` to `[CostPerCredit] * 1.10` (10% increase) for CS department courses.',
        points: 4,
        wordPath: 'Query Design > Query Type > Update > Field: CostPerCredit > Update To: [CostPerCredit]*1.10 > Criteria: "CS" > Click Run (!)',
        autoCheckId: 'access_update_query',
      },
      {
        id: 'access_t4_3',
        title: 'Create Make-Table Action Query for Honors Roll',
        description: 'Create a Make-Table query `qry_MakeHonorsTable` extracting students with GPA >= 3.80 into a new table `tbl_HonorsRoll`.',
        points: 3,
        wordPath: 'Query Design > Query Type > Make-Table > Table Name: tbl_HonorsRoll > Criteria: >=3.80 > Run (!)',
      },
      {
        id: 'access_t4_4',
        title: 'Create Delete Action Query for Inactive Students',
        description: 'Create a Delete Query `qry_DeleteInactive` to remove records from `tbl_Students` where `ActiveStatus = No`.',
        points: 3,
        wordPath: 'Query Design > Query Type > Delete > Field: ActiveStatus > Criteria: No',
      },
    ],
  },
  {
    id: 'access_mod5',
    moduleNumber: 5,
    title: 'Interactive Forms, Subforms, Controls & Styling',
    subtitle: 'Form Wizard, Form Controls, Main/Subform Layout & Command Buttons',
    totalPoints: 15,
    iconName: 'Layout',
    description: 'Design professional data entry forms, embed main/subform relational views, style controls, and add action command buttons.',
    tasks: [
      {
        id: 'access_t5_1',
        title: 'Create Student Registration Form with Form Wizard',
        description: 'Use Form Wizard to create form `frm_StudentRegistration` based on `tbl_Students`. Select Columnar layout and apply "Office Dark" theme.',
        points: 4,
        wordPath: 'Create tab > Forms group > Form Wizard > Select tbl_Students > Columnar layout > Form Header',
        autoCheckId: 'access_form_wizard',
      },
      {
        id: 'access_t5_2',
        title: 'Embed Subform for Student Course Enrollments',
        description: 'In Form Design view, insert a Subform control displaying related records from `tbl_Enrollments` linked by `StudentID`.',
        points: 4,
        wordPath: 'Form Design tab > Controls group > Subform/Subreport control > Link Master Fields: StudentID',
        autoCheckId: 'access_subform',
      },
      {
        id: 'access_t5_3',
        title: 'Add Interactive Navigation Command Buttons',
        description: 'Add 3 Command Buttons in Form Footer: "Add New Record" (Record Operations), "Save Record", and "Close Form" (Form Operations).',
        points: 4,
        wordPath: 'Form Design tab > Controls group > Button control > Record Operations > Add New Record',
        autoCheckId: 'access_command_buttons',
      },
      {
        id: 'access_t5_4',
        title: 'Apply Conditional Formatting on Form Fields',
        description: 'Select GPA text box on form. Apply Conditional Formatting: if value >= 3.80, set text color to Bold Emerald Green with light background shading.',
        points: 3,
        wordPath: 'Form Format tab > Control Formatting group > Conditional Formatting > Check: Field Value Is > greater than or equal to > 3.80',
      },
    ],
  },
  {
    id: 'access_mod6',
    moduleNumber: 6,
    title: 'Professional Reports, Grouping, Summaries & Export',
    subtitle: 'Report Wizard, Grouping Levels, Summary Totals & PDF Output',
    totalPoints: 15,
    iconName: 'Printer',
    description: 'Construct grouped summary reports, add group header/footer aggregate totals, format page layouts, and export final report as PDF.',
    tasks: [
      {
        id: 'access_t6_1',
        title: 'Create Grouped Academic Report with Report Wizard',
        description: 'Use Report Wizard to create report `rpt_DepartmentStudents` based on `tbl_Students`. Group records by `Department`, sorted by `FullName` A-Z.',
        points: 4,
        wordPath: 'Create tab > Reports group > Report Wizard > Select tbl_Students > Add Grouping Level: Department > Sort by: FullName',
        autoCheckId: 'access_report_wizard',
      },
      {
        id: 'access_t6_2',
        title: 'Add Group Footer Summary Calculations',
        description: 'In Report Design view, open Grouping & Totals. Add a Group Footer for Department showing `=Count([StudentID])` total students and `=Avg([GPA])` average GPA.',
        points: 4,
        wordPath: 'Report Design > Grouping & Totals > Department Group > More > With Footer Section > Add calculated text boxes',
        autoCheckId: 'access_report_summary',
      },
      {
        id: 'access_t6_3',
        title: 'Style Report Headers, Page Numbers & Logo',
        description: 'Add Title "Official Departmental Academic Summary 2026" to Report Header. Insert Page Numbers ("Page N of M") in Report Footer.',
        points: 3,
        wordPath: 'Report Design tab > Header/Footer group > Title / Page Numbers (Page N of M) / Date and Time',
      },
      {
        id: 'access_t6_4',
        title: 'Verify Print Preview & Export Report as PDF',
        description: 'Switch to Print Preview view, verify page margins fit on 1 page width, and Export report as PDF document `Department_Academic_Report.pdf`.',
        points: 4,
        wordPath: 'View tab > Print Preview | Print Preview tab > Data group > PDF or XPS',
      },
    ],
  },
];

export const ACCESS_MODEL_ANSWER_RUBRIC = [
  {
    module: 'Module 1: Database Creation & Tables',
    criteria: 'tbl_Students table, StudentID Primary Key, GPA validation rule >=0 AND <=4, Input Mask >LLLL-0000.',
    steps: 'Create > Table Design > Set PK > Properties > Validation Rule & Input Mask.',
    points: 15,
  },
  {
    module: 'Module 2: Relationships & Integrity',
    criteria: '1-to-Many link StudentID between tbl_Students & tbl_Enrollments with Enforce Referential Integrity.',
    steps: 'Database Tools > Relationships > Drag StudentID > Enforce Referential Integrity & Cascade Update.',
    points: 20,
  },
  {
    module: 'Module 3: Multi-Table Queries',
    criteria: 'qry_HighHonorsStudents multi-table query, Criteria Dept "CS" Or "IT", TotalTuition calculated field.',
    steps: 'Create > Query Design > Add tables > Criteria: "CS" Or "IT" | Field: TotalTuition: [CreditHours]*[CostPerCredit].',
    points: 20,
  },
  {
    module: 'Module 4: Aggregate & Action Queries',
    criteria: 'qry_DepartmentSummary Group By Dept / Count StudentID, Update Query 10% fee increase for CS.',
    steps: 'Query Design > Totals (Σ) > Group By & Count | Query Type > Update > Update To: [CostPerCredit]*1.10.',
    points: 15,
  },
  {
    module: 'Module 5: Forms & Controls',
    criteria: 'frm_StudentRegistration form, embedded Enrollments Subform, Command buttons (Add, Save, Close).',
    steps: 'Create > Form Wizard | Form Design > Subform control | Controls > Command Button.',
    points: 15,
  },
  {
    module: 'Module 6: Reports & Export',
    criteria: 'rpt_DepartmentStudents report grouped by Department, Group Footer Count & Avg GPA, PDF Export.',
    steps: 'Create > Report Wizard > Grouping: Department | Report Design > Grouping & Totals | Print Preview > PDF.',
    points: 15,
  },
];
