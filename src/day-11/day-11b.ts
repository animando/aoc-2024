import { getFileLines } from 'utils';
import { createResultCache, getValue, ResultCache } from './common.js';

const inputFile = 'day-11.txt';

type NumberCount = Record<string, number | undefined>;

const incrementStoneCount = (i: number, count: NumberCount, inc: number) => {
  if (count[i] === undefined) {
    count[i] = inc;
  } else {
    count[i] += inc;
  }
};
const decrementStoneCount = (i: number, count: NumberCount, inc: number) => {
  if (count[i] !== undefined) {
    count[i] -= inc;
  }
};

const createStoneNumberCount = (stones: number[]): NumberCount => {
  const count: NumberCount = {};
  stones.forEach((i) => {
    incrementStoneCount(i, count, 1);
  });
  return count;
};

const getNumStones = (stoneCount: NumberCount): number => {
  return Object.entries(stoneCount).reduce<number>((acc, [_, count]) => {
    return acc + (count ?? 0);
  }, 0);
};

const processStones = (
  numberCount: NumberCount,
  cache: ResultCache,
): NumberCount => {
  return Object.entries(numberCount).reduce<NumberCount>(
    (acc, [key, count]) => {
      if (!count) return acc;
      const stoneValue = Number(key);

      const newValue = getValue(stoneValue, cache);
      newValue.forEach((v) => {
        incrementStoneCount(v, acc, count);
      });
      decrementStoneCount(stoneValue, acc, count);
      return acc;
    },
    numberCount,
  );
};
(() => {
  const stones = getFileLines(inputFile)[0].split(' ').map(Number);
  const cache = createResultCache();
  let count = createStoneNumberCount(stones);

  console.time('stone processing');
  for (let i = 0; i < 75; i++) {
    count = processStones(count, cache);
  }
  console.timeEnd('stone processing');

  const totalCount = getNumStones(count);

  console.log(totalCount);
})();

// 25 = 193899 (4.447ms)
// 75 = 229682160383225 (63.375ms)
