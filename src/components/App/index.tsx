import React, { useEffect, useState } from 'react';
import { generateField } from '../../redux/gameFieldLogic';
import {
  initializeGameField,
  randomizeField,
  resetWin,
  startGame,
  stopGame,
} from '../../redux/gameFieldSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GameField from '../GameField';
import { ArrowLeft, ArrowRight } from '../GameField/GameFieldIcons/Arrow';
import DarkButton from '../reusable/DarkButton';
import DarkQuestionButton from '../reusable/DarkQuestionButton';

const App = () => {
  const dispatcher = useAppDispatch();
  const [isWonOneTime, setIsWonOneTime] = useState(false);
  const isStarted = useAppSelector((state) => state.gameField.isStarted);
  const isWon = useAppSelector((state) => state.gameField.isWon);
  const mainName = 'main';
  const leftName = 'left';
  const rightName = 'right';

  const startNewGame = () => {
    dispatcher(resetWin());
    dispatcher(stopGame());
    dispatcher(randomizeField({ n: 1000 }));
    dispatcher(startGame());
  };
  const size = 3;
  useEffect(() => {
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

  if (!isWonOneTime && isWon) setIsWonOneTime(true);
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
        <div className="flex h-full w-full items-center justify-center">
          <DarkQuestionButton onClick={() => alert('back to main menu')}>
            <span className="flex justify-center">
              <ArrowLeft />
              <span>Back to Menu</span>
            </span>
          </DarkQuestionButton>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          {!isStarted ? (
            <DarkButton onClick={startNewGame}>Start</DarkButton>
          ) : (
            <DarkQuestionButton onClick={startNewGame}>
              Restart
            </DarkQuestionButton>
          )}
        </div>

        <div className="flex h-full w-full items-center justify-center">
          <DarkQuestionButton
            disabled={!isWonOneTime}
            onClick={() => alert('Next lvl')}
          >
            <span className="flex justify-center">
              <span>Next Level</span> <ArrowRight />
            </span>
          </DarkQuestionButton>
        </div>
      </div>
      {isWon && (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded border-2 border-slate-100 bg-blue-500 p-2 text-slate-300">
          You win!
        </p>
      )}
      <div
        className="dropdown absolute left-3 top-3 w-1 rounded-t-lg 
                    text-slate-600 transition-all hover:w-40 hover:bg-slate-700 hover:text-slate-500"
      >
        <div className="relative">
          <div className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div
            className="dropdown-content pointer-events-none absolute bottom-0
                       left-0 w-1 translate-y-full rounded-b-2xl bg-slate-700 py-4 opacity-0
                       transition-all"
          >
            <GameField name={{ field: generateField(size) }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
