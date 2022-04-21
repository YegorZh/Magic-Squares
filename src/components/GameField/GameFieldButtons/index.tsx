import React from 'react';
import {
  swipeAllColumns,
  swipeAllRows,
  swipeColumn,
  swipeRow,
  turnGameField,
} from '../../../redux/gameFieldSlice';
import { useAppDispatch } from '../../../redux/hooks';
import ArrowDown from '../GameFieldIcons/Arrow/Down';
import ArrowLeft from '../GameFieldIcons/Arrow/Left';
import ArrowRight from '../GameFieldIcons/Arrow/Right';
import ArrowUp from '../GameFieldIcons/Arrow/Up';
import CircleArrow from '../GameFieldIcons/CircleArrow';
import DoubleArrowDown from '../GameFieldIcons/DoubleArrow/Down';
import DoubleArrowLeft from '../GameFieldIcons/DoubleArrow/Left';
import DoubleArrowUp from '../GameFieldIcons/DoubleArrow/Up';
import GameFieldButton from './Template';

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
      <DoubleArrowLeft />
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
