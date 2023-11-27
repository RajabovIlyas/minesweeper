import { MouseEvent, useMemo } from 'react';
import { useGameReducer } from './reducer';

export const useGameMapHook = () => {
  const {newGameFields, checkedBombTrue, winGame, ...data} = useGameReducer();


  useMemo(() => {
    newGameFields();
  }, []);

  useMemo(() => {
      winGame(checkedBombTrue);
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
