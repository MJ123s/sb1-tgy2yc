import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js';

interface GraphProps {
  fn: string;
  xAxis?: { domain: [number, number] };
  yAxis?: { domain: [number, number] };
  width?: number;
  height?: number;
  title?: string;
}

export function Graph({
  fn,
  xAxis = { domain: [-10, 10] },
  yAxis = { domain: [-10, 10] },
  width = 400,
  height = 300,
  title
}: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const x = [];
    const [xMin, xMax] = xAxis.domain;
    const step = (xMax - xMin) / 1000;

    for (let xi = xMin; xi <= xMax; xi += step) {
      x.push(xi);
    }

    // eslint-disable-next-line no-new-func
    const f = Function('x', `return ${fn}`);
    const y = x.map(xi => {
      try {
        const yi = f(xi);
        return isFinite(yi) && yi >= yAxis.domain[0] && yi <= yAxis.domain[1] ? yi : null;
      } catch {
        return null;
      }
    });

    Plotly.newPlot(containerRef.current, [{
      x,
      y,
      type: 'scatter',
      mode: 'lines',
      line: { color: '#3b82f6' }
    }], {
      width,
      height,
      title: title ? { text: title, font: { color: '#94a3b8' } } : undefined,
      paper_bgcolor: 'rgba(30, 41, 59, 0)',
      plot_bgcolor: 'rgba(30, 41, 59, 0)',
      font: { color: '#94a3b8' },
      xaxis: {
        range: xAxis.domain,
        gridcolor: '#334155',
        zerolinecolor: '#475569'
      },
      yaxis: {
        range: yAxis.domain,
        gridcolor: '#334155',
        zerolinecolor: '#475569'
      },
      margin: { t: title ? 40 : 20, r: 20, b: 40, l: 40 }
    }, {
      displayModeBar: false
    });

    return () => {
      if (containerRef.current) {
        Plotly.purge(containerRef.current);
      }
    };
  }, [fn, xAxis, yAxis, width, height, title]);

  return <div ref={containerRef} />;
}