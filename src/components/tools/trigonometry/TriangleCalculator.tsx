import React, { useState } from 'react';
import { Triangle } from 'lucide-react';

interface TriangleData {
  // צלעות
  a?: number;
  b?: number;
  c?: number;
  // זוויות (במעלות)
  alpha?: number;
  beta?: number;
  gamma?: number;
}

export function TriangleCalculator() {
  const [data, setData] = useState<TriangleData>({});

  const calculateMissing = () => {
    const results: Partial<TriangleData> = { ...data };
    
    // חישוב זווית שלישית אם יש שתיים
    if (data.alpha !== undefined && data.beta !== undefined && data.gamma === undefined) {
      results.gamma = 180 - data.alpha - data.beta;
    } else if (data.alpha !== undefined && data.gamma !== undefined && data.beta === undefined) {
      results.beta = 180 - data.alpha - data.gamma;
    } else if (data.beta !== undefined && data.gamma !== undefined && data.alpha === undefined) {
      results.alpha = 180 - data.beta - data.gamma;
    }

    // משפט הסינוסים
    if (data.a !== undefined && data.alpha !== undefined) {
      const ratio = data.a / Math.sin(data.alpha * Math.PI / 180);
      if (data.beta !== undefined && data.b === undefined) {
        results.b = ratio * Math.sin(data.beta * Math.PI / 180);
      }
      if (data.gamma !== undefined && data.c === undefined) {
        results.c = ratio * Math.sin(data.gamma * Math.PI / 180);
      }
    }

    // משפט הקוסינוסים
    if (data.b !== undefined && data.c !== undefined && data.alpha !== undefined && data.a === undefined) {
      results.a = Math.sqrt(
        Math.pow(data.b, 2) + Math.pow(data.c, 2) - 
        2 * data.b * data.c * Math.cos(data.alpha * Math.PI / 180)
      );
    }

    return results;
  };

  const calculateArea = () => {
    const { a, b, c, alpha, beta, gamma } = data;
    
    // שטח לפי שתי צלעות וזווית
    if (a !== undefined && b !== undefined && gamma !== undefined) {
      return (a * b * Math.sin(gamma * Math.PI / 180)) / 2;
    }

    // שטח לפי שלוש צלעות (נוסחת הירון)
    if (a !== undefined && b !== undefined && c !== undefined) {
      const s = (a + b + c) / 2;
      return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    return undefined;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Triangle className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">פתרון משולשים</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">צלעות</h4>
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
                  placeholder="אורך"
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
                  placeholder="אורך"
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
                  placeholder="אורך"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">זוויות (במעלות)</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">α</label>
                <input
                  type="number"
                  value={data.alpha || ''}
                  onChange={(e) => setData({
                    ...data,
                    alpha: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="מעלות"
                  min="0"
                  max="180"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">β</label>
                <input
                  type="number"
                  value={data.beta || ''}
                  onChange={(e) => setData({
                    ...data,
                    beta: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="מעלות"
                  min="0"
                  max="180"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">γ</label>
                <input
                  type="number"
                  value={data.gamma || ''}
                  onChange={(e) => setData({
                    ...data,
                    gamma: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="מעלות"
                  min="0"
                  max="180"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאות החישוב</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-4">
            <div className="space-y-3">
              <h5 className="text-sm text-slate-400">ערכים מחושבים</h5>
              {Object.entries(calculateMissing()).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-slate-400">
                    {key === 'a' && 'צלע a'}
                    {key === 'b' && 'צלע b'}
                    {key === 'c' && 'צלע c'}
                    {key === 'alpha' && 'זווית α'}
                    {key === 'beta' && 'זווית β'}
                    {key === 'gamma' && 'זווית γ'}
                  </span>
                  <span className="text-blue-400 font-medium">
                    {value?.toFixed(2)} {key.includes('alpha') || key.includes('beta') || key.includes('gamma') ? '°' : ''}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">שטח המשולש</span>
                <span className="text-blue-400 font-medium">
                  {calculateArea()?.toFixed(2) || '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}