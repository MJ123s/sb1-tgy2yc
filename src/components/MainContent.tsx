import React from 'react';
import { useTopic } from '../context/TopicContext';
import { GeometryTools } from './tools/GeometryTools';
import { AlgebraTools } from './tools/AlgebraTools';
import { TrigonometryTools } from './tools/TrigonometryTools';
import { CalculusTools } from './tools/CalculusTools';

export function MainContent() {
  const { currentTopic } = useTopic();

  return (
    <div className="flex-1 bg-slate-800/20 rounded-lg p-6">
      {currentTopic === 'geometry' && <GeometryTools />}
      {currentTopic === 'algebra' && <AlgebraTools />}
      {currentTopic === 'calculus' && <CalculusTools />}
      {currentTopic === 'trigonometry' && <TrigonometryTools />}
    </div>
  );
}