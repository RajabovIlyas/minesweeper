import { GameStatus } from '../../../enums/game-status.enum.ts';
import { FC, memo } from 'react';

interface PlayButtonProps {
  gameStatus: GameStatus;
  onRestart: () => void;
}

const PlayButton: FC<PlayButtonProps> = memo<PlayButtonProps>(({ gameStatus, onRestart }) => (
  <button onClick={onRestart}>
    <img key='PROCESS' className='button-img' src='/smile.svg' alt='smile'
         hidden={(gameStatus !== GameStatus.PROCESS && gameStatus !== GameStatus.START)} />
    <img key='FALL' className='button-img' src='/cry.svg' alt='sad' hidden={gameStatus !== GameStatus.FALL} />
    <img key='WIN' className='button-img' src='/cool-emoji.svg' alt='win' hidden={gameStatus !== GameStatus.WIN} />
  </button>
), (prevProps, nextProps) => prevProps.gameStatus === nextProps.gameStatus);


export default PlayButton;
