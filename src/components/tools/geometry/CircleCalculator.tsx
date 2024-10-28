import React, { useState } from 'react';
import { Circle } from 'lucide-react';

interface CircleData {
  radius?: number;
  chordLength?: number;
  tangentLength?: number;
  arcAngle?: number;
  centralAngle?: number;
}

export function CircleCalculator() {
  const [circleData, setCircleData] = useState<CircleData>({});

  const calculateResults = () => {
    const results: Record<string, number | undefined> = {};
    const { radius: r, chordLength: c, tangentLength: t, arcAngle: α, centralAngle: β } = circleData;

    if (r && c) {
      // מרחק ממרכז המעגל למיתר
      results.centerToChord = Math.sqrt(r * r - (c / 2) * (c / 2));
      // זווית מרכזית
      results.centralAngle = 2 * Math.asin((c / (2 * r))) * (180 / Math.PI);
    }

    if (r && t) {
      // זווית בין המשיק למיתר
      results.tangentAngle = Math.acos(t / r) * (180 / Math.PI);
    }

    if (r && α) {
      // אורך קשת
      results.arcLength = (2 * Math.PI * r * α) / 360;
      // שטח גזרה
      results.sectorArea = (Math.PI * r * r * α) / 360;
    }

    if (r && β) {
      // שטח מעגלי
      results.circularSegmentArea = 
        (r * r / 2) * (β * Math.PI / 180 - Math.sin(β * Math.PI / 180));
    }

    return results;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Circle className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">חישובי מעגל ומשיקים</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-medium">נתוני המעגל</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">רדיוס</label>
              <input
                type="number"
                value={circleData.radius || ''}
                onChange={(e) => setCircleData({ 
                  ...circleData, 
                  radius: e.target.value ? Number(e.target.value) : undefined 
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="אורך"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">אורך מיתר</label>
              <input
                type="number"
                value={circleData.chordLength || ''}
                onChange={(e) => setCircleData({ 
                  ...circleData, 
                  chordLength: e.target.value ? Number(e.target.value) : undefined 
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="אורך"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">אורך משיק</label>
              <input
                type="number"
                value={circleData.tangentLength || ''}
                onChange={(e) => setCircleData({ 
                  ...circleData, 
                  tangentLength: e.target.value ? Number(e.target.value) : undefined 
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="אורך"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">זווית קשת (מעלות)</label>
              <input
                type="number"
                value={circleData.arcAngle || ''}
                onChange={(e) => setCircleData({ 
                  ...circleData, 
                  arcAngle: e.target.value ? Number(e.target.value) : undefined 
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="מעלות"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">זווית מרכזית (מעלות)</label>
              <input
                type="number"
                value={circleData.centralAngle || ''}
                onChange={(e) => setCircleData({ 
                  ...circleData, 
                  centralAngle: e.target.value ? Number(e.target.value) : undefined 
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                placeholder="מעלות"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאות החישוב</h4>
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-3">
            {Object.entries(calculateResults()).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-slate-400">
                  {key === 'centerToChord' && 'מרחק ממרכז למיתר'}
                  {key === 'centralAngle' && 'זווית מרכזית'}
                  {key === 'tangentAngle' && 'זווית משיק-מיתר'}
                  {key === 'arcLength' && 'אורך קשת'}
                  {key === 'sectorArea' && 'שטח גזרה'}
                  {key === 'circularSegmentArea' && 'שטח מעגלי'}
                </span>
                <span className="text-blue-400 font-medium">
                  {value?.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}