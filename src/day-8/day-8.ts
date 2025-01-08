import { getFileLines } from 'utils';

const SPACE = '.';
const antennaRegex = /[0-9A-Za-z]/;

type Map = string[][];
type Location = { x: number; y: number };
type LocationPair = [Location, Location];

const inputFile = 'day-8.txt';

const isOnMapForDimensions =
  (width: number, height: number) => (location: Location) => {
    return (
      location.x >= 0 &&
      location.x < width &&
      location.y >= 0 &&
      location.y < height
    );
  };
const isDupeOfExisting = (existing: Location[]) => (location: Location) => {
  return !!existing.find(
    ({ x: existingX, y: existingY }) =>
      location.x === existingX && location.y === existingY,
  );
};

const getNewAntinodes = (
  antennaPair: LocationPair,
  map: Map,
  existingAntinodes: Location[],
): Location[] => {
  const isOnMap = isOnMapForDimensions(map[0].length, map.length);
  const isDupe = isDupeOfExisting(existingAntinodes);

  const [aOne, aTwo] = antennaPair;

  const deltaX = aOne.x - aTwo.x;
  const deltaY = aOne.y - aTwo.y;

  const possibleLocations: Location[] = [
    { x: aOne.x + deltaX, y: aOne.y + deltaY },
    { x: aTwo.x - deltaX, y: aTwo.y - deltaY },
  ];

  const onMapPossibleLocations = possibleLocations.filter(isOnMap);

  const dedupedLocations = onMapPossibleLocations.filter(
    (location) => !isDupe(location),
  );

  return dedupedLocations;
};

const findMatchingAntenna = (
  startX: number,
  startY: number,
  antennaSymbol: string,
  map: Map,
): Location[] => {
  const height = map.length;
  const width = map[0].length;
  if (startX === width) {
    startX = 0;
    startY = startY + 1;
  }
  for (let y = startY; y < height; y++) {
    for (let x = y === startY ? startX : 0; x < width; x++) {
      if (map[y][x] === antennaSymbol) {
        return [{ x, y }, ...findMatchingAntenna(x + 1, y, antennaSymbol, map)];
      }
    }
  }
  return [];
};

const doAntennaCheck = (
  checkLocation: Location,
  map: Map,
  existing: Location[],
): Location[] => {
  const { x, y } = checkLocation;
  if (map[y][x] === SPACE) {
    return [];
  }
  const antennaMatch = map[y][x].match(antennaRegex);
  if (antennaMatch) {
    const antennaSymbol = antennaMatch[0];
    const matchedAntenna = findMatchingAntenna(x + 1, y, antennaSymbol, map);
    const antennaPairs: LocationPair[] = matchedAntenna.map((location) => [
      checkLocation,
      location,
    ]);
    return antennaPairs.flatMap((antennaPair) =>
      getNewAntinodes(antennaPair, map, existing),
    );
  }
  return [];
};

const countAntinodes = (map: Map): number => {
  const antinodeLocations = map.reduce<Location[]>((rowAcc, row, y) => {
    return [
      ...rowAcc,
      ...row.reduce<Location[]>((colAcc, _, x) => {
        return [
          ...colAcc,
          ...doAntennaCheck({ x, y }, map, [...rowAcc, ...colAcc]),
        ];
      }, []),
    ];
  }, []);

  return antinodeLocations.length;
};

const main = () => {
  const map = getFileLines(inputFile).map((line) => line.split(''));

  const count = countAntinodes(map);
  console.log({ count });
};

main();
