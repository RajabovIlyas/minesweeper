import { GameState, useGameState } from 'store/game.store.ts';
import { MouseEvent, useMemo } from 'react';
import { pick } from 'helpers/pick.helper.ts';

const GAME_STORE_PROPERTIES: Array<keyof GameState> = ['winGame', 'createMap', 'gameStatus', 'checkedBombTrue', 'gameFields', 'changeFlag', 'openBox']

export const useGameStore = () =>  {
  const {winGame, checkedBombTrue,
    createMap, ...store} = useGameState((state) => pick(state, GAME_STORE_PROPERTIES))



  useMemo(() => {
      createMap();
  }, []);

  useMemo(() => {
    if(checkedBombTrue === 0){
      winGame()
    }
  }, [checkedBombTrue]);

  const closeContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    return false;
  };


  return {
    ...store,
    closeContextMenu
  };
};
