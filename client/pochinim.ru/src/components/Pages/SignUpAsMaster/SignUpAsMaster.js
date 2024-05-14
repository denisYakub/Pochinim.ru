import { Fragment, useState, useContext } from 'react';
import Loader from '../../Loader/Loader';
import MasterFIOEnter from './phases/FIOEnter';
import MasterOccupationEnter from './phases/OccupationEnter';
import MasterLocationEnter from './phases/LocationEnter';
import MasterEmailEnter from './phases/EmailEnter';
import MasterPhotoEnter from './phases/PhotoEnter';
import MasterPasswordEnter from './phases/PasswordEnter';
import './SignUpAsMaster.css';
import { contextMaster } from '../../../contexts/contextMaster';

const SignUpMaster = () => {

    const [step, setStep] = useState(0);

    const MASTER = useContext(contextMaster)

    const [showLoader, setShowLoader] = useState(false);

    const comps = [<MasterFIOEnter step={step} setStep={setStep} MASTER={MASTER}></MasterFIOEnter>, 

                    <MasterOccupationEnter step={step} setStep={setStep} MASTER={MASTER}></MasterOccupationEnter>,

                    <MasterLocationEnter step={step} setStep={setStep} MASTER={MASTER}></MasterLocationEnter>, 

                    <MasterEmailEnter step={step} setStep={setStep} MASTER={MASTER}></MasterEmailEnter>, 

                    <MasterPhotoEnter step={step} setStep={setStep} MASTER={MASTER}></MasterPhotoEnter>,

                    <MasterPasswordEnter step={step} setStep={setStep} MASTER={MASTER}></MasterPasswordEnter>]

    return(<Fragment>
        <div className='page-wrapper'>
            <div className='signUpMaster-content'>
                <div className='go-back-button'>
                    <div className='back-icon'></div>
                    <button onClick={() => {setStep(step - 1)}} className='back-button'>Назад</button>
                </div>
                {comps[step]}
            </div>
        </div>
        <Loader showLoader={showLoader} setShowLoader={setShowLoader} text={"Проверяем код"}></Loader>
    </Fragment>);
};

export default SignUpMaster;