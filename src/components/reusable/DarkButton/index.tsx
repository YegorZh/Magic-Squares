import React from 'react';

const usualStyles = `hover:bg-slate-500 hover:text-slate-300
active:bg-slate-700 active:text-slate-600`;

const disabledStyles = `opacity-50`;

const DarkButton: React.FC<{
  onClick?: (event: React.MouseEvent) => any;
  children?: React.ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center justify-center whitespace-nowrap rounded-xl bg-slate-600 px-2 py-3 text-sm
          font-bold uppercase tracking-tighter text-slate-400 transition sm:py-3 sm:px-8
          ${disabled ? disabledStyles : usualStyles}`}
  >
    {children}
  </button>
);

export default DarkButton;
