import React, { useState } from 'react';
import { Function, Calculator, Binary, Sigma } from 'lucide-react';
import { ToolCard } from './ToolCard';
import { EquationSolver } from './algebra/EquationSolver';
import { PolynomialCalculator } from './algebra/PolynomialCalculator';
import { InequalityCalculator } from './algebra/InequalityCalculator';
import { MatrixCalculator } from './algebra/MatrixCalculator';
import { SequenceCalculator } from './algebra/SequenceCalculator';

const tools = [
  {
    id: 'equations',
    name: 'פתרון משוואות',
    icon: Function,
    description: 'פתרון משוואות מסדר ראשון, שני ומערכות משוואות',
    features: [
      'זיהוי סוג המשוואה',
      'פתרון שלב אחר שלב',
      'בדיקת פתרון אוטומטית'
    ]
  },
  {
    id: 'polynomials',
    name: 'פולינומים',
    icon: Calculator,
    description: 'פירוק לגורמים וחילוק פולינומים',
    features: [
      'פירוק אוטומטי לגורמים',
      'חילוק ארוך',
      'משפט השארית'
    ]
  },
  {
    id: 'inequalities',
    name: 'אי שוויונים',
    icon: Binary,
    description: 'פתרון אי שוויונים מכל הסוגים',
    features: [
      'פתרון גרפי',
      'פתרון אלגברי',
      'תחומי הגדרה'
    ]
  },
  {
    id: 'matrices',
    name: 'מטריצות',
    icon: Calculator,
    description: 'חישובי מטריצות',
    features: [
      'חיבור וכפל מטריצות',
      'דטרמיננטה',
      'מטריצה הפוכה'
    ]
  },
  {
    id: 'sequences',
    name: 'סדרות',
    icon: Sigma,
    description: 'סדרות חשבוניות והנדסיות',
    features: [
      'זיהוי סוג הסדרה',
      'חישוב איבר כללי',
      'חישוב סכום'
    ]
  }
];

export function AlgebraTools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (selectedTool) {
      case 'equations':
        return <EquationSolver />;
      case 'polynomials':
        return <PolynomialCalculator />;
      case 'inequalities':
        return <InequalityCalculator />;
      case 'matrices':
        return <MatrixCalculator />;
      case 'sequences':
        return <SequenceCalculator />;
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
          <h2 className="text-2xl font-bold mb-6">כלים אלגבריים</h2>
          {renderTool()}
        </>
      )}
    </div>
  );
}