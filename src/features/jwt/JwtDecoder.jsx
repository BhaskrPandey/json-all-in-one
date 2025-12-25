import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { jwtDecode } from 'jwt-decode';
import { Shield, ShieldAlert, Clock, Key } from 'lucide-react';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('{}');
  const [payload, setPayload] = useState('{}');
  const [status, setStatus] = useState('empty'); // 'empty', 'valid', 'invalid'
  const [expiry, setExpiry] = useState(null);

  useEffect(() => {
    if (!token.trim()) {
      setStatus('empty');
      setHeader('{}');
      setPayload('{}');
      setExpiry(null);
      return;
    }

    try {
      // 1. Decode Payload
      const decodedPayload = jwtDecode(token);
      setPayload(JSON.stringify(decodedPayload, null, 2));

      // 2. Decode Header (Manual split because jwt-decode focuses on payload)
      const parts = token.split('.');
      if (parts.length === 3) {
        const decodedHeader = JSON.parse(atob(parts[0]));
        setHeader(JSON.stringify(decodedHeader, null, 2));
      }

      // 3. Check Expiry
      if (decodedPayload.exp) {
        setExpiry(new Date(decodedPayload.exp * 1000).toLocaleString());
      } else {
        setExpiry("No Expiry Set");
      }

      setStatus('valid');
    } catch (err) {
      setStatus('invalid');
      // Keep previous valid data or show error
      setPayload(JSON.stringify({ error: "Invalid Token format" }, null, 2));
    }
  }, [token]);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Top Bar: Status */}
      <div className={`h-12 border-b border-gray-800 flex items-center px-4 justify-between ${
        status === 'valid' ? 'bg-green-900/10' : status === 'invalid' ? 'bg-red-900/10' : 'bg-gray-900'
      }`}>
        <div className="flex items-center gap-2">
            <Shield size={16} className={status === 'valid' ? 'text-green-400' : 'text-gray-500'} />
            <span className="text-sm font-semibold text-gray-300">
                {status === 'empty' && "Paste a JWT to decode"}
                {status === 'valid' && "Valid Token"}
                {status === 'invalid' && "Invalid Token"}
            </span>
        </div>
        
        {expiry && (
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                <Clock size={12} /> 
                <span>Expires: <span className="text-white">{expiry}</span></span>
            </div>
        )}
      </div>

      {/* Workspace */}
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        
        {/* Input Area (Top) */}
        <div className="flex-1 min-h-[150px] flex flex-col bg-[#1e1e1e] border border-gray-800 rounded-lg overflow-hidden">
            <div className="bg-gray-900 px-3 py-1 text-xs text-gray-500 font-bold border-b border-gray-800 flex items-center gap-2">
                <Key size={12}/> ENCODED TOKEN
            </div>
            <textarea 
                className="flex-1 w-full bg-[#1e1e1e] text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
        </div>

        {/* Output Areas (Bottom split) */}
        <div className="flex-1 flex gap-4 min-h-[200px]">
            {/* Header */}
            <div className="flex-1 flex flex-col border border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-900 px-3 py-1 text-xs text-gray-500 font-bold border-b border-gray-800">
                    HEADER
                </div>
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    theme="vs-dark"
                    value={header}
                    options={{ readOnly: true, minimap: { enabled: false }, fontSize: 12 }}
                />
            </div>

            {/* Payload */}
            <div className="flex-1 flex flex-col border border-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-900 px-3 py-1 text-xs text-purple-400 font-bold border-b border-gray-800">
                    PAYLOAD (DATA)
                </div>
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    theme="vs-dark"
                    value={payload}
                    options={{ readOnly: true, minimap: { enabled: false }, fontSize: 12 }}
                />
            </div>
        </div>

      </div>
    </div>
  );
}