import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, Share2, Check } from 'lucide-react';
import LZString from 'lz-string';
import { useTheme } from '../../context/ThemeContext';

export default function JsonEditor() {
  const [jsonInput, setJsonInput] = useState('{\n  "message": "Welcome to JSON AIO!"\n}');
  const { isDarkMode } = useTheme(); // Get the current theme status
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // 1. On Load: Check if URL has shared code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('code');
    if (encoded) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
        if (decompressed) setJsonInput(decompressed);
      } catch (err) {
        console.error("Failed to load shared code", err);
      }
    }
  }, []);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const compressed = LZString.compressToEncodedURIComponent(jsonInput);
    const newUrl = `${window.location.origin}/?code=${compressed}`;
    window.history.pushState({}, '', newUrl);
    navigator.clipboard.writeText(newUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    // Updated: Dynamic Background
    <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] transition-colors duration-200">
      
      {/* Toolbar - Updated: Dynamic Background & Border */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#2d2d2d] border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">input.json</span>
        <div className="flex gap-2">
           {/* Share Button */}
           <button 
            onClick={handleShare}
            // Updated: Button Colors
            className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded transition-colors"
          >
            {shared ? <Check size={14} className="text-green-500 dark:text-green-400"/> : <Share2 size={14}/>}
            {shared ? "Link Copied!" : "Share"}
          </button>

          <button 
            onClick={formatJson}
            className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors"
          >
            <Play size={14} /> Format
          </button>
          
          <button 
            onClick={copyToClipboard}
            // Updated: Button Colors
            className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded transition-colors"
          >
            {copied ? <Check size={14} className="text-green-500 dark:text-green-400"/> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="json"
          // Updated: Dynamic Theme Prop
          theme={isDarkMode ? "vs-dark" : "light"}
          value={jsonInput}
          onChange={(value) => setJsonInput(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            formatOnPaste: true,
            automaticLayout: true,
          }}
        />
        {error && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-100 dark:bg-red-900/90 text-red-800 dark:text-red-100 p-3 rounded-md text-sm font-mono border border-red-200 dark:border-red-700 shadow-lg transition-colors">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}