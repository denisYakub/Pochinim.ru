import { useState, useEffect } from 'react';
import Loader from '../../../Loader/Loader';
import masterController from '../../../../controllers/MASTER-controller';
import userController from '../../../../controllers/USER-controller';
import InputWithError from '../../../../animations/input-error-field';

const MasterEmailEnter = ({email, setEmail, codeConf, setCodeConf, code, setCode, sendCode, setSendCode, step, setStep}) => {

    const [showLoader, setShowLoader] = useState(false);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Ошиюка');

    useEffect(() => {
        try {
            if(email == ''){
                throw Error('пустое значение')
            }else if(!email.includes('@')){
                setErrorMessage('Почта должа быть похожа на ******@email.com');
                throw Error('неверное значение')
            }
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
    },[email])

    const sendNewCode = async () => {
        if(email != "" && !(await masterController.checkMasterInBd(email))){
            setShowLoader(true);
            const b = await userController.getSendCode(email);
            setSendCode(b);
            setCodeConf(true);

            setShowLoader(false);
        }else{
            setError(true);
            setErrorMessage('Вы уже регестрировались поробуйте войти');
        }
    }

    const click = async () =>{
        if(email != "" && code == sendCode){
            setStep(step + 1);
        }else{
            setError(true);
            setErrorMessage('Код введен не верный');
        }
    }

    return(<div className="phases-wrapper">
        <InputWithError placeholder={'почта'} value={email} setValue={setEmail} 
            error={error} setError={setError} errorText={errorMessage}
            warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
            inputType='email'></InputWithError>
        {codeConf?
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