import React, { useEffect } from 'react';
import { initializeGameField, swipeRow } from '../../redux/gameFieldSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GameFieldButton from './GameFieldButton';
import GameFieldRow from './GameFieldRow';

const GameField = () => {
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
            {'<-'}
          </GameFieldButton>
          <GameFieldRow
            data={row}
            firstRow={n === 0}
            lastRow={n === gameField.length - 1}
          />
          <GameFieldButton
            onClick={() => dispatcher(swipeRow({ index: n, left: false }))}
          >
            {'->'}
          </GameFieldButton>
        </div>
      ))}
    </div>
  );
};

export default GameField;
