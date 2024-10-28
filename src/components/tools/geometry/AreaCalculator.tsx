import React, { useState } from 'react';
import { Square } from 'lucide-react';

type ShapeType = 'triangle' | 'rectangle' | 'circle' | 'trapezoid' | 'regular';

interface ShapeData {
  type: ShapeType;
  // משולש
  base?: number;
  height?: number;
  sides?: [number?, number?, number?];
  // מלבן
  width?: number;
  length?: number;
  // מעגל
  radius?: number;
  // טרפז
  topBase?: number;
  bottomBase?: number;
  // מצולע משוכלל
  sideLength?: number;
  numSides?: number;
}

export function AreaCalculator() {
  const [shapeData, setShapeData] = useState<ShapeData>({
    type: 'triangle'
  });

  const calculateArea = () => {
    const { type } = shapeData;

    switch (type) {
      case 'triangle': {
        if (shapeData.base && shapeData.height) {
          return (shapeData.base * shapeData.height) / 2;
        }
        // משפט הירון
        const [a, b, c] = shapeData.sides || [];
        if (a && b && c) {
          const s = (a + b + c) / 2;
          return Math.sqrt(s * (s - a) * (s - b) * (s - c));
        }
        return undefined;
      }
      case 'rectangle':
        return shapeData.width && shapeData.length
          ? shapeData.width * shapeData.length
          : undefined;
      case 'circle':
        return shapeData.radius
          ? Math.PI * shapeData.radius * shapeData.radius
          : undefined;
      case 'trapezoid':
        return shapeData.topBase && shapeData.bottomBase && shapeData.height
          ? ((shapeData.topBase + shapeData.bottomBase) * shapeData.height) / 2
          : undefined;
      case 'regular':
        if (shapeData.sideLength && shapeData.numSides) {
          const n = shapeData.numSides;
          const s = shapeData.sideLength;
          return (n * s * s) / (4 * Math.tan(Math.PI / n));
        }
        return undefined;
    }
  };

  const calculatePerimeter = () => {
    const { type } = shapeData;

    switch (type) {
      case 'triangle': {
        const [a, b, c] = shapeData.sides || [];
        return a && b && c ? a + b + c : undefined;
      }
      case 'rectangle':
        return shapeData.width && shapeData.length
          ? 2 * (shapeData.width + shapeData.length)
          : undefined;
      case 'circle':
        return shapeData.radius
          ? 2 * Math.PI * shapeData.radius
          : undefined;
      case 'trapezoid':
        return shapeData.topBase && shapeData.bottomBase && shapeData.height
          ? shapeData.topBase + shapeData.bottomBase + 
            2 * Math.sqrt(Math.pow((shapeData.bottomBase - shapeData.topBase) / 2, 2) + 
            Math.pow(shapeData.height, 2))
          : undefined;
      case 'regular':
        return shapeData.sideLength && shapeData.numSides
          ? shapeData.sideLength * shapeData.numSides
          : undefined;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Square className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">חישובי שטחים והיקפים</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">בחר צורה</label>
            <select
              value={shapeData.type}
              onChange={(e) => setShapeData({ type: e.target.value as ShapeType })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="triangle">משולש</option>
              <option value="rectangle">מלבן</option>
              <option value="circle">מעגל</option>
              <option value="trapezoid">טרפז</option>
              <option value="regular">מצולע משוכלל</option>
            </select>
          </div>

          {shapeData.type === 'triangle' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">בסיס</label>
                  <input
                    type="number"
                    value={shapeData.base || ''}
                    onChange={(e) => setShapeData({
                      ...shapeData,
                      base: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="אורך"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">גובה</label>
                  <input
                    type="number"
                    value={shapeData.height || ''}
                    onChange={(e) => setShapeData({
                      ...shapeData,
                      height: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="אורך"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">או הזן שלוש צלעות (משפט הירון)</label>
                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="number"
                      value={shapeData.sides?.[index] || ''}
                      onChange={(e) => {
                        const newSides = [...(shapeData.sides || [])];
                        newSides[index] = e.target.value ? Number(e.target.value) : undefined;
                        setShapeData({
                          ...shapeData,
                          sides: newSides as [number?, number?, number?]
                        });
                      }}
                      className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                      placeholder={`צלע ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {shapeData.type === 'rectangle' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">אורך</label>
                <input
                  type="number"
                  value={shapeData.length || ''}
                  onChange={(e) => setShapeData({
                    ...shapeData,
                    length: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="אורך"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">רוחב</label>
                <input
                  type="number"
                  value={shapeData.width || ''}
                  onChange={(e) => setShapeData({
                    ...shapeData,
                    width: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="רוחב"
                />
              </div>
            </div>
          )}

          {shapeData.type === 'circle' && (
            <div className="space-y-2">
              <label className="text-sm text-slate-400">רדיוס</label>
              <input
                type="number"
                value={shapeData.radius || ''}
                onChange={(e) => setShapeData({
                  ...shapeData,
                  radius: e.target.value ? Number(e.target.value) : undefined
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="רדיוס"
              />
            </div>
          )}

          {shapeData.type === 'trapezoid' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">בסיס עליון</label>
                  <input
                    type="number"
                    value={shapeData.topBase || ''}
                    onChange={(e) => setShapeData({
                      ...shapeData,
                      topBase: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="אורך"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">בסיס תחתון</label>
                  <input
                    type="number"
                    value={shapeData.bottomBase || ''}
                    onChange={(e) => setShapeData({
                      ...shapeData,
                      bottomBase: e.target.value ? Number(e.target.value) : undefined
                    })}
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    placeholder="אורך"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">גובה</label>
                <input
                  type="number"
                  value={shapeData.height || ''}
                  onChange={(e) => setShapeData({
                    ...shapeData,
                    height: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="גובה"
                />
              </div>
            </div>
          )}

          {shapeData.type === 'regular' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">מספר צלעות</label>
                <input
                  type="number"
                  value={shapeData.numSides || ''}
                  onChange={(e) => setShapeData({
                    ...shapeData,
                    numSides: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="מספר צלעות"
                  min="3"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">אורך צלע</label>
                <input
                  type="number"
                  value={shapeData.sideLength || ''}
                  onChange={(e) => setShapeData({
                    ...shapeData,
                    sideLength: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="אורך צלע"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאות החישוב</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">שטח</span>
              <span className="text-blue-400 font-medium">
                {calculateArea()?.toFixed(2) || '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">היקף</span>
              <span className="text-blue-400 font-medium">
                {calculatePerimeter()?.toFixed(2) || '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}