import { create } from 'zustand'
import { GameStatus } from 'enums/game-status.enum.ts';
import { CellModel } from 'models/cell.model.ts';
import { SettingModel } from 'models/setting.model.ts';
import { copyGameFields } from 'helpers/copy-fields.helper.ts';
import { Matrix } from 'models/matrix.model.ts';
import { DEFAULT_FIELD, DEFAULT_SETTINGS, GAME_SETTINGS } from 'constants/game.constant.ts';
import { initialMoveAlgorithm } from 'algorithms/initial-move.algorithm.ts';
import { stepAlgorithm } from 'algorithms/step.algorithm.ts';
import { createMapByParams } from 'helpers/create-map.helper.ts';

export type GameInitialState = {
  firstStep: boolean,
  gameStatus: GameStatus,
  checkedBomb: number,
  checkedBombTrue: number,
  gameFields: CellModel[][],
  settings: SettingModel,
}

export interface GameState {
  firstStep: boolean,
  gameStatus: GameStatus,
  checkedBomb: number,
  checkedBombTrue: number,
  gameFields: CellModel[][],
  settings: SettingModel,
  changeFlag: (matrix: Matrix) => void;
  openBox: (matrix: Matrix) => void;
  createMap: () => void;
  winGame: () => void;
  updateSetting: (setting: SettingModel) => void;
  restartGame: () => void
}


export const useGameState = create<GameState>((set) => ({
  firstStep: true,
  gameStatus: GameStatus.START,
  checkedBomb: 20,
  checkedBombTrue: 20,
  gameFields: [],
  settings: { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(GAME_SETTINGS) || '{}') },

  changeFlag: (matrix: Matrix) => {

    const { x, y } = matrix;

    set((state: GameState) => {
      const { gameFields, checkedBombTrue, checkedBomb } = state;
      const newState: Partial<GameInitialState> = {};

      if(checkedBomb === 0 && !gameFields[x][y].flag){
        return {};
      }

      if (gameFields[x][y].bomb) {
        newState.checkedBombTrue = gameFields[x][y].flag ? checkedBombTrue + 1 : checkedBombTrue - 1;
      }
      newState.checkedBomb = gameFields[x][y].flag ? checkedBomb + 1 : checkedBomb - 1;

      newState.gameFields = copyGameFields(gameFields);
      newState.gameFields[x][y].flag = !gameFields[x][y].flag;
      return newState;
    })
  },

  openBox: (matrix: Matrix) => {

    set((state:GameState) => {
      try {
        if (state.firstStep) {
          return {
            ...state,
            firstStep: false,
            gameStatus: GameStatus.PROCESS,
            gameFields: initialMoveAlgorithm({
              ...matrix, gameFields: state.gameFields, setting: state.settings
            })
          };
        }

        return {
          gameFields: stepAlgorithm({
            ...matrix,
            gameFields: state.gameFields,
            setting: state.settings
          })
        };
      } catch (e) {
        return { gameStatus: GameStatus.FALL };
      }
    })
  },

  winGame: () =>
    set((state: GameState) => ({
      gameStatus: GameStatus.WIN,
      gameFields: state.gameFields.map((column) =>
        column.map((field) => ({
          ...field, show: !field.bomb
        })))})),

  restartGame: () => set((state: GameState) => ({
    firstStep: true,
    gameStatus: GameStatus.START,
    checkedBomb: state.settings.bombs,
    checkedBombTrue: state.settings.bombs,
    gameFields: state.gameFields.map((columns) =>
      columns.map((field) => ({
        ...field,
        ...DEFAULT_FIELD
      })))
  })),

  updateSetting: (setting: SettingModel) => set({
    settings: setting,
    firstStep: true,
    gameStatus: GameStatus.START,
    checkedBomb: setting.bombs,
    checkedBombTrue: setting.bombs,
    gameFields: createMapByParams(setting.rows, setting.columns)
  }),

  createMap:() => set((state: GameState) => ({
    firstStep: true,
    gameStatus: GameStatus.START,
    checkedBomb: state.settings.bombs,
    checkedBombTrue: state.settings.bombs,
    gameFields: createMapByParams(state.settings.rows, state.settings.columns)
  }))
}))
