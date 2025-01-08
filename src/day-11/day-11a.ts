import { getFileLines } from 'utils';
import { createResultCache, getValue, ResultCache } from './common.js';

const inputFile = 'day-11.txt';

const updateStones = (i: number, stones: number[], value: number[]) => {
  stones.splice(i, 1, ...value);
};

const processStones = (stones: number[], cache: ResultCache): void => {
  for (let i = 0; i < stones.length; i++) {
    const stoneValue = stones[i];
    const newValue = getValue(stoneValue, cache);
    updateStones(i, stones, newValue);
    i += newValue.length - 1;
  }
};
(() => {
  const stones = getFileLines(inputFile)[0].split(' ').map(Number);
  const cache = createResultCache();

  console.time('stone processing');
  for (let i = 0; i < 75; i++) {
    processStones(stones, cache);
  }
  console.timeEnd('stone processing');

  console.log(stones.length);
})();

// 25 = 193899 (714.586ms)
// 75 = ?
