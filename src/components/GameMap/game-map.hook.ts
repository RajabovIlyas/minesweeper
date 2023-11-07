import { MouseEvent, useEffect } from 'react';
import { gameReducer } from './reducer';

export const useGameMapHook = () => {
  const {newGameFields, checkedBombTrue, winGame, ...data} = gameReducer();


  useEffect(() => {
    newGameFields();
  }, []);

  useEffect(() => {
    if (checkedBombTrue <= 0) {
      winGame();
    }
  }, [checkedBombTrue]);

  const closeContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    return false;
  };


  return {
    ...data,
    closeContextMenu
  };
};
