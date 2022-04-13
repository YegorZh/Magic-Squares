import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface gameFieldState {
  value: number[][];
}

const initialState: gameFieldState = {
  value: [],
};

export const gameFieldSlice = createSlice({
  name: 'gameField',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<{ x: number; y: number }>) => {
      Array(10).forEach((n) => console.log(1));
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = gameFieldSlice.actions;
export default gameFieldSlice.reducer;
