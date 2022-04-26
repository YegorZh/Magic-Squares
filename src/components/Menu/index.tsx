import React, { useState } from 'react';
import levels from '../../levels';
import { setCurrentLevel, setMenuState } from '../../redux/appStateSlice';
import { useAppDispatch } from '../../redux/hooks';
import GameFieldButton from '../GameField/GameFieldButtons';
import { ArrowLeft, ArrowRight } from '../GameField/GameFieldIcons/Arrow';
import DarkButton from '../reusable/DarkButton';

const Menu: React.FC = () => {
  const dispatcher = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;
  const maxPages = Math.floor(levels.length / rowsPerPage);

  const clickHandler = (incrementer: number) => {
    setCurrentPage((oldPage) => {
      const newPage = oldPage + incrementer;
      if (newPage < 0 || newPage > maxPages)
        throw new Error(
          'Invalid page value, must be more than 0 and less or equal to maxPages'
        );
      return newPage;
    });
  };
  console.log(currentPage);

  return (
    <div className="m:auto relative flex h-full flex-1 flex-col gap-3 overflow-y-auto py-4">
      <div className="mx-auto mt-auto flex flex-col space-y-3">
        {levels
          .slice(currentPage * rowsPerPage, rowsPerPage * (currentPage + 1))
          .map((level) => (
            <DarkButton
              nonResponsive
              key={level.id}
              onClick={() => {
                dispatcher(setMenuState('level'));
                dispatcher(setCurrentLevel(level.id));
              }}
            >
              {level.name}
            </DarkButton>
          ))}
      </div>
      <div className="mb-auto flex justify-center">
        {currentPage > 0 && (
          <GameFieldButton onClick={() => clickHandler(-1)}>
            <ArrowLeft />
          </GameFieldButton>
        )}
        {currentPage < maxPages && (
          <GameFieldButton onClick={() => clickHandler(1)}>
            <ArrowRight />
          </GameFieldButton>
        )}
      </div>
    </div>
  );
};

export default Menu;
