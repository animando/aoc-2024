const { getFileLines, getInputFilePath } = require("./utils.cjs");

const lines = getFileLines(getInputFilePath('day-4.txt')).map((line) => line.split(''));

const searchInLetters = (wordCoords) => {
  const word = wordCoords.reduce((acc, [y, x]) => {
    const letter = lines[y]?.[x] ?? '';
    return `${acc}${letter}`
  }, '');
  return word === 'XMAS' ? 1 : 0;
}

const searchFrom = (x, y) => {
  const searchSouth = () => {
    return searchInLetters([[y, x], [y+1,x], [y+2, x], [y+3, x]]);
  }
  const searchNorth = () => {
    return searchInLetters([[y, x], [y-1,x], [y-2, x], [y-3, x]]);
  }
  const searchNw = () => {
    return searchInLetters([[y, x], [y-1,x-1], [y-2, x-2], [y-3, x-3]]);
  }
  const searchSe = () => {
    return searchInLetters([[y, x], [y+1,x+1], [y+2, x+2], [y+3, x+3]]);
  }
  const searchSw = () => {
    return searchInLetters([[y, x], [y+1,x-1], [y+2, x-2], [y+3, x-3]]);
  }
  const searchNe = () => {
    return searchInLetters([[y, x], [y-1,x+1], [y-2, x+2], [y-3, x+3]]);
  }


  return searchSouth()+ searchNorth() + searchNw() + searchSe() + searchSw() + searchNe();
}
const total = lines.reduce((count, line, y) => {
  const lineStr = line.join('')
  const hzCount = [...lineStr.matchAll(/XMAS/g)].length + [...lineStr.matchAll(/SAMX/g)].length;
  return count + hzCount + line.reduce((innerCount, char, x) => {
    if (char === 'X') {
      return innerCount + searchFrom(x, y);
    }
    return innerCount
  }, 0);
}, 0);

console.log({total })
// 2571