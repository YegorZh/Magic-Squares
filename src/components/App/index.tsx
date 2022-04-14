import React from 'react';
import GameField from '../GameField';

const App = () => {
  return (
    <div className="mx-auto flex h-[80%] w-[798px] rounded-2xl border-x-2 border-slate-700 bg-gray-800 shadow-lg">
      <GameField swipe turn swipeAll />
    </div>
  );
};

export default App;
