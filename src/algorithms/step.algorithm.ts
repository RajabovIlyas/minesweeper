import { CellModel } from 'models/cell.model.ts';
import { GAME_OVER } from 'constants/error.constant.ts';
import { CELLS_HEIGHT, CELLS_WIDE } from 'constants/game.constant.ts';
import { ONE, ZERO } from 'constants/number.constant.ts';
import { Matrix } from 'models/matrix.model.ts';
import { copyGameFields } from '../helpers/copy-fields.helper.ts';

interface Props extends Matrix {
  gameFields: CellModel[][];
}

export const openBox = ({ gameFields, x, y }: Props) => {

  if (typeof gameFields[x]?.[y] === 'undefined' || gameFields[x][y]?.show || gameFields[x][y]?.flag ) {
    return gameFields;
  }

  if (gameFields[x][y]?.bomb) {
    throw new Error(GAME_OVER);
  }

  if (gameFields[x][y]?.bombNumber) {
    gameFields[x][y].show = true;
    return gameFields;
  }

  gameFields[x][y].show = true;


  for (let xCheck = x <= ZERO ? x : x - ONE; xCheck <= (x >= CELLS_HEIGHT - ONE ? x : x + ONE); xCheck++) {
    for (let yCheck = y <= ZERO ? y : y - ONE; yCheck <= (y >= CELLS_WIDE - ONE ? y : y + ONE); yCheck++) {
      gameFields = openBox({ gameFields, x: xCheck, y: yCheck });
    }
  }

  return gameFields;
};


export const stepAlgorithm = ({ gameFields, x, y }: Props): CellModel[][] => {
  const newGameFields = copyGameFields(gameFields);

  return openBox({ gameFields: newGameFields, x, y });
};
