import { getFileLines } from 'utils';

type Report = number[];

type SafetyResult = {
  safe: boolean;
  increasing: boolean;
};
const reports: Report[] = getFileLines('day-2.txt').map((line) =>
  line.split(' ').map(Number),
);

const checkValues = (value: number, nextValue: number, increasing: boolean) => {
  if ((increasing && value > nextValue) || (!increasing && value < nextValue)) {
    return false;
  }
  const differenceWithNext = Math.abs(value - nextValue);
  if (differenceWithNext < 1 || differenceWithNext > 3) {
    return false;
  }
  return true;
};

const isReportUnsafe = (report: Report) => {
  const result = report.reduce<SafetyResult>(
    ({ safe, increasing }, value, idx) => {
      if (idx === report.length - 1) {
        return { safe, increasing };
      }
      if (!checkValues(value, report[idx + 1], increasing)) {
        return { safe: false, increasing };
      }
      return { safe, increasing };
    },
    { safe: true, increasing: report[0] < report[1] },
  );

  return !result.safe;
};

const isNoAlternateSafe = (report: Report) => {
  const alternates = report.reduce<Report[]>((acc, value, idx) => {
    acc.push(report.toSpliced(idx, 1));
    return acc;
  }, []);
  const safeAlternate = alternates.find((report) => !isReportUnsafe(report));
  return safeAlternate === undefined;
};

const unsafeReports = reports.filter((report) => isReportUnsafe(report));
const totallyUnsafe = unsafeReports.filter((report) =>
  isNoAlternateSafe(report),
);

console.log({
  numSafeReports: reports.length - totallyUnsafe.length,
  numReports: reports.length,
});

// 324
