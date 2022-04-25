import React, { ReactNode } from 'react';

const Tooltip: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={`z-0 flex -translate-y-2 cursor-default justify-center whitespace-nowrap rounded-xl bg-slate-600 p-2 text-slate-300 shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Tooltip;
