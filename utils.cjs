const fs = require('node:fs');
const path = require('node:path');

const sum = (acc, it) => {
  return acc + it;
}

const getFileLines = (filePath) => {
  return fs.readFileSync(filePath, 'utf-8').split('\n');
}

const getInputFilePath = (filename) => {
  return path.join(__dirname, 'input', filename);
}

module.exports = {
  sum,
  getFileLines,
  getInputFilePath
}