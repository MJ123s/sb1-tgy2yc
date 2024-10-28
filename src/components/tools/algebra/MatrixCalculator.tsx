import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

type Operation = 'add' | 'multiply' | 'determinant' | 'inverse';

interface MatrixData {
  operation: Operation;
  matrix1: number[][];
  matrix2: number[][];
  rows1: number;
  cols1: number;
  rows2: number;
  cols2: number;
}

export function MatrixCalculator() {
  const [data, setData] = useState<MatrixData>({
    operation: 'add',
    matrix1: [[0]],
    matrix2: [[0]],
    rows1: 1,
    cols1: 1,
    rows2: 1,
    cols2: 1
  });

  const updateDimensions = (
    type: 'matrix1' | 'matrix2',
    rows: number,
    cols: number
  ) => {
    const newMatrix = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0));

    if (type === 'matrix1') {
      setData({
        ...data,
        matrix1: newMatrix,
        rows1: rows,
        cols1: cols
      });
    } else {
      setData({
        ...data,
        matrix2: newMatrix,
        rows2: rows,
        cols2: cols
      });
    }
  };

  const updateCell = (
    type: 'matrix1' | 'matrix2',
    row: number,
    col: number,
    value: number
  ) => {
    const newMatrix = type === 'matrix1' 
      ? [...data.matrix1]
      : [...data.matrix2];
    
    newMatrix[row][col] = value;

    setData({
      ...data,
      [type]: newMatrix
    });
  };

  const calculateResult = () => {
    switch (data.operation) {
      case 'add': {
        if (data.rows1 !== data.rows2 || data.cols1 !== data.cols2) {
          return { error: 'המטריצות חייבות להיות באותו גודל' };
        }

        const result = Array(data.rows1)
          .fill(0)
          .map((_, i) =>
            Array(data.cols1)
              .fill(0)
              .map((_, j) => data.matrix1[i][j] + data.matrix2[i][j])
          );

        return { result };
      }

      case 'multiply': {
        if (data.cols1 !== data.rows2) {
          return { error: 'מספר העמודות במטריצה הראשונה חייב להיות שווה למספר השורות במטריצה השנייה' };
        }

        const result = Array(data.rows1)
          .fill(0)
          .map((_, i) =>
            Array(data.cols2)
              .fill(0)
              .map((_, j) =>
                Array(data.cols1)
                  .fill(0)
                  .reduce((sum, _, k) => sum + data.matrix1[i][k] * data.matrix2[k][j], 0)
              )
          );

        return { result };
      }

      case 'determinant': {
        if (data.rows1 !== data.cols1) {
          return { error: 'המטריצה חייבת להיות ריבועית' };
        }

        const calculateDet = (matrix: number[][]): number => {
          if (matrix.length === 1) return matrix[0][0];
          if (matrix.length === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
          }

          let det = 0;
          for (let i = 0; i < matrix.length; i++) {
            const subMatrix = matrix
              .slice(1)
              .map(row => [...row.slice(0, i), ...row.slice(i + 1)]);
            det += Math.pow(-1, i) * matrix[0][i] * calculateDet(subMatrix);
          }
          return det;
        };

        return { determinant: calculateDet(data.matrix1) };
      }

      case 'inverse': {
        if (data.rows1 !== data.cols1) {
          return { error: 'המטריצה חייבת להיות ריבועית' };
        }

        // TODO: Implement matrix inversion
        return { error: 'טרם מומש' };
      }

      default:
        return { error: 'פעולה לא תקינה' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calculator className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold">מחשבון מטריצות</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">פעולה</label>
            <select
              value={data.operation}
              onChange={(e) => setData({ ...data, operation: e.target.value as Operation })}
              className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
            >
              <option value="add">חיבור</option>
              <option value="multiply">כפל</option>
              <option value="determinant">דטרמיננטה</option>
              <option value="inverse">הופכי</option>
            </select>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">מטריצה ראשונה</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">שורות</label>
                <input
                  type="number"
                  value={data.rows1}
                  onChange={(e) => updateDimensions('matrix1', Number(e.target.value), data.cols1)}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  min="1"
                  max="5"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">עמודות</label>
                <input
                  type="number"
                  value={data.cols1}
                  onChange={(e) => updateDimensions('matrix1', data.rows1, Number(e.target.value))}
                  className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                  min="1"
                  max="5"
                />
              </div>
            </div>
            <div className="grid gap-2">
              {Array(data.rows1)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex gap-2">
                    {Array(data.cols1)
                      .fill(0)
                      .map((_, j) => (
                        <input
                          key={j}
                          type="number"
                          value={data.matrix1[i][j]}
                          onChange={(e) =>
                            updateCell('matrix1', i, j, Number(e.target.value))
                          }
                          className="w-16 bg-slate-800/40 rounded px-2 py-1 text-slate-100"
                        />
                      ))}
                  </div>
                ))}
            </div>
          </div>

          {(data.operation === 'add' || data.operation === 'multiply') && (
            <div className="space-y-4">
              <h4 className="font-medium">מטריצה שנייה</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">שורות</label>
                  <input
                    type="number"
                    value={data.rows2}
                    onChange={(e) =>
                      updateDimensions('matrix2', Number(e.target.value), data.cols2)
                    }
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    min="1"
                    max="5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">עמודות</label>
                  <input
                    type="number"
                    value={data.cols2}
                    onChange={(e) =>
                      updateDimensions('matrix2', data.rows2, Number(e.target.value))
                    }
                    className="w-full bg-slate-800/40 rounded px-3 py-2 text-slate-100"
                    min="1"
                    max="5"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                {Array(data.rows2)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex gap-2">
                      {Array(data.cols2)
                        .fill(0)
                        .map((_, j) => (
                          <input
                            key={j}
                            type="number"
                            value={data.matrix2[i][j]}
                            onChange={(e) =>
                              updateCell('matrix2', i, j, Number(e.target.value))
                            }
                            className="w-16 bg-slate-800/40 rounded px-2 py-1 text-slate-100"
                          />
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">תוצאה</h4>
          <div className="bg-slate-800/40 rounded-lg p-4">
            {(() => {
              const result = calculateResult();

              if ('error' in result) {
                return <div className="text-red-400">{result.error}</div>;
              }

              if ('determinant' in result) {
                return (
                  <div className="text-blue-400">
                    דטרמיננטה: {result.determinant}
                  </div>
                );
              }

              if ('result' in result) {
                return (
                  <div className="grid gap-2">
                    {result.result.map((row, i) => (
                      <div key={i} className="flex gap-2">
                        {row.map((cell, j) => (
                          <div
                            key={j}
                            className="w-16 bg-slate-800/60 rounded px-2 py-1 text-blue-400 text-center"
                          >
                            {cell}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}