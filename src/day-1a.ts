import { getSortedLists } from 'get-sorted-lists';
import { sum } from 'utils';

const [sortedOne, sortedTwo] = getSortedLists();

const difference = sortedOne
  .map((value, idx) => Math.abs(value - sortedTwo[idx]))
  .reduce(sum, 0);

console.log({ difference });
// 1151792
