import { Link } from 'react-router-dom';
import InputWithError from '../../../../animations/input-error-field';

const CodePhase = ({phase, setPhase, code, setCode, emailCode, errorInSingInUp, setErrorInSingInUp, email}) =>{
    const click = () =>{
        if(emailCode == code){
            setErrorInSingInUp(false);
            setPhase(phase + 1);
        }else{
            setErrorInSingInUp(true);
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
            <InputWithError placeholder={'код'} value={code} setValue={setCode} error={errorInSingInUp}></InputWithError>
        </div>
        <button className="continue-button" onClick={click}>Продолжить</button>
        <Link className='link-black'>Отправить повторное сообщение</Link>
    </div>);
}

export default CodePhase;