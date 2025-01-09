import { getFileLines, sum } from 'utils';
import {
  getCostOfSolution,
  Instruction,
  isWholeNumber,
  parseInstructions,
  Solution,
} from './common.js';

const TEN_BILLION = 10_000_000_000_000;

const inputFile = 'day-13.txt';

const getCheapestSolution = (instr: Instruction): Solution | null => {
  // https://www.youtube.com/watch?v=vXqlIOX2itM - explanation of Cramer's rule

  // linear equations with 2 variables

  // A = number of a presses
  // B = number of b presses

  // ax(A) + bx(B) = px
  // ay(A) + by(B) = py

  const ax = instr.a.x;
  const ay = instr.a.y;
  const bx = instr.b.x;
  const by = instr.b.y;
  const cx = instr.prize.x;
  const cy = instr.prize.y;

  // A = Dx / d
  // B = Dy / d

  // D  = [ ax bx ] = ax(by) - bx(ay)
  //      [ ay by ]
  // Dx = [ px bx ] = px(by) - bx(py)
  //      [ py by ]
  // Dy = [ ax px ] = ax(py) - px(ay)
  //      [ ay py ]

  const d = ax * by - bx * ay;
  const Dx = cx * by - bx * cy;
  const Dy = ax * cy - cx * ay;

  const A = Dx / d;
  const B = Dy / d;

  if (!isWholeNumber(A) || !isWholeNumber(B)) {
    return null;
  } else {
    return [A, B];
  }
};

(() => {
  const lines = getFileLines(inputFile).filter((line) => !line.startsWith('#'));
  const instructions = parseInstructions(lines).map<Instruction>((i) => ({
    ...i,
    prize: {
      x: i.prize.x + TEN_BILLION,
      y: i.prize.y + TEN_BILLION,
    },
  }));
  const solutions = instructions.map(getCheapestSolution);
  const feasibleSolutions = solutions.filter((s) => s !== null);
  const numPrizes = feasibleSolutions.length;

  const totalCost = feasibleSolutions.map(getCostOfSolution).reduce(sum, 0);
  console.log({ totalCost, numPrizes });
})();

// 76358113886726
