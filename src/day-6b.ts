import { getFileLines } from 'utils';

type Map = string[][];

enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

type HistoryEntry = {
  x: number;
  y: number;
  direction: Direction;
};

type History = HistoryEntry[];

const lines = getFileLines('day-6b-sample.txt').map((line) => line.split(''));

const OBSTACLE = '#';
const VISITED = 'X';
const SPACE = '.';

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

const hasVisited = (
  testX: number,
  testY: number,
  testDirection: Direction,
  history: History,
) => {
  return history.find(
    ({ x, y, direction }) =>
      x === testX && y === testY && direction === testDirection,
  );
};

const navigateRec = (
  map: Map,
  x: number,
  y: number,
  direction: Direction,
  history: History,
) => {
  if (hasVisited(x, y, direction, history)) {
    return { map, x, y, inLoop: true };
  }
  if (isEnd(map, x, y, direction)) {
    map[y][x] = VISITED;
    return { map, x, y };
  }
  if (isPathBlocked(map, x, y, direction)) {
    return navigateRec(map, x, y, rotate(direction), history);
  }
  history.push({ x, y, direction });
  if (direction === 'up') {
    map[y][x] = VISITED;
    return navigateRec(map, x, y - 1, direction, history);
  }
  if (direction === 'right') {
    map[y][x] = VISITED;
    return navigateRec(map, x + 1, y, direction, history);
  }
  if (direction === 'down') {
    map[y][x] = VISITED;
    return navigateRec(map, x, y + 1, direction, history);
  }
  if (direction === 'left') {
    map[y][x] = VISITED;
    return navigateRec(map, x - 1, y, direction, history);
  }
  throw new Error('unhandled situation');
};

const navigate = (map: Map) => {
  const [x, y] = findPosition(map);
  return navigateRec(map, x, y, Direction.UP, []);
};

const printMap = (map: Map) => {
  map.forEach((line) => {
    console.log(line.join(''));
  });
};
const countPointsVisited = (map: Map) => {
  return map.reduce((acc, rows) => {
    return (
      acc +
      rows.reduce((rowAcc, cell) => {
        return rowAcc + (cell === VISITED ? 1 : 0);
      }, 0)
    );
  }, 0);
};

const cloneMap = (map: Map, x: number, y: number) => {
  const clone = map.map((row, rowIdx) =>
    row.map((cell, colIdx) => (rowIdx === y && colIdx === x ? OBSTACLE : cell)),
  );
  return clone;
};

const createClones = (map: Map) => {
  return map.reduce<Map[]>((rowClones, rows, y) => {
    return [
      ...rowClones,
      ...rows.reduce<Map[]>((colClones, _, x) => {
        return map[y][x] === SPACE
          ? [...colClones, cloneMap(map, x, y)]
          : colClones;
      }, []),
    ];
  }, []);
};

const maps = [lines, ...createClones(lines)];
const stuckInLoop = maps.filter((map) => {
  const { inLoop } = navigate(map);
  return inLoop === true;
});
const stuckInLoopCount = stuckInLoop.length;

console.log({ stuckInLoopCount });

// 4752
