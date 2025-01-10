import fs from 'fs';
import path from 'path';

export const sum = (acc: number, it: number) => {
  return acc + it;
};

export const getFileLines = (fileName: string) => {
  return fs.readFileSync(getInputFilePath(fileName), 'utf-8').split('\n');
};

export const getInputFilePath = (filename: string) => {
  return path.join(__dirname, '..', '..', 'input', filename);
};
