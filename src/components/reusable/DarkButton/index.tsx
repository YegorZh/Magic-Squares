import React from 'react';

const usualStyles = `hover:bg-slate-500 hover:text-slate-300
active:bg-slate-700 active:text-slate-600`;

const disabledStyles = `opacity-50`;

const DarkButton: React.FC<{
  onClick?: (event: React.MouseEvent) => any;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  nonResponsive?: boolean;
}> = ({ onClick, children, disabled, className, nonResponsive }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center justify-center whitespace-nowrap rounded-xl bg-slate-600
          font-bold uppercase tracking-tighter text-slate-400 transition sm:py-3 sm:px-8 sm:text-sm
          ${disabled ? disabledStyles : usualStyles} ${
      nonResponsive ? 'px-8 py-3 text-sm' : 'px-3 py-3 text-xs'
    } ${className}`}
  >
    {children}
  </button>
);

export default DarkButton;
