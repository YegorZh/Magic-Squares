import React from 'react';
import { swipeRow } from '../../redux/gameFieldSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SwipeLeftButton, SwipeRightButton } from './GameFieldButtons';
import GameFieldButton from './GameFieldButtons/Template';
import ArrowLeft from './GameFieldIcons/Arrow/Left';
import ArrowRight from './GameFieldIcons/Arrow/Right';
import GameFieldRow from './GameFieldRow';

const GameField: React.FC<{
  name: string;
}> = ({ name }) => {
  const gameFields = useAppSelector((state) => state.gameField);
  const { field, actions } = gameFields[name] || {};
  const { swipe, swipeAll, turn } = actions || {};
  const dispatcher = useAppDispatch();

  return (
    <div className="m-auto">
      {field?.map((row, n) => (
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
      ))}
    </div>
  );
};

export default GameField;
