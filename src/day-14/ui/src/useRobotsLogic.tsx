import { useCallback, useEffect, useRef, useState } from 'react';
import { getRobotsWithAdjacentIndication } from './day-14b';
import { Robot, updateRobots } from '../../common';

const STOP_THRESHOLD = 0.5;

export const useRobotsLogic = (initialRobots: Robot[]) => {
  const [robots, setRobots] = useState(
    getRobotsWithAdjacentIndication(initialRobots),
  );
  const [ratioWithAdjacent, setRatioWithAdjacent] = useState<number>();
  const [tickCount, setTickCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const tick = useCallback(() => {
    setTickCount((tc) => tc + 1);
    setRobots((rr) => getRobotsWithAdjacentIndication(updateRobots(rr)));
  }, []);

  const start = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(tick, 1);
    }
  }, [tick]);

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, [start, stop, tick]);

  useEffect(() => {
    const ratio =
      robots.filter(({ hasAdjacent }) => hasAdjacent).length / robots.length;
    setRatioWithAdjacent(ratio);
    if (ratio > STOP_THRESHOLD) {
      stop();
    }
  }, [robots, stop]);

  return {
    tickCount,
    ratioWithAdjacent,
    robots,
    start,
    stop,
  };
};
