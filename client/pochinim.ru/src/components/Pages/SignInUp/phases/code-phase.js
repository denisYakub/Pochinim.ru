import { Link } from 'react-router-dom';
import InputWithError from '../../../../animations/input-error-field';
import { useState, useEffect } from "react";

const CodePhase = ({phase, setPhase, code, setCode, emailCode, email}) =>{
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    useEffect(()=>{
        try {
            if(code != ''){
                throw Error('пустое значение')
            }
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
        
    },[code])

    const click = () =>{
        if(emailCode == code){
            setError(false);
            setPhase(phase + 1);
        }else{
            setError(true);
        }
    };

    return(<div className="phases-wrapper">
        <div className="sighnInUp-annotation">
            <h1>Введите код из сообщения</h1>
            <p>Код отправили на почту {email}</p>
        </div>
        <div style={{display:'flex', flexDirection: 'column'}}>
            <button className='code-timer-button'>1:30</button>
            <Link className='link-black'>Изменить почту</Link>
        </div>
        <div className="sighnInUp-input-with-text">
            <InputWithError placeholder={'код'} value={code} setValue={setCode} 
                error={error} setError={setError} errorText={'Ошибочный пароль'}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
                inputType='number'></InputWithError>
        </div>
        <button className="continue-button" onClick={click}>Продолжить</button>
        <Link className='link-black'>Отправить повторное сообщение</Link>
    </div>);
}

export default CodePhase;