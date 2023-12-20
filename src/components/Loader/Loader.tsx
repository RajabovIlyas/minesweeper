import { FC } from 'react';

const Loader:FC = () => (
  <div className='h-screen flex justify-center items-center'>
    <div className='rounded-md h-12 w-12 border-4 border-t-4 border-zinc-800 dark:border-zinc-400 animate-spin absolute' />
  </div>
)

export default Loader
