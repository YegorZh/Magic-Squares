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
  name: string;
  size: number;
};

const defaultSize = 3;
const levels: LevelData[] = [
  {
    name: 'Level 1',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 2',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 3',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 4',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 5',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 6',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 7',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 8',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 9',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level 10',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
  {
    name: 'Level ???',
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllColumns: ['middleCenter', 'middleLeft'] },
      middleCenter: {},
      middleRight: { swipeAllRows: ['middleCenter', 'middleRight'] },
    },
  },
];

export default levels;
