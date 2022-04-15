import React, { useEffect } from 'react';
import {
  initializeGameField,
  randomizeField,
} from '../../redux/gameFieldSlice';
import { useAppDispatch } from '../../redux/hooks';
import GameField from '../GameField';

const App = () => {
  const dispatcher = useAppDispatch();
  const mainName = 'main';
  const leftName = 'left';
  const rightName = 'right';

  useEffect(() => {
    const x = 6,
      y = 6;
    dispatcher(initializeGameField({ x, y, name: leftName }));
    dispatcher(initializeGameField({ x, y, name: mainName }));
    dispatcher(initializeGameField({ x, y, name: rightName }));
  }, []);

  return (
    <div className="mx-auto flex h-[80%] w-[798px] flex-col rounded-2xl border-x-2 border-slate-700 bg-gray-800 shadow-lg">
      <div className="h-full"></div>
      <div className="m-auto flex h-full w-full">
        <GameField name={leftName} />
        <GameField
          swipe={'ALL'}
          turn={leftName}
          swipeAll={rightName}
          name={mainName}
        />
        <GameField name={rightName} />
      </div>
      <div className="flex h-full items-end justify-center">
        <button
          onClick={() => dispatcher(randomizeField({ n: 1000 }))}
          className="mb-12 rounded-xl bg-slate-600 px-8 py-3 
                     font-bold uppercase tracking-tighter text-slate-400 transition 
                     hover:bg-slate-500 hover:text-slate-300
                     active:bg-slate-700 active:text-slate-600"
        >
          Randomize
        </button>
      </div>
    </div>
  );
};

export default App;
