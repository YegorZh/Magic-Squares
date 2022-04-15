import React, { useEffect } from 'react';
import { initializeGameField } from '../../redux/gameFieldSlice';
import { useAppDispatch } from '../../redux/hooks';
import GameField from '../GameField';

const App = () => {
  const dispatcher = useAppDispatch();
  const mainName = 'main';
  const leftName = 'left';
  const rightName = 'right';

  useEffect(() => {
    dispatcher(initializeGameField({ x: 6, y: 6, name: mainName }));
    dispatcher(initializeGameField({ x: 6, y: 6, name: rightName }));
    dispatcher(initializeGameField({ x: 6, y: 6, name: leftName }));
  }, []);

  return (
    <div className="mx-auto flex h-[80%] w-[798px] rounded-2xl border-x-2 border-slate-700 bg-gray-800 shadow-lg">
      <GameField name={leftName} />
      <GameField
        swipe={'ALL'}
        turn={leftName}
        swipeAll={rightName}
        name={mainName}
      />
      <GameField name={rightName} />
    </div>
  );
};

export default App;
