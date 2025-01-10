export type Position = {
  x: number;
  y: number;
};
export type Velocity = {
  x: number;
  y: number;
};
export type Robot = {
  idx: number;
  pos: Position;
  velocity: Velocity;
};

export const robotRegEx = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/;
export const parseRobot = (line: string, idx: number): Robot => {
  const match = line.match(robotRegEx);
  if (!match) {
    throw Error('invalid input: ' + line);
  }
  return {
    idx,
    pos: {
      x: Number(match[1]),
      y: Number(match[2]),
    },
    velocity: {
      x: Number(match[3]),
      y: Number(match[4]),
    },
  };
};

export const MAP_WIDTH = 101;
export const MAP_HEIGHT = 103;

export const updateRobots = (robots: Robot[]): Robot[] => {
  return robots.map((robot) => {
    const newX = (robot.pos.x + robot.velocity.x) % MAP_WIDTH;
    const newY = (robot.pos.y + robot.velocity.y) % MAP_HEIGHT;

    return {
      ...robot,
      pos: {
        x: newX >= 0 ? newX : MAP_WIDTH + newX,
        y: newY >= 0 ? newY : MAP_HEIGHT + newY,
      },
    };
  });
};
