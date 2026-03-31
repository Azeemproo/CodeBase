import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import "preline"; 
import { HSStaticMethods } from "preline";
// Import the type for autoInit
import Editor from "@monaco-editor/react";
import problemlist from '../problemlist.json';

interface problemData {
  question: string;
}

export default function ProblemDetail() {
  const [problems, setProblems] = useState<problemData | null>(null);
  const [loading, setLoading] = useState(true);
  const { ProblemId } = useParams();

  const problem = problemlist.problemsetQuestionList.find((p) => p.questionFrontendId == ProblemId);

  useEffect(() => {
    // Re-initialize Preline whenever the data finishes loading
    if (!loading && problems) {
      HSStaticMethods.autoInit();
    }
  }, [loading, problems]);

  useEffect(() => {
    if (problem?.titleSlug) {
      fetch(`http://localhost:3001/select?titleSlug=${problem?.titleSlug}`)
        .then((res) => res.json())
        .then((data) => {
          setProblems(data);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching problem:", err));
    }
  }, [problem?.titleSlug]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!problem || !problems) return <div>Problem not found!</div>;

  return (
    /* 1. Main container with splitter configuration */
    <div 
      className="h-screen w-full overflow-hidden" 
      data-hs-layout-splitter='{ "horizontalSplitterClasses": "w-2 bg-gray-400 cursor-col-resize hover:bg-blue-500 transition-colors" }'
    >
      /* 2. Group wrapper */
      <div className="flex h-full w-full" data-hs-layout-splitter-horizontal-group>
        
        {/* LEFT PANEL */}
        <div 
          className="bg-blue-50 overflow-auto p-6" 
          data-hs-layout-splitter-item='50' 
        >
          <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: problems.question }} />
        </div>

        {/* Note: NO DIVIDER HERE. Preline inserts it automatically based on horizontalSplitterClasses */}

        {/* RIGHT PANEL */}
        <div 
          className="bg-red-50 flex-1 overflow-auto p-6" 
          data-hs-layout-splitter-item='50'
        >
            <Editor
              height="100%"
              defaultLanguage="cpp" // or "python", "javascript", etc.
              defaultValue="// Write your code here"
              theme="vs-dark" // Optional: Use "light" for a white editor
              options={{
                minimap: { enabled: false }, // Hides the small code map on the right
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true, // Crucial: resizes the editor when you drag the split bar
              }}
            />
            <button>submission</button>
          </div>

        </div>
      </div>
  );
}
