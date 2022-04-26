import React, { useState } from 'react';
import Level from '../Level';
import Menu from '../Menu';
import levels from '../../levels';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

window.addEventListener('resize', appHeight);
appHeight();
type AppState = 'menu' | 'level';

const App: React.FC = () => {
  const appState = useAppSelector((state) => state.appState);
  const { currentLevel, menuState } = appState || {};
  const { structure, size } = levels[currentLevel] || {};

  return (
    <div
      className="relative mx-auto flex h-full w-full items-center border-x-2
              border-slate-700 bg-gray-800 shadow-lg sm:h-[90%]
                sm:w-[798px] sm:rounded-2xl"
    >
      {menuState === 'menu' ? (
        <Menu />
      ) : (
        <Level levelStructure={structure} size={size} />
      )}
    </div>
  );
};

export default App;
