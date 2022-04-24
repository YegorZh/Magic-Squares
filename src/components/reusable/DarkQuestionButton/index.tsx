import React, { useEffect, useRef } from 'react';
import DarkButton from '../DarkButton';

const DarkQuestionButton: React.FC<{
  children?: JSX.Element | string;
  onClick: (event: React.MouseEvent) => any;
  check: boolean;
  setCheck: (newValue: boolean) => any;
}> = ({ children, onClick, check, setCheck }) => {
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
    return <DarkButton onClick={() => setCheck(true)}>{children}</DarkButton>;
  else
    return (
      <div ref={ref} className="space-x-2">
        <DarkButton onClick={onClick}>Yes</DarkButton>
        <DarkButton onClick={() => setCheck(false)}>No</DarkButton>
      </div>
    );
};

export default DarkQuestionButton;
