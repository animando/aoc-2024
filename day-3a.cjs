const { getFileLines, getInputFilePath, sum } = require("./utils.cjs");

// const sampleReports = [
//   [ 7, 6, 4, 2, 1, ],
//   [ 1, 2, 7, 8, 9, ],
//   [ 9, 7, 6, 2, 1, ],
//   [ 1, 3, 2, 4, 5, ],
//   [ 8, 6, 4, 4, 1, ],
//   [ 1, 3, 6, 7, 9, ]
// ]

const lines = getFileLines(getInputFilePath('day-3.txt'));

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g

const parseLine = (line) => {

  const matches = [...line.matchAll(regex)].map(([match, n1, n2]) => ([n1, n2].map(Number))).map(([n1, n2]) => n1 * n2).reduce(sum, 0)
  return matches;

}

const result = lines.map(parseLine).reduce(sum)
console.log({ result })
// 179571322