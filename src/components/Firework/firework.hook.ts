import { useGameState } from 'store/game.store.ts';

export const useFirework = () => {
  return useGameState(({ gameStatus })=> ({
    gameStatus
  }))
}
