const { getFileLines, getInputFilePath, sum } = require("./utils.cjs");

const lines = getFileLines(getInputFilePath('day-3.txt'));

const regex = /(mul|don't|do)\(((\d{1,3}),(\d{1,3}))?\)/;

const parseLineRec = (line, active, acc) => {
  const match = line.match(regex)
  if (!match) {
    return acc;
  }
  const rest = line.substring(match.index + match[0].length)
  if (match[1] === 'mul') {
    if (active) {
      const n1 = Number(match[3]);
      const n2 = Number(match[4]);
      const multiple = n1 * n2

      acc.push(multiple);
    }
    return parseLineRec(rest, active, acc)
  }
  if (match[1] === 'don\'t') {
    return parseLineRec(rest, false, acc)
  }
  if (match[1] === 'do') {
    return parseLineRec(rest, true, acc)
  }
}

const parseLine = (line) => {
  return parseLineRec(line, true, []).reduce(sum, 0);
}

const result = parseLine(lines.join(''))
console.log({ result })
// 103811193