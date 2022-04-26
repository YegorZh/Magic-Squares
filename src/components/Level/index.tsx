import React, { useEffect, useState } from 'react';
import { nextLevel, setMenuState } from '../../redux/appStateSlice';
import {
  initializeGameField,
  randomizeField,
  resetState,
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
import WinMessage from './WinMessage';
import levels from '../../levels';

const Level: React.FC<{
  currentLevel: number;
}> = ({ currentLevel }) => {
  const dispatcher = useAppDispatch();
  const [isWonOneTime, setIsWonOneTime] = useState(false);
  const isStarted = useAppSelector((state) => state.gameField.isStarted);
  console.log(isStarted);
  const isWon = useAppSelector((state) => state.gameField.isWon);
  const { structure, name, size } = levels[currentLevel];
  const {
    topLeft,
    topCenter,
    topRight,
    middleLeft,
    middleCenter,
    middleRight,
    bottomLeft,
    bottomCenter,
    bottomRight,
  } = structure || {};

  const startNewGame = () => {
    dispatcher(resetWin());
    dispatcher(stopGame());
    dispatcher(randomizeField({ n: 1000 }));
    dispatcher(startGame());
  };

  useEffect(() => {
    console.log('hi');
    const clean = () => {
      dispatcher(resetState());
    };
    clean();
    Object.keys(structure).forEach((key) => {
      dispatcher(
        initializeGameField({ size, name: key, actions: structure[key] })
      );
    });
    return clean;
  }, [currentLevel]);

  if (!isWonOneTime && isWon) setIsWonOneTime(true);
  return (
    <div className="relative flex h-full w-full flex-col ">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 uppercase text-slate-600">
        {name}
      </div>
      <div className="flex h-full w-full items-end">
        <div className="flex w-full justify-center">
          {topLeft && <GameField name={'topLeft'} />}
        </div>
        <div className="flex w-full justify-center">
          {topCenter && <GameField name={'topCenter'} />}
        </div>
        <div className="flex w-full justify-center">
          {topRight && <GameField name={'topRight'} />}
        </div>
      </div>
      <div className="flex h-full w-full">
        <div className="flex w-full justify-center">
          {middleLeft && <GameField name={'middleLeft'} />}
        </div>
        <div className="flex w-full justify-center">
          {middleCenter && <GameField name={'middleCenter'} />}
        </div>
        <div className="flex w-full justify-center">
          {middleRight && <GameField name={'middleRight'} />}
        </div>
      </div>
      <div className="flex h-full w-full items-start">
        <div className="flex w-full justify-center">
          {bottomLeft && <GameField name={'bottomLeft'} />}
        </div>
        <div className="flex w-full justify-center">
          {bottomCenter && <GameField name={'bottomCenter'} />}
        </div>
        <div className="flex w-full justify-center">
          {bottomRight && <GameField name={'bottomRight'} />}
        </div>
      </div>
      <div className="flex h-64 items-center justify-around rounded-b-xl bg-slate-700 shadow-inner">
        <div className="flex h-full w-full items-center justify-center">
          <DarkQuestionButton onClick={() => dispatcher(setMenuState('menu'))}>
            <ArrowLeft />
            <span>To Menu</span>
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
            onClick={() => dispatcher(nextLevel())}
          >
            <span>Next Level</span> <ArrowRight />
          </DarkQuestionButton>
        </div>
      </div>
      {isWon && (
        <WinMessage className="pointer-events-none absolute top-1/2 translate-y-2" />
      )}
      <Info size={size} className="absolute left-3 top-3" />
      {!isStarted && (
        <Tooltip className="absolute left-12 top-4">
          <ArrowLeft /> Check win condition
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
