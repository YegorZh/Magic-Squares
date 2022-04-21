import React from 'react';
import {
  swipeAllColumns,
  swipeColumn,
  turnGameField,
} from '../../../redux/gameFieldSlice';
import { useAppDispatch } from '../../../redux/hooks';
import {
  SwipeAllDownButton,
  SwipeAllUpButton,
  SwipeDownButton,
  SwipeUpButton,
  TurnLeftButton,
  TurnRightButton,
} from '../GameFieldButtons';
import GameFieldButton from '../GameFieldButtons/Template';
import ArrowDown from '../GameFieldIcons/Arrow/Down';
import ArrowUp from '../GameFieldIcons/Arrow/Up';
import CircleArrow from '../GameFieldIcons/CircleArrow';
import DoubleArrowDown from '../GameFieldIcons/DoubleArrow/Down';
import DoubleArrowUp from '../GameFieldIcons/DoubleArrow/Up';

const GameFieldRow: React.FC<{
  data: string[];
  firstRow?: boolean;
  lastRow?: boolean;
  swipe?: string | string[];
  turn?: string | string[];
  swipeAll?: string | string[];
}> = ({ data, firstRow, lastRow, swipe, turn, swipeAll }) => {
  const dispatcher = useAppDispatch();
  return (
    <div className="flex">
      {data.map((element, i) => {
        let cornerStyle = '';
        if (firstRow && i === 0) cornerStyle = 'rounded-tl-2xl';
        else if (firstRow && i === data.length - 1)
          cornerStyle = 'rounded-tr-2xl';
        else if (lastRow && i === 0) cornerStyle = 'rounded-bl-2xl';
        else if (lastRow && i === data.length - 1)
          cornerStyle = 'rounded-br-2xl';
        return (
          <div
            key={i}
            className={`relative flex h-8 w-8 items-center justify-center rounded-sm border-x
                        border-y border-slate-900 ${element} ${cornerStyle}`}
          >
            {firstRow && swipe && (
              <SwipeUpButton
                className="absolute top-[-32px]"
                index={i}
                names={swipe}
              />
            )}
            {firstRow && turn && i === 0 && (
              <TurnLeftButton
                names={turn}
                className="absolute top-[-22px] left-[-22px]"
              />
            )}
            {firstRow && swipeAll && i === data.length - 1 && (
              <SwipeAllUpButton
                names={swipeAll}
                className="absolute top-[-23px] right-[-22px]"
              />
            )}
            {lastRow && swipe && (
              <SwipeDownButton
                className="absolute bottom-[-32px]"
                index={i}
                names={swipe}
              />
            )}
            {lastRow && turn && i === 0 && (
              <TurnRightButton
                names={turn}
                className="absolute top-[-22px] left-[-22px]"
              />
            )}
            {lastRow && swipeAll && i === data.length - 1 && (
              <SwipeAllDownButton
                names={swipeAll}
                className="absolute top-[-23px] right-[-22px]"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameFieldRow;
