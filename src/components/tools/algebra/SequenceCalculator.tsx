import React, { useState } from 'react';
import { Sigma } from 'lucide-react';

type SequenceType = 'arithmetic' | 'geometric';

interface SequenceData {
  type: SequenceType;
  firstTerm?: number;
  difference?: number; // הפרש בסדרה חשבונית
  ratio?: number; // מנה בסדרה הנדסית
  n?: number; // מספר איברים
}

export function SequenceCalculator() {
  const [data, setData] = useState<SequenceData>({
    type: 'arithmetic'
  });

  const calculateNthTerm = (n: number) => {
    if (!data.firstTerm) return null;

    if (data.type === 'arithmetic' && data.difference !== undefined) {
      return data.firstTerm + (n - 1) * data.difference;
    }

    if (data.type === 'geometric' && data.ratio !== undefined) {
      return data.firstTerm * Math.pow(data.ratio, n - 1);
    }

    return null;
  };

  const calculateSum = () => {
    if (!data.firstTerm || !data.n) return null;

    if (data.type === 'arithmetic' && data.difference !== undefined) {
      const lastTerm = calculateNthTerm(data.n);
      return (data.n * (data.firstTerm + lastTerm!)) / 2;
    }

    if (data.type === 'geometric' && data.ratio !== undefined) {
      if (data.ratio === 1) {
        return data.firstTerm * data.n;
      }
      return data.firstTerm * (1 - Math.pow(data.ratio, data.n)) / (1 - data.ratio);
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sigma className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">מחשבון סדרות</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">סוג הסדרה</label>
            <select
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value as SequenceType })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="arithmetic">חשבונית</option>
              <option value="geometric">הנדסית</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">איבר ראשון (a₁)</label>
            <input
              type="number"
              value={data.firstTerm || ''}
              onChange={(e) => setData({
                ...data,
                firstTerm: e.target.value ? Number(e.target.value) : undefined
              })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
              placeholder="איבר ראשון"
            />
          </div>

          {data.type === 'arithmetic' ? (
            <div className="space-y-2">
              <label className="text-sm text-slate-400">הפרש (d)</label>
              <input
                type="number"
                value={data.difference || ''}
                onChange={(e) => setData({
                  ...data,
                  difference: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="הפרש"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm text-slate-400">מנה (q)</label>
              <input
                type="number"
                value={data.ratio || ''}
                onChange={(e) => setData({
                  ...data,
                  ratio: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="מנה"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-slate-400">מספר איברים (n)</label>
            <input
              type="number"
              value={data.n || ''}
              onChange={(e) => setData({
                ...data,
                n: e.target.value ? Number(e.target.value) : undefined
              })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
              placeholder="מספר איברים"
              min="1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאות</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <div className="text-slate-400">נוסחת האיבר הכללי:</div>
              <div className="text-blue-400">
                {data.type === 'arithmetic' ? (
                  <>aₙ = {data.firstTerm} + (n-1)·{data.difference}</>
                ) : (
                  <>aₙ = {data.firstTerm}·{data.ratio}ⁿ⁻¹</>
                )}
              </div>
            </div>

            {data.n && (
              <div className="space-y-2">
                <div className="text-slate-400">האיבר ה-n:</div>
                <div className="text-blue-400">
                  a₍{data.n}₎ = {calculateNthTerm(data.n)?.toFixed(2)}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-slate-400">סכום האיברים:</div>
              <div className="text-blue-400">
                Sₙ = {calculateSum()?.toFixed(2)}
              </div>
            </div>

            {data.n && data.n <= 10 && (
              <div className="space-y-2">
                <div className="text-slate-400">איברי הסדרה:</div>
                <div className="text-blue-400 flex flex-wrap gap-2">
                  {Array.from({ length: data.n }, (_, i) => (
                    <span key={i}>
                      {calculateNthTerm(i + 1)?.toFixed(2)}
                      {i < data.n - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}