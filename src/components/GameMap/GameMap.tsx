import { FC } from 'react';
import Box from 'components/Box/Box.tsx';
import { useGameMapHook } from './game-map.hook.ts';
import PlayButton from '../PlayButton/PlayButton.tsx';

const GameMap: FC = () => {
  const {
    gameStatus,
    gameFields,
    onRestart,
    checkedBomb,
    closeContextMenu,
    onSetFlag,
    onOpenBox
  } = useGameMapHook();
  // d-flex-column justify-content-center align-content-center flex-wrap w-100

  return (
    <div className='flex flex-col justify-center justify-items-center w-full flex-wrap'
         onContextMenu={closeContextMenu}>
      <div className='flex gap-3 justify-center justify-items-center my-1'>
        <h4 className='watch-text'>{checkedBomb}</h4>
        <PlayButton gameStatus={gameStatus} onRestart={onRestart} />
        <h4 className='watch-text'>{checkedBomb}</h4>
      </div>
      <div className='flex flex-col gap-1'>
        {gameFields.map((fields, x) => (
          <div key={fields?.[0].id} className='flex gap-1 justify-center'>
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
  );
};

export default GameMap;
