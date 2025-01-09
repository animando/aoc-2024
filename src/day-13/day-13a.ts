import { getFileLines, sum } from 'utils';
import {
  getCostOfSolution,
  Instruction,
  MAX_PRESSES,
  parseInstructions,
  Solution,
} from './common.js';

const inputFile = 'day-13.txt';

const isYNavigable = (
  instr: Instruction,
  aPresses: number,
  bPresses: number,
): boolean => {
  const ayDistance = aPresses * instr.a.y;
  const byDistance = bPresses * instr.b.y;
  return ayDistance + byDistance === instr.prize.y;
};

const getCheapestSolution = (instr: Instruction): Solution | null => {
  for (
    let bPresses = 0;
    bPresses <= MAX_PRESSES && bPresses * instr.b.x < instr.prize.x;
    bPresses++
  ) {
    const bx = instr.b.x * bPresses;
    const remaining = instr.prize.x - bx;
    if (remaining % instr.a.x === 0) {
      const aPresses = remaining / instr.a.x;
      if (aPresses <= MAX_PRESSES && isYNavigable(instr, aPresses, bPresses)) {
        return [aPresses, bPresses];
      }
    }
  }
  return null;
};

(() => {
  const lines = getFileLines(inputFile).filter((line) => !line.startsWith('#'));
  const instructions = parseInstructions(lines);
  const solutions = instructions.map(getCheapestSolution);
  const feasibleSolutions = solutions.filter((s) => s !== null);
  const numPrizes = feasibleSolutions.length;

  const totalCost = feasibleSolutions.map(getCostOfSolution).reduce(sum, 0);
  console.log({ totalCost, numPrizes });
})();

// 36758
