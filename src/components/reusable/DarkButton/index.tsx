import React from 'react';

const usualStyles = `hover:bg-slate-500 hover:text-slate-300
active:bg-slate-700 active:text-slate-600`;

const disabledStyles = `opacity-50`;

const DarkButton: React.FC<{
  onClick?: (event: React.MouseEvent) => any;
  children?: JSX.Element | string;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`rounded-xl bg-slate-600 px-8 py-3 
          font-bold uppercase tracking-tighter text-slate-400 transition 
          ${disabled ? disabledStyles : usualStyles}`}
  >
    {children}
  </button>
);

export default DarkButton;
