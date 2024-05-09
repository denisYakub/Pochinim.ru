import { Link } from 'react-router-dom';
import InputWithError from '../../../../animations/input-error-field';
import USERController from '../../../../controllers/USER-controller';
import { useEffect, useState } from 'react';

const EmailPhase = ({phase, setPhase, email, setEmail, setEmailCode, setShowLoader}) =>{ 
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

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


    const click = async () =>{
        setShowLoader(true);

        if(await USERController.checkUserEmailInBd(email)){
            setPhase(phase + 2);
        }else{
            var code = await USERController.getSendCode(email);
            if(code != false){
                setEmailCode(code);
                setError(false);
                setPhase(phase + 1);
            }else{
                setError(true);
            }
        }

        setShowLoader(false);
    };

    return(<div className="phases-wrapper">
        <div className='sighnInUp-annotation'>
            <h1>Вход и регистрация</h1>
            <p>Нажимая «Далее», вы соглашаетесьс <Link>Правилами сайта</Link></p> 
        </div>
        <div className='sighnInUp-input-with-text'>
            <InputWithError placeholder={'почта'} value={email} setValue={setEmail} 
                error={error} setError={setError} errorText={errorMessage}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
                inputType='email'></InputWithError>
            <p>Специалисты не видят вашу почту. Вы сами решите, кому она будет доступена.</p>
        </div>
        <button className="continue-button" onClick={click}>Продолжить</button>
        <div className="additional-enters">
            <p>Ещё можно войти через соцсети</p>
            <div className="additional-enters-buttons">
                <button className='round-button-google-enter'></button>
                <button className='round-button-gmail-enter'></button>
                <button className='round-button-vk-enter'></button>
                <button className='round-button-plus-more'></button>
            </div>
        </div>
        <div className='sighnInUp-IP'>
            <Link className='link-black'>Регистрация как ИП</Link>
        </div>
    </div >);
}

export default EmailPhase;