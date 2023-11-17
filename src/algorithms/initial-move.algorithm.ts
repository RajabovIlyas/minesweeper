import { Matrix } from 'models/matrix.model.ts';
import { openBox } from 'algorithms/step.algorithm.ts';
import { CellModel } from 'models/cell.model.ts';
import { copyGameFields } from '../helpers/copy-fields.helper.ts';
import { CELLS_HEIGHT, CELLS_WIDE, COUNT_BOMBS } from 'constants/game.constant.ts';
import { randomCountHelper } from '../helpers/random-count.helper.ts';




interface BombProps extends Matrix {
  bombs: Matrix[];
}

interface Props extends Matrix {
  gameFields: CellModel[][];
}



const getRandomBomb = (props: BombProps): Matrix => {
  const { bombs, x, y } = props

  let xBomb = randomCountHelper(CELLS_HEIGHT);
  let yBomb = randomCountHelper(CELLS_WIDE);

  if ((x - 1 <= xBomb &&  x + 1 >= xBomb) && (y - 1 <= yBomb &&  y + 1>= yBomb)) {
    return getRandomBomb(props);
  }

  if (bombs.find((bomb) => bomb.x === xBomb && bomb.y === yBomb)) {
    return getRandomBomb(props);
  }

  return { x: xBomb, y: yBomb };
};


const generateBomb = ({ gameFields, x, y }: Props): CellModel[][] => {
    const newGameFields = copyGameFields(gameFields);

    const bombs: Matrix[] = [];

    for (let i = 0; i < COUNT_BOMBS; i++) {
      bombs.push(getRandomBomb({ bombs, x, y }));
    }


    bombs.forEach((bomb) => {
      newGameFields[bomb.x][bomb.y].bomb = true;
      for (let xCheck = bomb.x - 1; xCheck <= bomb.x + 1; xCheck++) {
        for (let yCheck = bomb.y - 1; yCheck <= bomb.y + 1; yCheck++) {
          if(newGameFields?.[xCheck]?.[yCheck]) {
            newGameFields[xCheck][yCheck].bombNumber = (newGameFields[xCheck][yCheck].bombNumber || 0) + 1;
          }
        }
      }
    });


    return newGameFields;
  }
;



export const initialMoveAlgorithm = (props: Props): CellModel[][] => {
  if(props.x <0 || props.y < 0 || props.x >= CELLS_HEIGHT || props.y >= CELLS_WIDE){
    return props.gameFields;
  }
  return openBox({ ...props, gameFields: generateBomb(props) });
};
