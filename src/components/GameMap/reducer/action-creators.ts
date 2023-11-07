import { GameAction, GameTypes } from './type.ts';
import { Dispatch } from 'react';
import { Matrix } from '../../../models/matrix.model.ts';

export const gameActionCreators = (dispatch: Dispatch<GameAction>) => {
  return {
    onSetFlag: (data: Matrix) => dispatch({payload: data, type: GameTypes.SET_FLAG}),
    onOpenBox: (data: Matrix) => dispatch({ payload: data, type: GameTypes.OPEN_BOX }),
    newGameFields: () => dispatch({type: GameTypes.CREATE_MAP}),
    winGame: () => dispatch({type: GameTypes.WIN_GAME}),
    onRestart: () => dispatch({ type: GameTypes.RESTART_GAME }),
  };
};
