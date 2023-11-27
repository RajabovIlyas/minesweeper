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
                  type='number'
                  className='input' />
          <p className='mt-2 text-sm text-red-600'>{errors?.rows?.message}</p>
        </div>
        <div>
          <label htmlFor='columns'
                 className='input-label'>
            Columns
          </label>
          <input {...register('columns')}
                 type='number'
                 className='input' />
          <p className='mt-2 text-sm text-red-600'>{errors?.columns?.message}</p>
        </div>
        <div>
          <label htmlFor='bombs'
                 className='input-label'>
            Bombs
          </label>
          <input {...register('bombs')}
                 type='number'
                 className='input'
                 required />
          <p className='mt-2 text-sm text-red-600'>{errors?.bombs?.message}</p>
        </div>
      </div>
    </form>
  );
};


export default Setting;
