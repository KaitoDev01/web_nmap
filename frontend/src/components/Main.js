import { useState, useEffect } from 'react';
import axios from 'axios';

import Commands from './Commands';
import Results from './Results';
import Input from './Input';

const Main = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        description_command: '',
        params: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.description_command || !formData.params) {
            alert('Необходимо заполнить все поля');
            return;
        }

        axios.post('http://192.168.20.148:3010/command_add', formData)
            .then(response => {
                setFormData({ description_command: '', params: '' })

                fetch('http://192.168.20.148:3010/commands')
                    .then(response => response.json())
                    .then(data => {
                        setData(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error('Error submitting the form:', error);
            });
    };

    useEffect(() => {
        fetch('http://192.168.20.148:3010/commands')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const [scanData, setScanData] = useState(null);
    const [inputData, setInputData] = useState(null);
    const [loading, setLoading] = useState();

    const handleScanData = (data) => {
        setScanData(data);
    }

    const handleInputData = (data) => {
        setInputData(data);
    }

    const isLoading = (_bool) => {
        setLoading(_bool);
    }

    return (
        <div className='container'>
            <div className='main'>
                <Input onInputData={handleInputData} />
                <div className='main-content'>
                    <Commands dataButtons={data} onScanData={handleScanData} input={inputData} onLoading={isLoading} />
                    <Results dataScan={scanData} isLoading={loading} />
                </div>
            </div>
            <div className='form-block'>
                <h2 className='form-title'>Добавление команды</h2>
                <form method='POST' className='form' onSubmit={handleSubmit}>
                    <input type='text' className='input input-form' name="description_command" value={formData.description_command} onChange={handleChange} placeholder='Описание команды'></input>
                    <input type='text' className='input input-form' name="params" value={formData.params} onChange={handleChange} placeholder='Параметры команды'></input>
                    <button className='button-add-command'>Добавить команду</button>
                </form>
            </div>
        </div>
    );
}

export default Main;