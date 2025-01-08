import {
  DiskMap,
  BlockType,
  appendOrReplaceFileBlock,
  createFileEntry,
  createSpaceEntry,
  computeChecksum,
  createDiskMapFromFile,
} from './common.js';

const inputFile = 'day-9.txt';

const compact = (diskMap: DiskMap): DiskMap => {
  let reverseIdx = diskMap.length - 1;
  const compacted: DiskMap = [];
  let endSpace: number = 0;

  for (let idx = 0; reverseIdx >= idx; idx++) {
    const block = diskMap[idx];

    if (block.type === BlockType.FILE) {
      appendOrReplaceFileBlock(block, compacted);
    } else {
      let remainingSpace = block.length;
      while (remainingSpace > 0) {
        const lastBlock = diskMap[reverseIdx];
        if (lastBlock.type === BlockType.SPACE) {
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

(() => {
  const diskMap = createDiskMapFromFile(inputFile);

  const compacted = compact(diskMap);

  const checksum = computeChecksum(compacted);

  console.log({ checksum });
})();

// 1928
// 6225730762521
