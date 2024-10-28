import React, { useState } from 'react';
import { Circle } from 'lucide-react';

type IdentityType = 'basic' | 'sum' | 'double' | 'half';

interface IdentityData {
  type: IdentityType;
  angle1?: number;
  angle2?: number;
}

export function IdentityCalculator() {
  const [data, setData] = useState<IdentityData>({
    type: 'basic'
  });

  const calculateBasic = (angle: number) => {
    const rad = angle * Math.PI / 180;
    return {
      sin: Math.sin(rad),
      cos: Math.cos(rad),
      tan: Math.tan(rad),
      cot: 1 / Math.tan(rad),
      sec: 1 / Math.cos(rad),
      csc: 1 / Math.sin(rad)
    };
  };

  const calculateSum = (angle1: number, angle2: number) => {
    const rad1 = angle1 * Math.PI / 180;
    const rad2 = angle2 * Math.PI / 180;
    
    return {
      sinSum: Math.sin(rad1) * Math.cos(rad2) + Math.cos(rad1) * Math.sin(rad2),
      sinDiff: Math.sin(rad1) * Math.cos(rad2) - Math.cos(rad1) * Math.sin(rad2),
      cosSum: Math.cos(rad1) * Math.cos(rad2) - Math.sin(rad1) * Math.sin(rad2),
      cosDiff: Math.cos(rad1) * Math.cos(rad2) + Math.sin(rad1) * Math.sin(rad2),
      tanSum: (Math.tan(rad1) + Math.tan(rad2)) / (1 - Math.tan(rad1) * Math.tan(rad2)),
      tanDiff: (Math.tan(rad1) - Math.tan(rad2)) / (1 + Math.tan(rad1) * Math.tan(rad2))
    };
  };

  const calculateDouble = (angle: number) => {
    const rad = angle * Math.PI / 180;
    return {
      sin2: 2 * Math.sin(rad) * Math.cos(rad),
      cos2: Math.cos(rad) * Math.cos(rad) - Math.sin(rad) * Math.sin(rad),
      tan2: (2 * Math.tan(rad)) / (1 - Math.tan(rad) * Math.tan(rad))
    };
  };

  const calculateHalf = (angle: number) => {
    const rad = angle * Math.PI / 180;
    return {
      sin2: Math.sqrt((1 - Math.cos(rad)) / 2),
      cos2: Math.sqrt((1 + Math.cos(rad)) / 2),
      tan2: Math.sqrt((1 - Math.cos(rad)) / (1 + Math.cos(rad)))
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Circle className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">זהויות טריגונומטריות</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">סוג הזהות</label>
            <select
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value as IdentityType })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="basic">פונקציות בסיסיות</option>
              <option value="sum">סכום והפרש זוויות</option>
              <option value="double">זווית כפולה</option>
              <option value="half">חצי זווית</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">זווית (במעלות)</label>
              <input
                type="number"
                value={data.angle1 || ''}
                onChange={(e) => setData({
                  ...data,
                  angle1: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="זווית"
              />
            </div>

            {data.type === 'sum' && (
              <div className="space-y-2">
                <label className="text-sm text-slate-400">זווית שנייה (במעלות)</label>
                <input
                  type="number"
                  value={data.angle2 || ''}
                  onChange={(e) => setData({
                    ...data,
                    angle2: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="זווית"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאות</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-3">
            {data.angle1 !== undefined && (
              <>
                {data.type === 'basic' && (
                  <>
                    {Object.entries(calculateBasic(data.angle1)).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-slate-400">{key}</span>
                        <span className="text-blue-400 font-medium">{value.toFixed(4)}</span>
                      </div>
                    ))}
                  </>
                )}

                {data.type === 'sum' && data.angle2 !== undefined && (
                  <>
                    {Object.entries(calculateSum(data.angle1, data.angle2)).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-slate-400">
                          {key === 'sinSum' && 'sin(α+β)'}
                          {key === 'sinDiff' && 'sin(α-β)'}
                          {key === 'cosSum' && 'cos(α+β)'}
                          {key === 'cosDiff' && 'cos(α-β)'}
                          {key === 'tanSum' && 'tan(α+β)'}
                          {key === 'tanDiff' && 'tan(α-β)'}
                        </span>
                        <span className="text-blue-400 font-medium">{value.toFixed(4)}</span>
                      </div>
                    ))}
                  </>
                )}

                {data.type === 'double' && (
                  <>
                    {Object.entries(calculateDouble(data.angle1)).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-slate-400">
                          {key === 'sin2' && 'sin(2α)'}
                          {key === 'cos2' && 'cos(2α)'}
                          {key === 'tan2' && 'tan(2α)'}
                        </span>
                        <span className="text-blue-400 font-medium">{value.toFixed(4)}</span>
                      </div>
                    ))}
                  </>
                )}

                {data.type === 'half' && (
                  <>
                    {Object.entries(calculateHalf(data.angle1)).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-slate-400">
                          {key === 'sin2' && 'sin(α/2)'}
                          {key === 'cos2' && 'cos(α/2)'}
                          {key === 'tan2' && 'tan(α/2)'}
                        </span>
                        <span className="text-blue-400 font-medium">{value.toFixed(4)}</span>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}