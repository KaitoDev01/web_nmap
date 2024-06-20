import { useState } from 'react';

function Modal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {isOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <div className='modal-heading'>
                            <h2 className='modal-title'>Добавление команды</h2>
                            <div className='modal-close' onClick={closeModal}>&times;</div>
                        </div>
                        <input type='text' className='input input-modal' placeholder='Команда' />
                        <input type='text' className='input input-modal' placeholder='Параметры' />
                        <input type='text' className='input input-modal' placeholder='Описание команды' />
                        <div className='buttons-modal'>
                            <button className='button-add-command'>Добавить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;