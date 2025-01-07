const { getFileLines, getInputFilePath } = require('./utils.cjs');

const lines = getFileLines(getInputFilePath('day-6.txt')).map((line) => line.split(''));

const OBSTACLE = '#';
const VISITED = 'X'

const findPosition = (map) => {
  const y = map.findIndex((row) => row.includes('^'));
  const x = map[y].findIndex((val) => val === '^')
  return [x, y];
}
const isEnd = (map, x, y, direction) => {
  if (direction === 'up' && y === 0) return true;
  if (direction === 'right' && x === map[0].length - 1) return true;
  if (direction === 'down' && y === map.length - 1) return true;
  if (direction === 'left' && x === 0) return true;
  return false;
}
const isPathBlocked = (map, x, y, direction) => {
  if (direction === 'up' && map[y-1][x] === OBSTACLE) return true;
  if (direction === 'right' && map[y][x+1] === OBSTACLE) return true;
  if (direction === 'down' && map[y+1][x] === OBSTACLE) return true;
  if (direction === 'left' && map[y][x-1] === OBSTACLE) return true;
  return false;
}

const rotate = (direction) => {
  switch (direction) {
    case 'up':
      return 'right';
    case 'right':
      return 'down';
    case 'down':
      return 'left';
    case 'left':
      return 'up';
    default:
      throw Error('error rotating');
  }
}

const navigateRec = (map, x, y, direction) => {
  if (isEnd(map, x, y, direction)) {
    map[y][x] = VISITED;
    return {map, x, y};
  }
  if (isPathBlocked(map, x, y, direction)) {
    return navigateRec(map, x, y, rotate(direction));
  }
  if (direction === 'up') {
    map[y][x] = VISITED;
    return navigateRec(map, x, y-1, direction);
  }
  if (direction === 'right') {
    map[y][x] = VISITED;
    return navigateRec(map, x + 1, y, direction);
  }
  if (direction === 'down') {
    map[y][x] = VISITED;
    return navigateRec(map, x, y + 1, direction);
  }
  if (direction === 'left') {
    map[y][x] = VISITED;
    return navigateRec(map, x - 1, y, direction);
  }
}

const navigate = (map) => {
  const [x, y] = findPosition(map);
  return navigateRec(map, x, y, 'up');
}

const {map } = navigate(lines);
const locationCount = map.reduce((acc, rows) => {
  return acc + rows.reduce((rowAcc, cell) => {
    return rowAcc + (cell === VISITED ? 1 : 0);
  }, 0);
}, 0)
console.log({ locationCount })

// 4752