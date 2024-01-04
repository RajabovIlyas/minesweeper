import { FC, memo } from 'react';
import { GameStatus } from '../../enums/game-status.enum.ts';

interface WinGameProps {
  gameStatus: GameStatus;
  onRestart: () => void;
}

const WinGame: FC<WinGameProps> = memo<WinGameProps>(({ gameStatus, onRestart }) => {

  const onClose = () => {
    onRestart();
  };


  return (gameStatus === GameStatus.WIN || gameStatus === GameStatus.FALL) && (
    <div
      className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
    >
      <div className='relative w-auto mb-10 mx-auto max-w-3xl p-5'>
        <div
          className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none drop-shadow-2xl'>
          <div
            className='dark:bg-neutral-800 flex flex-col items-center justify-between gap-5 p-5 rounded-t'>
            <h1 className='dark:text-zinc-300 text-3xl font-semibold'>
              Game Over
            </h1>
            <button
              className='dark:bg-emerald-700 max-w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
              onClick={onClose}>Reset game
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => prevProps.gameStatus === nextProps.gameStatus);

export default WinGame;
