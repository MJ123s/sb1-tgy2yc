import React, { useState } from 'react';
import { LineChart } from 'lucide-react';
import { MathFormula } from '../../MathFormula';
import { Graph } from '../../Graph';

interface Term {
  coefficient: number;
  power: number;
}

export function DerivativeCalculator() {
  const [data, setData] = useState<{ terms: Term[] }>({
    terms: [{ coefficient: 0, power: 0 }]
  });

  const addTerm = () => {
    setData({
      ...data,
      terms: [...data.terms, { coefficient: 0, power: 0 }]
    });
  };

  const removeTerm = (index: number) => {
    setData({
      ...data,
      terms: data.terms.filter((_, i) => i !== index)
    });
  };

  const updateTerm = (index: number, field: keyof Term, value: number) => {
    const newTerms = [...data.terms];
    newTerms[index] = { ...newTerms[index], [field]: value };
    setData({ ...data, terms: newTerms });
  };

  const calculateDerivative = () => {
    return data.terms.map(term => ({
      coefficient: term.coefficient * term.power,
      power: Math.max(0, term.power - 1)
    })).filter(term => term.coefficient !== 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <LineChart className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">מחשבון נגזרות</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">הפונקציה</h4>
            <button
              onClick={addTerm}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              + הוסף איבר
            </button>
          </div>

          {data.terms.map((term, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">מקדם</label>
                <input
                  type="number"
                  value={term.coefficient}
                  onChange={(e) => updateTerm(index, 'coefficient', Number(e.target.value))}
                  className="w-24 bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">חזקה</label>
                <input
                  type="number"
                  value={term.power}
                  onChange={(e) => updateTerm(index, 'power', Number(e.target.value))}
                  className="w-24 bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  min="0"
                />
              </div>
              {data.terms.length > 1 && (
                <button
                  onClick={() => removeTerm(index)}
                  className="text-slate-400 hover:text-slate-300 mb-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאות</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <div className="text-slate-400">הפונקציה המקורית:</div>
              <div className="text-blue-400">
                <MathFormula 
                  formula={`f(x) = ${data.terms
                    .map(term => `${term.coefficient}x^{${term.power}}`)
                    .join('+')}`} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-slate-400">הנגזרת:</div>
              <div className="text-blue-400">
                <MathFormula 
                  formula={`f'(x) = ${calculateDerivative()
                    .map(term => `${term.coefficient}x^{${term.power}}`)
                    .join('+')}`} 
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">גרף הפונקציה והנגזרת</h4>
              <div className="grid grid-cols-2 gap-4">
                <Graph
                  fn={data.terms.map(term => `${term.coefficient}*x^${term.power}`).join('+')}
                  title="הפונקציה המקורית"
                />
                <Graph
                  fn={calculateDerivative().map(term => `${term.coefficient}*x^${term.power}`).join('+')}
                  title="הנגזרת"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}