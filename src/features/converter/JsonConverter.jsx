import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { ArrowRight, Copy, Trash2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; // 1. Import Hook

export default function JsonConverter() {
  const [input, setInput] = useState('{\n  "api_key": "12345",\n  "demo": true\n}');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('json-to-string'); 
  const { isDarkMode } = useTheme(); // 2. Get Theme Status

  // Convert JSON Object -> Stringified JSON
  const handleToString = () => {
    try {
      const obj = JSON.parse(input); 
      const stringified = JSON.stringify(JSON.stringify(obj)); 
      setOutput(stringified.slice(1, -1)); 
      setMode('json-to-string');
    } catch (err) {
      setOutput("Error: Invalid JSON input. Please check your syntax.");
    }
  };

  // Convert Stringified JSON -> JSON Object
  const handleToJson = () => {
    try {
      let raw = input.trim();
      if (!raw.startsWith('"') && !raw.startsWith("'")) {
        raw = `"${raw}"`;
      }
      const parsed = JSON.parse(raw); 
      const formatted = JSON.stringify(JSON.parse(parsed), null, 2); 
      setOutput(formatted);
      setMode('string-to-json');
    } catch (err) {
      try {
        const simpleParse = JSON.stringify(JSON.parse(input), null, 2);
        setOutput(simpleParse);
      } catch (e) {
        setOutput("Error: Could not parse string. Make sure it is properly escaped.");
      }
    }
  };

  return (
    // 3. Dynamic Main Background
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] transition-colors duration-200">
      
      {/* 4. Toolbar - Dynamic Background & Border */}
      <div className="h-14 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center justify-between px-4 transition-colors duration-200">
        <div className="flex items-center gap-4">
           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Conversion Mode</span>
           
           {/* Button Group Container */}
           <div className="flex bg-white dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-800 transition-colors">
             <button 
               onClick={handleToString}
               className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
             >
               JSON <ArrowRight size={12}/> String
             </button>
             <div className="w-px bg-gray-200 dark:bg-gray-800 mx-1"></div>
             <button 
               onClick={handleToJson}
               className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
             >
               String <ArrowRight size={12}/> JSON
             </button>
           </div>
        </div>

        <button 
           onClick={() => { setInput(''); setOutput(''); }}
           className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
           title="Clear All"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Input Pane */}
        <div className="flex-1 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors">
          <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 text-xs text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800 transition-colors">
            INPUT
          </div>
          <Editor
            height="100%"
            defaultLanguage="json"
            // 5. Dynamic Theme
            theme={isDarkMode ? "vs-dark" : "light"}
            value={input}
            onChange={(val) => setInput(val)}
            options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
          />
        </div>

        {/* Output Pane */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#1e1e1e] transition-colors">
          <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 text-xs text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800 flex justify-between items-center transition-colors">
            <span>OUTPUT</span>
            <button 
              onClick={() => navigator.clipboard.writeText(output)} 
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Copy size={12} /> Copy
            </button>
          </div>
          <Editor
            height="100%"
            defaultLanguage={mode === 'string-to-json' ? 'json' : 'text'}
            // 6. Dynamic Theme
            theme={isDarkMode ? "vs-dark" : "light"}
            value={output}
            options={{ 
              readOnly: true, 
              minimap: { enabled: false }, 
              fontSize: 13, 
              wordWrap: 'on',
              lineNumbers: 'off' 
            }}
          />
        </div>
      </div>
    </div>
  );
}