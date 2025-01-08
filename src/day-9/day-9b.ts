import {
  DiskMap,
  BlockType,
  createSpaceEntry,
  computeChecksum,
  createDiskMapFromFile,
  FileBlock,
  SpaceBlock,
} from './common.js';

const inputFile = 'day-9.txt';

const compact = (diskMap: DiskMap) => {
  let lastFileId = diskMap.findLast(
    (block) => block.type === BlockType.FILE,
  )?.fileId;
  if (lastFileId === undefined) {
    return diskMap;
  }

  for (; lastFileId >= 0; lastFileId--) {
    const blockIdx = diskMap.findLastIndex(
      (b) => b.type === BlockType.FILE && b.fileId === lastFileId,
    );
    const block = diskMap[blockIdx] as FileBlock;
    if (!block) {
      continue;
    }
    const spaceIdx = diskMap.findIndex(
      (b, i) =>
        b.type === BlockType.SPACE && b.length >= block.length && i < blockIdx,
    );
    if (spaceIdx !== -1) {
      const space = diskMap[spaceIdx] as SpaceBlock;
      if (space.length === block.length) {
        diskMap[spaceIdx] = block;
        diskMap.splice(blockIdx, 1, createSpaceEntry(block.length));
      } else {
        const split2 = createSpaceEntry(space.length - block.length);
        diskMap.splice(blockIdx, 1, createSpaceEntry(block.length));
        diskMap.splice(spaceIdx, 1, block, split2);
      }
    }
  }
};

(() => {
  const diskMap = createDiskMapFromFile(inputFile);

  compact(diskMap);

  const checksum = computeChecksum(diskMap);

  console.log({ checksum });
})();

// 6250605700557
