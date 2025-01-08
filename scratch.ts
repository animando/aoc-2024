var array = [6, 16, 20, 24];
var array2 = [0, 1];

const getOptionsRecurse = (subArr: number[]): number[][] => {
  if (subArr.length === 0) {
    return [[]];
  }
  const rest = getOptionsRecurse(subArr.slice(1));
  return array2.flatMap<number[]>((op) => {
    return rest.map((r) => {
      return [op, ...r];
    });
  });
};
var result3 = getOptionsRecurse(array);

console.log(result3);
