import { Reducer } from 'react';
import { GameAction, GameInitialState, GameTypes } from './type.ts';
import { copyGameFields } from '../../../helpers/copy-fields.helper.ts';
import { initialMoveAlgorithm } from '../../../algorithms/initial-move.algorithm.ts';
import { stepAlgorithm } from '../../../algorithms/step.algorithm.ts';
import { GameStatus } from '../../../enums/game-status.enum.ts';
import { DEFAULT_FIELD, DEFAULT_SETTINGS, GAME_SETTINGS } from '../../../constants/game.constant.ts';
import { createMapByParams } from '../../../helpers/create-map.helper.ts';

export const initialState: GameInitialState = {
  firstStep: true,
  gameStatus: GameStatus.PROCESS,
  checkedBomb: 20,
  checkedBombTrue: 20,
  gameFields: [],
  settings: JSON.parse(localStorage.getItem(GAME_SETTINGS) || 'null') || DEFAULT_SETTINGS
};

export const reducer: Reducer<GameInitialState, GameAction> = (state, { payload, type }) => {


  if (type === GameTypes.SET_FLAG) {
    const { gameFields, checkedBombTrue, checkedBomb } = state;
    const { x, y } = payload;
    const newState: Partial<GameInitialState> = {};

    if (gameFields[x][y].bomb) {
      newState.checkedBombTrue = gameFields[x][y].flag ? checkedBombTrue + 1 : checkedBombTrue - 1;
    }
    newState.checkedBomb = gameFields[x][y].flag ? checkedBomb + 1 : checkedBomb - 1;

    newState.gameFields = copyGameFields(gameFields);
    newState.gameFields[x][y].flag = !gameFields[x][y].flag;

    return { ...state, ...newState };
  }

  if (type === GameTypes.OPEN_BOX) {
    const { matrix, startOrStopWatch } = payload;
    try {
      if (state.firstStep) {
        startOrStopWatch(true);
        return {
          ...state,
          firstStep: false,
          gameFields: initialMoveAlgorithm({
            ...matrix, gameFields: state.gameFields, setting: state.settings
          })
        };
      }

      return {
        ...state,
        gameFields: stepAlgorithm({
          ...matrix,
          gameFields: state.gameFields,
          setting: state.settings
        })
      };
    } catch (e) {
      startOrStopWatch(false);
      return { ...state, gameStatus: GameStatus.FALL };
    }
  }

  if (type === GameTypes.WIN_GAME) {
    const { startOrStopWatch } = payload;
    startOrStopWatch(false);
    return {
      ...state,
      gameStatus: GameStatus.WIN,
      gameFields: state.gameFields.map((column) =>
        column.map((field) => ({
          ...field, show: !field.bomb
        })))
    };
  }

  if (type === GameTypes.RESTART_GAME) {
    return {
      ...state,
      firstStep: true,
      gameStatus: GameStatus.PROCESS,
      checkedBomb: state.settings.bombs,
      checkedBombTrue: state.settings.bombs,
      gameFields: state.gameFields.map((columns) =>
        columns.map((field) => ({
          ...field,
          ...DEFAULT_FIELD
        })))
    };
  }

  if (type === GameTypes.UPDATE_SETTING) {
    return {
      ...state,
      settings: payload,
      firstStep: true,
      gameStatus: GameStatus.PROCESS,
      checkedBomb: payload.bombs,
      checkedBombTrue: payload.bombs,
      gameFields: createMapByParams(payload.rows, payload.columns)
    };
  }


  if (type === GameTypes.CREATE_MAP) {
    return {
      ...state,
      firstStep: true,
      gameStatus: GameStatus.PROCESS,
      checkedBomb: state.settings.bombs,
      checkedBombTrue: state.settings.bombs,
      gameFields: createMapByParams(state.settings.rows, state.settings.columns)
    };
  }

  return state;
};


