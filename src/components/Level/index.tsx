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
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from '../GameField/GameFieldIcons/Arrow';
import DarkButton from '../reusable/DarkButton';
import DarkQuestionButton from '../reusable/DarkQuestionButton';
import Info from './Info';
import Tooltip from './Tooltip';

const Level: React.FC = () => {
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
  const dummyField = { field: generateField(size) };
  if (!isWonOneTime && isWon) setIsWonOneTime(true);
  return (
    <div className="relative flex h-full w-full flex-col rounded-2xl border-x-2 border-slate-700 bg-gray-800 shadow-lg">
      <div className="flex h-full w-full items-end">
        <div className="flex w-full justify-center">
          <GameField name={dummyField} />
        </div>
        <div className="flex w-full justify-center">
          <GameField name={dummyField} />
        </div>
        <div className="flex w-full justify-center">
          <GameField name={dummyField} />
        </div>
      </div>
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
      <div className="flex h-full w-full items-start">
        <div className="flex w-full justify-center">
          <GameField name={dummyField} />
        </div>
        <div className="flex w-full justify-center">
          <GameField name={dummyField} />
        </div>
        <div className="flex w-full justify-center">
          <GameField name={dummyField} />
        </div>
      </div>
      <div className="flex h-64 items-center justify-around rounded-b-xl bg-slate-700 shadow-inner">
        <div className="flex h-full w-full items-center justify-center">
          <DarkQuestionButton onClick={() => alert('back to main menu')}>
            <span className="flex justify-center">
              <ArrowLeft />
              <span>To Menu</span>
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
      <Info size={size} className="absolute left-3 top-3" />
      {!isStarted && (
        <Tooltip className="absolute left-12 top-4">
          <ArrowLeft /> Check wincondition
        </Tooltip>
      )}
      {!isStarted && (
        <Tooltip className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <ArrowUp /> Try out controls before starting <ArrowUp />
        </Tooltip>
      )}
    </div>
  );
};

export default Level;
