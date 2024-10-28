import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

type EquationType = 'quadratic' | 'linear-system' | 'rational';

interface EquationData {
  type: EquationType;
  // משוואה ריבועית: ax² + bx + c = 0
  a?: number;
  b?: number;
  c?: number;
  // מערכת משוואות: ax + by = c, dx + ey = f
  a1?: number;
  b1?: number;
  c1?: number;
  a2?: number;
  b2?: number;
  c2?: number;
  // משוואה רציונלית
  numerator?: string;
  denominator?: string;
}

export function EquationSolver() {
  const [data, setData] = useState<EquationData>({
    type: 'quadratic'
  });

  const solveQuadratic = () => {
    const { a, b, c } = data;
    if (a === undefined || b === undefined || c === undefined) return null;

    const discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) {
      return { type: 'complex' as const };
    }
    
    const x1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    
    return {
      type: 'real' as const,
      x1,
      x2: discriminant === 0 ? null : x2
    };
  };

  const solveLinearSystem = () => {
    const { a1, b1, c1, a2, b2, c2 } = data;
    if (!a1 || !b1 || c1 === undefined || !a2 || !b2 || c2 === undefined) return null;

    const determinant = a1 * b2 - a2 * b1;
    
    if (determinant === 0) {
      return { type: 'no-solution' as const };
    }
    
    const x = (c1 * b2 - c2 * b1) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;
    
    return { type: 'solution' as const, x, y };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calculator className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">פתרון משוואות</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">סוג המשוואה</label>
            <select
              value={data.type}
              onChange={(e) => setData({ type: e.target.value as EquationType })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="quadratic">ריבועית</option>
              <option value="linear-system">מערכת משוואות</option>
              <option value="rational">רציונלית</option>
            </select>
          </div>

          {data.type === 'quadratic' && (
            <div className="space-y-4">
              <div className="text-sm text-slate-400">ax² + bx + c = 0</div>
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
            </div>
          )}

          {data.type === 'linear-system' && (
            <div className="space-y-4">
              <div className="text-sm text-slate-400">
                a₁x + b₁y = c₁
                <br />
                a₂x + b₂y = c₂
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">a₁</label>
                  <input
                    type="number"
                    value={data.a1 || ''}
                    onChange={(e) => setData({
                      ...data,
                      a1: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="a₁"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">b₁</label>
                  <input
                    type="number"
                    value={data.b1 || ''}
                    onChange={(e) => setData({
                      ...data,
                      b1: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="b₁"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">c₁</label>
                  <input
                    type="number"
                    value={data.c1 || ''}
                    onChange={(e) => setData({
                      ...data,
                      c1: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="c₁"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">a₂</label>
                  <input
                    type="number"
                    value={data.a2 || ''}
                    onChange={(e) => setData({
                      ...data,
                      a2: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="a₂"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">b₂</label>
                  <input
                    type="number"
                    value={data.b2 || ''}
                    onChange={(e) => setData({
                      ...data,
                      b2: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="b₂"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">c₂</label>
                  <input
                    type="number"
                    value={data.c2 || ''}
                    onChange={(e) => setData({
                      ...data,
                      c2: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="c₂"
                  />
                </div>
              </div>
            </div>
          )}

          {data.type === 'rational' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">מונה</label>
                <input
                  type="text"
                  value={data.numerator || ''}
                  onChange={(e) => setData({
                    ...data,
                    numerator: e.target.value
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="למשל: x^2 + 2x + 1"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">מכנה</label>
                <input
                  type="text"
                  value={data.denominator || ''}
                  onChange={(e) => setData({
                    ...data,
                    denominator: e.target.value
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="למשל: x + 1"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">פתרון</h4>
          <div className="bg-slate-800/40 rounded-lg p-4">
            {data.type === 'quadratic' && (() => {
              const solution = solveQuadratic();
              if (!solution) {
                return <div className="text-slate-400">הזן את מקדמי המשוואה</div>;
              }
              
              if (solution.type === 'complex') {
                return <div className="text-blue-400">אין פתרונות ממשיים</div>;
              }
              
              return (
                <div className="space-y-2">
                  <div className="text-blue-400">
                    x₁ = {solution.x1.toFixed(4)}
                  </div>
                  {solution.x2 !== null && (
                    <div className="text-blue-400">
                      x₂ = {solution.x2.toFixed(4)}
                    </div>
                  )}
                </div>
              );
            })()}

            {data.type === 'linear-system' && (() => {
              const solution = solveLinearSystem();
              if (!solution) {
                return <div className="text-slate-400">הזן את מקדמי המערכת</div>;
              }
              
              if (solution.type === 'no-solution') {
                return <div className="text-blue-400">אין פתרון יחיד</div>;
              }
              
              return (
                <div className="space-y-2">
                  <div className="text-blue-400">
                    x = {solution.x.toFixed(4)}
                  </div>
                  <div className="text-blue-400">
                    y = {solution.y.toFixed(4)}
                  </div>
                </div>
              );
            })()}

            {data.type === 'rational' && (
              <div className="text-slate-400">
                פתרון משוואות רציונליות יתווסף בקרוב
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}