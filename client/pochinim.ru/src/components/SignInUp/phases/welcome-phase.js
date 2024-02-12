const WelcomePhase = ({phase, setPhase}) =>{
    const click = () =>{
        setPhase(phase + 1)
    };

    return(<div className="inner-box">
        <div className="annotation">
            <h1>
            Вы успешно зарегистировались!
            </h1>
            <a>
            </a>
        </div>
        <button className="buttonNext" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default WelcomePhase;