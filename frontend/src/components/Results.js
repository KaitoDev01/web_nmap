import { useState } from 'react';
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Results = ({ dataScan, isLoading }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className='results'>
            {isLoading && <div className='results-wait'>
                <div className='circle-loading'></div>
                <span className='loading-text'>Выполняется операция. Пожалуйста, подождите...</span>
            </div>
            }
            {dataScan ? (
                <>
                    {isLoading ? null : <><p className='results-text'>Результат:</p>
                        <div className='result'>
                            {dataScan.map(element => (
                                <>
                                    <p>Hostname: {element.hostname ? element.hostname : <span>null</span>}</p>
                                    <p>IP: {element.ip ? element.ip : <span>null</span>}</p>
                                    <p>mac: {element.mac ? element.mac : <span>null</span>}</p>
                                    <div className='visible-block' onClick={toggleVisibility}>openPorts {isVisible ? <FaArrowUp /> : <FaArrowDown />}</div>
                                    {isVisible &&
                                        element.openPorts.map(el => (
                                            <div className='open-ports'>
                                                Ports: {el.port}<br></br>
                                                Protocol: {el.protocol}<br></br>
                                                Service: {el.service}<br></br>
                                                method: {el.method}<br></br>
                                            </div>
                                        ))
                                    }
                                    <p>osNmap: {element.osNmap ? element.osNmap : <span>null</span>}</p>
                                </>
                            ))}
                        </div></>}
                </>
            ) : (
                <>{isLoading ? null : <div className='results-none'><p className='results-none-text'>Результатов нет</p></div>}</>
            )}
        </div>
    );
}

export default Results;