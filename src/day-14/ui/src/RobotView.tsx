import { Rect } from 'react-konva';
import { RobotWithAdjacentIndication } from './day-14b.js';

export const RobotView = ({
  robot,
}: {
  robot: RobotWithAdjacentIndication;
}) => {
  return (
    <Rect
      x={robot.pos.x * 2}
      y={robot.pos.y * 2}
      width={2}
      height={2}
      fill={robot.hasAdjacent ? 'red' : 'black'}
    />
  );
};
