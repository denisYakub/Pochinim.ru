import { useNavigate } from 'react-router-dom';
import CongratsImg from '../../../../img/congrats-img.png';

const WelcomePhase = ({phase, setPhase}) =>{
    const navigate = useNavigate();

    const goProfile = () => {
        navigate(`/UserProfile/${localStorage.getItem('mail')}`);
    }
    const goMain = () => {
        setPhase(phase + 1)
    };

    return(<div className="phases-wrapper">
        <div className="sighnInUp-annotation">
            <h1>Вы успешно зарегистировались!</h1>
            <p>Ваш профиль уже активен</p>
        </div>
        <img src={CongratsImg} alt="" className='congrats-img'></img>
        <button className="continue-button" onClick={goProfile}>В личный кабинет</button>
        <button className="continue-button" onClick={goMain}>На главную</button>
    </div>);
}

export default WelcomePhase;