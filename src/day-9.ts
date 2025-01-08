import { getFileLines } from 'utils';

const inputFile = 'day-9.txt';

type FileBlock = {
  type: 'file';
  fileId: number;
  length: number;
};
type SpaceBlock = {
  type: 'space';
  length: number;
};
type Block = FileBlock | SpaceBlock;
type DiskMap = Block[];

const createFileEntry = (length: number, fileId: number): FileBlock => {
  return {
    type: 'file',
    fileId,
    length,
  };
};

const createSpaceEntry = (length: number): SpaceBlock => {
  return {
    type: 'space',
    length,
  };
};

const createDiskMap = (diskmap: number[]): DiskMap => {
  return diskmap.reduce<DiskMap>((acc, entry, idx) => {
    if (idx % 2 === 0) {
      const fileId = idx / 2;
      acc.push(createFileEntry(entry, fileId));
    } else {
      acc.push(createSpaceEntry(entry));
    }
    return acc;
  }, []);
};

const appendOrReplaceFileBlock = (block: FileBlock, diskMap: DiskMap) => {
  const headBlock = diskMap[diskMap.length - 1];

  if (
    headBlock &&
    headBlock.type === 'file' &&
    headBlock.fileId === block.fileId
  ) {
    diskMap[diskMap.length - 1] = createFileEntry(
      headBlock.length + block.length,
      block.fileId,
    );
  } else {
    diskMap.push(block);
  }
};

const compact = (diskMap: DiskMap): DiskMap => {
  let reverseIdx = diskMap.length - 1;
  const compacted: DiskMap = [];
  let endSpace: number = 0;

  for (let idx = 0; reverseIdx >= idx; idx++) {
    const block = diskMap[idx];

    if (block.type === 'file') {
      appendOrReplaceFileBlock(block, compacted);
    } else {
      let remainingSpace = block.length;
      while (remainingSpace > 0) {
        const lastBlock = diskMap[reverseIdx];
        if (lastBlock.type === 'space') {
          endSpace += lastBlock.length;
          reverseIdx--;
        } else {
          if (lastBlock.length <= remainingSpace) {
            compacted.push(lastBlock);
            reverseIdx--;
            remainingSpace -= lastBlock.length;
            endSpace += lastBlock.length;
          } else {
            const split1 = createFileEntry(remainingSpace, lastBlock.fileId);
            const split2 = createFileEntry(
              lastBlock.length - remainingSpace,
              lastBlock.fileId,
            );
            appendOrReplaceFileBlock(split1, compacted);
            diskMap[reverseIdx] = split2;
            remainingSpace = 0;
            endSpace += split1.length;
          }
        }
      }
    }
  }

  return [...compacted, createSpaceEntry(endSpace)];
};

const computeChecksum = (diskMap: DiskMap): number => {
  return diskMap.reduce(
    (acc, block) => {
      if (block.type === 'space') {
        return acc;
      }
      let blockSum = 0;
      for (let i = 0; i < block.length; i++) {
        blockSum += block.fileId * (i + acc.idx);
      }

      return {
        checksum: acc.checksum + blockSum,
        idx: acc.idx + block.length,
      };
    },
    { checksum: 0, idx: 0 },
  ).checksum;
};

(() => {
  const rawDiskMap = getFileLines(inputFile)[0].split('').map(Number);

  const diskMap = createDiskMap(rawDiskMap);

  const compacted = compact(diskMap);

  const checksum = computeChecksum(compacted);

  console.log({ checksum });
})();

// 1928
// 6225730762521
