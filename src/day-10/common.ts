export type Map = number[][];
export type Position = { x: number; y: number };

export const getTrailheads = (map: Map): Position[] => {
  return map.flatMap((row, y) => {
    return row.reduce<Position[]>((acc, val, x) => {
      if (val === 0) {
        acc.push({ x, y });
      }
      return acc;
    }, []);
  });
};

export const isTop = (p: Position, map: Map) => map[p.y][p.x] === 9;

export const getAdjacentPositions = (p: Position): Position[] => {
  return [
    { x: p.x - 1, y: p.y },
    { x: p.x + 1, y: p.y },
    { x: p.x, y: p.y - 1 },
    { x: p.x, y: p.y + 1 },
  ];
};

export const isTraversableFrom =
  (map: Map, startPosition: Position) => (testPosition: Position) => {
    if (
      testPosition.x < 0 ||
      testPosition.y < 0 ||
      testPosition.x >= map[0].length ||
      testPosition.y >= map.length
    ) {
      return false;
    }
    return (
      map[testPosition.y][testPosition.x] -
        map[startPosition.y][startPosition.x] ===
      1
    );
  };
