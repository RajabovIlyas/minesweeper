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

  const boxStyle = `box text-red tc-${bombNumber} ${show
    ? `bg-open`
    : `bg-close ${flag || gameStatus === GameStatus.FALL
      ? ''
      : 'hover:bg-close_hover'}`}`;

  return (
    <div className={boxStyle} onClick={openBox} onContextMenu={setFlag}>
      <img className='box-img' src='/minesweeper.svg' alt='bomb' hidden={showBomb || flag} />
      <img className='box-img' src='/flag.svg' alt='flag' hidden={!flag} />
      {show &&<p itemProp={`${bombNumber}`} >{bombNumber}</p>}
    </div>
  );
};

export default Box;
