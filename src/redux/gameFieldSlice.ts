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
  value: string[][];
}

const initialState: gameFieldState = {
  value: [],
};

const swipeHorizontal = (arr: string[], left: boolean) => {
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

export const gameFieldSlice = createSlice({
  name: 'gameField',
  initialState,
  reducers: {
    initializeGameField: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      const coordinates = { ...action.payload };
      coordinates.x = Math.min(coordinates.x, 6);
      coordinates.y = Math.min(coordinates.y, 6);
      const out = [...Array(coordinates.x)].map(() => [
        ...Array(coordinates.y),
      ]);

      for (let i = 0; i < coordinates.x; i++) {
        for (let j = 0; j < coordinates.y; j++) {
          out[i][j] = colors[i];
        }
      }

      state.value = out;
    },
    swipeRow: (
      state,
      action: PayloadAction<{ index: number; left: boolean }>
    ) => {
      const { index, left } = action.payload;
      if (index > 0 || index < state.value.length) {
        state.value[index] = swipeHorizontal(state.value[index], left);
      }
    },
    swipeColumn: (
      state,
      action: PayloadAction<{ index: number; top: boolean }>
    ) => {
      const { index, top } = action.payload;
      if (index > 0 || index < state.value.length) {
        state.value = swipeVertical([...state.value], index, top);
      }
    },
    turnGameField: (
      state,
      action: PayloadAction<{ left: boolean; fieldIndex?: number }>
    ) => {
      state.value = rotateField([...state.value], action.payload.left);
    },
    swipeAllColumns: (state, action: PayloadAction<{ top?: boolean }>) => {
      state.value = swipeAllVertical([...state.value], action.payload.top);
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
} = gameFieldSlice.actions;
export default gameFieldSlice.reducer;
