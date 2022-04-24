import React, { useEffect, useState } from 'react';
import {
  initializeGameField,
  randomizeField,
  startGame,
  stopGame,
} from '../../redux/gameFieldSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GameField from '../GameField';
import DarkButton from '../reusable/DarkButton';

const App = () => {
  const dispatcher = useAppDispatch();
  const [isRestarting, setIsRestarting] = useState(false);
  const isStarted = useAppSelector((state) => state.gameField.isStarted);
  const isWon = useAppSelector((state) => state.gameField.isWon);
  const mainName = 'main';
  const leftName = 'left';
  const rightName = 'right';

  const startNewGame = () => {
    setIsRestarting(false);
    dispatcher(stopGame());
    dispatcher(randomizeField({ n: 1000 }));
    dispatcher(startGame());
  };
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
    <div className="relative mx-auto flex h-[95%] w-[798px] flex-col rounded-2xl border-x-2 border-slate-700 bg-gray-800 shadow-lg">
      <div className="h-full w-full"></div>
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
      <div className="h-full w-full"></div>
      <div className="flex h-64 items-center justify-around rounded-b-xl bg-slate-700 shadow-inner">
        {!isStarted ? (
          <DarkButton onClick={startNewGame}>Start</DarkButton>
        ) : !isRestarting ? (
          <DarkButton onClick={() => setIsRestarting(true)}>Restart</DarkButton>
        ) : (
          <div className="space-x-2">
            <DarkButton onClick={startNewGame}>Yes</DarkButton>
            <DarkButton onClick={() => setIsRestarting(false)}>No</DarkButton>
          </div>
        )}
      </div>
      {isWon && (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded border-2 border-slate-100 bg-blue-500 p-2 text-slate-300">
          You win!
        </p>
      )}
    </div>
  );
};

export default App;
