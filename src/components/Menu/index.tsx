import levels from '../../levels';
import { setCurrentLevel, setMenuState } from '../../redux/appStateSlice';
import { useAppDispatch } from '../../redux/hooks';
import React, { useState } from 'react';
import GameFieldButton from '../GameField/GameFieldButtons';
import { ArrowLeft, ArrowRight } from '../GameField/GameFieldIcons/Arrow';
import DarkButton from '../reusable/DarkButton';
import { colors } from '../../redux/gameFieldLogic';

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
  let title = 'Magic Squares';
  let titleJSX: JSX.Element[] = [];
  // comment for PurgeCSS text-blue-500 text-emerald-600 text-amber-500 text-slate-400 text-purple-500 text-red-500 text-slate-300 text-blue-500 text-emerald-600 text-amber-500 text-slate-400 text-purple-500 text-red-500
  for (let i = 0; i < title.length; i++) {
    titleJSX.push(
      <span key={i} className={colors[i % 7].replace('bg', 'text')}>
        {title[i]}
      </span>
    );
  }

  return (
    <div className="m:auto relative flex h-full flex-1 flex-col gap-3 overflow-y-auto py-4">
      <h1 className="mx-auto mt-auto  whitespace-nowrap border-l-red-500 text-[34px] font-bold uppercase sm:text-[48px]">
        {titleJSX}
      </h1>
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
