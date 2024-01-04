import { FC, ReactElement } from 'react';

interface ModalProps {
  title?: string;
  showModal: boolean;
  onClose: () => void;
  children: ReactElement;
  onSave?: () => void;
  saveId?: string;
}

const Modal: FC<ModalProps> = ({ title, showModal, saveId, onClose, onSave, children }) => {

  return showModal && (
    <>
      <div
        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
      >
        <div className='relative my-6 mx-auto max-w-3xl w-full p-5'>
          <div
            className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none drop-shadow-xl'>
            <div
              className='dark:bg-neutral-800 dark:border-neutral-700 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <h3 className='dark:text-zinc-300 text-3xl font-semibold'>
                {title || 'Settings'}
              </h3>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={onClose}
              >
                    <span
                      className='dark:text-zinc-300 button-img bg-transparent text-black  text-2xl block '>
                      ×
                    </span>
              </button>
            </div>
            <div className='relative p-6 flex-auto dark:bg-neutral-800'>
              {children}
            </div>
            <div
              className='dark:bg-neutral-800 dark:border-neutral-700 flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
              <button
                className='dark:text-red-700 text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={onClose}
              >
                Close
              </button>
              <button
                className='dark:bg-emerald-700 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='submit'
                form={saveId}
                onClick={onSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
