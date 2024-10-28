import React, { useState } from 'react';
import { LineChart, ArrowRight, Divide, Infinity } from 'lucide-react';
import { ToolCard } from './ToolCard';
import { LimitCalculator } from './calculus/LimitCalculator';
import { DerivativeCalculator } from './calculus/DerivativeCalculator';
import { IntegralCalculator } from './calculus/IntegralCalculator';
import { OptimizationCalculator } from './calculus/OptimizationCalculator';

const tools = [
  {
    id: 'derivatives',
    name: 'נגזרות',
    icon: LineChart,
    description: 'חישוב וניתוח נגזרות',
    features: [
      'חישוב נגזרת ראשונה ושנייה',
      'נקודות קיצון',
      'תחומי עליה וירידה'
    ]
  },
  {
    id: 'integrals',
    name: 'אינטגרלים',
    icon: Infinity,
    description: 'חישוב אינטגרלים וחישובי שטח',
    features: [
      'אינטגרל מסוים ובלתי מסוים',
      'חישובי שטח',
      'נפח גופי סיבוב'
    ]
  },
  {
    id: 'limits',
    name: 'גבולות',
    icon: ArrowRight,
    description: 'חישוב וניתוח גבולות',
    features: [
      'חישוב גבולות',
      'אי רציפות',
      'כללי לופיטל'
    ]
  },
  {
    id: 'optimization',
    name: 'בעיות קיצון',
    icon: Divide,
    description: 'פתרון בעיות קיצון',
    features: [
      'זיהוי פונקצית המטרה',
      'מציאת תחום הגדרה',
      'חישוב ערכים מקסימליים ומינימליים'
    ]
  }
];

export function CalculusTools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (selectedTool) {
      case 'derivatives':
        return <DerivativeCalculator />;
      case 'integrals':
        return <IntegralCalculator />;
      case 'limits':
        return <LimitCalculator />;
      case 'optimization':
        return <OptimizationCalculator />;
      default:
        return (
          <div className="grid grid-cols-2 gap-6">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className="text-right"
              >
                <ToolCard {...tool} />
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div>
      {selectedTool ? (
        <div>
          <button
            onClick={() => setSelectedTool(null)}
            className="mb-6 text-slate-400 hover:text-slate-300 transition-colors"
          >
            ← חזרה לכלים
          </button>
          {renderTool()}
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">כלים לחשבון דיפרנציאלי ואינטגרלי</h2>
          {renderTool()}
        </>
      )}
    </div>
  );
}