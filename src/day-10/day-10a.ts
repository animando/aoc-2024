import { getFileLines, sum } from 'utils';
import {
  getAdjacentPositions,
  getTrailheads,
  isTop,
  isTraversableFrom,
  Map,
  Position,
} from './common.js';

const inputFile = 'day-10.txt';

const getTopPositionsTraversableFrom =
  (map: Map) =>
  (position: Position): Position[] => {
    if (isTop(position, map)) {
      return [position];
    }

    return getAdjacentPositions(position)
      .filter(isTraversableFrom(map, position))
      .reduce<Position[]>((acc, pos) => {
        const positions = getTopPositionsTraversableFrom(map)(pos);
        positions.forEach((p) => {
          if (!acc.find((v) => v.x === p.x && v.y === p.y)) {
            acc.push(p);
          }
        });
        return acc;
      }, []);
  };

const getScore = (map: Map) => (trailhead: Position) => {
  return getTopPositionsTraversableFrom(map)(trailhead).length;
};

(() => {
  const map = getFileLines(inputFile).map((m) => m.split('').map(Number));

  const trailheads = getTrailheads(map);
  const totalScore = trailheads.map(getScore(map)).reduce(sum, 0);

  console.log({ totalScore });
})();

// 36
