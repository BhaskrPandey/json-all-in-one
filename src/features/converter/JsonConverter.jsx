import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { ArrowRight, ArrowLeft, Copy, Trash2, Quote } from 'lucide-react';

export default function JsonConverter() {
  const [input, setInput] = useState('{\n  "api_key": "12345",\n  "demo": true\n}');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('json-to-string'); // or 'string-to-json'

  // Convert JSON Object -> Stringified JSON
  const handleToString = () => {
    try {
      // 1. Ensure input is valid JSON first
      const obj = JSON.parse(input); 
      // 2. Stringify it (escapes quotes)
      const stringified = JSON.stringify(JSON.stringify(obj)); 
      // Remove the outer quotes that JSON.stringify adds to the string itself for cleaner copying
      setOutput(stringified.slice(1, -1)); 
      setMode('json-to-string');
    } catch (err) {
      setOutput("Error: Invalid JSON input. Please check your syntax.");
    }
  };

  // Convert Stringified JSON -> JSON Object
  const handleToJson = () => {
    try {
      // If the user pasted a string without outer quotes, we try to handle it
      let raw = input.trim();
      
      // Basic heuristic: if it doesn't start with quote, wrap it (helps with loose pasting)
      if (!raw.startsWith('"') && !raw.startsWith("'")) {
        raw = `"${raw}"`;
      }

      const parsed = JSON.parse(raw); // First parse turns string -> object/string
      const formatted = JSON.stringify(JSON.parse(parsed), null, 2); // Second parse ensures it's an object
      setOutput(formatted);
      setMode('string-to-json');
    } catch (err) {
      // Fallback: simpler parse for standard objects
      try {
        const simpleParse = JSON.stringify(JSON.parse(input), null, 2);
        setOutput(simpleParse);
      } catch (e) {
        setOutput("Error: Could not parse string. Make sure it is properly escaped.");
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="h-14 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
           <span className="text-sm font-medium text-gray-300">Conversion Mode</span>
           
           <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
             <button 
               onClick={handleToString}
               className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md hover:bg-blue-900/30 hover:text-blue-400 transition-colors text-gray-400"
             >
               JSON <ArrowRight size={12}/> String
             </button>
             <div className="w-px bg-gray-800 mx-1"></div>
             <button 
               onClick={handleToJson}
               className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md hover:bg-purple-900/30 hover:text-purple-400 transition-colors text-gray-400"
             >
               String <ArrowRight size={12}/> JSON
             </button>
           </div>
        </div>

        <button 
           onClick={() => { setInput(''); setOutput(''); }}
           className="text-gray-500 hover:text-red-400 transition-colors"
           title="Clear All"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Input Pane */}
        <div className="flex-1 border-r border-gray-800 flex flex-col">
          <div className="bg-gray-900/50 px-4 py-2 text-xs text-gray-500 font-mono border-b border-gray-800">
            INPUT
          </div>
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="vs-dark"
            value={input}
            onChange={(val) => setInput(val)}
            options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
          />
        </div>

        {/* Output Pane */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          <div className="bg-gray-900/50 px-4 py-2 text-xs text-gray-500 font-mono border-b border-gray-800 flex justify-between items-center">
            <span>OUTPUT</span>
            <button 
              onClick={() => navigator.clipboard.writeText(output)} 
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Copy size={12} /> Copy
            </button>
          </div>
          <Editor
            height="100%"
            defaultLanguage={mode === 'string-to-json' ? 'json' : 'text'}
            theme="vs-dark"
            value={output}
            options={{ 
              readOnly: true, 
              minimap: { enabled: false }, 
              fontSize: 13, 
              wordWrap: 'on',
              lineNumbers: 'off' // Cleaner look for string output
            }}
          />
        </div>
      </div>
    </div>
  );
}