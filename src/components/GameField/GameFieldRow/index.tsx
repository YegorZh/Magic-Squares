import React from 'react';
import {
  swipeAllColumns,
  swipeColumn,
  turnGameField,
} from '../../../redux/gameFieldSlice';
import { useAppDispatch } from '../../../redux/hooks';
import GameFieldButton from '../GameFieldButton';
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
              <GameFieldButton
                className="absolute bottom-[38px]"
                onClick={() =>
                  dispatcher(swipeColumn({ index: i, top: true, names: swipe }))
                }
              >
                <ArrowUp />
              </GameFieldButton>
            )}
            {firstRow && turn && i === 0 && (
              <GameFieldButton
                onClick={() =>
                  dispatcher(turnGameField({ left: true, names: turn }))
                }
                className="absolute top-[-22px] left-[-22px]"
              >
                <CircleArrow />
              </GameFieldButton>
            )}
            {firstRow && swipeAll && i === data.length - 1 && (
              <GameFieldButton
                onClick={() =>
                  dispatcher(swipeAllColumns({ top: true, names: swipeAll }))
                }
                className="absolute top-[-23px] right-[-22px]"
              >
                <DoubleArrowUp />
              </GameFieldButton>
            )}
            {/* {element} */}
            {lastRow && swipe && (
              <GameFieldButton
                className="absolute bottom-[-32px]"
                onClick={() =>
                  dispatcher(
                    swipeColumn({ index: i, top: false, names: swipe })
                  )
                }
              >
                <ArrowDown />
              </GameFieldButton>
            )}
            {lastRow && turn && i === 0 && (
              <GameFieldButton
                onClick={() =>
                  dispatcher(turnGameField({ left: false, names: turn }))
                }
                className="absolute bottom-[-22px] left-[-22px]"
              >
                <CircleArrow />
              </GameFieldButton>
            )}
            {lastRow && swipeAll && i === data.length - 1 && (
              <GameFieldButton
                onClick={() =>
                  dispatcher(swipeAllColumns({ top: false, names: swipeAll }))
                }
                className="absolute bottom-[-23px] right-[-22px]"
              >
                <DoubleArrowDown />
              </GameFieldButton>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameFieldRow;
