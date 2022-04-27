import React from 'react';
import {
  swipeAllColumns,
  swipeAllRows,
  swipeColumn,
  swipeRow,
  turnGameField,
} from '../../../redux/gameFieldSlice';
import { useAppDispatch } from '../../../redux/hooks';
import {
  ArrowUp,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
} from '../GameFieldIcons/Arrow';
import {
  DoubleArrowUp,
  DoubleArrowRight,
  DoubleArrowDown,
  DoubleArrowLeft,
} from '../GameFieldIcons/DoubleArrow';
import CircleArrow from '../GameFieldIcons/CircleArrow';

const GameFieldButton: React.FC<{
  children?: JSX.Element | string;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, className, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-slate-500 hover:text-slate-300 active:text-slate-700 ${className} ${
        disabled && 'pointer-events-none'
      }`}
    >
      {children && children}
    </button>
  );
};

const SwipeUpButton: React.FC<{
  index: number;
  names: string[] | string;
  className?: string;
}> = ({ index, names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(swipeColumn({ index, names, up: true }))}
    >
      <ArrowUp />
    </GameFieldButton>
  );
};

const SwipeDownButton: React.FC<{
  index: number;
  names: string[] | string;
  className?: string;
}> = ({ index, names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(swipeColumn({ index, names }))}
    >
      <ArrowDown />
    </GameFieldButton>
  );
};

const SwipeLeftButton: React.FC<{
  index: number;
  names: string[] | string;
  className?: string;
}> = ({ index, names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(swipeRow({ index, names, left: true }))}
    >
      <ArrowLeft />
    </GameFieldButton>
  );
};

const SwipeRightButton: React.FC<{
  index: number;
  names: string[] | string;
  className?: string;
}> = ({ index, names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(swipeRow({ index, names }))}
    >
      <ArrowRight />
    </GameFieldButton>
  );
};

const SwipeAllUpButton: React.FC<{
  names: string[] | string;
  className?: string;
}> = ({ names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(swipeAllColumns({ names, up: true }))}
    >
      <DoubleArrowUp />
    </GameFieldButton>
  );
};

const SwipeAllDownButton: React.FC<{
  names: string[] | string;
  className?: string;
}> = ({ names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(swipeAllColumns({ names }))}
    >
      <DoubleArrowDown />
    </GameFieldButton>
  );
};

const SwipeAllLeftButton: React.FC<{
  names: string[] | string;
  className?: string;
}> = ({ names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(swipeAllRows({ names, left: true }))}
    >
      <DoubleArrowLeft />
    </GameFieldButton>
  );
};

const SwipeAllRightButton: React.FC<{
  names: string[] | string;
  className?: string;
}> = ({ names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(swipeAllRows({ names }))}
    >
      <DoubleArrowRight />
    </GameFieldButton>
  );
};

const TurnLeftButton: React.FC<{
  names: string[] | string;
  className?: string;
}> = ({ names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(turnGameField({ names, left: true }))}
    >
      <CircleArrow />
    </GameFieldButton>
  );
};

const TurnRightButton: React.FC<{
  names: string[] | string;
  className?: string;
}> = ({ names, className }) => {
  const dispatcher = useAppDispatch();
  return (
    <GameFieldButton
      className={className}
      onClick={() => dispatcher(turnGameField({ names }))}
    >
      <CircleArrow />
    </GameFieldButton>
  );
};

export default GameFieldButton;
export {
  SwipeUpButton,
  SwipeRightButton,
  SwipeDownButton,
  SwipeLeftButton,
  SwipeAllUpButton,
  SwipeAllRightButton,
  SwipeAllDownButton,
  SwipeAllLeftButton,
  TurnLeftButton,
  TurnRightButton,
};
