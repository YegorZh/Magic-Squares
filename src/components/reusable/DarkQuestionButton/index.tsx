import React, { useEffect, useRef, useState } from 'react';
import DarkButton from '../DarkButton';

const DarkQuestionButton: React.FC<{
  children?: React.ReactNode;
  disabled?: boolean;
  onClick: (event: React.MouseEvent) => any;
}> = ({ children, onClick, disabled }) => {
  const [check, setCheck] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event?.target as HTMLElement)) {
        setCheck(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  if (!check)
    return (
      <DarkButton disabled={disabled} onClick={() => setCheck(true)}>
        {children}
      </DarkButton>
    );
  else
    return (
      <div ref={ref} className="flex space-x-2">
        <DarkButton
          onClick={(event) => {
            onClick(event);
            setCheck(false);
          }}
        >
          Yes
        </DarkButton>
        <DarkButton onClick={() => setCheck(false)}>No</DarkButton>
      </div>
    );
};

export default DarkQuestionButton;
