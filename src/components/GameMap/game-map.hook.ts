import { MouseEvent, useEffect, useState } from 'react';
import { CellModel } from '../../models/cell.model.ts';
import { CELLS_HEIGHT, CELLS_WIDE, COUNT_BOMBS, DEFAULT_FIELD } from '../../constants/game.constant.ts';
import { v4 as uuidV4 } from 'uuid';
import { Matrix } from '../../models/matrix.model.ts';
import { firstStepAlgorithm } from '../../algorithms/first-step.algorithm.ts';
import { stepAlgorithm } from '../../algorithms/step.algorithm.ts';
import { copyGameFields } from '../../helpers/copy-fields.ts';
import { GameStatus } from '../../enums/game-status.enum.ts';

export const useGameMapHook = () => {
  const [firstStep, setFirstStep] = useState(true);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PROCESS);
  const [checkedBomb, setCheckedBomb] = useState(COUNT_BOMBS);
  const [checkedBombTrue, setCheckedBombTrue] = useState(COUNT_BOMBS);

  const [gameFields, setGameFields] = useState<CellModel[][]>([]);

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (checkedBombTrue <= 0) {
      setGameStatus(GameStatus.WIN);
      setGameFields((gameFields) =>
        gameFields.map((column) =>
          column.map((field) => ({
            ...field, show: !field.bomb,
          }))))
    }
  }, [checkedBombTrue]);

  const startGame = () => {
    setFirstStep(true);
    setGameStatus(GameStatus.PROCESS);
    setCheckedBomb(COUNT_BOMBS);
    setCheckedBombTrue(COUNT_BOMBS);
    setGameFields(
      [...new Array(CELLS_HEIGHT)].map(() =>
        [...new Array(CELLS_WIDE)].map(() => ({
          ...DEFAULT_FIELD,
          id: uuidV4()
        }))));
  };

  const onOpenBox = ({ x, y }: Matrix) => {
    try {
      if (firstStep) {
        setGameFields(firstStepAlgorithm({ gameFields, x, y }));
        setFirstStep(false);
        return;
      }

      setGameFields(stepAlgorithm({ gameFields, x, y }));
    } catch (e) {
      setGameStatus(GameStatus.FALL);
    }
  };

  const onSetFlag = ({ x, y }: Matrix) => {
    if (checkedBomb <= 0 && !gameFields[x][y].flag) {
      return;
    }

    setCheckedBombTrue((checkedBombTrue) => {
      if(!gameFields[x][y].bomb){
        return checkedBombTrue
      }
      return gameFields[x][y].flag ? checkedBombTrue + 1 : checkedBombTrue - 1;
    });
    setCheckedBomb((checkedBomb) => gameFields[x][y].flag ? checkedBomb + 1 : checkedBomb - 1);
    const newGameFields = copyGameFields(gameFields);
    newGameFields[x][y].flag = !newGameFields[x][y].flag;
    setGameFields(newGameFields);

  };

  const onRestart = () => {
    startGame();
  };

  const closeContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    return false;
  };

  return {
    gameStatus,
    gameFields,
    onRestart,
    checkedBomb,
    closeContextMenu,
    onSetFlag,
    onOpenBox
  };
};
