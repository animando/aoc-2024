import { Position, Robot } from '../../common';

export type RobotWithAdjacentIndication = Robot & {
  hasAdjacent: boolean;
};

const createRobotMap = (robots: Robot[]) => {
  return robots.reduce<boolean[][]>(
    (map, { pos }) => {
      if (!map[pos.y]) map[pos.y] = [];
      map[pos.y][pos.x] = true;
      return map;
    },
    [[]],
  );
};
const createAdjacentPositions = ({ x, y }: Position): Position[] => [
  { x: x - 1, y },
  { x: x + 1, y },
  { x, y: y - 1 },
  { x, y: y + 1 },
];

const createHasAdjacent = (robots: Robot[]) => {
  const map = createRobotMap(robots);
  return (pos: Position): boolean =>
    !!createAdjacentPositions(pos).find(({ x, y }) => !!map[y]?.[x]);
};

export const getRobotsWithAdjacentIndication = (
  robots: Robot[],
): RobotWithAdjacentIndication[] => {
  const hasAdjacent = createHasAdjacent(robots);
  return robots.map((r) => ({ ...r, hasAdjacent: hasAdjacent(r.pos) }));
};
