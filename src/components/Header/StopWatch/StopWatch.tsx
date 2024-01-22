import { useStopwatch } from './stopwatch.hook.ts';
import { FC, memo, useEffect } from 'react';
import { GameStatus } from 'enums/game-status.enum.ts';
import { showNumber } from 'helpers/show-number.helper.ts';

interface StopWatchProps{
  gameStatus: GameStatus
}
const StopWatch:FC<StopWatchProps> = memo(({gameStatus}) => {
  const {seconds, startOrStopWatch, resetStopWatch, isRunning} = useStopwatch();

  useEffect(() => {
    if(gameStatus === GameStatus.PROCESS && !isRunning){
      startOrStopWatch(true);
      return;
    }
    if(gameStatus === GameStatus.FALL || gameStatus === GameStatus.WIN){
      startOrStopWatch(false);
    }
    if(gameStatus === GameStatus.START){
      startOrStopWatch(false);
      resetStopWatch();
    }
  }, [gameStatus])

  return(<h2 className="w-12 text-center">{showNumber(seconds)}</h2>)
})

export default StopWatch
