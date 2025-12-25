import React from 'react';
import { Braces, Minimize2, Copy, Trash2, CheckCircle } from 'lucide-react';

const ToolbarButton = ({ onClick, icon: Icon, label, variant = 'default' }) => {
  const baseClasses = "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all";
  const variants = {
    default: "text-gray-300 hover:bg-gray-800 hover:text-white",
    success: "text-green-400 hover:bg-green-900/30",
    danger: "text-red-400 hover:bg-red-900/30"
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant] || variants.default}`}>
      <Icon size={14} />
      <span>{label}</span>
    </button>
  );
};

export default function EditorToolbar({ onFormat, onMinify, onCopy, onClear, error }) {
  return (
    <div className="h-12 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-4">
      
      {/* Left Actions */}
      <div className="flex items-center gap-2">
        <ToolbarButton onClick={onFormat} icon={Braces} label="Format / Prettify" />
        <ToolbarButton onClick={onMinify} icon={Minimize2} label="Minify" />
      </div>

      {/* Error Message Display */}
      <div className="flex-1 flex justify-center">
        {error && (
          <span className="text-red-400 text-xs bg-red-950/50 px-3 py-1 rounded border border-red-900 animate-pulse">
            Error: {error}
          </span>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <ToolbarButton onClick={onCopy} icon={Copy} label="Copy" />
        <ToolbarButton onClick={onClear} icon={Trash2} label="Clear" variant="danger" />
      </div>
    </div>
  );
}