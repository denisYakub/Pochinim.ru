import { Fragment, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../SignInUp/SignInUp.css"
import EmailPhase from "./phases/email-phase";
import CodePhase from "./phases/code-phase";
import PasswordPhase from "./phases/password-phase";
import WelcomePhase from "./phases/welcome-phase";

const SignIn = () => {

    
    const [email, setEmail] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [emailCode, setEmailCode] = useState(0);
    const [phase, setPhase] = useState(0);
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")

    const [errorInSingInUp, setErrorInSingInUp] = useState(null);

    const comp0 =  <EmailPhase phase={phase} setPhase={setPhase} 
                                email={email} setEmail={setEmail} 
                                setEmailCode={setEmailCode}
                                errorInSingInUp={errorInSingInUp} setErrorInSingInUp={setErrorInSingInUp}></EmailPhase>
                                
    const comp1 = <CodePhase phase={phase} setPhase={setPhase} 
                                code={inputCode} setCode={setInputCode} 
                                    emailCode={emailCode}
                                    email={email}
                                    errorInSingInUp={errorInSingInUp} setErrorInSingInUp={setErrorInSingInUp}></CodePhase>

    const comp2 = <PasswordPhase phase={phase} setPhase={setPhase} 
                                    password={password} setPassword={setPassword}
                                    name={name} setName={setName}
                                    email={email}
                                    emailCode={emailCode}
                                    errorInSingInUp={errorInSingInUp} setErrorInSingInUp={setErrorInSingInUp}></PasswordPhase>

    const comp3 = <WelcomePhase phase={phase} setPhase={setPhase}></WelcomePhase>

    const navigate = useNavigate();

    const movePhaseBack = () => {
        const prevPhase = phase - 1;
        if(prevPhase >= 0){
            setPhase(prevPhase);
        }
    }

    return(<Fragment>
        <div className="signInUp">
            <div className='back-button-wrapper'>
                <div className='back-icon'></div>
                <button onClick={movePhaseBack} className='back-button'>Назад</button>
            </div>
            {phase==0?comp0:phase==1?comp1:phase==2?comp2:phase==3?comp3:navigate('/')}
        </div>
    </Fragment>);
};

export default SignIn;