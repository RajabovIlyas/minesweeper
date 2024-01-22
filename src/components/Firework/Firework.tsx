import { FC, memo, useEffect, useRef } from 'react';
import { Fireworks } from './firework.canvas.ts';
import { GameStatus } from 'enums/game-status.enum.ts';
import { useFirework } from './firework.hook.ts';



const Firework:FC = memo(() => {
  const ref = useRef(null);
  const firework = new Fireworks(ref);
  const { gameStatus } = useFirework();


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
