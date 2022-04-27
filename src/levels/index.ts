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
      topLeft: { swipeAllColumns: 'topLeft' },
      topCenter: { swipeAllColumns: 'topCenter' },
      topRight: { swipeAllColumns: 'topRight' },
      middleLeft: { turn: 'middleLeft' },
      middleCenter: { turn: 'middleCenter' },
      middleRight: { turn: 'middleRight' },
    },
  },
  {
    name: 'Level 4',
    id: 3,
    size: defaultSize,
    structure: {
      middleLeft: { turn: 'middleLeft', swipeAllRows: 'middleLeft' },
      middleCenter: { turn: 'middleCenter', swipeAllRows: 'middleCenter' },
      middleRight: { turn: 'middleRight', swipeAllRows: 'middleRight' },
    },
  },
  {
    name: 'Level 5',
    id: 4,
    size: defaultSize,
    structure: {
      middleLeft: { turn: ['middleLeft', 'middleCenter'] },
      middleCenter: {},
      middleRight: { swipeAllColumns: ['middleRight', 'middleCenter'] },
    },
  },
  {
    name: 'Level 6',
    id: 5,
    size: defaultSize,
    structure: {
      middleLeft: { swipeAllRows: 'middleLeft' },
      middleCenter: { turn: 'ALL' },
      middleRight: { swipeAllRows: 'middleRight' },
    },
  },
  {
    name: 'Level 7',
    id: 6,
    size: defaultSize,
    structure: {
      middleLeft: { turn: ['middleLeft', 'middleCenter'] },
      middleCenter: {
        swipeAllColumns: 'ALL',
        swipeAllRows: 'ALL',
      },
      middleRight: { turn: ['middleRight', 'middleCenter'] },
    },
  },
  {
    name: 'Level 8',
    id: 7,
    size: defaultSize,
    structure: {
      topCenter: { turn: ['topCenter', 'middleCenter'] },
      middleLeft: {
        swipeAllRows: ['middleLeft', 'middleCenter'],
      },
      middleCenter: {},
      middleRight: {
        swipeAllColumns: ['middleRight', 'middleCenter'],
      },
      bottomCenter: {
        turn: ['bottomCenter', 'middleCenter'],
      },
    },
  },
  {
    name: 'Level 9',
    id: 8,
    size: defaultSize,
    structure: {
      topLeft: {},
      topCenter: { swipeAllRows: ['topLeft', 'topCenter', 'middleCenter'] },
      middleCenter: { turn: 'ALL' },
      bottomRight: {},
      bottomCenter: {
        swipeAllColumns: ['bottomRight', 'bottomCenter', 'middleCenter'],
      },
    },
  },
  {
    name: 'Level 10',
    id: 9,
    size: defaultSize,
    structure: {
      topLeft: {},
      topCenter: { turn: ['topCenter', 'middleCenter', 'topLeft'] },
      middleLeft: {
        swipeAllRows: ['middleLeft', 'middleCenter', 'topLeft'],
      },
      middleCenter: {},
      middleRight: {
        swipeAllColumns: ['middleRight', 'middleCenter', 'bottomRight'],
      },
      bottomCenter: {
        turn: ['bottomCenter', 'middleCenter', 'bottomRight'],
      },
      bottomRight: {},
    },
  },
  {
    name: 'Level 11',
    id: 10,
    size: defaultSize,
    structure: {
      middleLeft: { swipeColumn: 'middleLeft' },
      middleCenter: { swipeColumn: 'middleCenter' },
      middleRight: { swipeColumn: 'middleRight' },
    },
  },
  {
    name: 'Level 12',
    id: 11,
    size: defaultSize,
    structure: {
      middleCenter: { swipeColumn: 'middleCenter', swipeRow: 'middleCenter' },
    },
  },
  {
    name: 'Level 13',
    id: 12,
    size: defaultSize,
    structure: {
      middleCenter: { swipeColumn: 'middleCenter', swipeRow: 'middleCenter' },
    },
  },
  {
    name: 'Level 14',
    id: 13,
    size: defaultSize,
    structure: {
      middleLeft: { turn: ['middleLeft', 'middleCenter'] },
      middleCenter: { swipeColumn: 'ALL', swipeRow: 'ALL' },
      middleRight: { swipeAllColumns: ['middleRight', 'middleCenter'] },
    },
  },
  {
    name: 'Level 15',
    id: 14,
    size: defaultSize,
    structure: {
      middleLeft: { turn: ['middleLeft', 'middleCenter'] },
      middleCenter: { swipeColumn: 'ALL', swipeRow: 'ALL' },
      middleRight: { swipeAllRows: ['middleRight', 'middleCenter'] },
    },
  },
  {
    name: 'Level ???',
    id: 15,
    size: defaultSize,
    structure: {
      topLeft: { swipeColumn: 'topCenter' },
      topCenter: { turn: 'bottomRight', swipeRow: 'topLeft' },
      topRight: { swipeRow: 'bottomLeft' },
      middleCenter: { turn: 'bottomLeft', swipeAllColumns: 'topRight' },
      bottomLeft: { swipeColumn: 'topLeft' },
      bottomRight: { turn: 'topLeft', swipeAllColumns: 'bottomLeft' },
    },
  },
  {
    name: 'Level !?!?',
    id: 16,
    size: defaultSize,
    structure: {
      topLeft: {},
      topCenter: { turn: ['topLeft', 'topCenter', 'topRight'] },
      topRight: {},
      middleLeft: { swipeAllColumns: ['topLeft', 'middleLeft', 'bottomLeft'] },
      middleCenter: { swipeRow: 'ALL', swipeColumn: 'ALL' },
      middleRight: {
        swipeAllRows: ['topRight', 'middleRight', 'bottomRight'],
      },
      bottomLeft: {},
      bottomCenter: { turn: ['bottomLeft', 'bottomCenter', 'bottomRight'] },
      bottomRight: {},
    },
  },
  {
    name: 'R E D A C T E D',
    id: 17,
    size: defaultSize,
    structure: {
      topLeft: {
        swipeColumn: ['topLeft', 'topCenter', 'middleLeft'],
        swipeRow: ['topLeft', 'topCenter', 'middleLeft'],
      },
      topCenter: { turn: ['topLeft', 'topCenter', 'topRight', 'middleCenter'] },
      topRight: {
        swipeColumn: ['topRight', 'topCenter', 'middleRight'],
        swipeRow: ['topRight', 'topCenter', 'middleRight'],
      },
      middleLeft: {
        turn: ['topLeft', 'middleLeft', 'bottomLeft', 'middleCenter'],
      },
      middleCenter: {
        swipeAllColumns: [
          'middleCenter',
          'middleLeft',
          'middleRight',
          'topCenter',
          'bottomCenter',
        ],
        swipeAllRows: [
          'middleCenter',
          'middleLeft',
          'middleRight',
          'topCenter',
          'bottomCenter',
        ],
      },
      middleRight: {
        turn: ['topRight', 'middleRight', 'bottomRight', 'middleCenter'],
      },
      bottomLeft: {
        swipeColumn: ['bottomLeft', 'bottomCenter', 'middleLeft'],
        swipeRow: ['bottomLeft', 'bottomCenter', 'middleLeft'],
      },
      bottomCenter: {
        turn: ['bottomLeft', 'bottomCenter', 'bottomRight', 'middleCenter'],
      },
      bottomRight: {
        swipeColumn: ['bottomRight', 'bottomCenter', 'middleRight'],
        swipeRow: ['bottomRight', 'bottomCenter', 'middleRight'],
      },
    },
  },
];

export default levels;
