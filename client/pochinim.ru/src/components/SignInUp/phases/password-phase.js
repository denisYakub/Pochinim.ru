const PasswordPhase = ({phase, setPhase, password, setPassword}) =>{
    return(<div className="inner-signInUp">
        <div className="annotation">
            <h1>
            Введите пароль
            </h1>
            <a>
            </a>
        </div>
        <div className="emailField">
            <input type="text" placeholder={password} onChange={e => setPassword(e.target.value)}></input>
        </div>
        <button className="buttonNext" onClick={() => setPhase(phase + 1)}>
        Продолжить
        </button>
    </div>);
}

export default PasswordPhase;