import React, { useState } from 'react';
import { Triangle, Circle, Compass, Ruler } from 'lucide-react';
import { ToolCard } from './ToolCard';
import { TriangleCalculator } from './trigonometry/TriangleCalculator';
import { IdentityCalculator } from './trigonometry/IdentityCalculator';
import { EquationCalculator } from './trigonometry/EquationCalculator';
import { GraphCalculator } from './trigonometry/GraphCalculator';

const tools = [
  {
    id: 'triangles',
    name: 'פתרון משולשים',
    icon: Triangle,
    description: 'פתרון משולשים באמצעות טריגונומטריה',
    features: [
      'משפט הסינוסים',
      'משפט הקוסינוסים',
      'שטח משולש'
    ]
  },
  {
    id: 'identities',
    name: 'זהויות טריגונומטריות',
    icon: Circle,
    description: 'המרת ופישוט זהויות טריגונומטריות',
    features: [
      'זהויות בסיסיות',
      'נוסחאות סכום והפרש',
      'נוסחאות כפל'
    ]
  },
  {
    id: 'equations',
    name: 'משוואות טריגונומטריות',
    icon: Compass,
    description: 'פתרון משוואות טריגונומטריות',
    features: [
      'פתרון כללי',
      'פתרון בתחום',
      'שיטות פתרון מתקדמות'
    ]
  },
  {
    id: 'graphs',
    name: 'גרפים טריגונומטריים',
    icon: Ruler,
    description: 'ניתוח וציור גרפים טריגונומטריים',
    features: [
      'תכונות בסיסיות',
      'הזזות ומתיחות',
      'מחזוריות'
    ]
  }
];

export function TrigonometryTools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (selectedTool) {
      case 'triangles':
        return <TriangleCalculator />;
      case 'identities':
        return <IdentityCalculator />;
      case 'equations':
        return <EquationCalculator />;
      case 'graphs':
        return <GraphCalculator />;
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
          <h2 className="text-2xl font-bold mb-6">כלים טריגונומטריים</h2>
          {renderTool()}
        </>
      )}
    </div>
  );
}