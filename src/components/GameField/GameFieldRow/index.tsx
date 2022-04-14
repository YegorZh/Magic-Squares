import React from 'react';
import {
  swipeAllColumns,
  swipeColumn,
  turnGameField,
} from '../../../redux/gameFieldSlice';
import { useAppDispatch } from '../../../redux/hooks';
import GameFieldButton from '../GameFieldButton';

const GameFieldRow: React.FC<{
  data: string[];
  firstRow?: boolean;
  lastRow?: boolean;
  swipe?: boolean;
  turn?: boolean;
  swipeAll?: boolean;
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
                onClick={() => dispatcher(swipeColumn({ index: i, top: true }))}
              >
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
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
              </GameFieldButton>
            )}
            {firstRow && turn && i === 0 && (
              <GameFieldButton
                onClick={() => dispatcher(turnGameField({ left: true }))}
                className="absolute top-[-22px] left-[-22px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </GameFieldButton>
            )}
            {firstRow && swipeAll && i === data.length - 1 && (
              <GameFieldButton
                onClick={() => dispatcher(swipeAllColumns({ top: true }))}
                className="absolute top-[-24px] right-[-24px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 11l7-7 7 7M5 19l7-7 7 7"
                  />
                </svg>
              </GameFieldButton>
            )}
            {/* {element} */}
            {lastRow && swipe && (
              <GameFieldButton
                className="absolute bottom-[-32px]"
                onClick={() =>
                  dispatcher(swipeColumn({ index: i, top: false }))
                }
              >
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
                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                  />
                </svg>
              </GameFieldButton>
            )}
            {lastRow && turn && i === data.length - 1 && (
              <GameFieldButton
                onClick={() => dispatcher(turnGameField({ left: false }))}
                className="absolute bottom-[-22px] right-[-22px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </GameFieldButton>
            )}
            {lastRow && swipeAll && i === 0 && (
              <GameFieldButton
                onClick={() => dispatcher(swipeAllColumns({ top: false }))}
                className="absolute bottom-[-24px] left-[-24px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                  />
                </svg>
              </GameFieldButton>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameFieldRow;
