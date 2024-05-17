import { Fragment, useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from '../../Loader/Loader';
import WelcomePhase from './phases/welcome-phase';
import PasswordPhase from './phases/password-phase';
import CodePhase from './phases/code-phase';
import EmailPhase from './phases/email-phase';
import './SignInUp.css';
import { contextUser } from '../../../contexts/contextUser';

const SignIn = () => {

    const USER = useContext(contextUser);

    const [phase, setPhase] = useState(0);

    const [showLoader, setShowLoader] = useState(false);

    const comps = [<EmailPhase phase={phase} setPhase={setPhase}
                                setShowLoader={setShowLoader}
                                USER={USER}></EmailPhase>, 
                    <CodePhase phase={phase} setPhase={setPhase}
                                USER={USER}></CodePhase>,
                    <PasswordPhase phase={phase} setPhase={setPhase}
                                USER={USER}></PasswordPhase>,
                    <WelcomePhase phase={phase} setPhase={setPhase}></WelcomePhase>];

    const navigate = useNavigate();

    const movePhaseBack = () => {
        const prevPhase = phase - 1;

        if(prevPhase == 1 && USER.code == null){
            setPhase(0);
        }else if(prevPhase == 2){
            navigate('/');
        }else if(prevPhase >= 0){
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