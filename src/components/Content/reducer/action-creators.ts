import { GameAction, GameTypes } from './type.ts';
import { Dispatch } from 'react';
import { Matrix } from '../../../models/matrix.model.ts';
import { SettingModel } from '../../../models/setting.model.ts';

export const gameActionCreators = (dispatch: Dispatch<GameAction>) => {
  return {
    onSetFlag: (data: Matrix) => dispatch({ payload: data, type: GameTypes.SET_FLAG }),
    onOpenBox: (matrix: Matrix) =>
        dispatch({ payload: matrix, type: GameTypes.OPEN_BOX }),
    newGameFields: () => {
        dispatch({ type: GameTypes.CREATE_MAP });
      },
    winGame: (remainingBombs: number) =>
      remainingBombs === 0 &&
      dispatch({ type: GameTypes.WIN_GAME }),
    onRestart: () => {
        dispatch({ type: GameTypes.RESTART_GAME });
      },
    updateSetting:
      (data: SettingModel) => {
        dispatch({ type: GameTypes.UPDATE_SETTING, payload: data });
      }
  };
};
