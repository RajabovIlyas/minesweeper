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
    <div className='game-content'
         onContextMenu={closeContextMenu}>
      <div className='game-header'>
        <h4>{checkedBomb}</h4>
        <PlayButtonMemo gameStatus={gameStatus} onRestart={onRestart} />
        <h4>{checkedBomb}</h4>
      </div>
      <div className='game-map'>
        {gameFields.map((fields, x) => (
          <div key={fields?.[0].id} className='game-map_column'>
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
