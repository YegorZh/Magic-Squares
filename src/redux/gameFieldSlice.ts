import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  checkIndex,
  generateField,
  namesCheck,
  rotateField,
  swipeAllHorizontal,
  swipeAllVertical,
  swipeHorizontal,
  swipeVertical,
} from './gameFieldLogic';

export type GameFieldActions = {
  swipe?: string[] | string;
  turn?: string[] | string;
  swipeAllColumns?: string[] | string;
  swipeAllRows?: string[] | string;
};

export interface gameFieldData {
  field: string[][];
  actions?: GameFieldActions;
}

export interface gameFieldState {
  data: { [key: string]: gameFieldData };
  isWon: boolean;
  isStarted: boolean;
}

const initialState: gameFieldState = {
  data: {},
  isWon: false,
  isStarted: false,
};

const winCheck = (state: gameFieldState, name: string) => {
  const arr = state.data[name].field;
  if (!arr) throw new Error('Invalid name, specified game field doesnt exist');
  if (state.isWon) return true;

  const checkRows = (arr: string[][], winData?: string[]) => {
    if (winData) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] !== winData[i]) return null;
      }
    }
    const winRows: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr[i].length; j++) {
        if (arr[i][j] !== arr[i][j - 1]) return null;
      }
      winRows.push(arr[i][0]);
    }
    return winRows;
  };

  const checkColumns = (arr: string[][], winData?: string[]) => {
    if (winData) {
      for (let i = 0; i < arr[0].length; i++) {
        if (arr[0][i] !== winData[i]) return null;
      }
    }
    const winColumns: string[] = [];
    for (let i = 0; i < arr[0].length; i++) {
      for (let j = 1; j < arr.length; j++) {
        if (arr[j][i] !== arr[j - 1][i]) return null;
      }
      winColumns.push(arr[0][i]);
    }
    return winColumns;
  };

  const checkAllRows = (keys: string[], winRows: string[]) => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!checkRows(state.data[key].field, winRows)) return null;
    }
    return true;
  };

  const checkAllColumns = (keys: string[], winColumns: string[]) => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!checkColumns(state.data[key].field, winColumns)) return null;
    }
    return true;
  };

  const keys = Object.keys(state.data);
  const winRows = checkRows(arr);
  if (winRows && checkAllRows(keys, winRows)) return true;
  const winColumns = checkColumns(arr);
  if (winColumns && checkAllColumns(keys, winColumns)) return true;
  return false;
};

const allCheck = (
  names: string | string[],
  state: gameFieldState,
  action: (state: gameFieldState, name: string) => any
) => {
  if (names === 'ALL') {
    const keys = Object.keys(state.data);
    keys.forEach((key) => {
      action(state, key);
    });
    if (state.isStarted && winCheck(state, keys[0])) state.isWon = true;
    return;
  }

  const checkedNames = namesCheck(names);
  checkedNames.forEach((name) => {
    action(state, name);
  });
  if (state.isStarted && winCheck(state, checkedNames[0])) state.isWon = true;
};

export const gameFieldSlice = createSlice({
  name: 'gameField',
  initialState,
  reducers: {
    initializeGameField: (
      state,
      action: PayloadAction<{
        size: number;
        name: string;
        actions?: GameFieldActions;
      }>
    ) => {
      const { size, name, actions } = { ...action.payload };
      state.data[name] = { field: generateField(size), actions };
    },
    swipeRow: (
      state,
      action: PayloadAction<{
        index?: number;
        left?: boolean;
        names: string | string[];
      }>
    ) => {
      const { index, left, names } = action.payload;
      allCheck(names, state, (state, name) => {
        state.data[name].field = swipeHorizontal(
          state.data[name].field,
          index,
          left
        );
      });
    },
    swipeColumn: (
      state,
      action: PayloadAction<{
        index: number;
        up?: boolean;
        names: string | string[];
      }>
    ) => {
      const { index, up, names } = action.payload;
      allCheck(names, state, (state, name) => {
        state.data[name].field = swipeVertical(
          [...state.data[name].field],
          index,
          up
        );
      });
    },
    turnGameField: (
      state,
      action: PayloadAction<{
        left?: boolean;
        names: string | string[];
      }>
    ) => {
      const { left, names } = action.payload;
      allCheck(names, state, (state, name) => {
        state.data[name].field = rotateField([...state.data[name].field], left);
      });
    },
    swipeAllColumns: (
      state,
      action: PayloadAction<{ up?: boolean; names: string | string[] }>
    ) => {
      const { up, names } = action.payload;
      allCheck(names, state, (state, name) => {
        state.data[name].field = swipeAllVertical(
          [...state.data[name].field],
          up
        );
      });
    },
    swipeAllRows: (
      state,
      action: PayloadAction<{ left?: boolean; names: string | string[] }>
    ) => {
      const { left, names } = action.payload;
      allCheck(names, state, (state, name) => {
        state.data[name].field = swipeAllHorizontal(
          [...state.data[name].field],
          left
        );
      });
    },
    startGame: (state) => {
      state.isStarted = true;
    },
    stopGame: (state) => {
      state.isStarted = false;
    },
    randomizeField: (
      state,
      action: PayloadAction<{
        n: number;
      }>
    ) => {
      const { n } = action.payload;
      const randZeroOrOne = () => Math.round(Math.random());
      for (let i = 0; i < n; i++) {
        Object.keys(state.data).forEach((name) => {
          if (state.data[name].actions) {
            const { swipe, swipeAllColumns, swipeAllRows, turn } = state.data[
              name
            ].actions as GameFieldActions;
            if (swipe && randZeroOrOne()) {
              const randomIndexOne = checkIndex(state.data[name].field.length);
              const randomIndexTwo = checkIndex(state.data[name].field.length);
              allCheck(
                swipe,
                state,
                (state, name) =>
                  (state.data[name].field = swipeVertical(
                    state.data[name].field,
                    randomIndexOne
                  ))
              );
              allCheck(
                swipe,
                state,
                (state, name) =>
                  (state.data[name].field = swipeHorizontal(
                    state.data[name].field,
                    randomIndexTwo
                  ))
              );
            }

            if (swipeAllColumns && randZeroOrOne())
              allCheck(
                swipeAllColumns,
                state,
                (state, name) =>
                  (state.data[name].field = swipeAllVertical(
                    state.data[name].field
                  ))
              );

            if (swipeAllRows && randZeroOrOne())
              allCheck(
                swipeAllRows,
                state,
                (state, name) =>
                  (state.data[name].field = swipeAllHorizontal(
                    state.data[name].field
                  ))
              );

            if (turn && randZeroOrOne())
              allCheck(
                turn,
                state,
                (state, name) =>
                  (state.data[name].field = rotateField(state.data[name].field))
              );
          }
        });
      }

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
  swipeAllRows,
  startGame,
  stopGame,
  randomizeField,
} = gameFieldSlice.actions;
export default gameFieldSlice.reducer;
