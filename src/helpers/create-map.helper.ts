import { DEFAULT_FIELD } from 'constants/game.constant.ts';
import { v4 as uuidV4 } from 'uuid';

export const createMapByParams = (height: number, wide: number) => ([...new Array(height)].map(
    () =>
      ([...new Array(wide)].map(
          () => ({
              ...DEFAULT_FIELD,
              id: uuidV4()
            }
          )
        )
      )
  )
);
