import React, { useEffect } from 'react';
import {
  GameFieldActions,
  initializeGameField,
  swipeRow,
} from '../../redux/gameFieldSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GameFieldButton from './GameFieldButton';
import ArrowLeft from './GameFieldIcons/Arrow/Left';
import ArrowRight from './GameFieldIcons/Arrow/Right';
import GameFieldRow from './GameFieldRow';

const GameField: React.FC<{
  name: string;
}> = ({ name }) => {
  const gameFields = useAppSelector((state) => state.gameField);
  let field: string[][] = [],
    actions: GameFieldActions | undefined;
  if (gameFields[name]) ({ field, actions } = gameFields[name]);
  const dispatcher = useAppDispatch();

  return (
    <div className="m-auto">
      {field?.map((row, n) => (
        <div key={n} className="flex gap-2">
          {actions?.swipe && (
            <GameFieldButton
              onClick={() =>
                dispatcher(
                  swipeRow({
                    index: n,
                    left: true,
                    names: actions?.swipe as string | string[],
                  })
                )
              }
            >
              <ArrowLeft />
            </GameFieldButton>
          )}
          <div className="rounded-2xl shadow-md">
            <GameFieldRow
              data={row}
              firstRow={n === 0}
              lastRow={n === field.length - 1}
              swipe={actions?.swipe}
              turn={actions?.turn}
              swipeAll={actions?.swipeAll}
            />
          </div>
          {actions?.swipe && (
            <GameFieldButton
              onClick={() =>
                dispatcher(
                  swipeRow({
                    index: n,
                    left: false,
                    names: actions?.swipe as string | string[],
                  })
                )
              }
            >
              <ArrowRight />
            </GameFieldButton>
          )}
        </div>
      ))}
    </div>
  );
};

export default GameField;
