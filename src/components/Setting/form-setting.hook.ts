import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SettingModel } from '../../models/setting.model.ts';
import { GAME_SETTINGS } from '../../constants/game.constant.ts';

interface SettingFormProps {
  onSave: (data: SettingModel) => void;
  gameSettings: SettingModel;
}

const schema = yup.object().shape({
  rows: yup.number()
    .required()
    .min(4)
    .max(50)
    .label('Rows'),
  columns: yup.number()
    .required()
    .min(4)
    .max(50)
    .label('Columns'),
  bombs: yup.number()
    .required()
    .min(1)
    .test('maxBomb',
      'The number of bombs should not exceed the number of cells',
      function(item) {
        return (this.parent.rows * this.parent.columns - 9) >= item;
      })
    .label('Bombs')
});

export const useFormSetting = ({ onSave, gameSettings }: SettingFormProps) => {


  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: gameSettings,
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit((data: SettingModel) => {
    localStorage.setItem(GAME_SETTINGS, JSON.stringify(data));
    onSave(data);
  });

  return { control, register, handleSubmit, errors, onSubmit };
};
