const { getFileLines, getInputFilePath } = require("./utils.cjs");

const reports = getFileLines(getInputFilePath('day-2.txt')).map((line) => line.split(' ').map(Number));

const checkValues = (value, nextValue, increasing) => {
  if (increasing && value > nextValue || !increasing && value < nextValue) {
    return false;
  }
  const differenceWithNext = Math.abs(value - nextValue);
  if (differenceWithNext < 1 || differenceWithNext > 3) {
    return false;
  }
  return true;
}

const isReportUnsafe = (report) => {
  const result = report.reduce(({safe, increasing}, value, idx) => {
    if (idx === report.length - 1) {
      return {safe, increasing};
    }
    if (!checkValues(value, report[idx+1], increasing)) {
      return {safe: false, increasing};
    }
    return { safe, increasing,  };
  }, {safe: true, increasing: report[0] < report[1]});

  return !result.safe;
}

const isNoAlternateSafe = (report) => {
  const alternates = report.reduce((acc, value, idx) => {
    acc.push(report.toSpliced(idx, 1));
    return acc;
  }, [])
  const safeAlternate = alternates.find((report) => !isReportUnsafe(report));
  return safeAlternate === undefined;
}

const unsafeReports = reports.filter((report) => isReportUnsafe(report));
const totallyUnsafe = unsafeReports.filter((report) => isNoAlternateSafe(report));

console.log({ numSafeReports: reports.length - totallyUnsafe.length, numReports: reports.length })

// 324