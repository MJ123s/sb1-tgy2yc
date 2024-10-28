import React, { useState } from 'react';
import { LineChart } from 'lucide-react';
import { MathFormula } from '../../MathFormula';
import { Graph } from '../../Graph';

interface Term {
  coefficient: number;
  power: number;
}

interface OptimizationData {
  terms: Term[];
  domain: {
    start?: number;
    end?: number;
  };
}

export function OptimizationCalculator() {
  const [data, setData] = useState<OptimizationData>({
    terms: [{ coefficient: 0, power: 0 }],
    domain: {}
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

  const findExtrema = () => {
    return {
      maxima: [],
      minima: [],
      inflectionPoints: []
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <LineChart className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">בעיות קיצון</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">פונקציית המטרה</h4>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">תחילת תחום</label>
              <input
                type="number"
                value={data.domain.start || ''}
                onChange={(e) => setData({
                  ...data,
                  domain: {
                    ...data.domain,
                    start: e.target.value ? Number(e.target.value) : undefined
                  }
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">סוף תחום</label>
              <input
                type="number"
                value={data.domain.end || ''}
                onChange={(e) => setData({
                  ...data,
                  domain: {
                    ...data.domain,
                    end: e.target.value ? Number(e.target.value) : undefined
                  }
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאות</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <div className="text-slate-400">הפונקציה:</div>
              <div className="text-blue-400">
                <MathFormula 
                  formula={`f(x) = ${data.terms
                    .map(term => `${term.coefficient}x^{${term.power}}`)
                    .join('+')}`} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-slate-400">נקודות קיצון:</div>
              <div className="text-blue-400">
                {(() => {
                  const extrema = findExtrema();
                  if (extrema.maxima.length === 0 && extrema.minima.length === 0) {
                    return 'אין נקודות קיצון בתחום';
                  }
                  return (
                    <div className="space-y-1">
                      {extrema.maxima.map((point, i) => (
                        <div key={`max-${i}`}>
                          מקסימום: ({point.x}, {point.y})
                        </div>
                      ))}
                      {extrema.minima.map((point, i) => (
                        <div key={`min-${i}`}>
                          מינימום: ({point.x}, {point.y})
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="mt-4">
              <Graph
                fn={data.terms.map(term => `${term.coefficient}*x^${term.power}`).join('+')}
                xAxis={{ domain: [data.domain.start || -10, data.domain.end || 10] }}
                title="גרף הפונקציה"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}