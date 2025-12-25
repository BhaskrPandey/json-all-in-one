import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FileJson, GitCompare, FileCode, Settings, ShieldCheck } from 'lucide-react';

// Import our Feature Components
import JsonEditor from './features/editor/JsonEditor';
import JsonDiff from './features/diff/JsonDiff';
import JsonConverter from './features/converter/JsonConverter';
import BuyCoffee from './components/ui/BuyCoffee';
import JwtDecoder from './features/jwt/JwtDecoder';

// Navigation Item Component (Reusable)
const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors
        ${isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans">

        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 bg-gray-950 border-r border-gray-800 flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-800">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              JSON AIO
            </span>
          </div>

          <nav className="flex-1 py-6 space-y-1">
            <NavItem to="/" icon={FileJson} label="JSON Editor" />
            <NavItem to="/diff" icon={GitCompare} label="Diff Checker" />
            <NavItem to="/converter" icon={FileCode} label="Converter" />
            <NavItem to="/jwt" icon={ShieldCheck} label="JWT Decoder" />
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors">
              <Settings size={14} />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col min-w-0">
          
          {/* SEO Title (Hidden from humans, visible to Google) */}
          <h1 className="sr-only">JSON AIO - Online JSON Editor and Diff Checker</h1>

          {/* Top Header */}
          <div className="h-14 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-6">
            <h2 className="text-sm font-semibold text-gray-300">Workspace</h2>

            <div className="flex items-center gap-4">
              {/* The New Button */}
              <BuyCoffee />

              {/* The Existing Badge */}
              <div className="text-xs text-green-400 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Client-Side Only
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-[#1e1e1e]">
            <Routes>
              <Route path="/" element={<JsonEditor />} />
              <Route path="/diff" element={<JsonDiff />} />
              <Route path="/converter" element={<JsonConverter />} />
              <Route path="/jwt" element={<JwtDecoder />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}