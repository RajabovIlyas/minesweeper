import { FC, memo, MouseEvent } from 'react';
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

const checkStatus = (status: GameStatus) => status !== GameStatus.PROCESS && status !== GameStatus.START

const Box: FC<BoxProps> = memo<BoxProps>(({ gameStatus, show, bombNumber, bomb, flag, onOpenBox, onSetFlag, x, y }) => {

  const openBox = () => {
    if (checkStatus(gameStatus) || show) {
      return;
    }
    onOpenBox({ x, y });
  };

  const setFlag = (event: MouseEvent) => {
    if (checkStatus(gameStatus) || show) {
      return;
    }

    onSetFlag({ x, y });
    event.preventDefault();
    return false;
  };

  const showBomb = (!(gameStatus === GameStatus.FALL && bomb) || flag);


  const boxStyle = 'box ' + (show
    ? 'open'
    : 'close ' + (
      gameStatus === GameStatus.FALL
      ? !flag && bomb && 'bomb'
      : 'dark:hover:bg-slate-600 hover:bg-slate-600'
  ));

  return (
    <div className={boxStyle} onClick={openBox} onContextMenu={setFlag}>
      <img className='box-img' src='/minesweeper.svg' alt='bomb' hidden={showBomb} />
      <img className='box-img' src='/flag.svg' alt='flag' hidden={!flag} />
      {show && <p itemProp={`${bombNumber}`}>{bombNumber}</p>}
    </div>
  );
},
  (prevProps, nextProps) =>
    prevProps.flag === nextProps.flag &&
    prevProps.show === nextProps.show &&
    prevProps.gameStatus === nextProps.gameStatus
);


export default Box
