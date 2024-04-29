import { Link } from 'react-router-dom';
import InputWithError from '../../../../animations/input-error-field';
import USERController from '../../../../controllers/USER-controller';

const EmailPhase = ({phase, setPhase, email, setEmail, setEmailCode, errorInSingInUp, setErrorInSingInUp, setShowLoader}) =>{ 
    const click = async () =>{
        setShowLoader(true);

        if(await USERController.checkUserEmailInBd(email)){
            setPhase(phase + 2);
        }else{
            var code = await USERController.getSendCode(email);
            if(code != false){
                setEmailCode(code);
                setErrorInSingInUp(false);
                setPhase(phase + 1);
            }else{
                setErrorInSingInUp(true);
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
            <InputWithError placeholder={'почта'} value={email} setValue={setEmail} error={errorInSingInUp}></InputWithError>
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