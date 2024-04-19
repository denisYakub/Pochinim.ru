import USERController from "../../../controllers/USER-controller";
import InputWithError from "../../../animations/input-error-field";

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

    return(<div className="phase-block">
        <div className="annotationReg">
            <h1>
            Вход и регистрация
            </h1>
            <p>
            Нажимая «Далее», вы соглашаетесьс Правилами сайта
            </p>
        </div>
        <div className="sighnInUp-input-field-size">
            <InputWithError placeholder={'почта'} value={email} setValue={setEmail} error={errorInSingInUp}></InputWithError>
        </div>
        <a>Специалисты не видят вашу почту. Вы сами решите, кому она будет доступена.</a>
        <button className="continue-button" onClick={click}>
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