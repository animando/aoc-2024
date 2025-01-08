export const MULTIPLIER_VALUE = 2024;
export type ResultCache = Record<string, number[] | undefined>;

export const createResultCache = (): ResultCache => ({
  0: [1],
});

export const getNewValue = (stoneValue: number): number[] => {
  if (stoneValue === 0) {
    return [1];
  } else if (stoneValue.toString().length % 2 === 0) {
    const asString = stoneValue.toString();
    const midPoint = asString.length / 2;
    const split1 = Number(asString.substring(0, midPoint));
    const split2 = Number(asString.substring(midPoint));
    return [split1, split2];
  } else {
    const result = stoneValue * 2024;
    return [result];
  }
};

export const getValue = (stoneValue: number, cache: ResultCache): number[] => {
  const storedValue = cache[stoneValue];
  return storedValue !== undefined ? storedValue : getNewValue(stoneValue);
};
