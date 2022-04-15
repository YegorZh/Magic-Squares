import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { objectTraps } from 'immer/dist/internal';

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

const swipeHorizontal = (arr: string[], left?: boolean) => {
  let mapAction = (i: number) => {
    if (i === 0) return arr[arr.length - 1];
    return arr[i - 1];
  };

  if (left)
    mapAction = (i: number) => {
      if (i === arr.length - 1) return arr[0];
      return arr[i + 1];
    };

  return arr.map((_, i) => mapAction(i));
};

const swipeVertical = (arr: string[][], index: number, top?: boolean) => {
  let mapAction = (row: string[], i: number) => {
    const newRow = [...row];
    if (i === 0) newRow[index] = arr[arr.length - 1][index];
    else newRow[index] = arr[i - 1][index];
    return newRow;
  };
  if (top) {
    mapAction = (row: string[], i: number) => {
      const newRow = [...row];
      if (i === arr.length - 1) newRow[index] = arr[0][index];
      else newRow[index] = arr[i + 1][index];
      return newRow;
    };
  }
  return arr.map((row, i) => mapAction(row, i));
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
  let mapAction = (i: number, j: number) => {
    if (i === 0) return arr[arr.length - 1][j];
    return arr[i - 1][j];
  };
  if (top)
    mapAction = (i: number, j: number) => {
      if (i === arr.length - 1) return arr[0][j];
      return arr[i + 1][j];
    };
  return arr.map((row, i) => row.map((_, j) => mapAction(i, j)));
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
      action: PayloadAction<{ index: number; left: boolean; name?: string }>
    ) => {
      const { index, left, name } = action.payload;
      allCheck(
        name,
        state,
        (state, name) => {
          if (index > 0 || index < state[name].length)
            state[name][index] = swipeHorizontal(state[name][index], left);
        },
        (state, key) => {
          if (index > 0 || index < state[key].length)
            state[key][index] = swipeHorizontal(state[key][index], left);
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
          if (index > 0 || index < state[name].length)
            state[name] = swipeVertical([...state[name]], index, top);
        },
        (state, key) => {
          if (index > 0 || index < state[key].length)
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
      const { n } = action.payload;
      let out = { ...state };
      for (let i = 0; i < n; i++) {
        const randomRow = Math.floor(Math.random() * out.main.length);
        const randomColumn = Math.floor(Math.random() * out.main.length);
        Object.keys(out).forEach(
          (key) =>
            (out[key][randomRow] = swipeHorizontal([...out[key][randomRow]]))
        );
        Object.keys(out).forEach(
          (key) => (out[key] = swipeVertical([...out[key]], randomColumn))
        );
        out.left = rotateField(out.left);
        out.right = swipeAllVertical(out.right);
      }
      state.left = out.left;
      state.main = out.main;
      state.right = out.right;
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
