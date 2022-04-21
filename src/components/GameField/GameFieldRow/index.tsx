import React from 'react';
import {
  SwipeAllDownButton,
  SwipeAllUpButton,
  SwipeDownButton,
  SwipeUpButton,
  TurnLeftButton,
  TurnRightButton,
} from '../GameFieldButtons';

const GameFieldRow: React.FC<{
  data: string[];
  firstRow?: boolean;
  lastRow?: boolean;
  swipe?: string | string[];
  turn?: string | string[];
  swipeAll?: string | string[];
}> = ({ data, firstRow, lastRow, swipe, turn, swipeAll }) => {
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
            {/* {firstRow && swipe && (
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
                className="absolute bottom-[-22px] left-[-22px]"
              />
            )}
            {lastRow && swipeAll && i === data.length - 1 && (
              <SwipeAllDownButton
                names={swipeAll}
                className="absolute bottom-[-23px] right-[-22px]"
              />
            )} */}
          </div>
        );
      })}
    </div>
  );
};

export default GameFieldRow;
