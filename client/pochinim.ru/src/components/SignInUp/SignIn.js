import { Fragment, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../SignInUp/Signin.css"
import { checkEmail } from "../../services/signInUp-service";
import Popup from "../Popup/Popup";
import EmailPhase from "./phases/email-phase";
import CodePhase from "./phases/code-phase";
import PasswordPhase from "./phases/password-phase";
import WelcomePhase from "./phases/welcome-phase";

const SignIn = () => {

    const [popupActive, setPopupActive] = useState(false);

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("email");
    const [code, setCode] = useState("код")
    const [phase, setPhase] = useState(0);
    const [password, setPassword] = useState("пароль");

    const comp0 =  <EmailPhase phase={phase} setPhase={setPhase} email={email} setEmail={setEmail}></EmailPhase>
    const comp1 = <CodePhase phase={phase} setPhase={setPhase} code={code} setCode={setCode}></CodePhase>
    const comp2 = <PasswordPhase phase={phase} setPhase={setPhase} password={password} setPassword={setPassword}></PasswordPhase>
    const comp3 = <WelcomePhase phase={phase} setPhase={setPhase}></WelcomePhase>

    const onSubmit = async (e) =>{
        e.preventDefault()

        switch (phase) {
            case 0:
                if(email !=="email"){
                    if(await checkEmail(email)){
                        setPhase(phase + 2)
                    }else{
                        setPhase(phase + 1)
                    }
                }
                break;
            case 1:
                
                break;
            case 2:
                
                break;
            case 3:
                
                break;
            default:
                break;
        }
    }

    const navigate = useNavigate();

    return(<Fragment>
        <form className="signInUp" onSubmit={onSubmit}>
            {phase===0?comp0:phase===1?comp1:phase===2?comp2:phase===3?comp3:navigate('/')}
        </form>
        <Popup active={popupActive} setActive={setPopupActive}>
            <a>try again</a>
        </Popup>
    </Fragment>);
};

export default SignIn;