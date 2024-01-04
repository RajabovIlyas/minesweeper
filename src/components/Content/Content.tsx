import { FC } from 'react';
import Box from 'components/Box/Box.tsx';
import { useGameMapHook } from './hooks';
import Header from '../Header/Header.tsx';
import Firework from '../Firework/Firework.tsx';
import WinGame from '../WinGame/WinGame.tsx';

const Content: FC = () => {
  const {
    gameStatus,
    gameFields,
    settings,
    onSetFlag,
    onOpenBox,
    updateSetting,
    closeContextMenu,
    onRestart,
    ...headerProps
  } = useGameMapHook();
  return (
    <>
      <Firework gameStatus={gameStatus} />
      <WinGame gameStatus={gameStatus} onRestart={onRestart}/>
      <div className='game-content'
           onContextMenu={closeContextMenu}>
        <Header {...headerProps} onRestart={onRestart} gameStatus={gameStatus} updateSetting={updateSetting} gameSettings={settings} />
        <div className='game-map'>
          {gameFields.map((fields, x) => (
            <div key={fields?.[0].id} className='game-map_column'>
              {fields.map(({ id, ...field }, y) =>
                <Box {...field}
                     key={id}
                     gameStatus={gameStatus}
                     onSetFlag={onSetFlag}
                     onOpenBox={onOpenBox} x={x}
                     y={y} />)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Content;
