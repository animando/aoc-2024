const { getFileLines } = require('./utils.cjs');

const readFile = () => {
  const listOne = [];
  const listTwo = [];

  const lines = getFileLines('day-1.txt');

  lines.forEach((line) => {
    const numbers = line.split(/\W+/);
    listOne.push(Number(numbers[0]));
    listTwo.push(Number(numbers[1]));
  });
  return [listOne, listTwo];
};

module.exports = {
  readFile,
};
