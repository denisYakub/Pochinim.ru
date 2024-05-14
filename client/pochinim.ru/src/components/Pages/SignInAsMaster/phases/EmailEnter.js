import { useState, useEffect } from 'react';
import Loader from '../../../Loader/Loader';
import InputWithError from '../../../../animations/input-error-field';

const MasterEmailEnter = ({step, setStep, MASTER}) => {

    const [showLoader, setShowLoader] = useState(false);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Ошибка');

    const [email, setEmail] = useState(MASTER.email);

    const click = async () =>{
        try {
            MASTER.email = email;
            setShowLoader(true);
            setStep(step + 1);
            setShowLoader(false);
        } catch (error) {
            if(error.message == 'Не почта'){
                setShowLoader(false);
                setError(true);
                setErrorMessage('Почта должна оканчиваться на: ****@email.com');
            }else if(error.message == 'Пустое значение'){
                setShowLoader(false);
                setWarning(true);
            }else{
                throw new Error(error.message);
            }
        }
    }

    return(<div className="phases-wrapper">
        <InputWithError placeholder={'почта'} value={email} setValue={setEmail} 
            error={error} setError={setError} errorText={errorMessage}
            warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
            inputType='email'></InputWithError>
        <button onClick={click} className='continue-button'>Продолжить</button>
        <Loader showLoader={showLoader} setShowLoader={setShowLoader} text={"Высылаем код"}></Loader>
    </div>);
};

export default MasterEmailEnter;