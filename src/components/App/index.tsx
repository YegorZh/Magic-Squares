import React from 'react';
import Level from '../Level';

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

window.addEventListener('resize', appHeight);
appHeight();

const App: React.FC = () => {
  return (
    <div className="mx-auto flex h-full w-full items-center sm:h-[90%] sm:w-[798px]">
      <Level />;
    </div>
  );
};

export default App;
