const WelcomePhase = ({phase, setPhase}) =>{
    const click = () =>{
        setPhase(phase + 1)
    };

    return(<div className="phase-block">
        <div className="annotationReg">
            <h1>
            Вы успешно зарегистировались!
            </h1>
            <p>
            </p>
        </div>
        <button className="continue-button" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default WelcomePhase;