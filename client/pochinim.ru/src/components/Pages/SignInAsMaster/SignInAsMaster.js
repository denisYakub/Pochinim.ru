import { Fragment, useContext, useState } from "react";
import './SignInAsMaster.css';
import Loader from '../../Loader/Loader';
import MasterEmailEnter from "./phases/EmailEnter";
import MasterPasswordEnter from "./phases/PasswordEnter";
import { contextMaster } from "../../../contexts/contextMaster";

const SignInAsMaster = () => {

    const [step, setStep] = useState(0);

    const MASTER = useContext(contextMaster);

    const comps = [<MasterEmailEnter step={step} setStep={setStep} MASTER={MASTER}></MasterEmailEnter>,
                    <MasterPasswordEnter step={step} setStep={setStep} MASTER={MASTER}></MasterPasswordEnter>];

    return(<Fragment>
        <div className="page-wrapper">
            <div className="signin-as-master-content">
                <div className='go-back-button'>
                    <div className='back-icon'></div>
                    <button onClick={() => {setStep(step - 1)}} className='back-button'>Назад</button>
                </div>
                {comps[step]}
            </div>
        </div>
    </Fragment>)
}

export default SignInAsMaster;