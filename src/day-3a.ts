import { getFileLines, getInputFilePath, sum } from 'utils';

const lines = getFileLines(getInputFilePath('day-3.txt'));

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

const parseLine = (line: string) => {
  const matches = [...line.matchAll(regex)]
    .map(([match, n1, n2]) => [n1, n2].map(Number))
    .map(([n1, n2]) => n1 * n2)
    .reduce(sum, 0);
  return matches;
};

const result = lines.map(parseLine).reduce(sum);
console.log({ result });

// 179571322
