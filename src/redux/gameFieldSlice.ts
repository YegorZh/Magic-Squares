import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const colors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-600',
];
export interface gameFieldState {
  [key: string]: string[][];
}

const initialState: gameFieldState = {};

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

const allCheck = (
  name: string | undefined,
  state: gameFieldState,
  defaultCallback: (state: gameFieldState, name: string) => any,
  allCallback: (state: gameFieldState, key: string) => any
) => {
  if (name === 'ALL') {
    return Object.keys(state).forEach((key) => allCallback(state, key));
  } else if (name && state[name]) {
    return defaultCallback(state, name);
  }
};

export enum randAction {
  swipeAllColumns,
  swipeRow,
  swipeColumn,
  rotateField,
}

export const gameFieldSlice = createSlice({
  name: 'gameField',
  initialState,
  reducers: {
    initializeGameField: (
      state,
      action: PayloadAction<{ x: number; y: number; name: string }>
    ) => {
      const { x, y, name } = { ...action.payload };
      if (name !== 'ALL') {
        const out = [...Array(x)].map(() => [...Array(y)]);
        for (let i = 0; i < x; i++) {
          for (let j = 0; j < y; j++) {
            out[i][j] = colors[i];
          }
        }

        state[name] = out;
      }
    },
    swipeRow: (
      state,
      action: PayloadAction<{ index?: number; left: boolean; name?: string }>
    ) => {
      const { index, left, name } = action.payload;
      allCheck(
        name,
        state,
        (state, name) => {
          state[name] = swipeHorizontal(state[name], index, left);
        },
        (state, key) => {
          state[key] = swipeHorizontal(state[key], index, left);
        }
      );
    },
    swipeColumn: (
      state,
      action: PayloadAction<{ index: number; top: boolean; name?: string }>
    ) => {
      const { index, top, name } = action.payload;
      allCheck(
        name,
        state,
        (state, name) => {
          state[name] = swipeVertical([...state[name]], index, top);
        },
        (state, key) => {
          state[key] = swipeVertical([...state[key]], index, top);
        }
      );
    },
    turnGameField: (
      state,
      action: PayloadAction<{
        left: boolean;
        name?: string;
      }>
    ) => {
      const { left, name } = action.payload;
      allCheck(
        name,
        state,
        (state, name) => {
          state[name] = rotateField([...state[name]], left);
        },
        (state, key) => {
          state[key] = rotateField([...state[key]], left);
        }
      );
    },
    swipeAllColumns: (
      state,
      action: PayloadAction<{ top?: boolean; name?: string }>
    ) => {
      const { top, name } = action.payload;
      allCheck(
        name,
        state,
        (state, name) => {
          state[name] = swipeAllVertical([...state[name]], top);
        },
        (state, key) => {
          state[key] = swipeAllVertical([...state[key]], top);
        }
      );
    },
    randomizeField: (
      state,
      action: PayloadAction<{
        n: number;
      }>
    ) => {
      // const { n } = action.payload;
      // let out = { ...state };
      // for (let i = 0; i < n; i++) {
      //   const randomRow = Math.floor(Math.random() * out.main.length);
      //   const randomColumn = Math.floor(Math.random() * out.main.length);
      //   Object.keys(out).forEach(
      //     (key) =>
      //       (out[key] = swipeHorizontal([...out[key][randomRow]]))
      //   );
      //   Object.keys(out).forEach(
      //     (key) => (out[key] = swipeVertical([...out[key]], randomColumn))
      //   );
      //   out.left = rotateField(out.left);
      //   out.right = swipeAllVertical(out.right);
      // }
      // state.left = out.left;
      // state.main = out.main;
      // state.right = out.right;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initializeGameField,
  swipeRow,
  swipeColumn,
  turnGameField,
  swipeAllColumns,
  randomizeField,
} = gameFieldSlice.actions;
export default gameFieldSlice.reducer;
