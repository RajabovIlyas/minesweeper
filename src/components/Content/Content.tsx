import { FC } from 'react';
import Box from 'components/Box/Box.tsx';
import Header from '../Header/Header.tsx';
import WinGame from '../WinGame/WinGame.tsx';
import { useGameStore } from './content.hook.ts';
import Footer from '../Footer/Footer.tsx';
import Confetti from '../Confetti/Confetti.tsx';
import { GameStatus } from '../../enums/game-status.enum.ts';

const Content: FC = () => {
  const {
    gameStatus,
    gameFields,
    changeFlag,
    openBox,
    closeContextMenu
  } = useGameStore();


  return (
    <>
      {gameStatus === GameStatus.WIN && <Confetti/>}
      <WinGame />
      <div className='game-content min-h-screen'
           onContextMenu={closeContextMenu}>
        <Header />
        <div className='game-map'>
          <div className='game-map-scroll'>
            <div className='flex'>
            {Array.isArray(gameFields) && gameFields.map((fields, x) => (
              <div key={fields?.[0].id} className='game-map_column'>
                {Array.isArray(fields) && fields.map(({ id, ...field }, y) =>
                  <Box {...field}
                       key={id}
                       gameStatus={gameStatus}
                       onSetFlag={changeFlag}
                       onOpenBox={openBox} x={x}
                       y={y} />)}
              </div>
            ))}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Content;
