import React from 'react';
import { Save } from 'lucide-react';

interface Solution {
  id: string;
  type: string;
  data: any;
  timestamp: number;
}

interface SaveSolutionProps {
  type: string;
  data: any;
}

export function SaveSolution({ type, data }: SaveSolutionProps) {
  const saveSolution = () => {
    const solutions = JSON.parse(localStorage.getItem('solutions') || '[]') as Solution[];
    
    const newSolution: Solution = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data,
      timestamp: Date.now()
    };

    localStorage.setItem('solutions', JSON.stringify([...solutions, newSolution]));
  };

  return (
    <button
      onClick={saveSolution}
      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
    >
      <Save className="w-4 h-4" />
      <span>שמור פתרון</span>
    </button>
  );
}