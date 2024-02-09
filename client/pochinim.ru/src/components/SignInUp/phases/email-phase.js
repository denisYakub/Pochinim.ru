import { checkEmail } from "../../../services/signInUp-service";

const EmailPhase = ({phase, setPhase, email, setEmail}) =>{

    return(<div className="inner-signInUp">
        <div className="annotation">
            <h1>
            Вход и регистрация
            </h1>
            <a>
            Нажимая «Далее», вы соглашаетесьс Правилами сайта
            </a>
        </div>
        <div className="emailField">
            <input type="text" placeholder={email} onChange={e => setEmail(e.target.value)}></input>
            <a>Специалисты не видят вашу почту. Вы сами решите, кому она будет доступена.</a>
        </div>
        <button className="buttonNext">
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
    </div>);
}

export default EmailPhase;