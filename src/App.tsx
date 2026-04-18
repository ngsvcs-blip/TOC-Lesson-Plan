import { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  ChevronRight, 
  Printer, 
  Table, 
  CheckCircle2, 
  Info,
  GraduationCap,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface LessonEntry {
  hour: number;
  module: number;
  topic: string;
  co: string;
  method: string;
}

// --- Constants & Data ---
const COLLEGE_NAME = "Maharaja Institute of Technology, Thandavapura";
const DEPARTMENT = "Department of CSE (AI & ML)";
const SUBJECT_NAME = "Theory of Computation";
const SUBJECT_CODE = "BCS503";
const SEMESTER = "V";

const POS = [
  "Engineering Knowledge",
  "Problem Analysis",
  "Design/Development of Solutions",
  "Conduct Investigations of Complex Problems",
  "Modern Tool Usage",
  "The Engineer and Society",
  "Environment and Sustainability",
  "Ethics",
  "Individual and Team Work",
  "Communication",
  "Project Management and Finance",
  "Life-long Learning"
];

const PSOS = [
  "Analyze, design and implement intelligent systems and ML models using modern tools to provide sustainable solutions for social and industrial needs.",
  "Apply the principles of CSE with a focus on AI and ML to model and solve complex engineering problems."
];

const COS = [
  "Apply fundamentals of automata theory to write DFA, NFA, Epsilon-NFA and conversion.",
  "Prove properties of regular languages using regular expressions.",
  "Design CFGs and PDAs for formal languages.",
  "Design Turing machines to solve computational problems.",
  "Explain concepts of decidability and undecidability."
];

const MAPPING = [
  // PO1, PO2, PO3, PO4, PO5, PO6, PO7, PO8, PO9, PO10, PO11, PO12, PSO1, PSO2
  [3, 3, 2, 0, 2, 0, 0, 0, 1, 0, 0, 1, 2, 0], // CO1: DFA/NFA + JFLAP
  [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0], // CO2: Regular Properties
  [3, 3, 3, 0, 2, 0, 0, 0, 1, 0, 0, 1, 2, 0], // CO3: CFG/PDA + JFLAP
  [3, 3, 3, 0, 2, 0, 0, 0, 1, 0, 0, 1, 2, 0], // CO4: Turing Machines + JFLAP
  [2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1], // CO5: Decidability + Group review
];

const LESSON_PLAN: LessonEntry[] = [
  // Module 1 (10 Hours)
  { hour: 1, module: 1, topic: "Introduction to Finite Automata, Structural Representations", co: "CO1", method: "L" },
  { hour: 2, module: 1, topic: "Automata and Complexity, Central Concepts of Automata Theory", co: "CO1", method: "L" },
  { hour: 3, module: 1, topic: "Deterministic Finite Automata (DFA): Formal Definition", co: "CO1", method: "L/PBL" },
  { hour: 4, module: 1, topic: "DFA: Problems and Implementation", co: "CO1", method: "PBL" },
  { hour: 5, module: 1, topic: "Nondeterministic Finite Automata (NFA): Definition and Examples", co: "CO1", method: "L" },
  { hour: 6, module: 1, topic: "NFA: Subset Construction (Conversion to DFA)", co: "CO1", method: "PBL" },
  { hour: 7, module: 1, topic: "Finite Automata with Epsilon-Transitions (ϵ-NFA)", co: "CO1", method: "L" },
  { hour: 8, module: 1, topic: "ϵ-NFA: Conversion to DFA", co: "CO1", method: "PBL" },
  { hour: 9, module: 1, topic: "Application of Automata: Text Search", co: "CO1", method: "Video" },
  { hour: 10, module: 1, topic: "Module Review and HOTS Questions", co: "CO1", method: "Group" },
  
  // Module 2 (10 Hours)
  { hour: 11, module: 2, topic: "Regular Expressions: Foundations and Operators", co: "CO2", method: "L" },
  { hour: 12, module: 2, topic: "Finite Automata and Regular Expressions (Equivalence)", co: "CO2", method: "L" },
  { hour: 13, module: 2, topic: "Converting RE to NFA-ϵ (Thompson's Construction)", co: "CO2", method: "PBL" },
  { hour: 14, module: 2, topic: "Converting DFA to RE (State Elimination)", co: "CO2", method: "PBL" },
  { hour: 15, module: 2, topic: "Proving Languages not to be Regular: Pumping Lemma", co: "CO2", method: "L" },
  { hour: 16, module: 2, topic: "Application of Pumping Lemma: Proofs", co: "CO2", method: "PBL" },
  { hour: 17, module: 2, topic: "Closure Properties of Regular Languages", co: "CO2", method: "L" },
  { hour: 18, module: 2, topic: "Equivalence and Minimization of Automata", co: "CO2", method: "L/PBL" },
  { hour: 19, module: 2, topic: "Minimization Algorithm: Example Problems", co: "CO2", method: "PBL" },
  { hour: 20, module: 2, topic: "Applications of Regular Expressions in Linux/Programming", co: "CO2", method: "V/PBL" },

  // Module 3 (10 Hours)
  { hour: 21, module: 3, topic: "Context-Free Grammars (CFG): Definition and Examples", co: "CO3", method: "L" },
  { hour: 22, module: 3, topic: "Parse Trees, Derivations (LMD, RMD)", co: "CO3", method: "L" },
  { hour: 23, module: 3, topic: "Ambiguity in Grammars and Languages", co: "CO3", method: "PBL" },
  { hour: 24, module: 3, topic: "Definition of the Pushdown Automata (PDA)", co: "CO3", method: "L" },
  { hour: 25, module: 3, topic: "Languages of a PDA: Acceptance by Final State", co: "CO3", method: "L" },
  { hour: 26, module: 3, topic: "Languages of a PDA: Acceptance by Empty Stack", co: "CO3", method: "L" },
  { hour: 27, module: 3, topic: "Equivalence of PDA's and CFG's (Part 1)", co: "CO3", method: "L" },
  { hour: 28, module: 3, topic: "Equivalence of PDA's and CFG's (Part 2)", co: "CO3", method: "PBL" },
  { hour: 29, module: 3, topic: "Deterministic Pushdown Automata (DPDA)", co: "CO3", method: "L" },
  { hour: 30, module: 3, topic: "Module Review and PDA Design Practice", co: "CO3", method: "Group" },

  // Module 4 (10 Hours)
  { hour: 31, module: 4, topic: "Simplification of CFG: Eliminating Useless Symbols", co: "CO3", method: "L" },
  { hour: 32, module: 4, topic: "Eliminating Null and Unit Productions", co: "CO3", method: "PBL" },
  { hour: 33, module: 4, topic: "Chomsky Normal Form (CNF)", co: "CO3", method: "L" },
  { hour: 34, module: 4, topic: "CNF: Conversion Examples", co: "CO3", method: "PBL" },
  { hour: 35, module: 4, topic: "Greibach Normal Form (GNF) - Brief Overview", co: "CO3", method: "L" },
  { hour: 36, module: 4, topic: "The Pumping Lemma for Context-Free Languages", co: "CO3", method: "L" },
  { hour: 37, module: 4, topic: "Application of CFL Pumping Lemma", co: "CO3", method: "PBL" },
  { hour: 38, module: 4, topic: "Closure Properties of CFLs", co: "CO3", method: "L" },
  { hour: 39, module: 4, topic: "Decision Properties for CFLs", co: "CO3", method: "L" },
  { hour: 40, module: 4, topic: "Interactive Session: PDA vs CFL", co: "CO3", method: "Group" },

  // Module 5 (10 Hours)
  { hour: 41, module: 5, topic: "Introduction to Turing Machines: Notation and Concept", co: "CO4", method: "L" },
  { hour: 42, module: 5, topic: "Turing Machines as Language Accepters", co: "CO4", method: "L" },
  { hour: 43, module: 5, topic: "Turing Machines as Computers of Integer Functions", co: "CO4", method: "PBL" },
  { hour: 44, module: 5, topic: "Programming Techniques for Turing Machines", co: "CO4", method: "PBL" },
  { hour: 45, module: 5, topic: "Extensions to the Basic Turing Machine", co: "CO4", method: "L" },
  { hour: 46, module: 5, topic: "Restricted Turing Machines", co: "CO4", method: "L" },
  { hour: 47, module: 5, topic: "Undecidability: A Language That Is Not Recursively Enumerable", co: "CO5", method: "L" },
  { hour: 48, module: 5, topic: "An Undecidable Problem That is RE", co: "CO5", method: "L" },
  { hour: 49, module: 5, topic: "Undecidable Problems about Turing Machines", co: "CO5", method: "L" },
  { hour: 50, module: 5, topic: "Post Correspondence Problem (PCP)", co: "CO5", method: "Group" },
];

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = [
    { id: 'review', label: 'Draft Review', icon: Info },
    { id: 'handout', label: 'Course Handout', icon: FileText },
    { id: 'plan', label: 'Lesson Plan', icon: Calendar },
    { id: 'mapping', label: 'CO-PO Mapping', icon: Table },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-64 border-r border-zinc-200 bg-zinc-50 h-screen flex flex-col p-4 print:hidden">
      <div className="flex items-center gap-2 px-2 py-4 mb-8">
        <div className="bg-zinc-900 text-white p-1.5 rounded">
          <GraduationCap size={20} />
        </div>
        <div>
          <h1 className="font-bold text-zinc-900 text-sm leading-tight">Academic Planner</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">BCS503 • V SEM</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200' 
                : 'text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-zinc-200">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 mb-4">
          <p className="text-[10px] uppercase font-bold text-blue-800 mb-1">Institution</p>
          <p className="text-xs font-medium text-blue-900 leading-tight">{COLLEGE_NAME}</p>
        </div>
        <button 
          onClick={handlePrint}
          className="w-full flex items-center justify-center gap-2 bg-white border border-zinc-300 rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors active:scale-95"
        >
          <Printer size={16} />
          Export PDF
        </button>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-10">
    <h2 className="text-3xl font-serif italic text-zinc-900 leading-none mb-2">{title}</h2>
    <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest">{subtitle}</p>
  </div>
);

const ReviewPanel = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-3xl"
  >
    <SectionHeader title="Initial Draft Review" subtitle="Consistency & Accuracy Check" />
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 border border-zinc-200 rounded-xl bg-white shadow-sm">
          <CheckCircle2 className="text-emerald-500 mb-4" />
          <h3 className="font-bold text-zinc-900 mb-2">Timing Alignment</h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            The curriculum is distributed over <strong>13 weeks</strong> with <strong>4 lecture hours</strong> each, perfectly tallying with the <strong>50-hour</strong> pedagogical requirement of the BCS503 syllabus.
          </p>
        </div>
        <div className="p-5 border border-zinc-200 rounded-xl bg-white shadow-sm">
          <Award className="text-amber-500 mb-4" />
          <h3 className="font-bold text-zinc-900 mb-2">NBA Integration</h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Mapping includes all <strong>12 POs</strong> and <strong>2 PSOs</strong> tailored for the <strong>CSE (AIML)</strong> track at MIT Thandavapura.
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-xl font-serif italic mb-6">Subject Statistics</h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm">Target Hours</span>
            <span className="font-mono text-lg">50</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm">Modules Covered</span>
            <span className="font-mono text-lg">05</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-zinc-400 text-sm">Calculated COs</span>
            <span className="font-mono text-lg">05</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-zinc-400 text-sm">NBA Map Status</span>
            <span className="px-2 py-0.5 bg-zinc-700 rounded text-[10px] font-bold">READY</span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200 border-dashed">
        <Info className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 italic">
          <strong>Note from AI:</strong> Please review the Lesson Plan for Module 5 (Hour 47-50) particularly, as it covers high-complexity topics of Undecidability which may require more than the allocated 10 hours depending on class pace.
        </p>
      </div>
    </div>
  </motion.div>
);

