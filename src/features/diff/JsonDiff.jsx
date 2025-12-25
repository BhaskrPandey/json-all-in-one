import React, { useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { Trash2, ArrowRightLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; // 1. Import Hook

export default function JsonDiff() {
  // We keep track of both sides
  const [original, setOriginal] = useState('{\n  "name": "John",\n  "age": 30\n}');
  const [modified, setModified] = useState('{\n  "name": "John Doe",\n  "age": 32\n}');
  const { isDarkMode } = useTheme(); // 2. Get Theme Status

  // Handle swapping the left/right content
  const handleSwap = () => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  };

  // Handle clearing both sides
  const handleClear = () => {
    setOriginal('');
    setModified('');
  };

  return (
    // 3. Dynamic Main Background
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] transition-colors duration-200">
      
      {/* 4. Toolbar - Dynamic Background & Border */}
      <div className="h-12 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center justify-between px-4 transition-colors duration-200">
        
        {/* Left Side Labels */}
        <div className="flex items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            Original
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            Modified
          </span>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSwap}
            // Updated Hover States for Light/Dark
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-md transition-colors"
          >
            <ArrowRightLeft size={14} />
            Swap Sides
          </button>
          <button 
            onClick={handleClear}
            // Updated Hover States for Light/Dark
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md transition-colors"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        </div>
      </div>

      {/* 5. The Monaco Diff Editor */}
      <div className="flex-1 overflow-hidden">
        <DiffEditor
          height="100%"
          language="json"
          // 6. Dynamic Theme Prop
          theme={isDarkMode ? "vs-dark" : "light"}
          original={original}
          modified={modified}
          options={{
            originalEditable: true, 
            renderSideBySide: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
          }}
          onMount={(editor) => {
            const originalModel = editor.getOriginalEditor().getModel();
            const modifiedModel = editor.getModifiedEditor().getModel();

            originalModel.onDidChangeContent(() => {
              setOriginal(originalModel.getValue());
            });

            modifiedModel.onDidChangeContent(() => {
              setModified(modifiedModel.getValue());
            });
          }}
        />
      </div>
    </div>
  );
}