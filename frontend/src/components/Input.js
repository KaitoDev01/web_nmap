import { useState } from 'react';

function Input({ onInputData }) {
    const [inputData, setInputData] = useState('');

    const handleInputData = (event) => {
        const data = event.target.value;
        setInputData(data);
        if (data !== '') {
            onInputData(data);
        }
    }

    return (
        <div className='input-block'>
            {/* {inputError && <div className='error-content'>Поле не заполнено!</div>} */}
            <input type='text' onChange={handleInputData} value={inputData} className='input' placeholder='Введите цель сканирования' />
        </div>
    );
}

export default Input;