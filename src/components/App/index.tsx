import React, { useEffect } from 'react';
import {
  initializeGameField,
  randomizeField,
  start,
} from '../../redux/gameFieldSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GameField from '../GameField';

const App = () => {
  const dispatcher = useAppDispatch();
  const isStarted = useAppSelector((state) => state.gameField.isStarted);
  const isWon = useAppSelector((state) => state.gameField.isWon);
  const mainName = 'main';
  const leftName = 'left';
  const rightName = 'right';

  useEffect(() => {
    const size = 3;
    dispatcher(
      initializeGameField({
        size,
        name: leftName,
        actions: { turn: leftName },
      })
    );
    dispatcher(
      initializeGameField({
        size,
        name: mainName,
        actions: {
          swipe: 'ALL',
        },
      })
    );
    dispatcher(
      initializeGameField({
        size,
        name: rightName,
        actions: { swipeAllColumns: rightName },
      })
    );
  }, []);

  return (
    <div className="relative mx-auto flex h-[80%] w-[798px] flex-col rounded-2xl border-x-2 border-slate-700 bg-gray-800 shadow-lg">
      <div className="h-full" />
      <div className="m-auto flex h-full w-full">
        <div className="flex w-full justify-center">
          <GameField name={leftName} />
        </div>
        <div className="flex w-full justify-center">
          <GameField name={mainName} />
        </div>
        <div className="flex w-full justify-center">
          <GameField name={rightName} />
        </div>
      </div>
      <div className="flex h-full items-end justify-center">
        {!isStarted && (
          <button
            onClick={() => {
              dispatcher(randomizeField({ n: 1000 }));
              dispatcher(start());
            }}
            className="mb-12 rounded-xl bg-slate-600 px-8 py-3 
                     font-bold uppercase tracking-tighter text-slate-400 transition 
                     hover:bg-slate-500 hover:text-slate-300
                     active:bg-slate-700 active:text-slate-600"
          >
            Start
          </button>
        )}
      </div>
      {isWon && (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 rounded border-2 border-slate-100 bg-blue-500 p-2 text-slate-300">
          You win!
        </p>
      )}
    </div>
  );
};

export default App;
