import { FC } from 'react';
import { BoxMemo } from 'components/Box/Box.tsx';
import { PlayButtonMemo } from '../PlayButton/PlayButton.tsx';
import { useGameMapHook } from './game-map.hook.ts';

const GameMap: FC = () => {
  const {
    gameStatus,
    gameFields,
    onRestart,
    checkedBomb,
    onSetFlag,
    onOpenBox,
    closeContextMenu
  } = useGameMapHook();

  return (
    <div className='flex flex-col justify-center justify-items-center w-full flex-wrap'
         onContextMenu={closeContextMenu}>
      <div className='flex gap-3 justify-center justify-items-center my-1'>
        <h4 className='watch-text'>{checkedBomb}</h4>
        <PlayButtonMemo gameStatus={gameStatus} onRestart={onRestart} />
        <h4 className='watch-text'>{checkedBomb}</h4>
      </div>
      <div className='flex flex-col gap-1'>
        {gameFields.map((fields, x) => (
          <div key={fields?.[0].id} className='flex gap-1 justify-center'>
            {fields.map(({ id, ...field }, y) =>
              <BoxMemo {...field}
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
