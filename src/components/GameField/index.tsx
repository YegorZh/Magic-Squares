import React from 'react';
import { gameFieldData } from '../../redux/gameFieldSlice';
import { useAppSelector } from '../../redux/hooks';
import {
  SwipeAllDownButton,
  SwipeAllLeftButton,
  SwipeAllRightButton,
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
  name: string | gameFieldData;
}> = ({ name }) => {
  let gameField;
  if (typeof name === 'string') {
    const gameFields = useAppSelector((state) => state.gameField.data);
    gameField = gameFields[name] || {};
  } else gameField = name;
  const { field, actions } = gameField || {};
  const { swipe, swipeAllColumns, swipeAllRows, turn } = actions || {};
  const cellSize = { w: 'w-7', h: 'h-7' };
  const coverButtonStyles = `flex justify-center ${cellSize.w}`;
  const sideButtonStyles = `flex items-center ${cellSize.h}`;
  const topButtons: JSX.Element[] = [];
  const bottomButtons: JSX.Element[] = [];
  const leftButtons: JSX.Element[] = [];
  const rightButtons: JSX.Element[] = [];

  if (!swipe && swipeAllColumns) {
    topButtons.push(
      <SwipeAllUpButton
        key={1}
        names={swipeAllColumns}
        className={coverButtonStyles}
      />
    );
    bottomButtons.push(
      <SwipeAllDownButton
        key={1}
        names={swipeAllColumns}
        className={coverButtonStyles}
      />
    );
  }

  if (!swipe && turn) {
    topButtons.push(
      <TurnRightButton key={2} names={turn} className={coverButtonStyles} />
    );
    bottomButtons.push(
      <TurnLeftButton key={2} names={turn} className={coverButtonStyles} />
    );
  }

  if (!swipe && swipeAllRows) {
    leftButtons.push(<SwipeAllLeftButton key={1} names={swipeAllRows} />);
    rightButtons.push(<SwipeAllRightButton key={1} names={swipeAllRows} />);
  }

  const rows = field?.map((row, n) => {
    if (swipe) {
      topButtons.push(
        <SwipeUpButton
          key={n}
          index={n}
          names={swipe}
          className={coverButtonStyles}
        />
      );
      bottomButtons.push(
        <SwipeDownButton
          key={n}
          index={n}
          names={swipe}
          className={coverButtonStyles}
        />
      );
      leftButtons.push(
        <SwipeLeftButton
          key={n}
          index={n}
          names={swipe}
          className={sideButtonStyles}
        />
      );
      rightButtons.push(
        <SwipeRightButton
          key={n}
          index={n}
          names={swipe}
          className={sideButtonStyles}
        />
      );
    }
    return (
      <div key={n} className="flex gap-2 rounded-2xl shadow-md">
        <GameFieldRow
          data={row}
          firstRow={n === 0}
          lastRow={n === field.length - 1}
          size={cellSize}
        />
      </div>
    );
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex flex-col justify-center">{leftButtons}</div>
      <div>
        {topButtons.length > 0 && (
          <div className="mb-2 flex justify-center">{topButtons}</div>
        )}
        {rows}
        {bottomButtons.length > 0 && (
          <div className="mt-2 flex justify-center">{bottomButtons}</div>
        )}
      </div>
      <div className="flex flex-col justify-center">{rightButtons}</div>
    </div>
  );
};

export default GameField;
