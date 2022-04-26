import React from 'react';
import levels from '../../levels';
import { setCurrentLevel, setMenuState } from '../../redux/appStateSlice';
import { useAppDispatch } from '../../redux/hooks';
import DarkButton from '../reusable/DarkButton';

const Menu: React.FC = () => {
  const dispatcher = useAppDispatch();
  return (
    <div className="flex h-full flex-1 items-center justify-center overflow-hidden py-4">
      <div className="h-full overflow-y-auto py-2">
        <div className="flex flex-col space-y-3">
          {levels.map((level, i) => (
            <DarkButton
              key={i}
              onClick={() => {
                dispatcher(setMenuState('level'));
                dispatcher(setCurrentLevel(i));
              }}
            >
              {level.name}
            </DarkButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
