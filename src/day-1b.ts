import { getSortedLists } from 'get-sorted-lists';

import { sum } from 'utils';

const [sortedOne, sortedTwo] = getSortedLists();

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
