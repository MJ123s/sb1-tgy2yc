import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  name: string;
  icon: LucideIcon;
  description: string;
  features: string[];
}

export function ToolCard({ name, icon: Icon, description, features }: ToolCardProps) {
  return (
    <div className="bg-slate-800/40 rounded-lg p-4 hover:bg-slate-800/60 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <p className="text-slate-300 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-slate-400 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}