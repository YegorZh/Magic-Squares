import React from 'react';

const GameFieldButton: React.FC<{
  children?: JSX.Element | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`h-fit self-center rounded-lg bg-slate-300 px-2 shadow
                  transition hover:bg-slate-200 active:bg-slate-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default GameFieldButton;
