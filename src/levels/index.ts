import { GameFieldActions } from '../redux/gameFieldSlice';

export type LevelStructure = {
  readonly [key: string]: GameFieldActions | undefined;
  topLeft?: GameFieldActions;
  topCenter?: GameFieldActions;
  topRight?: GameFieldActions;
  middleLeft?: GameFieldActions;
  middleCenter?: GameFieldActions;
  middleRight?: GameFieldActions;
  bottomLeft?: GameFieldActions;
  bottomCenter?: GameFieldActions;
  bottomRight?: GameFieldActions;
};

export type LevelData = {
  structure: LevelStructure;
  id: number;
  name: string;
  size: number;
};

const defaultSize = 3;
const levels: LevelData[] = [
  {
    name: 'Level 1',
    id: 0,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: 'middleLeft' },
      middleCenter: { swipeAllColumns: 'middleCenter' },
      middleRight: { swipeAllColumns: 'middleRight' },
    },
  },
  {
    name: 'Level 2',
    id: 1,
    size: defaultSize,
    structure: {
      middleLeft: { turn: 'middleLeft' },
      middleCenter: { turn: 'middleCenter' },
      middleRight: { turn: 'middleRight' },
    },
  },
  {
    name: 'Level 3',
    id: 2,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 4',
    id: 3,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: { turn: 'middleCenter' },
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 5',
    id: 4,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 6',
    id: 5,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 7',
    id: 6,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 8',
    id: 7,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 9',
    id: 8,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 10',
    id: 9,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level ???',
    id: 10,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
];

export default levels;
