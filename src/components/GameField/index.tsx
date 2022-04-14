import React, { useEffect } from 'react';
import { initializeGameField, swipeRow } from '../../redux/gameFieldSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GameFieldButton from './GameFieldButton';
import GameFieldRow from './GameFieldRow';

const GameField: React.FC<{ swipe?: boolean; turn?: boolean }> = ({
  swipe,
  turn,
}) => {
  const gameField = useAppSelector((state) => state.gameField.value);
  const dispatcher = useAppDispatch();
  useEffect(() => {
    dispatcher(initializeGameField({ x: 6, y: 6 }));
  }, []);

  return (
    <div className="m-auto">
      {gameField.map((row, n) => (
        <div key={n} className="flex gap-2">
          <GameFieldButton
            onClick={() => dispatcher(swipeRow({ index: n, left: true }))}
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
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
          </GameFieldButton>
          <div className="rounded-2xl shadow-md">
            <GameFieldRow
              data={row}
              firstRow={n === 0}
              lastRow={n === gameField.length - 1}
              swipe={swipe}
              turn={turn}
            />
          </div>
          <GameFieldButton
            onClick={() => dispatcher(swipeRow({ index: n, left: false }))}
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </GameFieldButton>
        </div>
      ))}
    </div>
  );
};

export default GameField;
