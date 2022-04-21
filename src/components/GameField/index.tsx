import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import {
  SwipeAllDownButton,
  SwipeAllUpButton,
  SwipeDownButton,
  SwipeLeftButton,
  SwipeRightButton,
  SwipeUpButton,
  TurnLeftButton,
  TurnRightButton,
} from './GameFieldButtons';
import GameFieldRow from './GameFieldRow';

const GameField: React.FC<{
  name: string;
}> = ({ name }) => {
  const gameFields = useAppSelector((state) => state.gameField);
  const { field, actions } = gameFields[name] || {};
  const { swipe, swipeAll, turn } = actions || {};
  const cellSize = { w: 'w-8', h: 'h-8' };
  const buttonStyles = `items flex justify-center ${cellSize.w}`;

  const topButtons: JSX.Element[] = [];
  const bottomButtons: JSX.Element[] = [];
  if (!swipe && swipeAll) {
    topButtons.push(
      <SwipeAllUpButton names={swipeAll} className={buttonStyles} />
    );
    bottomButtons.push(
      <SwipeAllDownButton names={swipeAll} className={buttonStyles} />
    );
  }
  if (!swipe && turn) {
    topButtons.push(<TurnLeftButton names={turn} className={buttonStyles} />);
    bottomButtons.push(
      <TurnRightButton names={turn} className={buttonStyles} />
    );
  }

  const rows = field?.map((row, n) => {
    if (swipe) {
      topButtons.push(
        <SwipeUpButton index={n} names={swipe} className={buttonStyles} />
      );
      bottomButtons.push(
        <SwipeDownButton index={n} names={swipe} className={buttonStyles} />
      );
    }
    return (
      <div key={n} className="flex gap-2">
        {swipe && <SwipeLeftButton index={n} names={swipe} />}
        <div className="rounded-2xl shadow-md">
          <GameFieldRow
            data={row}
            firstRow={n === 0}
            lastRow={n === field.length - 1}
            swipe={swipe}
            turn={turn}
            swipeAll={swipeAll}
          />
        </div>
        {swipe && <SwipeRightButton index={n} names={swipe} />}
      </div>
    );
  });

  return (
    <div className="m-auto">
      {topButtons.length > 0 && (
        <div className="mb-2 flex justify-center">{topButtons}</div>
      )}
      {rows}
      {bottomButtons.length > 0 && (
        <div className="mt-2 flex justify-center">{bottomButtons}</div>
      )}
    </div>
  );
};

export default GameField;
