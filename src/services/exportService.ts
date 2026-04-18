import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle, HeadingLevel, PageBreak, VerticalAlign } from "docx";
import { saveAs } from "file-saver";

interface LessonEntry {
  hour: number;
  module: number;
  topic: string;
  co: string;
  method: string;
}

interface ExportData {
  collegeName: string;
  department: string;
  subjectName: string;
  subjectCode: string;
  semester: string;
  pos: string[];
  psos: string[];
  cos: string[];
  objectives: string[];
  teachingProcess: string[];
  referenceBooks: string[];
  eResources: string[];
  activities: string[];
  rationale: string;
  mapping: number[][];
  lessonPlan: LessonEntry[];
}

export const exportToWord = async (data: ExportData) => {
  const { 
    collegeName, department, subjectName, subjectCode, semester, 
    pos, psos, cos, objectives, teachingProcess, 
    referenceBooks, eResources, activities, rationale, mapping, lessonPlan 
  } = data;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: collegeName.toUpperCase(), bold: true, size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: department, bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "COURSE HANDOUT", bold: true, size: 32, italics: true }),
            ],
            spacing: { before: 400, after: 400 },
          }),

          // Info Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "SUBJECT", bold: true }), new TextRun({ text: `  ${subjectName}` })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "SEMESTER", bold: true }), new TextRun({ text: `  ${semester}` })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "CODE", bold: true }), new TextRun({ text: `  ${subjectCode}` })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "HOURS", bold: true }), new TextRun({ text: `  50 Total` })] })] }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { after: 400 } }),

          // Course Objectives
          new Paragraph({ text: "Course Objectives", heading: HeadingLevel.HEADING_2, spacing: { after: 200 } }),
          ...objectives.map((obj) => new Paragraph({
            text: obj,
            bullet: { level: 0 },
            spacing: { after: 120 },
          })),

          new Paragraph({ text: "", spacing: { after: 400 } }),

          // Teaching-Learning Process
          new Paragraph({ text: "Teaching-Learning Process", heading: HeadingLevel.HEADING_2, spacing: { after: 200 } }),
          ...teachingProcess.map((tp, i) => new Paragraph({
            text: `${i + 1}. ${tp}`,
            spacing: { after: 120 },
          })),

          new Paragraph({ text: "", spacing: { after: 400 } }),

          // Course Outcomes
          new Paragraph({ text: "Course Outcomes", heading: HeadingLevel.HEADING_2, spacing: { after: 200 } }),
          ...cos.map((co, i) => new Paragraph({
            children: [
              new TextRun({ text: `CO${i + 1}: `, bold: true }),
              new TextRun({ text: co }),
            ],
            spacing: { after: 120 },
          })),

          new Paragraph({ text: "", spacing: { after: 400 } }),

          // Assessment Strategy
          new Paragraph({ text: "Assessment Details", heading: HeadingLevel.HEADING_2, spacing: { after: 200 } }),
          new Paragraph({ text: "The weightage of Continuous Internal Evaluation (CIE) is 50% and for Semester End Exam (SEE) is 50%. The minimum passing mark for the CIE is 40% of the maximum marks (20 marks out of 50) and for the SEE minimum passing mark is 35% of the maximum marks (18 out of 50 marks)." }),
          new Paragraph({ text: "• CIE: 50% Weightage (25 Marks Tests, 25 Marks Assignments)", bullet: { level: 0 } }),
          new Paragraph({ text: "• SEE: 50% Weightage (100 Marks scaled to 50)", bullet: { level: 0 } }),

          new Paragraph({ text: "", spacing: { after: 400 } }),

          // Activity Based Learning
          new Paragraph({ text: "Activity Based Learning", heading: HeadingLevel.HEADING_2, spacing: { after: 200 } }),
          ...activities.map(act => new Paragraph({ text: act, bullet: { level: 0 }, spacing: { after: 120 } })),

          new Paragraph({ text: "", spacing: { after: 400 } }),

          // Learning Resources
          new Paragraph({ text: "Learning Resources", heading: HeadingLevel.HEADING_2, spacing: { after: 200 } }),
          new Paragraph({ children: [new TextRun({ text: "Textbook:", bold: true })] }),
          new Paragraph({ text: "John E Hopcroft, Rajeev Motwani, Jeffrey D. Ullman, \"Introduction to Automata Theory, Languages and Computation\", 2nd Edition, Pearson.", spacing: { after: 120 } }),
          new Paragraph({ children: [new TextRun({ text: "Reference Books:", bold: true })] }),
          ...referenceBooks.map(book => new Paragraph({ text: book, bullet: { level: 0 }, spacing: { after: 80 } })),
          new Paragraph({ children: [new TextRun({ text: "E-Resources:", bold: true })], spacing: { before: 120 } }),
          ...eResources.map(link => new Paragraph({ text: link, bullet: { level: 0 } })),

          new Paragraph({ children: [new PageBreak()] }),

          // Mapping Matrix
          new Paragraph({ text: "NBA PO-PSO Mapping Matrix", heading: HeadingLevel.HEADING_1, spacing: { after: 400 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Header Row
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "CO/PO", bold: true })] })], verticalAlign: VerticalAlign.CENTER }),
                  ...pos.map((_, i) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `P${i + 1}`, bold: true })] })] })),
                  ...psos.map((_, i) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `S${i + 1}`, bold: true })] })] })),
                ],
              }),
              // Data Rows
              ...mapping.map((row, coIdx) => new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `CO${coIdx + 1}`, bold: true })] })] }),
                  ...row.map((val) => new TableCell({ children: [new Paragraph({ text: val > 0 ? val.toString() : "—", alignment: AlignmentType.CENTER })] })),
                ],
              })),
            ],
          }),

          new Paragraph({ text: "", spacing: { after: 400 } }),
          new Paragraph({ text: "Program Specific Outcomes (PSOs)", heading: HeadingLevel.HEADING_2 }),
          ...psos.map((pso, i) => new Paragraph({
            children: [
              new TextRun({ text: `PSO${i + 1}: `, bold: true }),
              new TextRun({ text: pso }),
            ],
            spacing: { after: 120 },
          })),

          new Paragraph({ text: "", spacing: { after: 400 } }),
          new Paragraph({ text: "Mapping Rationale", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: rationale }),

          new Paragraph({ children: [new PageBreak()] }),

          // Lesson Plan
          new Paragraph({ text: "Lesson Plan", heading: HeadingLevel.HEADING_1, spacing: { after: 400 } }),
          ...[1, 2, 3, 4, 5].flatMap((modNum) => {
            const moduleLessons = lessonPlan.filter(item => item.module === modNum);
            return [
              new Paragraph({ text: `Module ${modNum}`, heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 200 } }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Hr", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tentative", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Actual", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Topic to be Covered", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "CO", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Method", bold: true })] })] }),
                    ],
                  }),
                  ...moduleLessons.map((item) => new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ text: item.hour.toString() })] }),
                      new TableCell({ children: [new Paragraph({ text: "" })] }),
                      new TableCell({ children: [new Paragraph({ text: "" })] }),
                      new TableCell({ children: [new Paragraph({ text: item.topic })] }),
                      new TableCell({ children: [new Paragraph({ text: item.co })] }),
                      new TableCell({ children: [new Paragraph({ text: item.method })] }),
                    ],
                  })),
                ],
              }),
            ];
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${subjectCode}_LessonPlan_Handout.docx`);
};
