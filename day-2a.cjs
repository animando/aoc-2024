const { getFileLines, getInputFilePath } = require("./utils.cjs");

// const sampleReports = [
//   [ 7, 6, 4, 2, 1, ],
//   [ 1, 2, 7, 8, 9, ],
//   [ 9, 7, 6, 2, 1, ],
//   [ 1, 3, 2, 4, 5, ],
//   [ 8, 6, 4, 4, 1, ],
//   [ 1, 3, 6, 7, 9, ]
// ]

const reports = getFileLines(getInputFilePath('day-2.txt')).map((line) => line.split(' ').map(Number));

const isReportSafe = (report) => {
  const result = report.reduce(({safe, increasing}, value, idx) => {
    if (!safe) return {safe: false};
    if (idx === report.length - 1) {
      return {safe: true, increasing};
    }
    const nextValue = report[idx+1];
    if (increasing && value > nextValue || !increasing && value < nextValue) {
      return {safe: false, increasing};
    }
    const differenceWithNext = Math.abs(value - nextValue);
    if (differenceWithNext < 1 || differenceWithNext > 3) {
      return {safe: false, increasing};
    }
    return {safe: true, increasing};
  }, {safe: true, increasing: report[0] < report[1]});

  return result.safe;
} 

const numSafeReports = reports.filter((report) => isReportSafe(report)).length;

console.log({ numSafeReports, numReports: reports.length })
// 252