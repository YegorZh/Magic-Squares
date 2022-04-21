import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  checkIndex,
  namesCheck,
  rotateField,
  swipeAllHorizontal,
  swipeAllVertical,
  swipeHorizontal,
  swipeVertical,
} from './gameFieldLogic';

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

const allCheck = (
  names: string | string[],
  state: gameFieldState,
  action: (state: gameFieldState, name: string) => any
) => {
  if (names === 'ALL')
    return Object.keys(state).forEach((key) => action(state, key));
  namesCheck(names).forEach((name) => {
    action(state, name);
  });
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
      if (name !== 'ALL') {
        const out = [...Array(size)].map(() => [...Array(size)]);
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
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
        left?: boolean;
        names: string | string[];
      }>
    ) => {
      const { index, left, names } = action.payload;
      allCheck(names, state, (state, name) => {
        state[name].field = swipeHorizontal(state[name].field, index, left);
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
        state[name].field = swipeVertical([...state[name].field], index, up);
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
        state[name].field = rotateField([...state[name].field], left);
      });
    },
    swipeAllColumns: (
      state,
      action: PayloadAction<{ up?: boolean; names: string | string[] }>
    ) => {
      const { up, names } = action.payload;
      allCheck(names, state, (state, name) => {
        state[name].field = swipeAllVertical([...state[name].field], up);
      });
    },
    swipeAllRows: (
      state,
      action: PayloadAction<{ left?: boolean; names: string | string[] }>
    ) => {
      const { left, names } = action.payload;
      allCheck(names, state, (state, name) => {
        state[name].field = swipeAllHorizontal([...state[name].field], left);
      });
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
        Object.keys(state).forEach((name) => {
          if (state[name].actions) {
            const { swipe, swipeAll, turn } = state[name]
              .actions as GameFieldActions;
            if (swipe && randZeroOrOne()) {
              const randomIndexOne = checkIndex(state[name].field.length);
              const randomIndexTwo = checkIndex(state[name].field.length);
              allCheck(
                swipe,
                state,
                (state, name) =>
                  (state[name].field = swipeVertical(
                    state[name].field,
                    randomIndexOne
                  ))
              );
              allCheck(
                swipe,
                state,
                (state, name) =>
                  (state[name].field = swipeHorizontal(
                    state[name].field,
                    randomIndexTwo
                  ))
              );
            }

            if (swipeAll && randZeroOrOne())
              allCheck(
                swipeAll,
                state,
                (state, name) =>
                  (state[name].field = swipeAllVertical(state[name].field))
              );

            if (turn && randZeroOrOne())
              allCheck(
                turn,
                state,
                (state, name) =>
                  (state[name].field = rotateField(state[name].field))
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
  randomizeField,
} = gameFieldSlice.actions;
export default gameFieldSlice.reducer;
