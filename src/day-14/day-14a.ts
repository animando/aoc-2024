import { getFileLines } from 'utils';
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  parseRobot,
  Position,
  Robot,
  updateRobots,
} from './common.js';

const inputFile = 'day-14.txt';

type QuadrantCount = [number, number, number, number];
type Quadrant = 0 | 1 | 2 | 3 | null;

const isLeft = (pos: Position): boolean => pos.x < (MAP_WIDTH - 1) / 2;
const isRight = (pos: Position): boolean => pos.x > (MAP_WIDTH - 1) / 2;
const isTop = (pos: Position): boolean => pos.y < (MAP_HEIGHT - 1) / 2;
const isBottom = (pos: Position): boolean => pos.y > (MAP_HEIGHT - 1) / 2;

const getQuadrant = (pos: Position): Quadrant => {
  if (isLeft(pos)) {
    if (isTop(pos)) {
      return 0;
    }
    if (isBottom(pos)) {
      return 2;
    }
  }
  if (isRight(pos)) {
    if (isTop(pos)) {
      return 1;
    }
    if (isBottom(pos)) {
      return 3;
    }
  }
  return null;
};

export const initRobots = () => getFileLines(inputFile).map(parseRobot);

const calculateSafetyFactor = (robots: Robot[]) => {
  const quadrantCount = robots.reduce<QuadrantCount>(
    (acc, r) => {
      const q = getQuadrant(r.pos);
      if (q !== null) {
        acc[q]++;
      }
      return acc;
    },
    [0, 0, 0, 0],
  );
  return quadrantCount.reduce((acc, v) => acc * v, 1);
};

const NUM_TICKS = 100;

(() => {
  let robots = initRobots();
  for (let i = 0; i < NUM_TICKS; i++) {
    robots = updateRobots(robots);
  }
  const safetyFactor = calculateSafetyFactor(robots);
  console.log({ safetyFactor });
})();

// 222208000
