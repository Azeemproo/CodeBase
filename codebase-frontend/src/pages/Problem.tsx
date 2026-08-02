import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import "preline"; 
import { HSStaticMethods } from "preline";
// Import the type for autoInit
import Editor from "@monaco-editor/react";
import problemlist from '../problemlist.json';

interface problemData {
  question: string;
}

const LANGUAGE_ID_MAP : Record<string,number> = {
  python: 71,
  javascript: 63,
  cpp: 54,
  java: 62,
}
export default function ProblemDetail() {
  const [output, setOutput] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const { ProblemId } = useParams();
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState("cpp");

  const problem = problemlist.problemsetQuestionList.find((p: any ) => p.questionFrontendId == ProblemId);

  useEffect(() => {
    // Re-initialize Preline whenever the data finishes 
      HSStaticMethods.autoInit();
  }, []);

  // useEffect(() => {
  //   if (problem?.titleSlug) {
  //     fetch(`http://localhost:3001/select?titleSlug=${problem?.titleSlug}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setProblems(data);
  //         setLoading(false);
  //       })
  //       .catch((err) => console.error("Error fetching problem:", err));
  //   }
  // }, [problem?.titleSlug]);

  // if (loading) return <p className="p-10">Loading...</p>;
  if (!problem) return <div>Problem not found!</div>;

  function handleEditorDidMount(editor:any, monaco:any){
    editorRef.current = editor;
  }
  async function handleSubmit() {
  if (!editorRef.current) return;
  const code = editorRef.current.getValue();
  setSubmitting(true);
  setOutput(null);
  try{
    const response = await fetch('http://localhost:4000/api/execute',{
      method : 'POST',
      headers: {  
        'Content-Type':'application/json',
      },
      body: JSON.stringify({ code: code, language_id: LANGUAGE_ID_MAP[language] || 71 })  
    }) 
  if(!response.ok) throw new Error('Server error :  ${response.status}')     

    const result = await response.json();
    console.log(result);
    setOutput(result);

}catch (err : any){
  console.error('submission failed: ',err. message );
  setOutput({error : err.message})

}finally{
  setSubmitting(false);
}
}


    


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
          <div dangerouslySetInnerHTML={{ __html: problem.question }} />
        </div>

        {/* Note: NO DIVIDER HERE. Preline inserts it automatically based on horizontalSplitterClasses */}
                {/* RIGHT PANEL */}
        <div
          className="bg-red-50 flex-1 overflow-auto p-6 flex flex-col"
          data-hs-layout-splitter-item='50'
        >
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-2 p-1 border rounded w-fit"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>

          <Editor
            height="60%"
            language={language}
            defaultValue="// Write your code here"
            theme="vs-dark" // Optional: Use "light" for a white editor
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false }, // Hides the small code map on the right
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true, // Crucial: resizes the editor when you drag the split bar
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded w-fit disabled:opacity-50"
          >
            {submitting ? 'Running...' : 'Run Code'}
          </button>

          {output && (
            <pre className="mt-3 p-3 bg-black text-green-400 text-sm rounded overflow-auto flex-1">
              {output.error
                ? `Error: ${output.error}`
                : `Status: ${output.status?.description}\nOutput:\n${output.stdout || ''}\nStderr:\n${output.stderr || ''}`}
            </pre>
          )}
        </div>
        </div>
      </div>
  );


}