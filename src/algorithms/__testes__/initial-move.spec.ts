import { CLEAR_GAME_FIELDS_TEST } from '../../constants/test.constant.ts';
import { initialMoveAlgorithm } from '../initial-move.algorithm.ts';
import { randomCountHelper } from '../../helpers/random-count.helper.ts';
import { CELLS_HEIGHT, CELLS_WIDE, COUNT_BOMBS } from '../../constants/game.constant.ts';
import { ONE, ZERO } from '../../constants/number.constant.ts';
import { createMapByParams } from '../../helpers/create-map.helper.ts';


describe('firstStepAlgorithm', () => {
  it('должен корректно открывать клетки вокруг нажатой клетки', () => {
    const gameFields = CLEAR_GAME_FIELDS_TEST;
    const x: number = randomCountHelper(CELLS_HEIGHT);
    const y: number = randomCountHelper(CELLS_WIDE);

    const result = initialMoveAlgorithm({ gameFields, x, y });

    for (let xCheck = x <= ZERO ? x : x - ONE; xCheck <= (x >= CELLS_HEIGHT - ONE ? x : x + ONE); xCheck++) {
      for (let yCheck = y <= ZERO ? y : y - ONE; yCheck <= (y >= CELLS_WIDE - ONE ? y : y + ONE); yCheck++) {
        expect(result[xCheck][yCheck].show).toBe(true);
      }
    }
  });

  it('должен корректно обрабатывать случай, когда координаты x и y находятся на верхнем краю поля', () => {
    const gameFields = CLEAR_GAME_FIELDS_TEST;
    const x: number = ZERO;
    const y: number = ZERO;

    const result = initialMoveAlgorithm({ gameFields, x, y });

    expect(result[ZERO][ZERO].show).toBe(true);
    expect(result[ZERO][ONE].show).toBe(true);
    expect(result[ONE][ZERO].show).toBe(true);
    expect(result[ONE][ONE].show).toBe(true);
  });

  it('должен корректно обрабатывать случай, когда координаты x и y находятся на нижнем краю поля', () => {
    const gameFields = CLEAR_GAME_FIELDS_TEST;
    const x: number = CELLS_HEIGHT - ONE;
    const y: number = CELLS_WIDE - ONE;

    const result = initialMoveAlgorithm({ gameFields, x, y });

    expect(result[x][y].show).toBe(true);
    expect(result[x][y - ONE].show).toBe(true);
    expect(result[x - ONE][y].show).toBe(true);
    expect(result[x - ONE][y - ONE].show).toBe(true);
  });

  it('должен корректно добавлять количество добавленных бомб', () => {
    const gameFields = CLEAR_GAME_FIELDS_TEST;
    const x: number = randomCountHelper(CELLS_HEIGHT);
    const y: number = randomCountHelper(CELLS_WIDE);

    const result = initialMoveAlgorithm({ gameFields, x, y }).reduce((previousValue, currentValue) => {
      return previousValue + currentValue.filter(({ bomb }) => bomb).length;
    }, ZERO);

    expect(result).toBe(COUNT_BOMBS);
  });

  it('должен корректно открывать ячейки', () => {
    const gameFields = CLEAR_GAME_FIELDS_TEST;
    const x: number = randomCountHelper(CELLS_HEIGHT);
    const y: number = randomCountHelper(CELLS_WIDE);

    const result = initialMoveAlgorithm({ gameFields, x, y }).some((fields => fields.some(({
                                                                                           show,
                                                                                           bomb
                                                                                         }) => (show && bomb))));

    expect(result).not.toBe(true);
  });

  it('должен возвращать исходное значение когда координаты x и y находятся вне поля', () => {
    const gameFields = CLEAR_GAME_FIELDS_TEST;

    expect(initialMoveAlgorithm({ gameFields, x: -ONE, y: -ONE })).toBe(gameFields);
    expect(initialMoveAlgorithm({ gameFields, x: CELLS_HEIGHT + 4, y: 2 })).toBe(gameFields);
    expect(initialMoveAlgorithm({ gameFields, x: -ONE, y: 5 })).toBe(gameFields);
    expect(initialMoveAlgorithm({ gameFields, x: 4, y: -ONE })).toBe(gameFields);
    expect(initialMoveAlgorithm({ gameFields, x: 6, y: CELLS_WIDE + 6 })).toBe(gameFields);
  });

  it('должен возвращать исходное значение когда координаты x и y находятся вне поля', () => {
    const gameFields = CLEAR_GAME_FIELDS_TEST;

    expect(initialMoveAlgorithm({ gameFields, x: -ONE, y: -ONE })).toBe(gameFields);
    expect(initialMoveAlgorithm({ gameFields, x: CELLS_HEIGHT + 4, y: 2 })).toBe(gameFields);
    expect(initialMoveAlgorithm({ gameFields, x: -ONE, y: 5 })).toBe(gameFields);
    expect(initialMoveAlgorithm({ gameFields, x: 4, y: -ONE })).toBe(gameFields);
    expect(initialMoveAlgorithm({ gameFields, x: 6, y: CELLS_WIDE + 6 })).toBe(gameFields);
  });

  it('должен корректно расставить цифры вокруг бомбы', () => {
    const gameFields = CLEAR_GAME_FIELDS_TEST;

    const x: number = randomCountHelper(CELLS_HEIGHT);
    const y: number = randomCountHelper(CELLS_WIDE);

    const countBombs = createMapByParams(gameFields.length, gameFields[ZERO].length)

    const result = initialMoveAlgorithm({ gameFields, x, y });

    result.forEach((fields, xCheckBomb) => {
      fields.forEach(({bomb}, yCheckBomb) => {
        if(!bomb){
          return;
        }
        for (let xCheck = xCheckBomb <= ZERO ? xCheckBomb : xCheckBomb - ONE; xCheck <= (xCheckBomb >= CELLS_HEIGHT - ONE ? xCheckBomb : xCheckBomb + ONE); xCheck++) {
          for (let yCheck = yCheckBomb <= ZERO ? yCheckBomb : yCheckBomb - ONE; yCheck <= (yCheckBomb >= CELLS_WIDE - ONE ? yCheckBomb : yCheckBomb + ONE); yCheck++) {
            countBombs[xCheck][yCheck].bombNumber = (countBombs[xCheck][yCheck].bombNumber || ZERO) + ONE
          }
        }
      })
    })

    countBombs.forEach((fields, xCheckNum) => {
      fields.forEach(({bombNumber}, yCheckNum) => {
        expect(result[xCheckNum][yCheckNum].bombNumber).toBe(bombNumber);
      })})
  });
});
