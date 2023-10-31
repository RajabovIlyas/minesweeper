import './app.styles.css';
import { FC, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { CELLS_HEIGHT, CELLS_WIDE, DEFAULT_FIELD } from 'constants/game.constant.ts';
import { CellModel } from 'models/cell.model.ts';
import Box from 'components/Box/Box.tsx';
import { firstStepAlgorithm } from 'algorithms/first-step.algorithm.ts';
import { stepAlgorithm } from 'algorithms/step.algorithm.ts';
import { Matrix } from 'models/matrix.model.ts';


const App: FC = () => {
  const [runGame, setRunGame] = useState(false);
  const [firstStep, setFirstStep] = useState(true);
  const [gameOver] = useState(false);
  const [checkedBomb, setCheckedBomb] = useState(40);

  const [gameFields, setGameFields] = useState<CellModel[][]>([]);

  const startGame = () => {
    setRunGame(true);
    setGameFields(
      [...new Array(CELLS_HEIGHT)].map(() =>
        [...new Array(CELLS_WIDE)].map(() => ({
          ...DEFAULT_FIELD,
          id: uuidV4()
        }))));
  };

  const onOpenBox = ({x, y}: Matrix) => {
    if (firstStep) {
      setGameFields(firstStepAlgorithm({ gameFields, x, y }));
      setFirstStep(false);
      return;
    }

    setCheckedBomb((checkedBomb) => checkedBomb - 1);

    setGameFields(stepAlgorithm({ gameFields, x, y }));
  }

  return (
    <div className='d-flex-column justify-content-center align-content-center flex-wrap w-100'>
      {runGame ?
        <>
          <h4 className='text-align-center'>Count bomb: {checkedBomb}</h4>
          <div className='d-flex-column gap-1'>
            {gameFields.map((fields, x) => (
              <div key={fields?.[0].id} className='d-flex gap-1'>
                {fields.map(({ id, ...field }, y) =>
                  <Box {...field}
                       key={id}
                       gameOver={gameOver}
                       onOpenBox={onOpenBox} x={x}
                       y={y} />)}
              </div>
            ))}
          </div>
        </>
        :
        <>
          <button className='' onClick={startGame}>Start Game</button>
        </>
      }
    </div>
  );
};

export default App;
