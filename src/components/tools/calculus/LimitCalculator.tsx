import React, { useState } from 'react';
import { ArrowRightCircle } from 'lucide-react';

type LimitType = 'direct' | 'infinity' | 'zero';

interface LimitData {
  type: LimitType;
  numerator: string;
  denominator: string;
  point?: number;
  direction?: 'left' | 'right' | 'both';
}

export function LimitCalculator() {
  const [data, setData] = useState<LimitData>({
    type: 'direct',
    numerator: '',
    denominator: '1'
  });

  const calculateLimit = () => {
    // TODO: Implement actual limit calculation logic
    return {
      exists: true,
      value: 0,
      leftLimit: 0,
      rightLimit: 0,
      indeterminate: false
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ArrowRightCircle className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">מחשבון גבולות</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">סוג הגבול</label>
            <select
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value as LimitType })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="direct">גבול רגיל</option>
              <option value="infinity">גבול באינסוף</option>
              <option value="zero">גבול באפס</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">מונה</label>
            <input
              type="text"
              value={data.numerator}
              onChange={(e) => setData({ ...data, numerator: e.target.value })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
              placeholder="למשל: x^2 + 2x + 1"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">מכנה</label>
            <input
              type="text"
              value={data.denominator}
              onChange={(e) => setData({ ...data, denominator: e.target.value })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
              placeholder="למשל: x + 1"
            />
          </div>

          {data.type === 'direct' && (
            <div className="space-y-2">
              <label className="text-sm text-slate-400">נקודת הגבול</label>
              <input
                type="number"
                value={data.point || ''}
                onChange={(e) => setData({
                  ...data,
                  point: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="x →"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-slate-400">כיוון</label>
            <select
              value={data.direction || 'both'}
              onChange={(e) => setData({
                ...data,
                direction: e.target.value as 'left' | 'right' | 'both'
              })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="both">משני הכיוונים</option>
              <option value="left">משמאל</option>
              <option value="right">מימין</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאות</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-3">
            <div className="text-slate-300">
              {`lim`}
              {data.type === 'infinity' ? '_{x→∞}' : data.type === 'zero' ? '_{x→0}' : `_{x→${data.point}}`}
              {` `}
              {data.direction === 'left' ? '⁻' : data.direction === 'right' ? '⁺' : ''}
              {` `}
              {data.numerator || 'x'}
              {data.denominator !== '1' && ` / (${data.denominator})`}
            </div>

            <div className="space-y-2">
              <div className="text-slate-400">גבול משמאל:</div>
              <div className="text-blue-400">
                {calculateLimit().leftLimit}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-slate-400">גבול מימין:</div>
              <div className="text-blue-400">
                {calculateLimit().rightLimit}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-slate-400">גבול:</div>
              <div className="text-blue-400">
                {calculateLimit().exists ? calculateLimit().value : 'לא קיים'}
              </div>
            </div>

            {calculateLimit().indeterminate && (
              <div className="text-yellow-400 mt-2">
                צורה לא מוגדרת - נדרשת הצבה או כלל לופיטל
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}