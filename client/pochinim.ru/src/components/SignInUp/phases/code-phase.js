import { values } from "mobx";

const CodePhase = ({phase, setPhase, code, setCode}) =>{
    return(<div className="inner-signInUp">
        <div className="annotation">
            <h1>
            Введите код из сообщения
            </h1>
            <a>
            Код отправили на почту " + "email"
            </a>
        </div>
        <div className="emailField">
            <input type="text" placeholder={code} onChange={e => setCode(e.target.value)}></input>
        </div>
        <button className="buttonNext" onClick={() => setPhase(phase + 1)}>
        Продолжить
        </button>
    </div>);
}

export default CodePhase;