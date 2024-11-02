import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type CellStatus = 'hidden' | 'revealed';

interface Cell {
  id: number;
  status: CellStatus;
  isMine: boolean;
  isGem: boolean;
}

interface MinesBetState {
  remainingGems: number;
  disableCells: boolean;
  currentMultiplier: number;
  currentPayout: number;
  mines: number;
  cashOut: boolean;
  grid: Cell[];
  betAmount: number;
  maxBetAmount: number;
}

const initialState: MinesBetState = {
  remainingGems: 23,
  disableCells: true,
  currentMultiplier: 1.0,
  currentPayout: 0,
  mines: 1,
  cashOut: false,
  grid: Array.from({ length: 24 }, (_, id) => ({
    id,
    status: 'hidden',
    isMine: false,
    isGem: false,
  })),
  betAmount: 1,
  maxBetAmount: 50,
};

const placeMinesAndGems = (state: MinesBetState) => {
  const cellIds = Array.from({ length: 24 }, (_, id) => id);
  const mines = new Set<number>();

  while (mines.size < state.mines) {
    const randomCell = cellIds[Math.floor(Math.random() * cellIds.length)];
    mines.add(randomCell);
  }

  state.grid = state.grid.map((cell) => ({
    id: cell.id,
    status: 'hidden',
    isMine: mines.has(cell.id),
    isGem: !mines.has(cell.id),
  }));
};

const minesSlice = createSlice({
  name: 'minesBet',
  initialState,
  reducers: {
    startGame(state) {
      state.remainingGems = initialState.remainingGems;
      state.currentMultiplier = initialState.currentMultiplier;
      state.currentPayout = initialState.currentPayout;
      state.mines = initialState.mines;
      state.disableCells = false;
      state.cashOut = false;
      state.grid = state.grid.map((cell) => ({ ...cell, status: 'hidden' }));
      placeMinesAndGems(state);
    },
    revealCell(state, action: PayloadAction<number>) {
      const cell = state.grid.find((cell) => cell.id === action.payload);
      if (!cell || cell.status === 'revealed') return;

      cell.status = 'revealed';
      if (cell.isMine) {
        state.cashOut = false;
      } else if (cell.isGem) {
        state.currentMultiplier +=
          (state.mines /
            (24 - state.grid.filter((c) => c.status === 'revealed').length)) *
          0.5;
        state.currentPayout = state.betAmount * state.currentMultiplier;
        state.cashOut = true;
      }
    },
    revealAllCells(state) {
      state.grid = state.grid.map((cell) => ({ ...cell, status: 'revealed' }));
      state.disableCells = true;
    },
    cashOut(state) {
      if (state.cashOut) {
        state.remainingGems += state.currentPayout;
        state.cashOut = false;
      }
    },
    setBetAmount(state, action: PayloadAction<number>) {
      state.betAmount = action.payload;
    },
    setMineCount(state, action: PayloadAction<number>) {
      state.mines = action.payload;
    },
  },
});

const persistConfig = {
  key: 'minesBet',
  storage,
};

export const {
  startGame,
  revealCell,
  cashOut,
  setBetAmount,
  setMineCount,
  revealAllCells,
} = minesSlice.actions;

export default persistReducer(persistConfig, minesSlice.reducer);
