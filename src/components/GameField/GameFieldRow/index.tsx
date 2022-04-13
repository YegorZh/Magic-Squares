import React from 'react';
import { swipeColumn } from '../../../redux/gameFieldSlice';
import { useAppDispatch } from '../../../redux/hooks';
import GameFieldButton from '../GameFieldButton';

const GameFieldRow: React.FC<{
  data: string[];
  firstRow: boolean;
  lastRow: boolean;
}> = ({ data, firstRow, lastRow }) => {
  const dispatcher = useAppDispatch();
  return (
    <div className="flex">
      {data.map((element, i) => {
        return (
          <div
            key={i}
            className={`relative flex h-8 w-8 items-center justify-center border-x border-y border-gray-900 ${element}`}
          >
            {firstRow && (
              <GameFieldButton
                className="absolute bottom-[38px]"
                onClick={() => dispatcher(swipeColumn({ index: i, top: true }))}
              >
                /\
              </GameFieldButton>
            )}
            {/* {element} */}
            {lastRow && (
              <GameFieldButton
                className="absolute bottom-[-32px]"
                onClick={() =>
                  dispatcher(swipeColumn({ index: i, top: false }))
                }
              >
                \/
              </GameFieldButton>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameFieldRow;
