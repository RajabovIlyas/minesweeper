import { FC } from 'react';
import { useFormSetting } from './form-setting.hook.ts';
import { SettingModel } from '../../models/setting.model.ts';

interface SettingProps {
  onSave: (data: SettingModel) => void;
  formId?: string;
  gameSettings: SettingModel;
}


const Setting: FC<SettingProps> = ({ formId, ...props }) => {
  const {
    onSubmit,
    errors,
    register
  } = useFormSetting(props);


  return (
    <form id={formId} onSubmit={onSubmit}>
      <div className='mb-6'>
        <div>
          <label htmlFor='rows'
                 className='input-label'>
            Rows
          </label>
          <input  {...register('rows')}
                  type='number' />
          <p className='input-wrong'>{errors?.rows?.message}</p>
        </div>
        <div>
          <label htmlFor='columns'
                 className='input-label'>
            Columns
          </label>
          <input {...register('columns')}
                 type='number' />
          <p className='input-wrong'>{errors?.columns?.message}</p>
        </div>
        <div>
          <label htmlFor='bombs'
                 className='input-label'>
            Bombs
          </label>
          <input {...register('bombs')}
                 type='number'
                 required />
          <p className='input-wrong'>{errors?.bombs?.message}</p>
        </div>
      </div>
    </form>
  );
};


export default Setting;
