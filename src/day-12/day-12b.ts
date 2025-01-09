import { getFileLines, sum } from 'utils';
import { getCropRegions, Map, Position, Region } from './common.js';

const inputFile = 'day-12.txt';

type PlotMap = boolean[][];
type RegionHasPosition = (x: number, y: number) => boolean;

const createPlotMap = (plots: Position[]) => {
  return plots.reduce<PlotMap>((acc, plot) => {
    if (acc[plot.y] === undefined) {
      acc[plot.y] = [];
    }
    acc[plot.y][plot.x] = true;
    return acc;
  }, []);
};

const computeCost = (regions: Region[]) =>
  regions
    .map((region) => countSides(region) * region.plots.length)
    .reduce(sum, 0);

const regionHasPosition = (region: Region): RegionHasPosition => {
  const plotMap = createPlotMap(region.plots);
  return (x: number, y: number) =>
    x >= 0 && y >= 0 && !!plotMap[y] && !!plotMap[y][x];
};

const countOuterCorners = (pos: Position, hasPosition: RegionHasPosition) => {
  const hasLeft = hasPosition(pos.x - 1, pos.y);
  const hasRight = hasPosition(pos.x + 1, pos.y);
  const hasUp = hasPosition(pos.x, pos.y - 1);
  const hasDown = hasPosition(pos.x, pos.y + 1);

  return [
    !hasLeft && !hasUp,
    !hasUp && !hasRight,
    !hasRight && !hasDown,
    !hasDown && !hasLeft,
  ].reduce((acc, b) => (b ? acc + 1 : acc), 0);
};

const countInnerCorners = (pos: Position, hasPosition: RegionHasPosition) => {
  const hasWest = hasPosition(pos.x - 1, pos.y);
  const hasEast = hasPosition(pos.x + 1, pos.y);
  const hasNorth = hasPosition(pos.x, pos.y - 1);
  const hasSouth = hasPosition(pos.x, pos.y + 1);
  const hasSe = hasPosition(pos.x + 1, pos.y + 1);
  const hasSw = hasPosition(pos.x - 1, pos.y + 1);
  const hasNe = hasPosition(pos.x + 1, pos.y - 1);
  const hasNw = hasPosition(pos.x - 1, pos.y - 1);

  return [
    hasEast && hasSouth && !hasSe,
    hasEast && hasNorth && !hasNe,
    hasWest && hasSouth && !hasSw,
    hasWest && hasNorth && !hasNw,
  ].reduce((acc, b) => (b ? acc + 1 : acc), 0);
};

const cornerCount = (pos: Position, hasPosition: RegionHasPosition) =>
  countOuterCorners(pos, hasPosition) + countInnerCorners(pos, hasPosition);

const countSides = (region: Region) => {
  const hasPosition = regionHasPosition(region);
  return region.plots.reduce(
    (acc, plot) => acc + cornerCount(plot, hasPosition),
    0,
  );
};

(() => {
  const map: Map = getFileLines(inputFile).map((row) => row.split(''));
  const regions = getCropRegions(map);

  const totalPrice = computeCost(regions);
  console.log({ totalPrice });
})();

// 849332
