import React, { useState } from 'react';
import { Ruler } from 'lucide-react';
import { Graph } from '../../Graph';

type GraphData = {
  func: 'sin' | 'cos' | 'tan';
  a?: number;
  b?: number;
  c?: number;
  d?: number;
  start?: number;
  end?: number;
};

export function GraphCalculator() {
  const [data, setData] = useState<GraphData>({
    func: 'sin',
    a: 1,
    b: 1,
    c: 0,
    d: 0,
    start: -360,
    end: 360
  });

  const generateFunction = () => {
    const { func, a = 1, b = 1, c = 0, d = 0 } = data;
    const rad = 'Math.PI/180';
    return `${a}*Math.${func}(${b}*(x*${rad}${c ? ` - ${c}*${rad}` : ''}))+${d}`;
  };

  const getProperties = () => {
    const { func, a = 1, b = 1, c = 0, d = 0 } = data;
    
    return {
      period: func === 'tan' ? 180 / Math.abs(b) : 360 / Math.abs(b),
      amplitude: func === 'tan' ? undefined : Math.abs(a),
      phaseShift: c,
      verticalShift: d,
      maxValue: func === 'tan' ? undefined : a + d,
      minValue: func === 'tan' ? undefined : -a + d
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Ruler className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">גרפים טריגונומטריים</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">a (משרעת)</label>
              <input
                type="number"
                value={data.a}
                onChange={(e) => setData({
                  ...data,
                  a: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="משרעת"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">b (תדירות)</label>
              <input
                type="number"
                value={data.b}
                onChange={(e) => setData({
                  ...data,
                  b: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="תדירות"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">c (הזזה אופקית)</label>
              <input
                type="number"
                value={data.c}
                onChange={(e) => setData({
                  ...data,
                  c: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="הזזה אופקית"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">d (הזזה אנכית)</label>
              <input
                type="number"
                value={data.d}
                onChange={(e) => setData({
                  ...data,
                  d: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="הזזה אנכית"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">התחלת טווח (מעלות)</label>
              <input
                type="number"
                value={data.start}
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
                value={data.end}
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
          <h4 className="font-medium">תכונות הפונקציה</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-4">
            <div className="text-slate-300">
              f(x) = {data.a}{data.func}({data.b}(x{data.c && data.c !== 0 ? ` - ${data.c}` : ''}))
              {data.d && data.d !== 0 ? ` + ${data.d}` : ''}
            </div>
            
            {(() => {
              const properties = getProperties();
              return (
                <div className="space-y-3">
                  {Object.entries(properties).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-slate-400">
                        {key === 'period' && 'מחזור'}
                        {key === 'amplitude' && 'משרעת'}
                        {key === 'phaseShift' && 'הזזה אופקית'}
                        {key === 'verticalShift' && 'הזזה אנכית'}
                        {key === 'maxValue' && 'ערך מקסימלי'}
                        {key === 'minValue' && 'ערך מינימלי'}
                      </span>
                      <span className="text-blue-400 font-medium">
                        {value !== undefined ? value.toFixed(2) : '-'}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })()}

            <div className="mt-4">
              <Graph
                fn={generateFunction()}
                xAxis={{ domain: [data.start || -360, data.end || 360] }}
                yAxis={{ domain: [-2, 2] }}
                title="גרף הפונקציה"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}