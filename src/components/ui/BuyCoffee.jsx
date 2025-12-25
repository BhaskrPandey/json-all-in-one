import React from 'react';
import { Coffee } from 'lucide-react';

export default function BuyCoffee() {
  return (
    <a 
      href="https://www.buymeacoffee.com/jsonaio" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-full hover:bg-yellow-400/20 transition-all"
    >
      <Coffee size={14} />
      <span>Buy me a coffee</span>
    </a>
  );
}