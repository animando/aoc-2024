import { getFileLines, getInputFilePath } from 'utils';

type Map = string[][];
enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

const lines = getFileLines(getInputFilePath('day-6.txt')).map((line) =>
  line.split(''),
);

const OBSTACLE = '#';
const VISITED = 'X';

const findPosition = (map: Map) => {
  const y = map.findIndex((row) => row.includes('^'));
  const x = map[y].findIndex((val) => val === '^');
  return [x, y];
};
const isEnd = (map: Map, x: number, y: number, direction: Direction) => {
  if (direction === Direction.UP && y === 0) return true;
  if (direction === Direction.RIGHT && x === map[0].length - 1) return true;
  if (direction === Direction.DOWN && y === map.length - 1) return true;
  if (direction === Direction.LEFT && x === 0) return true;
  return false;
};
const isPathBlocked = (
  map: Map,
  x: number,
  y: number,
  direction: Direction,
) => {
  if (direction === Direction.UP && map[y - 1][x] === OBSTACLE) return true;
  if (direction === Direction.RIGHT && map[y][x + 1] === OBSTACLE) return true;
  if (direction === Direction.DOWN && map[y + 1][x] === OBSTACLE) return true;
  if (direction === Direction.LEFT && map[y][x - 1] === OBSTACLE) return true;
  return false;
};

const rotate = (direction: Direction) => {
  switch (direction) {
    case Direction.UP:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.LEFT;
    case Direction.LEFT:
      return Direction.UP;
    default:
      throw Error('error rotating');
  }
};

const navigateRec = (map: Map, x: number, y: number, direction: Direction) => {
  if (isEnd(map, x, y, direction)) {
    map[y][x] = VISITED;
    return { map, x, y };
  }
  if (isPathBlocked(map, x, y, direction)) {
    return navigateRec(map, x, y, rotate(direction));
  }
  if (direction === 'up') {
    map[y][x] = VISITED;
    return navigateRec(map, x, y - 1, direction);
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
  throw new Error('unhandled situation');
};

const navigate = (map: Map) => {
  const [x, y] = findPosition(map);
  return navigateRec(map, x, y, Direction.UP);
};

const { map } = navigate(lines);
const locationCount = map.reduce((acc, rows) => {
  return (
    acc +
    rows.reduce((rowAcc, cell) => {
      return rowAcc + (cell === VISITED ? 1 : 0);
    }, 0)
  );
}, 0);
console.log({ locationCount });

// 4752
