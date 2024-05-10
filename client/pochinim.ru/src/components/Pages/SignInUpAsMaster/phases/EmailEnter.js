import { useState, useEffect } from 'react';
import Loader from '../../../Loader/Loader';
import masterController from '../../../../controllers/MASTER-controller';
import userController from '../../../../controllers/USER-controller';
import InputWithError from '../../../../animations/input-error-field';

const MasterEmailEnter = ({step, setStep, MASTER}) => {

    const [showLoader, setShowLoader] = useState(false);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Ошибка');

    const [email, setEmail] = useState(MASTER.email);
    const [code, setCode] = useState(MASTER.code);

    const sendNewCode = async () => {
        try {
            MASTER.email = email;
            setShowLoader(true);
            MASTER.sendCode();
            setShowLoader(false);
        } catch (error) {
            if(error.message == 'Не почта'){
                setShowLoader(false);
                setError(true);
                setErrorMessage('Почта должна оканчиваться на: ****@email.com');
            }else if(error.message == 'Пустое значение'){
                setShowLoader(false);
                setWarning(true);
            }else if(error.message == 'Аккаунт существует'){
                setShowLoader(false);
                setError(true);
                setErrorMessage('Вы уже регестрировались поробуйте войти');
            }else{
                setShowLoader(false);
                throw new Error(error.message);
            }
        }
    }

    const click = async () =>{
        try {
            MASTER.code = code;
            setStep(step + 1);
        } catch (error) {
            if(error.message == 'Пустое значение'){
                setWarning(true);
            }else if(error.message == 'Не верный код'){
                setError(true);
                setErrorMessage('Код введен не верный');
            }{
                throw new Error(error.message);
            }
        }
    }

    return(<div className="phases-wrapper">
        <InputWithError placeholder={'почта'} value={email} setValue={setEmail} 
            error={error} setError={setError} errorText={errorMessage}
            warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
            inputType='email'></InputWithError>
        {MASTER.codeSend()?
        <InputWithError placeholder={'код'} value={code} setValue={setCode} 
            error={error} setError={setError} errorText={errorMessage}
            warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
            inputType='number'></InputWithError>
        :
        <button onClick={sendNewCode} className="send-code-button">выслать код</button>}
        <button onClick={click} className='continue-button'>Продолжить</button>
        <Loader showLoader={showLoader} setShowLoader={setShowLoader} text={"Высылаем код"}></Loader>
    </div>);
};

export default MasterEmailEnter;