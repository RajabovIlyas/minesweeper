import { GameState, useGameState } from 'store/game.store.ts';
import { pick } from 'helpers/pick.helper.ts';

const GAME_STORE_PROPERTIES: Array<keyof GameState> = [
  'checkedBomb',
  'gameStatus',
  'restartGame',
  'updateSetting',
  'settings'
]

export const useHeader = () => {
  return useGameState((state) => pick(state, GAME_STORE_PROPERTIES));
};
