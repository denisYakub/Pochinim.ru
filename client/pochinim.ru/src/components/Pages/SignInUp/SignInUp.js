import { Fragment, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from '../../Loader/Loader';
import WelcomePhase from './phases/welcome-phase';
import PasswordPhase from './phases/password-phase';
import CodePhase from './phases/code-phase';
import EmailPhase from './phases/email-phase';
import './SignInUp.css';

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [emailCode, setEmailCode] = useState(0);
    const [phase, setPhase] = useState(0);
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")

    const [showLoader, setShowLoader] = useState(false);

    const comps = [<EmailPhase phase={phase} setPhase={setPhase} 
                                email={email} setEmail={setEmail} 
                                setEmailCode={setEmailCode}
                                setShowLoader={setShowLoader}></EmailPhase>, 
                    <CodePhase phase={phase} setPhase={setPhase} 
                                code={inputCode} setCode={setInputCode} 
                                emailCode={emailCode}
                                email={email}></CodePhase>,
                    <PasswordPhase phase={phase} setPhase={setPhase} 
                                password={password} setPassword={setPassword}
                                name={name} setName={setName}
                                email={email}
                                emailCode={emailCode}></PasswordPhase>,
                    <WelcomePhase phase={phase} setPhase={setPhase}></WelcomePhase>];

    const navigate = useNavigate();

    const movePhaseBack = () => {
        const prevPhase = phase - 1;
        if(prevPhase >= 0){
            setPhase(prevPhase);
        }
    }

    return(<Fragment>
        <div className="page-wrapper">
            <div className="sighnInUp-content">
                <div className='go-back-button'>
                    <div className='back-icon'></div>
                    <button onClick={movePhaseBack} className='back-button'>Назад</button>
                </div>
                {phase<=3?comps[phase]:navigate('/')}
            </div>
        </div>
        <Loader showLoader={showLoader} setShowLoader={setShowLoader}></Loader>
    </Fragment>);
};

export default SignIn;