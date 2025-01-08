import { getFileLines } from 'utils';

export enum BlockType {
  FILE,
  SPACE,
}

export type FileBlock = {
  type: BlockType.FILE;
  fileId: number;
  length: number;
};
export type SpaceBlock = {
  type: BlockType.SPACE;
  length: number;
};
export type Block = FileBlock | SpaceBlock;
export type DiskMap = Block[];

export const createFileEntry = (length: number, fileId: number): FileBlock => {
  return {
    type: BlockType.FILE,
    fileId,
    length,
  };
};

export const createSpaceEntry = (length: number): SpaceBlock => {
  return {
    type: BlockType.SPACE,
    length,
  };
};

export const createDiskMap = (diskmap: number[]): DiskMap => {
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

export const createDiskMapFromFile = (filename: string) => {
  const rawDiskMap = getFileLines(filename)[0].split('').map(Number);

  return createDiskMap(rawDiskMap);
};

export const appendOrReplaceFileBlock = (
  block: FileBlock,
  diskMap: DiskMap,
) => {
  const headBlock = diskMap[diskMap.length - 1];

  if (
    headBlock &&
    headBlock.type === BlockType.FILE &&
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

export const computeChecksum = (diskMap: DiskMap): number => {
  return diskMap.reduce(
    (acc, block) => {
      if (block.type === BlockType.SPACE) {
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