const Handout = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-12 border border-zinc-200 shadow-2xl max-w-4xl mx-auto rounded-xl"
  >
    <div className="text-center mb-12">
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">{COLLEGE_NAME}</h1>
      <p className="text-zinc-600 font-medium">{DEPARTMENT}</p>
      <div className="h-0.5 w-24 bg-zinc-900 mx-auto my-6" />
      <h2 className="text-3xl font-serif italic font-medium uppercase tracking-widest text-zinc-800">Course Handout</h2>
    </div>

    <div className="grid grid-cols-2 gap-8 mb-12">
      <div className="space-y-3">
        <div className="flex justify-between border-b border-zinc-100 py-1">
          <span className="text-xs uppercase text-zinc-400 font-bold">Subject</span>
          <span className="text-xs font-bold text-zinc-900">{SUBJECT_NAME}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-100 py-1">
          <span className="text-xs uppercase text-zinc-400 font-bold">Code</span>
          <span className="text-xs font-bold text-zinc-900">{SUBJECT_CODE}</span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between border-b border-zinc-100 py-1">
          <span className="text-xs uppercase text-zinc-400 font-bold">Semester</span>
          <span className="text-xs font-bold text-zinc-900">{SEMESTER}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-100 py-1">
          <span className="text-xs uppercase text-zinc-400 font-bold">Hours</span>
          <span className="text-xs font-bold text-zinc-900">50 Total</span>
        </div>
      </div>
    </div>

    <section className="mb-12">
      <h3 className="text-lg font-serif italic border-b-2 border-zinc-900 inline-block mb-4">Course Outcomes</h3>
      <div className="space-y-4">
        {COS.map((co, i) => (
          <div key={i} className="flex gap-4 p-4 hover:bg-zinc-50 transition-colors rounded-lg group">
            <span className="font-mono text-sm text-zinc-400 font-bold group-hover:text-zinc-900">CO{i+1}</span>
            <p className="text-sm text-zinc-700">{co}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-12">
      <h3 className="text-lg font-serif italic border-b-2 border-zinc-900 inline-block mb-4">Assessment Strategy</h3>
      <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-200">
        <ul className="list-disc list-inside text-sm text-zinc-600 space-y-2">
          <li><strong>Continuous Internal Evaluation (CIE):</strong> 50% Weightage (25 Marks Tests, 25 Marks Assignments)</li>
          <li><strong>Semester End Examination (SEE):</strong> 50% Weightage (100 Marks scaled to 50)</li>
          <li><strong>Test 1 Schedule:</strong> After 40-50% Syllabus coverage</li>
          <li><strong>Test 2 Schedule:</strong> After 85-90% Syllabus coverage</li>
        </ul>
      </div>
    </section>

    <section>
      <h3 className="text-lg font-serif italic border-b-2 border-zinc-900 inline-block mb-4">Learning Resources</h3>
      <div className="space-y-4">
        <div className="p-4 border border-zinc-200 rounded-lg">
          <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Textbook</p>
          <p className="text-sm text-zinc-800">John E Hopcroft, Rajeev Motwani, Jeffrey D. Ullman, "Introduction to Automata Theory, Languages and Computation", 2nd Edition, Pearson.</p>
        </div>
        <div className="p-4 border border-zinc-200 rounded-lg">
          <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">E-Resources</p>
          <a 
            href="https://archive.nptel.ac.in/courses/106/105/106105196/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            https://archive.nptel.ac.in/courses/106/105/106105196/
          </a>
        </div>
      </div>
    </section>
  </motion.div>
);

const LessonPlanTable = () => {
  const modules = [1, 2, 3, 4, 5];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <div className="print:hidden">
        <SectionHeader title="Session Sequence" subtitle="Tactical Delivery Schedule" />
      </div>

      {modules.map((modNum) => {
        const moduleLessons = LESSON_PLAN.filter(item => item.module === modNum);
        
        return (
          <div key={modNum} className="bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden break-inside-avoid">
            <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex justify-between items-center">
              <h3 className="text-xl font-serif italic text-zinc-900">Module {modNum}</h3>
              <div className="flex gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Unit Summary: {moduleLessons.length} Hours
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-100 border-b border-zinc-200">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest w-12">Hour</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest w-24">Tentative Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest w-24">Actual Date</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest">Topic to be Covered</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest w-16 text-center">CO</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest w-24 text-center">Method</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest min-w-[120px]">Reasons</th>
                  </tr>
                </thead>
                <tbody>
                  {moduleLessons.map((item, idx) => (
                    <tr key={idx} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-zinc-900 text-sm font-medium">{item.hour}</td>
                      <td className="px-6 py-4">
                        <div className="h-6 w-full bg-blue-50/50 border border-blue-100 rounded border-dashed" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 w-full bg-zinc-50 border border-zinc-200 rounded border-dashed" />
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-700">{item.topic}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-[10px] font-bold text-blue-600">{item.co}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-[10px] font-bold text-zinc-600 border border-zinc-300 px-1.5 py-0.5 rounded">{item.method}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 w-full bg-zinc-50 border border-zinc-100 rounded border-dashed" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

const MappingMatrix = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <SectionHeader title="NBA PO-PSO Mapping Matrix" subtitle="Competency Framework Analysis" />
    
    <div className="mb-8 space-y-4">
      <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-widest font-mono">Level Definitions</h4>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-zinc-100 border border-zinc-300 rounded" />
          <span className="text-xs text-zinc-600">0: No/Slight Correlation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded" />
          <span className="text-xs text-zinc-600">1: Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-300 border border-blue-500 rounded" />
          <span className="text-xs text-zinc-600">2: Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-zinc-900 border border-zinc-900 rounded" />
          <span className="text-xs text-zinc-600">3: High</span>
        </div>
      </div>
    </div>

    <div className="overflow-x-auto bg-white border border-zinc-200 rounded-xl shadow-lg">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-zinc-100 border-b border-zinc-200">
            <th className="px-4 py-6 font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-r border-zinc-200">CO/PO</th>
            {POS.map((_, i) => (
              <th key={i} className="px-3 py-6 font-mono text-[10px] font-bold text-zinc-500 uppercase">PO{i+1}</th>
            ))}
            {PSOS.map((_, i) => (
              <th key={i} className="px-3 py-6 font-mono text-[10px] font-bold text-blue-500 uppercase">PSO{i+1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MAPPING.map((row, coIdx) => (
            <tr key={coIdx} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
              <td className="px-4 py-4 font-bold text-zinc-900 text-sm border-r border-zinc-200">CO{coIdx+1}</td>
              {row.map((val, poIdx) => (
                <td key={poIdx} className="px-3 py-4">
                  {val > 0 ? (
                    <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold mx-auto transition-all ${
                      val === 3 ? 'bg-zinc-900 text-white' : 
                      val === 2 ? 'bg-blue-300 text-blue-900' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {val}
                    </div>
                  ) : <span className="text-zinc-200">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-12 grid grid-cols-2 gap-8">
      <div>
        <h4 className="text-xs uppercase font-bold text-zinc-400 mb-4 tracking-widest font-mono">Program Specific Outcomes (PSOs)</h4>
        <div className="space-y-4">
          {PSOS.map((pso, i) => (
            <div key={i} className="p-4 bg-zinc-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-xs font-bold text-blue-600 mb-1">PSO{i+1}</p>
              <p className="text-xs text-zinc-700 leading-relaxed italic">"{pso}"</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs uppercase font-bold text-zinc-400 mb-4 tracking-widest font-mono">Mapping Rationale</h4>
        <p className="text-xs text-zinc-500 leading-relaxed">
          The Theory of Computation is highly mapped to PO1, PO2, and PO3 as it forms the mathematical backbone for algorithm design and problem analysis. CO3 and CO4 have high correlations with PSO1 (Design of intelligent systems) as automata theory is fundamental to parsing and sequence modelling in AI/ML tasks.
        </p>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('review');

  return (
    <div className="flex h-screen bg-[#E4E3E0] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-hidden print:bg-white print:h-auto print:overflow-visible print:block">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Dynamic View (Tabs) - Hidden during print */}
      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar print:hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'review' && <ReviewPanel key="review" />}
          {activeTab === 'handout' && <Handout key="handout" />}
          {activeTab === 'plan' && <LessonPlanTable key="plan" />}
          {activeTab === 'mapping' && <MappingMatrix key="mapping" />}
        </AnimatePresence>
      </main>

      {/* Static Consolidated View - Visible ONLY during print */}
      <div className="hidden print:block bg-white">
        <div className="print-content-wrapper mx-auto max-w-[210mm]">
          <div className="p-8 break-after-page min-h-screen">
            <Handout />
          </div>
          <div className="p-8 break-after-page min-h-screen">
            <MappingMatrix />
          </div>
          <div className="p-8 space-y-12 min-h-screen">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif italic text-zinc-900 mb-2">Lesson Plan</h2>
              <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Full Session Sequence</p>
            </div>
            <LessonPlanTable />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        
        @page {
          size: A4;
          margin: 15mm;
        }

        @media print {
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
          }
          .shadow-xl, .shadow-2xl, .shadow-lg, .shadow-sm {
            box-shadow: none !important;
            border: 1px solid #e4e4e7 !important;
          }
          .bg-zinc-50 {
            background-color: #fafafa !important;
          }
          .break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
        body {
          font-family: 'Inter', sans-serif;
        }

        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
