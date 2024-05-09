import InputWithError from '../../../../animations/input-error-field';
import USERController from '../../../../controllers/USER-controller';
import { useState, useEffect } from "react";

const PasswordPhase = ({phase, setPhase, password, setPassword, name, setName, email, emailCode}) =>{
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    useEffect(()=>{
        try {
            if(password != ''){
                throw Error('пустое значение')
            }
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
    },[password])

    const click = async() =>{
        if(emailCode == 0){
            if(await USERController.logInUser(email, password)){
                setError(false);
                setPhase(phase + 1);
            }else{
                setError(true);
            }
        }else{
            if(await USERController.registrate(email, name, password)){
                setError(false);
                setPhase(phase + 1);
            }else{
                setError(true);
            }
        }
    };

    return(<div className="phases-wrapper">
        <div className="sighnInUp-annotation">
            <h1>Введите пароль</h1>
            {emailCode!=0?
                <p>Создайте пароль и впишите имя</p>
            :
                <></>}
        </div>
        <InputWithError placeholder={'пароль'} value={password} setValue={setPassword} 
                error={error} setError={setError} errorText={'Ошибочный пароль'}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
                inputType='password'></InputWithError>
        {emailCode!=0?
            <div className="sighnInUp-input-with-text">
                <input type="text" placeholder={'Имя'} className='text-input-field'
                        value={name} onChange={e => setName(e.target.value)}></input>
                <p>Специалисты будут видеть вас под этим именем</p>
            </div>
        :
            <></>}
        <button className="continue-button" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default PasswordPhase;