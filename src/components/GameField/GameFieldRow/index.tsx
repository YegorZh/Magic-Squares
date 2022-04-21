import React from 'react';

const GameFieldRow: React.FC<{
  data: string[];
  firstRow?: boolean;
  lastRow?: boolean;
  size: { w: string; h: string };
}> = ({ data, firstRow, lastRow, size }) => {
  return (
    <div className="flex">
      {data.map((element, i) => {
        let cornerStyle = '';
        if (firstRow && i === 0) cornerStyle = 'rounded-tl-2xl';
        else if (firstRow && i === data.length - 1)
          cornerStyle = 'rounded-tr-2xl';
        else if (lastRow && i === 0) cornerStyle = 'rounded-bl-2xl';
        else if (lastRow && i === data.length - 1)
          cornerStyle = 'rounded-br-2xl';
        return (
          <div
            key={i}
            className={`relative flex items-center justify-center rounded-sm border-x 
                        border-y border-slate-900 ${size.h} ${size.w} ${element} ${cornerStyle}`}
          />
        );
      })}
    </div>
  );
};

export default GameFieldRow;
