import React, { useState } from 'react';
import { PlusSquare } from 'lucide-react';

interface Term {
  coefficient: number;
  power: number;
}

interface PolynomialData {
  terms: Term[];
  divisor?: Term[];
}

export function PolynomialCalculator() {
  const [data, setData] = useState<PolynomialData>({
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

  const factorize = () => {
    // TODO: Implement polynomial factorization
    return "טרם מומש";
  };

  const findRoots = () => {
    // TODO: Implement root finding
    return "טרם מומש";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <PlusSquare className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">מחשבון פולינומים</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">הפולינום</h4>
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
              <div className="text-slate-400">פירוק לגורמים:</div>
              <div className="text-blue-400">{factorize()}</div>
            </div>

            <div className="space-y-2">
              <div className="text-slate-400">שורשים:</div>
              <div className="text-blue-400">{findRoots()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}