import React from 'react';

const GameFieldButton: React.FC<{
  children?: JSX.Element | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`text-slate-500 hover:text-slate-300 active:text-slate-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default GameFieldButton;
