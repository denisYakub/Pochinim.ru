import { Link } from 'react-router-dom';
import InputWithError from '../../../../animations/input-error-field';
import USERController from '../../../../controllers/USER-controller';
import { useEffect, useState } from 'react';

const EmailPhase = ({phase, setPhase, setShowLoader, USER}) =>{ 
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [warning, setWarning] = useState(false);

    const [email, setEmail] = useState(USER.email);

    const click = async () =>{
        try {
            setShowLoader(true);
            USER.email = email;
            if(await USER.checkEmailInBD(email)){
                setShowLoader(false);
                setPhase(phase + 2);
            }else{
                USER.sendCode();
                setShowLoader(false);
                setPhase(phase + 1);
            }
        } catch(error) {
            if(error.message = 'Пустое значение'){
                setWarning(true);
                setShowLoader(false);
            }else if(error.message = 'Не почта'){
                setErrorMessage('Почта должа быть похожа на ******@email.com');
                setError(true);
                setShowLoader(false);
            }else{
                setShowLoader(false);
                throw new Error(error.message);
            }
        }
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