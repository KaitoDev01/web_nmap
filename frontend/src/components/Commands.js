import { useState } from 'react';

function Commands({ dataButtons, onScanData, input, onLoading }) {

    const [isButtonsStatus, setButtonsStatus] = useState(false);

    const buttonScan = (id) => {
        if (!input) {
            alert('Введите цель сканирования');
            return;
        }

        onLoading(true);
        setButtonsStatus(true);
        fetch('http://192.168.20.148:3010/nmap?target=' + encodeURIComponent(input) + '&id=' + id)
            .then(response => response.json())
            .then(data => {
                onScanData(data);
                onLoading(false);
                setButtonsStatus(false);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                onLoading(false);
                setButtonsStatus(false);
            });
    }

    return (
        <div className='buttons-container'>
            {Object.keys(dataButtons).length > 0 ? (
                Object.keys(dataButtons).map(element => (
                    <button disabled={isButtonsStatus} key={dataButtons[element].id} className='button' onClick={() => buttonScan(dataButtons[element].id)}>
                        {dataButtons[element].description_command}
                    </button>
                ))
            ) : (
                <h2 className='title-commands-none'>Добавленных команд нет</h2>
            )}
        </div>
    );
}

export default Commands;