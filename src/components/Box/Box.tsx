import './box.styles.css';
import { FC, MouseEvent } from 'react';
import { CellModel } from 'models/cell.model.ts';
import { Matrix } from 'models/matrix.model.ts';
import { GameStatus } from '../../enums/game-status.enum.ts';

interface BoxProps extends Omit<CellModel, 'id'> {
  onOpenBox: (props: Matrix) => void;
  onSetFlag: (props: Matrix) => void;
  x: number;
  y: number;
  gameStatus: GameStatus;
}

const Box: FC<BoxProps> = ({ gameStatus, show, bombNumber, bomb, flag, onOpenBox, onSetFlag, x, y }) => {

  const openBox = () => {
    if (gameStatus !== GameStatus.PROCESS || show) {
      return;
    }
    onOpenBox({ x, y });
  };

  const setFlag = (event: MouseEvent) => {
    if (show || gameStatus !== GameStatus.PROCESS) {
      return;
    }

    onSetFlag({ x, y });
    event.preventDefault();
    return false;
  };

  const showBomb = !(gameStatus === GameStatus.FALL && bomb);

  const boxStyle = show ? (bombNumber ? `box box-open box-open-color-${bombNumber}` : 'box box-open') : 'box box-close';

  return (
    <div className={boxStyle} onClick={openBox} onContextMenu={setFlag}>
      <img className='img-bomb' src='/minesweeper.svg' alt='bomb' hidden={showBomb || flag}/>
      <img className='img-bomb' src='/flag.svg' alt='flag' hidden={!flag} />
      {show && bombNumber}
    </div>
  );
};

export default Box;
