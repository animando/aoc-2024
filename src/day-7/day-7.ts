import { getFileLines, sum } from 'utils';

const inputFile = 'day-7.txt';

type Equation = {
  testValue: number;
  operands: number[];
};

type SolveableEquation = Equation & {
  operators: Operator[];
};

enum Operator {
  ADD,
  MULTIPLY,
}
const allOperators = [Operator.ADD, Operator.MULTIPLY];

const regex = /(\d+):(( \d+)+)/;
const parseEquation = (line: string): Equation => {
  const match = line.match(regex);
  if (!match) {
    throw Error('parse error');
  }
  return {
    testValue: Number(match[1]),
    operands: match[2].trim().split(' ').map(Number),
  };
};

const solveEquation = (equation: SolveableEquation): number => {
  return equation.operands.reduce<number>((acc, operand, idx) => {
    switch (equation.operators[idx]) {
      case Operator.ADD:
        return acc + operand;
      case Operator.MULTIPLY:
        return acc * operand;
      default:
        throw Error('unknown operator');
    }
  }, 0);
};
const getOptionsRecurse = (subArr: number[]): Operator[][] => {
  if (subArr.length === 0) {
    return [[]];
  }
  const rest = getOptionsRecurse(subArr.slice(1));
  return allOperators.flatMap<number[]>((op) => {
    return rest.map((r) => {
      return [op, ...r];
    });
  });
};
const testEquation = (equation: Equation) => {
  const operands = equation.operands.slice(1);
  const allOptions = getOptionsRecurse(operands).map((operators) => [
    Operator.ADD,
    ...operators,
  ]);
  const allSolveable: SolveableEquation[] = allOptions.map((operators) => ({
    ...equation,
    operators,
  }));
  const solved = allSolveable.find((solveable) => {
    return solveEquation(solveable) === equation.testValue;
  });
  return !!solved;
};

const main = () => {
  const lines = getFileLines(inputFile);
  const equations = lines.map(parseEquation);

  const solveableEquations = equations.filter(testEquation);

  const sumOfTestValues = solveableEquations
    .map(({ testValue }) => testValue)
    .reduce(sum, 0);

  console.log({ sumOfTestValues });
};

main();
