import { getFileLines } from 'utils';

export const readLists = (fileName: string): [number[], number[]] => {
  const listOne: number[] = [];
  const listTwo: number[] = [];

  const lines = getFileLines(fileName);

  lines.forEach((line) => {
    const numbers = line.split(/\W+/);
    listOne.push(Number(numbers[0]));
    listTwo.push(Number(numbers[1]));
  });
  return [listOne, listTwo];
};
