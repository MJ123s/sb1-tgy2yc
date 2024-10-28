import React, { useState } from 'react';
import { Triangle, Circle, Square, Ruler } from 'lucide-react';
import { ToolCard } from './ToolCard';
import { CongruenceCalculator } from './geometry/CongruenceCalculator';
import { CircleCalculator } from './geometry/CircleCalculator';
import { AreaCalculator } from './geometry/AreaCalculator';
import { SpaceGeometry } from './geometry/SpaceGeometry';

const tools = [
  {
    id: 'congruence',
    name: 'משפטי חפיפה',
    icon: Triangle,
    description: 'כלים לעבודה עם משפטי חפיפת משולשים',
    features: [
      'זיהוי משפט חפיפה מתאים',
      'שרטוט אינטראקטיבי',
      'הדגשת נתונים חסרים'
    ]
  },
  {
    id: 'circles',
    name: 'מעגל ומשיקים',
    icon: Circle,
    description: 'כלים לעבודה עם מעגלים ומשיקים',
    features: [
      'חישוב זוויות אוטומטי',
      'יחסי קטעים במעגל',
      'מציאת מרכז ורדיוס'
    ]
  },
  {
    id: 'areas',
    name: 'חישובי שטחים',
    icon: Square,
    description: 'חישוב שטחים של צורות גיאומטריות',
    features: [
      'נוסחאות דינמיות',
      'משפט הירון',
      'חישוב אוטומטי'
    ]
  },
  {
    id: 'space',
    name: 'גיאומטריה במרחב',
    icon: Ruler,
    description: 'כלים לעבודה עם גופים במרחב',
    features: [
      'חישוב נפחים',
      'חישוב שטח פנים',
      'הדמיה תלת-ממדית'
    ]
  }
];

export function GeometryTools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (selectedTool) {
      case 'congruence':
        return <CongruenceCalculator />;
      case 'circles':
        return <CircleCalculator />;
      case 'areas':
        return <AreaCalculator />;
      case 'space':
        return <SpaceGeometry />;
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
          <h2 className="text-2xl font-bold mb-6">כלים גיאומטריים</h2>
          {renderTool()}
        </>
      )}
    </div>
  );
}