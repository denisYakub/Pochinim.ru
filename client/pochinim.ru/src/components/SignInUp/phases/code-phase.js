import buttonsAnimations from "../../../animations/buttons-animations";
import textAnimations from "../../../animations/text-animations";
import {motion, useAnimate} from 'framer-motion'
const CodePhase = ({phase, setPhase, code, setCode, emailCode, errorInSingInUp, setErrorInSingInUp, email}) =>{

    const [errorScope, animateError] = useAnimate();
    const [errorRed, animateErrorRed] = useAnimate();

    const click = () =>{
        if(emailCode == code){
            setErrorInSingInUp(null);
            setPhase(phase + 1);
        }else{
            textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed})
            setErrorInSingInUp("Неверный код");
        }
    };

    return(<div className="phase-block">
        <div className="annotationReg">
            <h1>
            Введите код из сообщения
            </h1>
            <p>
            Код отправили на почту {email}
            </p>
        </div>
        <div className="input-field">
            <div className="inputAndError">
                <input className="text-input-field" type="text" placeholder={'код'} value={code} onChange={e => setCode(e.target.value)} ref={errorRed}></input>
                {errorInSingInUp!=null?<div className="errorInSignInUp"
                onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                </div>: console.log("no_errors")}
                <motion.a className="errorRegMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>{errorInSingInUp}</motion.a>
            </div>
        </div>
        <button className="continue-button" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default CodePhase;