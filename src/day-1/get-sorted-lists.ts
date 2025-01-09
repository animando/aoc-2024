import { readLists } from './read-lists.js';

export const getSortedLists = (fileName: string) => {
  const [listOne, listTwo] = readLists(fileName);
  const sortedOne = listOne.sort();
  const sortedTwo = listTwo.sort((a, b) => a - b);

  return [sortedOne, sortedTwo];
};
