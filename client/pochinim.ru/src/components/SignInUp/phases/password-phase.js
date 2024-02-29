import buttonsAnimations from "../../../animations/buttons-animations";
import textAnimations from "../../../animations/text-animations";
import { logIn, registrate } from "../../../services/signInUp-service";
import {motion, useAnimate} from 'framer-motion'

const PasswordPhase = ({phase, setPhase, password, setPassword, name, setName, email, emailCode, errorInSingInUp, setErrorInSingInUp}) =>{

    const [errorScope, animateError] = useAnimate();
    const [errorRed, animateErrorRed] = useAnimate();

    const click = async() =>{
        if(emailCode === 0){
            if(await logIn(email, password)){
                setErrorInSingInUp(null)
                setPhase(phase + 1)
            }else{
                setErrorInSingInUp("Неверный пароль")
            }
        }else{
            if(await registrate(email, name, password)){
                setErrorInSingInUp(null)
                setPhase(phase + 1)
            }else{
                textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed})
                setErrorInSingInUp("Неизвестная ошибка")
            }
        }
    };

    return(<div className="inner-box">
        <div className="annotationReg">
            <h1>
            Введите пароль
            </h1>
            <p>
            </p>
        </div>
        <div className="inputField">
            <div className="inputAndError">
                <input type="text" placeholder={password} onChange={e => setPassword(e.target.value)}></input>
                {errorInSingInUp!==null?<div className="errorInSignInUp"
                onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                </div>: console.log("no_errors")}
                <motion.a className="errorRegMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>{errorInSingInUp}</motion.a>
            </div>
            {console.log(emailCode)}
            {emailCode!==0?<input type="text" placeholder={name} onChange={e => setName(e.target.value)}></input>:<></>}
        </div>
        <button className="buttonNext" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default PasswordPhase;