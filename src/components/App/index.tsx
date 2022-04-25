import React from 'react';
import Level from '../Level';

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

window.addEventListener('resize', appHeight);
appHeight();

const level = {
  middleLeft: { turn: 'middleLeft' },
  middleCenter: { swipe: 'ALL' },
  middleRight: { swipeAllColumns: 'middleRight' },
};

const App: React.FC = () => {
  return (
    <div className="mx-auto flex h-full w-full items-center sm:h-[90%] sm:w-[798px]">
      <Level levelData={level} size={3} />
    </div>
  );
};

export default App;
