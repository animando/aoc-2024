import { getFileLines } from 'utils';

const inputFile = 'day-9-sample.txt';

type Block = {
  fileId: number;
  length: number;
};
type BlockMap = Block[];

const createFileEntry = (length: number, fileId: number): string[] => {
  return new Array(length).fill(fileId).map(String);
};
const createSpaceEntry = (length: number): string[] => {
  return new Array(length).fill('.');
};
const createBlockmap = (diskmap: number[]) => {
  return diskmap
    .reduce<string[]>((acc, entry, idx) => {
      if (idx % 2 === 0) {
        const fileId = idx / 2;
        acc.push(...createFileEntry(entry, fileId));
      } else {
        acc.push(...createSpaceEntry(entry));
      }
      return acc;
    }, [])
    .join('');
};

const compactRec = (blockmap: string): string => {
  const lastChar = blockmap.charAt(blockmap.length - 1);
  if (blockmap.length === 0) {
    return '';
  }
  if (blockmap.charAt(0) !== '.') {
    const newBlockMap = blockmap.substring(1);
    return `${blockmap[0]}${compactRec(newBlockMap)}`;
  } else if (lastChar === '.') {
    return `${compactRec(blockmap.substring(0, blockmap.length - 1))}.`;
  } else {
    const newBlockMap = blockmap.substring(1, blockmap.length - 1);
    return `${lastChar}${compactRec(newBlockMap)}.`;
  }
};

const compact = (blockmap: string): string => {
  return compactRec(blockmap);
};

const compact2 = (blockmap: string): string => {
  console.log(blockmap.length);
  let solution = '';
  let appendSpace = '';
  let reverseIdx = blockmap.length - 1;
  for (let i = 0; i < reverseIdx + 1; i++) {
    const char = blockmap.charAt(i);
    const finalChar = blockmap.charAt(reverseIdx);
    if (char === '.') {
      if (finalChar === '.') {
        appendSpace += '.';
        reverseIdx--;
        i--;
      } else {
        reverseIdx--;
        appendSpace += '.';
        solution += finalChar;
      }
    } else {
      solution += char;
    }
  }
  return solution + appendSpace;
};

const computeChecksum = (blockmap: string): number => {
  return blockmap.split('').reduce((acc, value, idx) => {
    if (value === '.') {
      return acc;
    }
    return acc + Number(value) * idx;
  }, 0);
};

(() => {
  const diskmap = getFileLines(inputFile)[0].split('').map(Number);

  const blockmap = createBlockmap(diskmap);

  const compacted = compact2(blockmap);

  const checksum = computeChecksum(compacted);

  console.log({ 'blockmap  ': blockmap, 'compacted ': compacted, checksum });
})();
