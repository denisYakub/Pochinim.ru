import InputWithError from '../../../../animations/input-error-field';
import USERController from '../../../../controllers/USER-controller';
import { useState, useEffect } from "react";

const PasswordPhase = ({phase, setPhase, USER}) =>{
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    const [needToReg, setNeedToReg] = useState(USER.needToRegistrate());

    const [password, setPassword] = useState(USER.password);
    const [name, setName] = useState(USER.name);

    const click = async() =>{
        try {
            USER.password = password;
            USER.name = name;

            if(needToReg){
                USER.registrateUser();
                setPhase(phase + 1);
            }else{
                USER.logInUser();
                setPhase(phase + 1);
            }
        } catch (error) {
            if(error.message == 'Пустое значение'){
                setWarning(true);
            }else if(['Пароль меньше 8 символов', 'Пароль дожен включать 1 цифру',
                'Пароль дожен включать 1 букву'
            ].includes(error.message)){
                setError(true);
                setErrorMessage(error.message);
            }else{
                throw new Error(error.message);
            }
        }
    };

    return(<div className="phases-wrapper">
        <div className="sighnInUp-annotation">
            <h1>Введите пароль</h1>
            {needToReg?
                <p>Создайте пароль и впишите имя</p>
            :
                <></>}
        </div>
        <InputWithError placeholder={'пароль'} value={password} setValue={setPassword} 
                error={error} setError={setError} errorText={errorMessage}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
                inputType='password'></InputWithError>
        {needToReg?
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