import { GameAction, GameTypes } from './type.ts';
import { Dispatch } from 'react';
import { Matrix } from '../../../models/matrix.model.ts';
import { SettingModel } from '../../../models/setting.model.ts';

export const gameActionCreators = (dispatch: Dispatch<GameAction>) => {
  return {
    onSetFlag: (data: Matrix) => dispatch({ payload: data, type: GameTypes.SET_FLAG }),
    onOpenBox: (startOrStopWatch: (value: boolean) => void) =>
      (matrix: Matrix) =>
        dispatch({ payload: { matrix, startOrStopWatch }, type: GameTypes.OPEN_BOX }),
    newGameFields: (resetStopWatch: () => void) =>
      () => {
        resetStopWatch();
        dispatch({ type: GameTypes.CREATE_MAP });
      },
    winGame: (remainingBombs: number, startOrStopWatch: (value: boolean)=> void) =>
      remainingBombs === 0 &&
      dispatch({ type: GameTypes.WIN_GAME, payload: { startOrStopWatch } }),
    onRestart: (resetStopWatch: () => void) =>
      () => {
        resetStopWatch();
        dispatch({ type: GameTypes.RESTART_GAME });
      },
    updateSetting: (resetStopWatch: () => void) =>
      (data: SettingModel) => {
        resetStopWatch();
        dispatch({ type: GameTypes.UPDATE_SETTING, payload: data });
      }
  };
};
