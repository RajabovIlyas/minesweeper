import { FC, memo, useEffect, useRef } from 'react';
import { Fireworks } from './firework.canvas.ts';
import { GameStatus } from '../../enums/game-status.enum.ts';

interface FireworkProps {
  gameStatus: GameStatus
}

const Firework:FC<FireworkProps> = memo(({gameStatus}) => {
  const ref = useRef(null);
  const firework = new Fireworks(ref);


  useEffect(() => {

    if(gameStatus !== GameStatus.WIN){
      return;
    }
    firework.run();

  }, [gameStatus])

  return(
    <canvas ref={ref} hidden={gameStatus !== GameStatus.WIN}></canvas>
  )
})

export default Firework;
