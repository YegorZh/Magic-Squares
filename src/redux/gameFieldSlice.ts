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
        let out = [...state.value[index]];
        if (left) {
          out = out.map((_, i) => {
            if (i === out.length - 1) return out[0];
            return out[i + 1];
          });
        } else {
          out = out.map((_, i) => {
            if (i === 0) return out[out.length - 1];
            return out[i - 1];
          });
        }
        state.value[index] = out;
      }
    },
    swipeColumn: (
      state,
      action: PayloadAction<{ index: number; top: boolean }>
    ) => {
      const { index, top } = action.payload;
      if (index > 0 || index < state.value.length) {
        let out = [...state.value];
        if (top) {
          out = out.map((row, i) => {
            const newRow = [...row];
            if (i === out.length - 1) {
              newRow[index] = out[0][index];
              return newRow;
            }

            newRow[index] = out[i + 1][index];
            return newRow;
          });
        } else {
          out = out.map((row, i) => {
            const newRow = [...row];
            if (i === 0) {
              newRow[index] = out[out.length - 1][index];
              return newRow;
            }
            newRow[index] = out[i - 1][index];
            return newRow;
          });
        }
        state.value = out;
      }
    },
    turnGameField: (state, action: PayloadAction<{ left: boolean }>) => {
      let newField = [...state.value];
      newField = newField.map((row, i) => {
        return row.map((_, j) => {
          if (action.payload.left) return state.value[j][row.length - 1 - i];
          return state.value[newField.length - 1 - j][i];
        });
      });
      state.value = newField;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initializeGameField, swipeRow, swipeColumn, turnGameField } =
  gameFieldSlice.actions;
export default gameFieldSlice.reducer;
