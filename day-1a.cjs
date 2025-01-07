const {getSortedLists} = require('./get-sorted-lists.cjs');
const { sum } = require('./utils.cjs');

const [sortedOne, sortedTwo] = getSortedLists()

const difference = sortedOne.map((value, idx) => {
  return Math.abs(value - sortedTwo[idx])
}).reduce(sum, 0);

console.log({ difference })
// 1151792