import { GameStatus } from '../../enums/game-status.enum.ts';
import { FC } from 'react';

interface PlayButtonProps {
  gameStatus: GameStatus;
  onRestart: () => void;
}

const PlayButton: FC<PlayButtonProps> = ({gameStatus, onRestart}) => (
      <button onClick={onRestart}>
        <img key='PROCESS' className='img-emoji' src='/smile.svg' alt='smile' hidden={gameStatus !== GameStatus.PROCESS}/>
        <img key='FALL' className='img-emoji' src='/cry.svg' alt='sad' hidden={gameStatus !== GameStatus.FALL}/>
        <img key='WIN' className='img-emoji' src='/cool-emoji.svg' alt='win' hidden={gameStatus !== GameStatus.WIN}/>
      </button>
  )


export default PlayButton
