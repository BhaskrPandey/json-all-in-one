import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FileJson, GitCompare, FileCode, Settings, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

// Import Components
import JsonEditor from './features/editor/JsonEditor';
import JsonDiff from './features/diff/JsonDiff';
import JsonConverter from './features/converter/JsonConverter';
import JwtDecoder from './features/jwt/JwtDecoder';
import BuyCoffee from './components/ui/BuyCoffee';

// --- SEO Content Component (New) ---
// --- SEO Content Component (Fixed Layout) ---
const HomeWithSEO = () => {
  return (
    <div className="flex flex-col h-full"> {/* FIX: h-full ensures it fills screen */}
      
      {/* 1. The Editor Wrapper (Takes all empty space) */}
      <div className="flex-1 relative min-h-[500px]"> 
        <JsonEditor />
      </div>

      {/* 2. SEO Text Section (Sits at the bottom) */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-12 text-gray-600 dark:text-gray-400">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            The Secure, Client-Side JSON Workspace
          </h2>
          <p className="mb-6 leading-relaxed">
            <strong>JSON AIO</strong> is a privacy-first <strong>online JSON editor</strong> designed for developers who handle sensitive data. 
            Unlike other formatters that upload your code to a server, JSON AIO processes everything 
            <strong>100% locally in your browser</strong>. Your API keys, customer data, and logs never leave your device.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Why use JSON AIO?</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>JSON Linter:</strong> Validate syntax and fix errors instantly.</li>
                <li><strong>Offline Capable:</strong> Works without internet (PWA).</li>
                <li><strong>Diff Checker:</strong> Compare two JSON files side-by-side.</li>
                <li><strong>Privacy First:</strong> No backend database. No tracking.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How to Format JSON?</h3>
              <p className="text-sm leading-relaxed">
                Simply paste your raw or minified JSON string into the editor above. 
                Our engine automatically detects syntax errors. Click <strong>"Format"</strong> to 
                beautify your code with proper indentation, or <strong>"Minify"</strong> to compress it for production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Navigation Item Component ---
const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors
        ${isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
        }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden font-sans transition-colors duration-200">

        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-200">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
              JSON AIO
            </span>
          </div>

          <nav className="flex-1 py-6 space-y-1">
            <NavItem to="/" icon={FileJson} label="JSON Editor" />
            <NavItem to="/diff" icon={GitCompare} label="Diff Checker" />
            <NavItem to="/converter" icon={FileCode} label="Converter" />
            <NavItem to="/jwt" icon={ShieldCheck} label="JWT Decoder" />
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Settings size={14} />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col min-w-0">
          <h1 className="sr-only">JSON AIO - Online JSON Editor and Diff Checker</h1>

          {/* Top Header */}
          <div className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 transition-colors duration-200">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Workspace</h2>

            <div className="flex items-center gap-4">
              
              {/* THEME TOGGLE BUTTON */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <BuyCoffee />

              <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full border border-green-200 dark:border-green-800">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Client-Side Only
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-gray-50 dark:bg-[#1e1e1e]">
            <Routes>
              {/* Updated Route to use the SEO wrapper */}
              <Route path="/" element={<HomeWithSEO />} />
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