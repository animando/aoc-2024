import { getFileLines, sum } from 'utils';

const lines = getFileLines('day-5.txt');

type ParsedInput = { rules: string[]; updates: string[] };

const { rules, updates } = lines.reduce<ParsedInput>(
  ({ rules, updates }, line) => {
    if (line.match(/\d\|\d/)) {
      rules.push(line);
    } else if (line.match(/\d(,\d)+/)) {
      updates.push(line);
    }
    return { rules, updates };
  },
  { rules: [], updates: [] },
);

const ruleNumberPairs = rules.map((rule) => rule.split('|'));
const ruleRegexs = ruleNumberPairs.map(([num1, num2]) => {
  return new RegExp(`${num1}.*${num2}`);
});

const updateContainsNumbers = (ruleNumbers: string[], update: string) => {
  return ruleNumbers.every((number) => update.includes(number));
};

const updateRespectsRule = (ruleRegex: RegExp, update: string) => {
  return update.match(ruleRegex);
};

const isUpdateCorrect = (update: string) => {
  return ruleNumberPairs.every(
    (ruleNumbers, idx) =>
      !updateContainsNumbers(ruleNumbers, update) ||
      updateRespectsRule(ruleRegexs[idx], update),
  );
};
const correctUpdates = updates.filter((update) => isUpdateCorrect(update));
const updateNumbers = correctUpdates.map((update) =>
  update.split(',').map(Number),
);
const middleNumbers = updateNumbers.map(
  (pageNumbers) => pageNumbers[(pageNumbers.length - 1) / 2],
);
const total = middleNumbers.reduce(sum, 0);

console.log({ total });

// 5747
