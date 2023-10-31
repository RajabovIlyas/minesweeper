import './box.styles.css';
import { FC } from 'react';
import { CellModel } from 'models/cell.model.ts';
import { Matrix } from 'models/matrix.model.ts';

interface BoxProps extends Omit<CellModel, 'id'> {
  onOpenBox: (props: Matrix) => void;
  x: number;
  y: number;
  gameOver: boolean;
}

const Box: FC<BoxProps> = ({ gameOver, show, bombNumber, bomb, flag, onOpenBox, x, y }) => {

  const openBox = () => {
    onOpenBox({ x, y });
  };

  if(!gameOver && bomb){
    return (<div className='box box-bomb'><img className='img-bomb' src='/minesweeper.svg' alt='bomb'/></div>);
  }

  if (show) {
    const boxStyle = bombNumber ? `box box-open box-open-color-${bombNumber}` : 'box box-open';
    return <div className={boxStyle}>{bombNumber}</div>;
  }

  if (flag) {
    return <div className='box'><img className='box-img'/></div>;
  }


  return (
    <div className='box box-close' onClick={openBox}></div>
  );
};

export default Box;
