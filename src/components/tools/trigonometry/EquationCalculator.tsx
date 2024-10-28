import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

type EquationType = 'basic' | 'quadratic' | 'combined';

interface EquationData {
  type: EquationType;
  // משוואה בסיסית: asin(x) + b = c או acos(x) + b = c
  a?: number;
  b?: number;
  c?: number;
  func: 'sin' | 'cos' | 'tan';
  // טווח פתרון
  start?: number;
  end?: number;
}

export function EquationCalculator() {
  const [data, setData] = useState<EquationData>({
    type: 'basic',
    func: 'sin'
  });

  const solveBasic = () => {
    const { a, b, c, func } = data;
    if (a === undefined || b === undefined || c === undefined) return null;

    const y = (c - b) / a;
    
    if (Math.abs(y) > 1 && (func === 'sin' || func === 'cos')) {
      return { type: 'no-solution' };
    }

    let solutions: number[] = [];
    const baseAngle = func === 'sin' 
      ? Math.asin(y)
      : func === 'cos'
        ? Math.acos(y)
        : Math.atan(y);

    if (func === 'sin' || func === 'cos') {
      solutions.push(baseAngle * 180 / Math.PI);
      
      if (func === 'sin') {
        solutions.push((Math.PI - baseAngle) * 180 / Math.PI);
      } else {
        solutions.push(-baseAngle * 180 / Math.PI);
      }
    } else {
      solutions.push(baseAngle * 180 / Math.PI);
    }

    return { type: 'solution', angles: solutions };
  };

  const findSolutionsInRange = () => {
    const { start, end } = data;
    if (start === undefined || end === undefined) return null;

    const solution = solveBasic();
    if (!solution || solution.type === 'no-solution') return solution;

    const { angles } = solution;
    const period = data.func === 'tan' ? 180 : 360;
    let rangeAngles: number[] = [];

    for (let angle of angles) {
      while (angle < start) angle += period;
      while (angle > end) angle -= period;
      
      let currentAngle = angle;
      while (currentAngle <= end) {
        if (currentAngle >= start) {
          rangeAngles.push(currentAngle);
        }
        currentAngle += period;
      }
    }

    return { type: 'solution', angles: rangeAngles.sort((a, b) => a - b) };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calculator className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">משוואות טריגונומטריות</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">סוג המשוואה</label>
            <select
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value as EquationType })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="basic">בסיסית</option>
              <option value="quadratic">ריבועית</option>
              <option value="combined">משולבת</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">פונקציה</label>
            <select
              value={data.func}
              onChange={(e) => setData({ ...data, func: e.target.value as 'sin' | 'cos' | 'tan' })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="sin">sin</option>
              <option value="cos">cos</option>
              <option value="tan">tan</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">a</label>
              <input
                type="number"
                value={data.a || ''}
                onChange={(e) => setData({
                  ...data,
                  a: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="a"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">b</label>
              <input
                type="number"
                value={data.b || ''}
                onChange={(e) => setData({
                  ...data,
                  b: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="b"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">c</label>
              <input
                type="number"
                value={data.c || ''}
                onChange={(e) => setData({
                  ...data,
                  c: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="c"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">התחלת טווח (מעלות)</label>
              <input
                type="number"
                value={data.start || ''}
                onChange={(e) => setData({
                  ...data,
                  start: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="התחלה"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">סוף טווח (מעלות)</label>
              <input
                type="number"
                value={data.end || ''}
                onChange={(e) => setData({
                  ...data,
                  end: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="סוף"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">פתרון</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-4">
            <div className="text-slate-300">
              {data.a !== undefined && data.b !== undefined && data.c !== undefined && (
                <>
                  {data.a}{data.func}(x) {data.b >= 0 ? '+' : ''}{data.b} = {data.c}
                </>
              )}
            </div>
            
            {(() => {
              const solution = findSolutionsInRange();
              if (!solution) {
                return (
                  <div className="text-slate-400">
                    הזן את נתוני המשוואה
                  </div>
                );
              }

              if (solution.type === 'no-solution') {
                return (
                  <div className="text-blue-400">
                    אין פתרונות
                  </div>
                );
              }

              return (
                <div className="space-y-2">
                  <div className="text-slate-400">פתרונות בטווח הנתון:</div>
                  <div className="text-blue-400">
                    {solution.angles.map((angle, index) => (
                      <span key={index}>
                        {angle.toFixed(1)}°
                        {index < solution.angles.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}