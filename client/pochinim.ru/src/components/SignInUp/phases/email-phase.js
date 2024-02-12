import { checkEmail, getSendCode } from "../../../services/signInUp-service";
import {motion, useAnimate} from 'framer-motion'

const EmailPhase = ({phase, setPhase, email, setEmail, setEmailCode, setPopupActive}) =>{ 

    const [scope, animate] = useAnimate();

    const click = async () =>{
        if(await checkEmail(email)){
            setPhase(phase + 2);
        }else{
            var code = await getSendCode(email);
            if(code !== false){
                setEmailCode(code);
                setPhase(phase + 1);
            }else{
                animate(scope.current, 
                    {rotate: [0, 5, -5, 0], 
                        background: ["#DDDCDC", "#ff008c", "#DDDCDC"]}, 
                    {repeat: 1, duration: 0.5})
            }
        }
    };

    return(<div className="inner-box" ref={scope}>
        <div className="annotation">
            <h1>
            Вход и регистрация
            </h1>
            <a>
            Нажимая «Далее», вы соглашаетесьс Правилами сайта
            </a>
        </div>
        <div className="inputField">
            <input type="text" placeholder={email} onChange={e => setEmail(e.target.value)}></input>
            <a>Специалисты не видят вашу почту. Вы сами решите, кому она будет доступена.</a>
        </div>
        <button className="buttonNext" onClick={click}>
        Продолжить
        </button>
        <div className="additionalEnter">
            <a>
            Ещё можно войти через соцсети
            </a>
            <div className="buttonsAdditionalEnter">
                <button>

                </button>
                <button>

                </button>
                <button>

                </button>
                <button>

                </button>
            </div>
        </div>
    </div >);
}

export default EmailPhase;