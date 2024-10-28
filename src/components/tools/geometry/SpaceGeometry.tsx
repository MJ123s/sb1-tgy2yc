import React, { useState } from 'react';
import { Box } from 'lucide-react';
import { Scene3D } from '../../Scene3D';
import { Cube } from '../../shapes/Cube';
import { Sphere } from '../../shapes/Sphere';

type Shape3D = 'cube' | 'sphere' | 'pyramid' | 'cylinder';

interface SpaceGeometryData {
  shape: Shape3D;
  dimensions: {
    width?: number;
    height?: number;
    depth?: number;
    radius?: number;
  };
}

export function SpaceGeometry() {
  const [data, setData] = useState<SpaceGeometryData>({
    shape: 'cube',
    dimensions: {}
  });

  const calculateVolume = () => {
    const { shape, dimensions } = data;
    const { width = 0, height = 0, depth = 0, radius = 0 } = dimensions;

    switch (shape) {
      case 'cube':
        return width * height * depth;
      case 'sphere':
        return (4/3) * Math.PI * Math.pow(radius, 3);
      case 'pyramid':
        return (width * depth * height) / 3;
      case 'cylinder':
        return Math.PI * radius * radius * height;
      default:
        return 0;
    }
  };

  const calculateSurfaceArea = () => {
    const { shape, dimensions } = data;
    const { width = 0, height = 0, depth = 0, radius = 0 } = dimensions;

    switch (shape) {
      case 'cube':
        return 2 * (width * depth + width * height + depth * height);
      case 'sphere':
        return 4 * Math.PI * radius * radius;
      case 'pyramid': {
        const slantHeight = Math.sqrt(Math.pow(height, 2) + Math.pow(width/2, 2));
        return width * depth + width * slantHeight + depth * slantHeight;
      }
      case 'cylinder':
        return 2 * Math.PI * radius * (radius + height);
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Box className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">גיאומטריה במרחב</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">צורה</label>
            <select
              value={data.shape}
              onChange={(e) => setData({ ...data, shape: e.target.value as Shape3D })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="cube">תיבה</option>
              <option value="sphere">כדור</option>
              <option value="pyramid">פירמידה</option>
              <option value="cylinder">גליל</option>
            </select>
          </div>

          {data.shape === 'cube' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">אורך</label>
                <input
                  type="number"
                  value={data.dimensions.width || ''}
                  onChange={(e) => setData({
                    ...data,
                    dimensions: {
                      ...data.dimensions,
                      width: Number(e.target.value)
                    }
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">רוחב</label>
                <input
                  type="number"
                  value={data.dimensions.depth || ''}
                  onChange={(e) => setData({
                    ...data,
                    dimensions: {
                      ...data.dimensions,
                      depth: Number(e.target.value)
                    }
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">גובה</label>
                <input
                  type="number"
                  value={data.dimensions.height || ''}
                  onChange={(e) => setData({
                    ...data,
                    dimensions: {
                      ...data.dimensions,
                      height: Number(e.target.value)
                    }
                  })}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  min="0"
                />
              </div>
            </div>
          )}

          {(data.shape === 'sphere' || data.shape === 'cylinder') && (
            <div className="space-y-2">
              <label className="text-sm text-slate-400">רדיוס</label>
              <input
                type="number"
                value={data.dimensions.radius || ''}
                onChange={(e) => setData({
                  ...data,
                  dimensions: {
                    ...data.dimensions,
                    radius: Number(e.target.value)
                  }
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                min="0"
              />
            </div>
          )}

          {data.shape === 'cylinder' && (
            <div className="space-y-2">
              <label className="text-sm text-slate-400">גובה</label>
              <input
                type="number"
                value={data.dimensions.height || ''}
                onChange={(e) => setData({
                  ...data,
                  dimensions: {
                    ...data.dimensions,
                    height: Number(e.target.value)
                  }
                })}
                className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                min="0"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/40 rounded-lg p-4 space-y-4">
            <Scene3D>
              {data.shape === 'cube' && (
                <Cube 
                  size={[
                    data.dimensions.width || 1,
                    data.dimensions.height || 1,
                    data.dimensions.depth || 1
                  ]} 
                />
              )}
              {data.shape === 'sphere' && (
                <Sphere radius={data.dimensions.radius || 1} />
              )}
            </Scene3D>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">נפח:</span>
                <span className="text-blue-400 font-medium">
                  {calculateVolume().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">שטח פנים:</span>
                <span className="text-blue-400 font-medium">
                  {calculateSurfaceArea().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}