import React, { useState } from 'react';
import { Triangle } from 'lucide-react';

interface TriangleData {
  sides: [number?, number?, number?];
  angles: [number?, number?, number?];
}

export function CongruenceCalculator() {
  const [triangle1, setTriangle1] = useState<TriangleData>({
    sides: [undefined, undefined, undefined],
    angles: [undefined, undefined, undefined]
  });
  
  const [triangle2, setTriangle2] = useState<TriangleData>({
    sides: [undefined, undefined, undefined],
    angles: [undefined, undefined, undefined]
  });

  const checkCongruence = () => {
    // צ.ז.צ - שתי צלעות וזווית שווים
    const sideAngleSide = 
      triangle1.sides[0] === triangle2.sides[0] &&
      triangle1.sides[1] === triangle2.sides[1] &&
      triangle1.angles[0] === triangle2.angles[0];

    // ז.צ.ז - זווית, צלע וזווית שווים
    const angleSideAngle = 
      triangle1.angles[0] === triangle2.angles[0] &&
      triangle1.sides[0] === triangle2.sides[0] &&
      triangle1.angles[1] === triangle2.angles[1];

    // צ.צ.צ - שלוש צלעות שוות
    const threeSides = 
      triangle1.sides[0] === triangle2.sides[0] &&
      triangle1.sides[1] === triangle2.sides[1] &&
      triangle1.sides[2] === triangle2.sides[2];

    return { sideAngleSide, angleSideAngle, threeSides };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Triangle className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">בדיקת חפיפת משולשים</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-medium">משולש ראשון</h4>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={`t1-side-${index}`} className="space-y-2">
                <label className="text-sm text-slate-400">צלע {index + 1}</label>
                <input
                  type="number"
                  value={triangle1.sides[index] || ''}
                  onChange={(e) => {
                    const newSides = [...triangle1.sides];
                    newSides[index] = e.target.value ? Number(e.target.value) : undefined;
                    setTriangle1({ ...triangle1, sides: newSides as [number?, number?, number?] });
                  }}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="אורך"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={`t1-angle-${index}`} className="space-y-2">
                <label className="text-sm text-slate-400">זווית {index + 1}</label>
                <input
                  type="number"
                  value={triangle1.angles[index] || ''}
                  onChange={(e) => {
                    const newAngles = [...triangle1.angles];
                    newAngles[index] = e.target.value ? Number(e.target.value) : undefined;
                    setTriangle1({ ...triangle1, angles: newAngles as [number?, number?, number?] });
                  }}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="מעלות"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">משולש שני</h4>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={`t2-side-${index}`} className="space-y-2">
                <label className="text-sm text-slate-400">צלע {index + 1}</label>
                <input
                  type="number"
                  value={triangle2.sides[index] || ''}
                  onChange={(e) => {
                    const newSides = [...triangle2.sides];
                    newSides[index] = e.target.value ? Number(e.target.value) : undefined;
                    setTriangle2({ ...triangle2, sides: newSides as [number?, number?, number?] });
                  }}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="אורך"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={`t2-angle-${index}`} className="space-y-2">
                <label className="text-sm text-slate-400">זווית {index + 1}</label>
                <input
                  type="number"
                  value={triangle2.angles[index] || ''}
                  onChange={(e) => {
                    const newAngles = [...triangle2.angles];
                    newAngles[index] = e.target.value ? Number(e.target.value) : undefined;
                    setTriangle2({ ...triangle2, angles: newAngles as [number?, number?, number?] });
                  }}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  placeholder="מעלות"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-800/40 rounded-lg">
        <h4 className="font-medium mb-4">תוצאות בדיקת החפיפה</h4>
        {Object.entries(checkCongruence()).map(([type, isCongruent]) => (
          <div
            key={type}
            className={`flex items-center gap-2 ${
              isCongruent ? 'text-green-400' : 'text-slate-400'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isCongruent ? 'bg-green-400' : 'bg-slate-400'}`} />
            <span>
              {type === 'sideAngleSide' && 'משפט חפיפה צ.ז.צ'}
              {type === 'angleSideAngle' && 'משפט חפיפה ז.צ.ז'}
              {type === 'threeSides' && 'משפט חפיפה צ.צ.צ'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}