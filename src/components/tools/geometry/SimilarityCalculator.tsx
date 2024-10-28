import React, { useState } from 'react';
import { Ruler } from 'lucide-react';

interface SimilarityData {
  // יחס דמיון
  ratio?: number;
  // צלעות משולש ראשון
  triangle1Sides?: [number?, number?, number?];
  // צלעות משולש שני
  triangle2Sides?: [number?, number?, number?];
  // מרכז הומותטיה
  center?: { x?: number; y?: number };
  // נקודה מקורית
  originalPoint?: { x?: number; y?: number };
}

export function SimilarityCalculator() {
  const [data, setData] = useState<SimilarityData>({});

  const calculateResults = () => {
    const results: Record<string, number | undefined> = {};
    
    // חישוב יחסי שטחים
    if (data.ratio) {
      results.areaRatio = Math.pow(data.ratio, 2);
      results.perimeterRatio = data.ratio;
    }

    // בדיקת דמיון משולשים
    if (data.triangle1Sides && data.triangle2Sides) {
      const [a1, b1, c1] = data.triangle1Sides;
      const [a2, b2, c2] = data.triangle2Sides;
      
      if (a1 && b1 && c1 && a2 && b2 && c2) {
        const ratios = [a2/a1, b2/b1, c2/c1];
        const avgRatio = ratios.reduce((a, b) => a + b) / 3;
        results.calculatedRatio = avgRatio;
        results.isSimilar = Math.max(...ratios) - Math.min(...ratios) < 0.01;
      }
    }

    // חישוב העתקה הומותטית
    if (data.center && data.originalPoint && data.ratio) {
      const { x: cx, y: cy } = data.center;
      const { x: px, y: py } = data.originalPoint;
      
      if (cx !== undefined && cy !== undefined && px !== undefined && py !== undefined) {
        results.transformedX = cx + data.ratio * (px - cx);
        results.transformedY = cy + data.ratio * (py - cy);
      }
    }

    return results;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Ruler className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">דמיון והומותטיה</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">יחס דמיון</label>
            <input
              type="number"
              value={data.ratio || ''}
              onChange={(e) => setData({
                ...data,
                ratio: e.target.value ? Number(e.target.value) : undefined
              })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
              placeholder="יחס"
              step="0.1"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">משולש ראשון</h4>
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <input
                  key={`t1-${index}`}
                  type="number"
                  value={data.triangle1Sides?.[index] || ''}
                  onChange={(e) => {
                    const newSides = [...(data.triangle1Sides || [])] as [number?, number?, number?];
                    newSides[index] = e.target.value ? Number(e.target.value) : undefined;
                    setData({ ...data, triangle1Sides: newSides });
                  }}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder={`צלע ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">משולש שני</h4>
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <input
                  key={`t2-${index}`}
                  type="number"
                  value={data.triangle2Sides?.[index] || ''}
                  onChange={(e) => {
                    const newSides = [...(data.triangle2Sides || [])] as [number?, number?, number?];
                    newSides[index] = e.target.value ? Number(e.target.value) : undefined;
                    setData({ ...data, triangle2Sides: newSides });
                  }}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder={`צלע ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">העתקה הומותטית</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">מרכז - x</label>
                <input
                  type="number"
                  value={data.center?.x || ''}
                  onChange={(e) => setData({
                    ...data,
                    center: {
                      ...data.center,
                      x: e.target.value ? Number(e.target.value) : undefined
                    }
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="x"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">מרכז - y</label>
                <input
                  type="number"
                  value={data.center?.y || ''}
                  onChange={(e) => setData({
                    ...data,
                    center: {
                      ...data.center,
                      y: e.target.value ? Number(e.target.value) : undefined
                    }
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="y"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">נקודה - x</label>
                <input
                  type="number"
                  value={data.originalPoint?.x || ''}
                  onChange={(e) => setData({
                    ...data,
                    originalPoint: {
                      ...data.originalPoint,
                      x: e.target.value ? Number(e.target.value) : undefined
                    }
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="x"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">נקודה - y</label>
                <input
                  type="number"
                  value={data.originalPoint?.y || ''}
                  onChange={(e) => setData({
                    ...data,
                    originalPoint: {
                      ...data.originalPoint,
                      y: e.target.value ? Number(e.target.value) : undefined
                    }
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="y"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאות החישוב</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-3">
            {Object.entries(calculateResults()).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-slate-400">
                  {key === 'areaRatio' && 'יחס שטחים'}
                  {key === 'perimeterRatio' && 'יחס היקפים'}
                  {key === 'calculatedRatio' && 'יחס דמיון מחושב'}
                  {key === 'isSimilar' && 'המשולשים דומים'}
                  {key === 'transformedX' && 'נקודה מועתקת - x'}
                  {key === 'transformedY' && 'נקודה מועתקת - y'}
                </span>
                <span className="text-blue-400 font-medium">
                  {key === 'isSimilar' ? (value ? 'כן' : 'לא') : value?.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}