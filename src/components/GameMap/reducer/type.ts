import { GameStatus } from '../../../enums/game-status.enum.ts';
import { CellModel } from '../../../models/cell.model.ts';
import { Matrix } from '../../../models/matrix.model.ts';

export enum GameTypes {
  SET_FLAG = 'SET_FLAG',
  OPEN_BOX = 'OPEN_BOX',
  WIN_GAME = 'WIN_GAME',
  RESTART_GAME = 'RESTART_GAME',
  CREATE_MAP = 'CREATE_MAP'
}

export type GameInitialState = {
  firstStep: boolean,
  gameStatus: GameStatus,
  checkedBomb: number,
  checkedBombTrue: number,
  gameFields: CellModel[][],
}

export interface SetFlagAction {
  type: GameTypes.SET_FLAG;
  payload: Matrix;
}

export interface OpenBoxAction {
  type: GameTypes.OPEN_BOX;
  payload: Matrix;
}

export interface WinGameAction {
  type: GameTypes.WIN_GAME;
  payload?: null,
}

export interface RestartGameAction {
  type: GameTypes.RESTART_GAME;
  payload?: null,
}

export interface CreateMapAction {
  type: GameTypes.CREATE_MAP;
  payload?: null,
}

export type GameAction =
  OpenBoxAction
  | SetFlagAction
  | WinGameAction
  | RestartGameAction
  | CreateMapAction
