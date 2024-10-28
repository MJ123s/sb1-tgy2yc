import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathFormulaProps {
  formula: string;
  block?: boolean;
}

export function MathFormula({ formula, block = false }: MathFormulaProps) {
  return block ? (
    <BlockMath math={formula} />
  ) : (
    <InlineMath math={formula} />
  );
}