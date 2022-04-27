import React, { useEffect, useState } from 'react';

const WinMessage: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  const [firstSpawn, setFirstSpawn] = useState(true);
  useEffect(() => {
    setFirstSpawn(false);
  }, []);
  return (
    <div
      className={`w-full transition-all ${
        firstSpawn ? 'opacity-0' : 'opacity-90'
      } ${className}`}
    >
      <p
        className={`mx-auto max-w-[240px] rounded-xl border-2 border-y-0 
                 border-slate-100 bg-slate-500 p-4 text-center
                   font-bold uppercase text-slate-300 transition-all ${
                     firstSpawn ? 'w-0' : 'w-fit'
                   }`}
      >
        {children || 'You win!'}
      </p>
    </div>
  );
};

export default WinMessage;
