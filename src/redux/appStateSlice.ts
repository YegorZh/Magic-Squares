import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import levels from '../levels';

type menuState = 'level' | 'menu';
const checkCurrentLevel = (index: number) => {
  if (index < 0 || index > levels.length)
    throw new Error(
      'Invalid level index, must be more than 0 and less than levels.length .'
    );
};

type appState = {
  menuState: menuState;
  currentLevel: number;
};

const initialState: appState = {
  menuState: 'menu',
  currentLevel: 0,
};

const appState = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setMenuState: (state, action: PayloadAction<menuState>) => {
      state.menuState = action.payload;
    },
    setCurrentLevel: (state, action: PayloadAction<number>) => {
      state.currentLevel = action.payload;
    },
    previousLevel: (state) => {
      const newLevel = state.currentLevel - 1;
      checkCurrentLevel(newLevel);
      state.currentLevel = newLevel;
    },
    nextLevel: (state) => {
      const newLevel = state.currentLevel - 1;
      checkCurrentLevel(newLevel);
      state.currentLevel = state.currentLevel + 1;
    },
  },
});

export const { setMenuState, setCurrentLevel, nextLevel, previousLevel } =
  appState.actions;
export default appState.reducer;
