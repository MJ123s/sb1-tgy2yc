import React, { useState } from 'react';
import { Binary } from 'lucide-react';

type InequalityType = 'linear' | 'quadratic' | 'rational' | 'absolute';

interface InequalityData {
  type: InequalityType;
  // ax + b > 0
  a?: number;
  b?: number;
  // ax² + bx + c > 0
  c?: number;
  // (ax + b)/(cx + d) > 0
  d?: number;
  // |ax + b| > c
  sign: '>' | '<' | '>=' | '<=';
}

export function InequalityCalculator() {
  const [data, setData] = useState<InequalityData>({
    type: 'linear',
    sign: '>'
  });

  const solveLinear = () => {
    const { a, b, sign } = data;
    if (a === undefined || b === undefined) return null;

    const solution = -b / a;
    
    if (a > 0) {
      return sign === '>' || sign === '>=' 
        ? `x ${sign} ${solution.toFixed(2)}`
        : `x ${sign} ${solution.toFixed(2)}`;
    } else {
      return sign === '>' || sign === '>=' 
        ? `x ${sign === '>' ? '<' : '<='} ${solution.toFixed(2)}`
        : `x ${sign === '<' ? '>' : '>='} ${solution.toFixed(2)}`;
    }
  };

  const solveQuadratic = () => {
    const { a, b, c, sign } = data;
    if (a === undefined || b === undefined || c === undefined) return null;

    const discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) {
      return a > 0 ? 'כל x' : 'אין פתרון';
    }
    
    const x1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    
    if (a > 0) {
      return sign === '>' || sign === '>='
        ? `x ${sign === '>' ? '<' : '<='} ${x1.toFixed(2)} או x ${sign} ${x2.toFixed(2)}`
        : `${x1.toFixed(2)} ${sign} x ${sign} ${x2.toFixed(2)}`;
    } else {
      return sign === '>' || sign === '>='
        ? `${x1.toFixed(2)} ${sign} x ${sign} ${x2.toFixed(2)}`
        : `x ${sign === '<' ? '>' : '>='} ${x1.toFixed(2)} או x ${sign} ${x2.toFixed(2)}`;
    }
  };

  const solveRational = () => {
    const { a, b, c, d, sign } = data;
    if (a === undefined || b === undefined || c === undefined || d === undefined) return null;

    const x1 = -b / a;
    const x2 = -d / c;
    
    return `x ≠ ${x2.toFixed(2)} ו-${solveLinear()}`;
  };

  const solveAbsolute = () => {
    const { a, b, c, sign } = data;
    if (a === undefined || b === undefined || c === undefined) return null;

    const solution = -b / a;
    
    if (sign === '>' || sign === '>=') {
      return `x ${sign === '>' ? '<' : '<='} ${(solution - c/a).toFixed(2)} או x ${sign === '>' ? '>' : '>='} ${(solution + c/a).toFixed(2)}`;
    } else {
      return `${(solution - c/a).toFixed(2)} ${sign} x ${sign} ${(solution + c/a).toFixed(2)}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Binary className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">פתרון אי-שוויונים</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">סוג האי-שוויון</label>
            <select
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value as InequalityType })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="linear">ליניארי</option>
              <option value="quadratic">ריבועי</option>
              <option value="rational">רציונלי</option>
              <option value="absolute">ערך מוחלט</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">סימן האי-שוויון</label>
            <select
              value={data.sign}
              onChange={(e) => setData({ ...data, sign: e.target.value as '>' | '<' | '>=' | '<=' })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
              <option value=">=">{'>='}</option>
              <option value="<=">{'<='}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {(data.type === 'quadratic' || data.type === 'rational') && (
            <div className="grid grid-cols-2 gap-4">
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
              {data.type === 'rational' && (
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">d</label>
                  <input
                    type="number"
                    value={data.d || ''}
                    onChange={(e) => setData({
                      ...data,
                      d: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="d"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">פתרון</h4>
          <div className="bg-slate-800/40 rounded-lg p-4">
            <div className="text-slate-300 mb-4">
              {data.type === 'linear' && `${data.a || ''}x ${data.b && data.b >= 0 ? '+' : ''}${data.b || ''} ${data.sign} 0`}
              {data.type === 'quadratic' && `${data.a || ''}x² ${data.b && data.b >= 0 ? '+' : ''}${data.b || ''}x ${data.c && data.c >= 0 ? '+' : ''}${data.c || ''} ${data.sign} 0`}
              {data.type === 'rational' && `(${data.a || ''}x ${data.b && data.b >= 0 ? '+' : ''}${data.b || ''})/(${data.c || ''}x ${data.d && data.d >= 0 ? '+' : ''}${data.d || ''}) ${data.sign} 0`}
              {data.type === 'absolute' && `|${data.a || ''}x ${data.b && data.b >= 0 ? '+' : ''}${data.b || ''}| ${data.sign} ${data.c || ''}`}
            </div>
            <div className="text-blue-400 font-medium">
              {(() => {
                switch (data.type) {
                  case 'linear':
                    return solveLinear() || 'הזן מקדמים';
                  case 'quadratic':
                    return solveQuadratic() || 'הזן מקדמים';
                  case 'rational':
                    return solveRational() || 'הזן מקדמים';
                  case 'absolute':
                    return solveAbsolute() || 'הזן מקדמים';
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}