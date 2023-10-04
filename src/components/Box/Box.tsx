import './box.styles.css';
import { FC } from 'react';
import { CellModel } from '../../models/cell.model.ts';

interface BoxProps extends Omit<CellModel, 'id'> {
  onCheckedBomb: (x: number, y: number) => void;
  x: number;
  y: number;
}

const Box: FC<BoxProps> = ({ show, bombNumber, flag, onCheckedBomb, x, y }) => {

  const checkedBomb = () => {
    onCheckedBomb(x, y);
  };

  if (show) {
    const boxStyle = bombNumber ? `box-open box-open-color-${bombNumber}` : 'box-open';
    return <div className={boxStyle}>{bombNumber}</div>;
  }

  if (flag) {
    return <div className='box'><img className='box-img'/></div>;
  }


  return (
    <div className='box' onClick={checkedBomb}></div>
  );
};

export default Box;
