import { CellModel } from 'models/cell.model.ts';
import { copyGameFields } from 'helpers/copy-fields.ts';
import { GAME_OVER } from 'constants/error.constant.ts';
import { CELLS_HEIGHT, CELLS_WIDE } from 'constants/game.constant.ts';
import { ONE, ZERO } from 'constants/number.constant.ts';
import { Matrix } from 'models/matrix.model.ts';

interface Props extends Matrix {
  gameFields: CellModel[][];
}

export const openBox = ({ gameFields, x, y }: Props) => {

  if (gameFields[x]?.[y]?.show) {
    return gameFields;
  }

  if (gameFields[x]?.[y]?.bomb) {
    throw new Error(GAME_OVER);
  }

  if (gameFields[x]?.[y]?.bombNumber) {
    gameFields[x][y].show = true;
    return gameFields;
  }

  gameFields[x][y].show = true;


  for (let xCheck = x <= ZERO ? x : x - ONE; xCheck <= (x >= CELLS_HEIGHT - ONE ? x : x + ONE); xCheck++) {
    for (let yCheck = y <= ZERO ? y : y - ONE; yCheck <= (y >= CELLS_WIDE - ONE ? y : y + ONE); yCheck++) {
      if ((!gameFields[xCheck]?.[yCheck]?.bombNumber && !gameFields?.[xCheck]?.[yCheck]?.show)) {
        gameFields = openBox({ gameFields, x: xCheck, y: yCheck });
      }
      if (gameFields[xCheck]?.[yCheck]?.bombNumber) {
        gameFields[xCheck][yCheck].show = true;
      }
    }
  }

  return gameFields;
};


export const stepAlgorithm = ({ gameFields, x, y }: Props): CellModel[][] => {
  const newGameFields = copyGameFields(gameFields);

  return openBox({ gameFields: newGameFields, x, y });
};
