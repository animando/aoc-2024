export type Map = string[][];
export type Position = { x: number; y: number };
export type Region = {
  crop: string;
  plots: Position[];
  perimeter: number;
};
export type PlotPosition = {
  x: number;
  y: number;
  perimeter: number;
};

const positionAsString = (x: number, y: number) => `${x},${y}`;

const getAdjacentPlots = (
  map: Map,
  posX: number,
  posY: number,
  visited: Set<string>,
): Position[] => {
  const adjacent = [
    { x: posX + 1, y: posY },
    { x: posX - 1, y: posY },
    { x: posX, y: posY + 1 },
    { x: posX, y: posY - 1 },
  ]
    .filter(({ x, y }) => x >= 0 && y >= 0)
    .filter(({ x, y }) => x < map[0].length && y < map.length)
    // .filter(({ x, y }) => !visited.has(positionAsString(x, y)))
    .filter(({ x, y }) => map[y][x] === map[posY][posX]);

  return adjacent;
};

const exploreRegion = (
  map: Map,
  posX: number,
  posY: number,
  visited: Set<string>,
): PlotPosition[] => {
  const v = positionAsString(posX, posY);
  if (visited.has(v)) {
    return [];
  }
  visited.add(v);

  const adjacent = getAdjacentPlots(map, posX, posY, visited);
  return [
    { x: posX, y: posY, perimeter: 4 - adjacent.length },
    ...adjacent.flatMap(({ x, y }) => exploreRegion(map, x, y, visited)),
  ];
};

const getCropRegionsFrom = (
  map: Map,
  from: Position,
  visitedPositions: Set<string>,
): Region[] => {
  const regions: Region[] = [];
  for (let y = from.y; y < map.length; y++) {
    for (let x = from.x; x < map[0].length; x++) {
      if (!visitedPositions.has(positionAsString(x, y))) {
        const plots = exploreRegion(map, x, y, visitedPositions);
        const region: Region = {
          crop: map[y][x],
          plots,
          perimeter: plots.reduce<number>(
            (acc, { perimeter }) => acc + perimeter,
            0,
          ),
        };
        // console.log(region.crop, region.plotMap);
        regions.push(region);
      }
    }
  }
  return regions;
};

export const getCropRegions = (map: Map): Region[] => {
  const visitedPositions = new Set<string>();
  return getCropRegionsFrom(map, { x: 0, y: 0 }, visitedPositions);
};
