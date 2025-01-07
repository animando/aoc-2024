import { getFileLines, getInputFilePath } from 'utils';

const lines = getFileLines(getInputFilePath('day-4.txt')).map((line) =>
  line.split(''),
);

const searchInLetters = (wordCoords: number[][]) => {
  const word = wordCoords.reduce((acc, [y, x]) => {
    const letter = lines[y]?.[x] ?? '';
    return `${acc}${letter}`;
  }, '');
  return word === 'MAS' || word === 'SAM';
};

const searchFrom = (x: number, y: number) => {
  const searchSeNw = () => {
    return searchInLetters([
      [y + 1, x + 1],
      [y, x],
      [y - 1, x - 1],
    ]);
  };
  const searchSwNe = () => {
    return searchInLetters([
      [y + 1, x - 1],
      [y, x],
      [y - 1, x + 1],
    ]);
  };

  return searchSeNw() && searchSwNe() ? 1 : 0;
};

const total = lines.reduce((count, line, y) => {
  return (
    count +
    line.reduce((innerCount, char, x) => {
      if (char === 'A') {
        return innerCount + searchFrom(x, y);
      }
      return innerCount;
    }, 0)
  );
}, 0);

console.log({ total });

// 1992
