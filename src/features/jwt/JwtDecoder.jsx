import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { jwtDecode } from 'jwt-decode';
import { Shield, Clock, Key } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; // 1. Import Hook

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('{}');
  const [payload, setPayload] = useState('{}');
  const [status, setStatus] = useState('empty');
  const [expiry, setExpiry] = useState(null);
  const { isDarkMode } = useTheme(); // 2. Get Theme Status

  useEffect(() => {
    if (!token.trim()) {
      setStatus('empty');
      setHeader('{}');
      setPayload('{}');
      setExpiry(null);
      return;
    }

    try {
      const decodedPayload = jwtDecode(token);
      setPayload(JSON.stringify(decodedPayload, null, 2));

      const parts = token.split('.');
      if (parts.length === 3) {
        const decodedHeader = JSON.parse(atob(parts[0]));
        setHeader(JSON.stringify(decodedHeader, null, 2));
      }

      if (decodedPayload.exp) {
        setExpiry(new Date(decodedPayload.exp * 1000).toLocaleString());
      } else {
        setExpiry("No Expiry Set");
      }

      setStatus('valid');
    } catch (err) {
      setStatus('invalid');
      setPayload(JSON.stringify({ error: "Invalid Token format" }, null, 2));
    }
  }, [token]);

  return (
    // 3. Dynamic Main Background
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] transition-colors duration-200">
      
      {/* 4. Top Bar - Dynamic Backgrounds & Text */}
      <div className={`h-12 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 justify-between transition-colors duration-200 ${
        status === 'valid' ? 'bg-green-50 dark:bg-green-900/10' : 
        status === 'invalid' ? 'bg-red-50 dark:bg-red-900/10' : 
        'bg-gray-100 dark:bg-gray-900'
      }`}>
        <div className="flex items-center gap-2">
            <Shield size={16} className={status === 'valid' ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {status === 'empty' && "Paste a JWT to decode"}
                {status === 'valid' && "Valid Token"}
                {status === 'invalid' && "Invalid Token"}
            </span>
        </div>
        
        {expiry && (
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                <Clock size={12} /> 
                <span>Expires: <span className="text-gray-900 dark:text-white font-medium">{expiry}</span></span>
            </div>
        )}
      </div>

      {/* Workspace */}
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        
        {/* Input Area (Top) */}
        <div className="flex-1 min-h-[150px] flex flex-col bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-colors">
            <div className="bg-gray-100 dark:bg-gray-900 px-3 py-1 text-xs text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800 flex items-center gap-2 transition-colors">
                <Key size={12}/> ENCODED TOKEN
            </div>
            <textarea 
                className="flex-1 w-full bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
        </div>

        {/* Output Areas (Bottom split) */}
        <div className="flex-1 flex gap-4 min-h-[200px]">
            {/* Header */}
            <div className="flex-1 flex flex-col border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-colors">
                <div className="bg-gray-100 dark:bg-gray-900 px-3 py-1 text-xs text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800 transition-colors">
                    HEADER
                </div>
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    // 5. Dynamic Theme Prop
                    theme={isDarkMode ? "vs-dark" : "light"}
                    value={header}
                    options={{ readOnly: true, minimap: { enabled: false }, fontSize: 12 }}
                />
            </div>

            {/* Payload */}
            <div className="flex-1 flex flex-col border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-colors">
                <div className="bg-gray-100 dark:bg-gray-900 px-3 py-1 text-xs text-purple-600 dark:text-purple-400 font-bold border-b border-gray-200 dark:border-gray-800 transition-colors">
                    PAYLOAD (DATA)
                </div>
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    // 6. Dynamic Theme Prop
                    theme={isDarkMode ? "vs-dark" : "light"}
                    value={payload}
                    options={{ readOnly: true, minimap: { enabled: false }, fontSize: 12 }}
                />
            </div>
        </div>

      </div>
    </div>
  );
}