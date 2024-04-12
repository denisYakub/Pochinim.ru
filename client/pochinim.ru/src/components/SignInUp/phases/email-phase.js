import buttonsAnimations from "../../../animations/buttons-animations";
import textAnimations from "../../../animations/text-animations";
import USERController from "../../../controllers/USER-controller";
import {motion, useAnimate} from 'framer-motion'

const EmailPhase = ({phase, setPhase, email, setEmail, setEmailCode, errorInSingInUp, setErrorInSingInUp}) =>{ 

    const [errorScope, animateError] = useAnimate();
    const [errorRed, animateErrorRed] = useAnimate();

    const click = async () =>{
        if(await USERController.checkUserEmail(email)){
            setPhase(phase + 2);
        }else{
            var code = await USERController.getSendCode(email);
            if(code != false){
                setEmailCode(code);
                setErrorInSingInUp(null)
                setPhase(phase + 1);
            }else{
                textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed})
                setErrorInSingInUp("Неверный логин")
            }
        }
    };

    return(<div className="inner-box">
        <div className="annotationReg">
            <h1>
            Вход и регистрация
            </h1>
            <p>
            Нажимая «Далее», вы соглашаетесьс Правилами сайта
            </p>
        </div>
        <div className="input-field">
            <div className="inputAndError">
                <input type="text" ref={errorRed} placeholder={'почта'} value={email} onChange={e => setEmail(e.target.value)}></input>
                {errorInSingInUp!=null?<div className="errorInSignInUp"
                onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                </div>: console.log("no_errors")}
                <motion.a className="errorRegMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>{errorInSingInUp}</motion.a>
            </div>
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