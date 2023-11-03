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
    if(gameStatus !== GameStatus.PROCESS){
      return;
    }
    onOpenBox({ x, y });
  };

  const setFlag = (event: MouseEvent) => {
    if(gameStatus !== GameStatus.PROCESS){
      return;
    }
    onSetFlag({x, y})
    event.preventDefault();
    return false
  };

  if(gameStatus === GameStatus.FALL){
    if(bomb){
      return (<div className='box box-bomb'><img className='img-bomb' src='/minesweeper.svg' alt='bomb'/></div>);
    }
  }

  if (show) {
    const boxStyle = bombNumber ? `box box-open box-open-color-${bombNumber}` : 'box box-open';
    return <div className={boxStyle}>{bombNumber}</div>;
  }

  if (flag) {
    return <div className='box box-bomb' onContextMenu={setFlag}><img className='img-bomb' src='/flag.svg' alt="flag"/></div>;
  }


  return (
    <div className='box box-close' onClick={openBox} onContextMenu={setFlag}></div>
  );
};

export default Box;
