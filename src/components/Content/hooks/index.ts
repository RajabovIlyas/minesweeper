import { MouseEvent, useMemo } from 'react';
import { useGameReducer } from '../reducer';
import { useStopwatch } from './stopwatch.hook.ts';

export const useGameMapHook = () => {
  const {newGameFields, onRestart, updateSetting, checkedBombTrue, winGame, onOpenBox, ...data} = useGameReducer();
  const {resetStopWatch, startOrStopWatch, seconds} = useStopwatch();


  useMemo(() => {
    newGameFields(resetStopWatch)();
  }, []);

  useMemo(() => {
      winGame(checkedBombTrue, startOrStopWatch);
  }, [checkedBombTrue]);

  const closeContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    return false;
  };


  return {
    ...data,
    onOpenBox: onOpenBox(startOrStopWatch),
    onRestart: onRestart(resetStopWatch),
    updateSetting: updateSetting(resetStopWatch),
    seconds,
    closeContextMenu
  };
};
