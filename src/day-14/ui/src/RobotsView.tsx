import './App.css';

import { Layer } from 'react-konva';
import { RobotView } from './RobotView';

import { RobotWithAdjacentIndication } from './day-14b';

export const RobotsView = ({
  robots,
}: {
  robots: RobotWithAdjacentIndication[];
}) => {
  return (
    <Layer clearBeforeDraw>
      {robots.map((r) => (
        <RobotView key={r.idx} robot={r} />
      ))}
    </Layer>
  );
};
