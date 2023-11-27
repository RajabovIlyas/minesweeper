import { Matrix } from 'models/matrix.model.ts';
import { openBox } from 'algorithms/step.algorithm.ts';
import { CellModel } from 'models/cell.model.ts';
import { copyGameFields } from 'helpers/copy-fields.helper.ts';
import { randomCountHelper } from 'helpers/random-count.helper.ts';
import { SettingModel } from '../models/setting.model.ts';


interface BombProps extends Matrix {
  bombs: Matrix[];
  setting: SettingModel
}

interface Props extends Matrix {
  gameFields: CellModel[][];
  setting: SettingModel
}


const getRandomBomb = (props: BombProps): Matrix => {
  const { bombs, x, y, setting } = props;

  const xBomb = randomCountHelper(setting.rows);
  const yBomb = randomCountHelper(setting.columns);

  if ((x - 1 <= xBomb && x + 1 >= xBomb) && (y - 1 <= yBomb && y + 1 >= yBomb)) {
    return getRandomBomb(props);
  }

  if (bombs.find((bomb) => bomb.x === xBomb && bomb.y === yBomb)) {
    return getRandomBomb(props);
  }

  return { x: xBomb, y: yBomb };
};


const generateBomb = ({ gameFields, x, y, setting }: Props): CellModel[][] => {
    const newGameFields = copyGameFields(gameFields);

    const bombs: Matrix[] = [];

    for (let i = 0; i < setting.bombs; i++) {
      bombs.push(getRandomBomb({ bombs, x, y, setting }));
    }


    bombs.forEach((bomb) => {
      newGameFields[bomb.x][bomb.y].bomb = true;
      for (let xCheck = bomb.x - 1; xCheck <= bomb.x + 1; xCheck++) {
        for (let yCheck = bomb.y - 1; yCheck <= bomb.y + 1; yCheck++) {
          if (newGameFields?.[xCheck]?.[yCheck]) {
            newGameFields[xCheck][yCheck].bombNumber = (newGameFields[xCheck][yCheck].bombNumber || 0) + 1;
          }
        }
      }
    });


    return newGameFields;
  }
;


export const initialMoveAlgorithm = (props: Props): CellModel[][] => {
  if (props.x < 0 || props.y < 0 || props.x >= props.setting.rows || props.y >= props.setting.columns) {
    return props.gameFields;
  }
  return openBox({ ...props, gameFields: generateBomb(props) });
};
