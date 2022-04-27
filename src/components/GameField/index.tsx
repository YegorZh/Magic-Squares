import React, { useEffect, useState } from 'react';
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
  const { swipeColumn, swipeRow, swipeAllColumns, swipeAllRows, turn } =
    actions || {};
  const [cellSize, setCellSize] = useState({ w: 'w-7', h: 'h-7' });

  // for purge css sm:w-7 sm:h-7
  useEffect(() => {
    const checkWidth = () => {
      if (window.matchMedia('(min-width: 640px)').matches)
        setCellSize({ w: 'w-7', h: 'h-7' });
      else setCellSize({ w: 'w-6', h: 'h-6' });
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const coverButtonStyles = `flex justify-center items-center ${cellSize.w}`;
  const sideButtonStyles = `flex items-center justify-center ${cellSize.h}`;
  const topButtons: JSX.Element[] = [];
  const bottomButtons: JSX.Element[] = [];
  const leftButtons: JSX.Element[] = [];
  const rightButtons: JSX.Element[] = [];

  if (!swipeColumn && swipeAllColumns) {
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

  if (!swipeColumn && turn) {
    topButtons.push(
      <TurnRightButton key={2} names={turn} className={coverButtonStyles} />
    );
    bottomButtons.push(
      <TurnLeftButton key={2} names={turn} className={coverButtonStyles} />
    );
  }

  if (!swipeRow && swipeAllRows) {
    leftButtons.push(<SwipeAllLeftButton key={1} names={swipeAllRows} />);
    rightButtons.push(<SwipeAllRightButton key={1} names={swipeAllRows} />);
  }

  const rows = field?.map((row, n) => {
    if (swipeColumn) {
      topButtons.push(
        <SwipeUpButton
          key={n}
          index={n}
          names={swipeColumn}
          className={coverButtonStyles}
        />
      );
      bottomButtons.push(
        <SwipeDownButton
          key={n}
          index={n}
          names={swipeColumn}
          className={coverButtonStyles}
        />
      );
    }

    if (swipeRow) {
      leftButtons.push(
        <SwipeLeftButton
          key={n}
          index={n}
          names={swipeRow}
          className={sideButtonStyles}
        />
      );
      rightButtons.push(
        <SwipeRightButton
          key={n}
          index={n}
          names={swipeRow}
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
      <div
        className={`flex flex-col items-center justify-center sm:${cellSize.w}`}
      >
        {leftButtons}
      </div>
      <div>
        <div className={`mb-1 flex justify-center sm:${cellSize.h}`}>
          {topButtons}
        </div>

        {rows}

        <div className={`mt-1 flex justify-center sm:${cellSize.h}`}>
          {bottomButtons}
        </div>
      </div>
      <div
        className={`flex flex-col justify-center sm:${cellSize.w} items-center`}
      >
        {rightButtons}
      </div>
    </div>
  );
};

export default GameField;
