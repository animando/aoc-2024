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

const getCountOfRoutesToTop =
  (map: Map) =>
  (position: Position): number => {
    if (isTop(position, map)) {
      return 1;
    }

    return getAdjacentPositions(position)
      .filter(isTraversableFrom(map, position))
      .reduce<number>((acc, pos) => {
        return acc + getCountOfRoutesToTop(map)(pos);
      }, 0);
  };

const getRating = (map: Map) => (trailhead: Position) => {
  return getCountOfRoutesToTop(map)(trailhead);
};

(() => {
  const map = getFileLines(inputFile).map((m) => m.split('').map(Number));

  const trailheads = getTrailheads(map);
  const totalRating = trailheads.map(getRating(map)).reduce(sum, 0);

  console.log({ totalRating });
})();

// 36
