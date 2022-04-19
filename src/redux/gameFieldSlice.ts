import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const colors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-600',
];
export type GameFieldActions = {
  swipe?: string[] | string;
  turn?: string[] | string;
  swipeAll?: string[] | string;
};

export interface gameFieldData {
  field: string[][];
  actions?: GameFieldActions;
}

export interface gameFieldState {
  [key: string]: gameFieldData;
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

const namesCheck = (names: string | string[]) => {
  let out: string[];
  if (!Array.isArray(names)) out = [names];
  else out = names;
  return out;
};

const allCheck = (
  names: string | string[],
  state: gameFieldState,
  defaultCallback: (state: gameFieldState, name: string) => any,
  allCallback: (state: gameFieldState, key: string) => any
) => {
  if (names === 'ALL')
    return Object.keys(state).forEach((key) => allCallback(state, key));
  namesCheck(names).forEach((name) => {
    defaultCallback(state, name);
  });
};

export const gameFieldSlice = createSlice({
  name: 'gameField',
  initialState,
  reducers: {
    initializeGameField: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
        name: string;
        actions?: GameFieldActions;
      }>
    ) => {
      const { x, y, name, actions } = { ...action.payload };
      if (name !== 'ALL') {
        const out = [...Array(x)].map(() => [...Array(y)]);
        for (let i = 0; i < x; i++) {
          for (let j = 0; j < y; j++) {
            out[i][j] = colors[i];
          }
        }

        state[name] = { field: out, actions };
      }
    },
    swipeRow: (
      state,
      action: PayloadAction<{
        index?: number;
        left: boolean;
        names: string | string[];
      }>
    ) => {
      const { index, left, names } = action.payload;
      allCheck(
        names,
        state,
        (state, name) => {
          state[name].field = swipeHorizontal(state[name].field, index, left);
        },
        (state, key) => {
          state[key].field = swipeHorizontal(state[key].field, index, left);
        }
      );
    },
    swipeColumn: (
      state,
      action: PayloadAction<{
        index: number;
        top: boolean;
        names: string | string[];
      }>
    ) => {
      const { index, top, names } = action.payload;
      allCheck(
        names,
        state,
        (state, name) => {
          state[name].field = swipeVertical([...state[name].field], index, top);
        },
        (state, key) => {
          state[key].field = swipeVertical([...state[key].field], index, top);
        }
      );
    },
    turnGameField: (
      state,
      action: PayloadAction<{
        left: boolean;
        names: string | string[];
      }>
    ) => {
      const { left, names } = action.payload;
      allCheck(
        names,
        state,
        (state, name) => {
          state[name].field = rotateField([...state[name].field], left);
        },
        (state, key) => {
          state[key].field = rotateField([...state[key].field], left);
        }
      );
    },
    swipeAllColumns: (
      state,
      action: PayloadAction<{ top?: boolean; names: string | string[] }>
    ) => {
      const { top, names } = action.payload;
      allCheck(
        names,
        state,
        (state, name) => {
          state[name].field = swipeAllVertical([...state[name].field], top);
        },
        (state, key) => {
          state[key].field = swipeAllVertical([...state[key].field], top);
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
