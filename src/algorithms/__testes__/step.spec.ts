import { stepAlgorithm } from '../step.algorithm.ts';
import { GAME_FIELDS_TEST, SETTING_GAME_TEST } from '../../constants/test.constant.ts';
import { GAME_OVER } from '../../constants/error.constant.ts';
import { FOURTEEN, ONE, SIX, THREE, TWELVE, ZERO } from '../../constants/number.constant.ts';


describe('stepAlgorithm', () => {
  it('должен вернуть ошибку при открытии бомбы', () => {
    try {
      stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: SIX, y: TWELVE, setting: SETTING_GAME_TEST });
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual(GAME_OVER);
      }
    }
  });

  it('должен вернуть тот же результат при открытой клетке', () => {
    const result = stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: ZERO, y: ZERO, setting: SETTING_GAME_TEST });
    expect(result).toEqual(GAME_FIELDS_TEST);
  });

  it('должен вернуть тот же результат при введении не существующей клетки', () => {
    expect(stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: -ONE, y: -ONE, setting: SETTING_GAME_TEST })).toEqual(GAME_FIELDS_TEST);
    expect(stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: -ONE, y: ONE, setting: SETTING_GAME_TEST })).toEqual(GAME_FIELDS_TEST);
    expect(stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: ONE, y: -ONE, setting: SETTING_GAME_TEST })).toEqual(GAME_FIELDS_TEST);
    expect( stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: GAME_FIELDS_TEST.length + 1, y: ONE, setting: SETTING_GAME_TEST })).toEqual(GAME_FIELDS_TEST);
    expect( stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: ONE, y: GAME_FIELDS_TEST[ONE].length + 1, setting: SETTING_GAME_TEST })).toEqual(GAME_FIELDS_TEST);
    expect( stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: GAME_FIELDS_TEST.length + 1, y: GAME_FIELDS_TEST[ONE].length + 1, setting: SETTING_GAME_TEST })).toEqual(GAME_FIELDS_TEST);
  });

  it('должен вернуть тот же результат на клетку с флагом', () => {
    expect(stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: ZERO, y: THREE, setting: SETTING_GAME_TEST })).toEqual(GAME_FIELDS_TEST);
    expect(stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: FOURTEEN, y: ZERO, setting: SETTING_GAME_TEST })).toEqual(GAME_FIELDS_TEST);
  });

  it('должен открыть клетку если в нем ничего нет', () => {
    const result = stepAlgorithm({ gameFields: GAME_FIELDS_TEST, x: FOURTEEN, y: ONE, setting: SETTING_GAME_TEST });
    expect(result[FOURTEEN][ONE]).not.toBe(true);
  });
});
