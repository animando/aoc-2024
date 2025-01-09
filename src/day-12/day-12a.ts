import { getFileLines, sum } from 'utils';
import { getCropRegions, Map, Region } from './common.js';

const inputFile = 'day-12.txt';

const computeCost = (regions: Region[]): number =>
  regions
    .map(({ plots, perimeter }) => plots.length * perimeter)
    .reduce(sum, 0);

(() => {
  const map: Map = getFileLines(inputFile).map((row) => row.split(''));
  const regions = getCropRegions(map);
  const totalPrice = computeCost(regions);

  console.log({ totalPrice });
})();
