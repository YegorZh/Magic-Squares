const checkIndex = (size: number, index?: number) => {
  if (index === undefined) index = Math.floor(Math.random() * size);
  return Math.max(0, Math.min(index, size));
};

const checkIndexArr = (size: number, indexArr?: number | number[]) => {
  let outIndexes: (number | undefined)[];
  if (!Array.isArray(indexArr)) outIndexes = [indexArr];
  else outIndexes = indexArr;
  return [...new Set(outIndexes.map((index) => checkIndex(size, index)))];
};

const swipeHorizontal = (
  arr: string[][],
  rowIndexes?: number | number[],
  left?: boolean
) => {
  const indexes = checkIndexArr(arr.length, rowIndexes);
  let mapAction = (index: number, i: number) => {
    if (i === 0) return arr[index][arr.length - 1];
    return arr[index][i - 1];
  };

  if (left)
    mapAction = (index: number, i: number) => {
      if (i === arr.length - 1) return arr[index][0];
      return arr[index][i + 1];
    };
  indexes.forEach(
    (index) => (arr[index] = arr[index].map((_, i) => mapAction(index, i)))
  );
  return arr;
};

const swipeVertical = (
  arr: string[][],
  columnIndexes?: number | number[],
  top?: boolean
) => {
  const indexes = checkIndexArr(arr[0].length, columnIndexes);
  let mapAction = (row: string[], index: number, i: number) => {
    const newRow = [...row];
    if (i === 0) newRow[index] = arr[arr.length - 1][index];
    else newRow[index] = arr[i - 1][index];
    return newRow;
  };
  if (top) {
    mapAction = (row: string[], index: number, i: number) => {
      const newRow = [...row];
      if (i === arr.length - 1) newRow[index] = arr[0][index];
      else newRow[index] = arr[i + 1][index];
      return newRow;
    };
  }
  indexes.forEach(
    (index) => (arr = arr.map((row, i) => mapAction(row, index, i)))
  );
  return arr;
};

const rotateField = (arr: string[][], left?: boolean) => {
  let mapAction = (i: number, j: number) => arr[arr.length - 1 - j][i];
  if (left) mapAction = (i: number, j: number) => arr[j][arr.length - 1 - i];
  return arr.map((row, i) => {
    return row.map((_, j) => {
      return mapAction(i, j);
    });
  });
};

const swipeAllVertical = (arr: string[][], top?: boolean) => {
  return swipeVertical(arr, [...Array(arr[0].length).keys()], top);
};

const swipeAllHorizontal = (arr: string[][], left?: boolean) => {
  return swipeHorizontal(arr, [...Array(arr.length).keys()], left);
};

const namesCheck = (names: string | string[]) => {
  let out: string[];
  if (!Array.isArray(names)) out = [names];
  else out = names;
  return out;
};

export {
  swipeAllHorizontal,
  swipeAllVertical,
  swipeHorizontal,
  swipeVertical,
  rotateField,
  namesCheck,
  checkIndex,
};
