import React, { useEffect, useState } from 'react';

const WinMessage: React.FC<{ className?: string; message?: string }> = ({
  className,
  message,
}) => {
  const [firstSpawn, setFirstSpawn] = useState(true);
  useEffect(() => {
    setFirstSpawn(false);
  }, []);
  return (
    <div
      className={`w-full bg-slate-700 transition-all ${
        firstSpawn ? 'opacity-0' : 'opacity-70'
      } ${className}`}
    >
      <p
        className={`mx-auto rounded border-2 border-y-0 border-slate-100 bg-slate-500 
                  p-4 font-bold uppercase text-slate-300 transition-all ${
                    firstSpawn ? 'w-0' : 'w-fit'
                  }`}
      >
        {message || 'You win!'}
      </p>
    </div>
  );
};

export default WinMessage;
