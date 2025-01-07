const {readFile} = require('./read-lists.cjs');

const getSortedLists = () => {
  const [listOne, listTwo] = readFile()
  const sortedOne = listOne.sort();
  const sortedTwo = listTwo.sort((a, b) => a - b);

  return [sortedOne, sortedTwo];
}

module.exports = {
  getSortedLists
}