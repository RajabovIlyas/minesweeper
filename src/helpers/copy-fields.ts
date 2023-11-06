import { CellModel } from 'models/cell.model.ts';

export const copyGameFields = (gameFields: CellModel[][]) =>gameFields.map(
  (fields) => fields.map(
    (field) =>
      ({ ...field})))
