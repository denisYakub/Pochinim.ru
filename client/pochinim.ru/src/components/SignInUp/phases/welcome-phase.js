const WelcomePhase = ({phase, setPhase}) =>{
    return(<div className="inner-signInUp">
        <div className="annotation">
            <h1>
            Вы успешно зарегистировались!
            </h1>
            <a>
            </a>
        </div>
        <button className="buttonNext" onClick={() => setPhase(phase + 1)}>
        Продолжить
        </button>
    </div>);
}

export default WelcomePhase;