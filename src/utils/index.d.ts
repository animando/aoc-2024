declare module 'utils' {
  export function sum(x: number, y: number): number;
  export function getFileLines(filePath: string): string[];
  export function getInputFilePath(fileName: string): string;
}
