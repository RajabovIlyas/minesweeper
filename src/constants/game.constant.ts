import { CellModel } from 'models/cell.model.ts';
import { SettingModel } from 'models/setting.model.ts';

export const GAME_SETTINGS = 'GAME_SETTINGS';
export const COUNT_BOMBS = 20;
export const CELLS_WIDE = 20;
export const CELLS_HEIGHT = 15;

export const DEFAULT_SETTINGS: SettingModel = {
  rows: 15,
  columns: 20,
  bombs: 20,
}

export const DEFAULT_FIELD: Omit<CellModel, 'id'> = {
  show: false,
  bomb: false,
  flag: false,
  bombNumber: null
}
