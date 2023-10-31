import { CellModel } from 'models/cell.model.ts';

export const COUNT_BOMBS = 40;
export const CELLS_WIDE = 20;

export const CELLS_HEIGHT = 15;

export const DEFAULT_FIELD: Omit<CellModel, 'id'> = {
  show: false,
  bomb: false,
  flag: false
}
