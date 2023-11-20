import { GameStatus } from 'enums/game-status.enum.ts';
import { CELLS_HEIGHT, CELLS_WIDE, COUNT_BOMBS, DEFAULT_FIELD } from '../../../constants/game.constant.ts';
import { GameAction, GameInitialState, GameTypes } from './type.ts';
import { Reducer, useReducer } from 'react';
import { stepAlgorithm } from 'algorithms/step.algorithm.ts';
import { copyGameFields } from 'helpers/copy-fields.helper.ts';
import { gameActionCreators } from './action-creators.ts';
import { initialMoveAlgorithm } from 'algorithms/initial-move.algorithm.ts';
import { createMapByParams } from 'helpers/create-map.helper.ts';

const reducer: Reducer<GameInitialState, GameAction> = (state, { payload, type }) => {

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
    try {
      if (state.firstStep) {
        return {
          ...state,
          firstStep: false,
          gameFields: initialMoveAlgorithm({
            ...payload, gameFields: state.gameFields
          })
        };
      }

      return {
        ...state,
        gameFields: stepAlgorithm({
          ...payload,
          gameFields: state.gameFields
        })
      };
    }catch (e){
      return {...state, gameStatus: GameStatus.FALL, }
    }
  }

  if (type === GameTypes.WIN_GAME) {
    return {
      ...state,
      gameStatus: GameStatus.WIN,
      gameFields: state.gameFields.map((column) =>
        column.map((field) => ({
          ...field, show: !field.bomb
        })))
    };
  }

  if(type === GameTypes.RESTART_GAME){
    return {
      ...state,
      firstStep: true,
      gameStatus: GameStatus.PROCESS,
      checkedBomb: COUNT_BOMBS,
      checkedBombTrue: COUNT_BOMBS,
      gameFields: state.gameFields.map((columns) =>
        columns.map((field) => ({
          ...field,
          ...DEFAULT_FIELD
        })))
    }
  }


  if (type === GameTypes.CREATE_MAP) {
    return {
      ...state,
      firstStep: true,
      gameStatus: GameStatus.PROCESS,
      checkedBomb: COUNT_BOMBS,
      checkedBombTrue: COUNT_BOMBS,
      gameFields: createMapByParams(CELLS_HEIGHT, CELLS_WIDE),
    };
  }

  return state;
};

const initialState: GameInitialState = {
  firstStep: true,
  gameStatus: GameStatus.PROCESS,
  checkedBomb: COUNT_BOMBS,
  checkedBombTrue: COUNT_BOMBS,
  gameFields: []
};



export const useGameReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { ...state, ...gameActionCreators(dispatch) };
};
