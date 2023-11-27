import { CellModel } from 'models/cell.model.ts';
import { GAME_OVER } from 'constants/error.constant.ts';
import { ONE, ZERO } from 'constants/number.constant.ts';
import { Matrix } from 'models/matrix.model.ts';
import { copyGameFields } from 'helpers/copy-fields.helper.ts';
import { SettingModel } from '../models/setting.model.ts';

interface Props extends Matrix {
  gameFields: CellModel[][];
  setting: SettingModel
}

export const openBox = ({ gameFields, x, y, setting }: Props) => {

  if (typeof gameFields[x]?.[y] === 'undefined' || gameFields[x][y]?.show || gameFields[x][y]?.flag) {
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


  for (let xCheck = x <= ZERO ? x : x - ONE; xCheck <= (x >= setting.rows - ONE ? x : x + ONE); xCheck++) {
    for (let yCheck = y <= ZERO ? y : y - ONE; yCheck <= (y >= setting.columns - ONE ? y : y + ONE); yCheck++) {
      gameFields = openBox({ gameFields, x: xCheck, y: yCheck, setting });
    }
  }

  return gameFields;
};


export const stepAlgorithm = ({ gameFields, ...params }: Props): CellModel[][] => {
  const newGameFields = copyGameFields(gameFields);

  return openBox({ ...params, gameFields: newGameFields });
};
