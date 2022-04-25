import React, { useState } from 'react';
import { generateField, rotateField } from '../../../redux/gameFieldLogic';
import GameField from '../../GameField';

const Info: React.FC<{ size: number; className?: string }> = ({
  size,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverClasses = 'pointer-events-auto opacity-100 left-0';
  const defaultClasses = 'pointer-events-none opacity-0 -left-full';
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`dropdown z-10 rounded-t-lg
                    text-slate-600 transition-all hover:text-slate-500 ${className}`}
    >
      <div className="relative">
        <div className="relative z-10 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div
          className={`dropdown-content absolute top-0
                       z-0 flex flex-col justify-center
                       rounded-2xl bg-slate-700 transition-all ${
                         isHovered ? hoverClasses : defaultClasses
                       }`}
        >
          <p className="w-full cursor-default pt-2 text-center font-semibold uppercase -tracking-tighter">
            Win
            <br /> if all squares are
            <br /> the same
          </p>
          <div className="flex w-full items-center justify-center py-4">
            <GameField name={{ field: generateField(size) }} />
            <h3 className="w-full cursor-default text-center font-semibold uppercase -tracking-tighter">
              or
            </h3>
            <GameField name={{ field: rotateField(generateField(size)) }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
