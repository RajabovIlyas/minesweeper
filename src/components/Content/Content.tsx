import { FC } from 'react';
import { BoxMemo } from 'components/Box/Box.tsx';
import { useGameMapHook } from './hooks';
import { MemoHeader } from '../Header/Header.tsx';

const Content: FC = () => {
  const {
    gameStatus,
    gameFields,
    settings,
    onSetFlag,
    onOpenBox,
    updateSetting,
    closeContextMenu,
    ...headerProps
  } = useGameMapHook();

  return (
    <div className='game-content'
         onContextMenu={closeContextMenu}>
      <MemoHeader {...headerProps} gameStatus={gameStatus} updateSetting={updateSetting} gameSettings={settings} />
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

export default Content;
