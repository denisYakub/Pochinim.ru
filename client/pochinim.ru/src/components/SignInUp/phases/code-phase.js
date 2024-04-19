import InputWithError from "../../../animations/input-error-field";

const CodePhase = ({phase, setPhase, code, setCode, emailCode, errorInSingInUp, setErrorInSingInUp, email}) =>{
    const click = () =>{
        if(emailCode == code){
            setErrorInSingInUp(false);
            setPhase(phase + 1);
        }else{
            setErrorInSingInUp(true);
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
        <div className="sighnInUp-input-size">
            <InputWithError placeholder={'код'} value={code} setValue={setCode} error={errorInSingInUp}></InputWithError>
        </div>
        <button className="continue-button" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default CodePhase;