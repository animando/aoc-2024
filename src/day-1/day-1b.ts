import { sum } from 'utils';
import { getSortedLists } from './get-sorted-lists.js';

const fileName = 'day-1.txt';

const [sortedOne, sortedTwo] = getSortedLists(fileName);

const similarity = sortedOne
  .map((value) => {
    const occurrences = sortedTwo.filter(
      (matchedValue) => matchedValue === value,
    ).length;
    return occurrences * value;
  })
  .reduce(sum, 0);

console.log({ similarity });

// 21790168
