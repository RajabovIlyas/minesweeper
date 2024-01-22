import { GameState, useGameState } from 'store/game.store.ts';
import { pick } from 'helpers/pick.helper.ts';

const GAME_STORE_PROPERTIES: Array<keyof GameState> = ['gameStatus', 'restartGame']
export const useWinGame = () => {
  return useGameState((state) => pick(state, GAME_STORE_PROPERTIES))
}
