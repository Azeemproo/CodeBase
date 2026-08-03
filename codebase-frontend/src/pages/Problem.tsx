import { useParams } from "react-router-dom";
import { useState, useRef } from 'react';
import "preline";
import Editor from "@monaco-editor/react";
import problemlist from '../problemlist.json';

const LANGUAGE_ID_MAP: Record<string, number> = {
  python: 71,
  javascript: 63,
  cpp: 54,
  java: 62,
};

export default function ProblemDetail() {
  const [output, setOutput] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const { ProblemId } = useParams();
  const editorRef = useRef<any>(null);

  const problem = problemlist.problemsetQuestionList.find(
    (p: any) => p.questionFrontendId == ProblemId
  );

  if (!problem) return <div className="p-10">Problem not found!</div>;

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  async function handleSubmit() {
    if (!editorRef.current) return;
    const code = editorRef.current.getValue();
    setSubmitting(true);
    setOutput(null);

    try {
      const response = await fetch('http://localhost:4000/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language_id: LANGUAGE_ID_MAP[language] || 71,
        }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const result = await response.json();
      console.log(result);
      setOutput(result);
    } catch (err: any) {
      console.error('submission failed: ', err.message);
      setOutput({ error: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="h-screen w-full overflow-hidden"
      data-hs-layout-splitter='{ "horizontalSplitterClasses": "w-2 bg-gray-400 cursor-col-resize hover:bg-blue-500 transition-colors" }'
    >
      <div className="flex flex-col md:flex-row h-full w-full" data-hs-layout-splitter-horizontal-group>

        {/* LEFT PANEL - description */}
        <div
          className="bg-blue-50 overflow-auto p-4 md:p-6 h-1/2 md:h-full"
          data-hs-layout-splitter-item='50'
        >
          <h1 className="text-xl md:text-2xl font-bold mb-4">{problem.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: problem.question }} />
        </div>

        {/* RIGHT PANEL - editor */}
        <div
          className="bg-red-50 flex-1 overflow-auto p-4 md:p-6 flex flex-col h-1/2 md:h-full"
          data-hs-layout-splitter-item='50'
        >
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-2 p-1 border rounded w-fit text-sm"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>

          <Editor
            height="50%"
            language={language}
            defaultValue="// Write your code here"
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded w-fit disabled:opacity-50 text-sm"
          >
            {submitting ? 'Running...' : 'Run Code'}
          </button>

          {output && (
            <pre className="mt-3 p-3 bg-black text-green-400 text-xs md:text-sm rounded overflow-auto flex-1">
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
