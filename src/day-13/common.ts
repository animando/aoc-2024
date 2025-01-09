const COST_OF_A = 3;
const COST_OF_B = 1;
export const MAX_PRESSES = 100;

export type Instruction = {
  a: {
    x: number;
    y: number;
  };
  b: {
    x: number;
    y: number;
  };
  prize: {
    x: number;
    y: number;
  };
};

export type Solution = [number, number];

const aRegex = /Button A: X\+(\d+), Y\+(\d+)/;
const bRegex = /Button B: X\+(\d+), Y\+(\d+)/;
const prizeRegex = /Prize: X=(\d+), Y=(\d+)/;

const readInstructionAtPosition = (
  lines: string[],
  idx: number,
): Instruction => {
  const aMatch = lines[idx].match(aRegex);
  const bMatch = lines[idx + 1].match(bRegex);
  const prizeMatch = lines[idx + 2].match(prizeRegex);
  if (!aMatch || !bMatch || !prizeMatch) {
    throw Error('error parsing from ' + idx);
  }
  return {
    a: { x: Number(aMatch[1]), y: Number(aMatch[2]) },
    b: { x: Number(bMatch[1]), y: Number(bMatch[2]) },
    prize: { x: Number(prizeMatch[1]), y: Number(prizeMatch[2]) },
  };
};

export const parseInstructions = (lines: string[]) => {
  return lines.reduce<Instruction[]>((acc, line, idx) => {
    if (line.match(aRegex)) {
      const instr = readInstructionAtPosition(lines, idx);
      acc.push(instr);
    }
    return acc;
  }, []);
};

export const getCostOfSolution = ([a, b]: Solution): number =>
  a * COST_OF_A + b * COST_OF_B;

export const isWholeNumber = (a: number) => a % 1 === 0;
