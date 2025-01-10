import './App.css';

import data from '../../../../input/day-14.txt?raw';

import { Layer, Rect, Stage } from 'react-konva';

import { parseRobot, MAP_WIDTH, MAP_HEIGHT } from '../../common';
import { useRobotsLogic } from './useRobotsLogic';
import { RobotsView } from './RobotsView';

const initialRobots = data.split('\n').map(parseRobot);

export const RobotsController = () => {
  const { tickCount, ratioWithAdjacent, start, stop, robots } =
    useRobotsLogic(initialRobots);

  return (
    <>
      <p>{tickCount}</p>
      <p>{ratioWithAdjacent}</p>
      <Stage width={MAP_WIDTH * 2} height={MAP_HEIGHT * 2}>
        <Layer>
          <Rect
            stroke='black'
            strokeWidth={2}
            x={1}
            y={1}
            width={MAP_WIDTH * 2 - 2}
            height={MAP_HEIGHT * 2 - 2}
          />
        </Layer>
        <RobotsView robots={robots} />
      </Stage>
      <button onClick={stop}>Stop</button>
      <button onClick={start}>Start</button>
    </>
  );
};
