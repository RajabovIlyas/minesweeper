import { copyGameFields } from '../copy-fields.helper.ts';

describe('copyGameFields', () => {
  it('копирование игровых полей работает корректно', () => {


    const expectedCopy = [
      [
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "b5c31e18-fe7a-4d24-a88a-4fc7fc3ab2b8"
        },
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "772623de-7080-4a09-91bf-0c3917569b1a"
        }
      ],
      [
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "32210f2e-e8c2-4b8b-944b-a731c466ee3f"
        },
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "9a65d907-1ec6-4134-aa2c-f7d6b87b658a"
        }
      ]
    ];

    const copiedFields = copyGameFields(expectedCopy);


    expect(copiedFields).toEqual(expectedCopy);
  });

  it('копирование вложенных игровых полей работает корректно', () => {


    const expectedCopy = [
      [
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "b5c31e18-fe7a-4d24-a88a-4fc7fc3ab2b8"
        },
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "772623de-7080-4a09-91bf-0c3917569b1a"
        }
      ],
      [
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "32210f2e-e8c2-4b8b-944b-a731c466ee3f"
        },
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "9a65d907-1ec6-4134-aa2c-f7d6b87b658a"
        }
      ]
    ];

    const copiedFields = copyGameFields(expectedCopy);


    expect(copiedFields).toMatchObject(expectedCopy);
  });

  it('ссылки на копию игровых полей индивидуальна', () => {


    const expectedCopy = [
      [
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "b5c31e18-fe7a-4d24-a88a-4fc7fc3ab2b8"
        },
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "772623de-7080-4a09-91bf-0c3917569b1a"
        }
      ],
      [
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "32210f2e-e8c2-4b8b-944b-a731c466ee3f"
        },
        {
          "show": false,
          "bomb": false,
          "flag": false,
          "bombNumber": null,
          "id": "9a65d907-1ec6-4134-aa2c-f7d6b87b658a"
        }
      ]
    ];

    const copiedFields = copyGameFields(expectedCopy);


    expect(copiedFields).not.toBe(expectedCopy);
  });

});
