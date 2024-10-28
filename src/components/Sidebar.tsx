import React from 'react';
import { useTopic } from '../context/TopicContext';
import { 
  Square, 
  Calculator, 
  LineChart, 
  Triangle 
} from 'lucide-react';

const topics = [
  {
    id: 'geometry',
    name: 'גיאומטריה אוקלידית',
    icon: Square
  },
  {
    id: 'algebra',
    name: 'טכניקה אלגברית',
    icon: Calculator
  },
  {
    id: 'calculus',
    name: 'חדו"א',
    icon: LineChart
  },
  {
    id: 'trigonometry',
    name: 'טריגונומטריה',
    icon: Triangle
  }
] as const;

export function Sidebar() {
  const { currentTopic, setCurrentTopic } = useTopic();

  return (
    <aside className="w-64 bg-slate-800/20 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">נושאי לימוד</h2>
      <nav className="space-y-2">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.id}
              onClick={() => setCurrentTopic(topic.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-right transition-colors ${
                currentTopic === topic.id
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{topic.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}