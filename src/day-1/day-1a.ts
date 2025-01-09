import { sum } from 'utils';
import { getSortedLists } from './get-sorted-lists.js';

const fileName = 'day-1.txt';

const [sortedOne, sortedTwo] = getSortedLists(fileName);

const difference = sortedOne
  .map((value, idx) => Math.abs(value - sortedTwo[idx]))
  .reduce(sum, 0);

console.log({ difference });
// 1151792
