import { PlayButtonMemo } from './PlayButton/PlayButton.tsx';
import { GameStatus } from '../../enums/game-status.enum.ts';
import { FC, memo, useId, useState } from 'react';
import Modal from '../Modal/Modal.tsx';
import Setting from '../Setting/Setting.tsx';
import { SettingModel } from '../../models/setting.model.ts';

interface HeaderProps {
  checkedBomb: number;
  gameStatus: GameStatus;
  onRestart: () => void;
  updateSetting: (data: SettingModel) => void;
  gameSettings: SettingModel;
}


const Header: FC<HeaderProps> = ({ checkedBomb, gameStatus, onRestart, updateSetting, gameSettings }) => {
  const formId = useId();

  const [showWindow, setShowWindow] = useState(false);

  const onSave = (data: SettingModel) => {
    setShowWindow(false);
    updateSetting(data);
  }
  const onOpenWindow = () => {
    setShowWindow(true)
  };


  return (
    <>
      <div className='header'>
        <button onClick={onOpenWindow}>
          <img className='button-img' src='/settings.svg' alt='settings' />
        </button>
        <div className='game-status'>
          <h4>{checkedBomb}</h4>
          <PlayButtonMemo gameStatus={gameStatus} onRestart={onRestart} />
          <h4>{checkedBomb}</h4>
        </div>
        <div className='w-6' />
      </div>
      <Modal saveId={formId} setShowModal={setShowWindow} showModal={showWindow}>
        <Setting formId={formId} onSave={onSave} gameSettings={gameSettings}/>
      </Modal>
      </>
  );
};

export default Header;

export const MemoHeader = memo<HeaderProps>(Header, (prevProps, nextProps) =>
  prevProps.gameStatus === nextProps.gameStatus &&
  prevProps.checkedBomb === nextProps.checkedBomb&&
  JSON.stringify(prevProps.gameSettings)===JSON.stringify(nextProps.gameSettings));
