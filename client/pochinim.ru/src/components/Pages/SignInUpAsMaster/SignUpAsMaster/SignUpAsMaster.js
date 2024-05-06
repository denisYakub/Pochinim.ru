import { Fragment, useEffect, useState, useContext } from 'react';
import Loader from '../../../Loader/Loader';
import MasterFIOEnter from '../phases/FIOEnter';
import MasterOccupationEnter from '../phases/OccupationEnter';
import MasterLocationEnter from '../phases/LocationEnter';
import MasterEmailEnter from '../phases/EmailEnter';
import MasterPhotoEnter from '../phases/PhotoEnter';
import MasterPasswordEnter from '../phases/PasswordEnter';
import { useNavigate } from "react-router-dom";
import './SignUpAsMaster.css';
import masterController from '../../../../controllers/MASTER-controller';
import { contextWebsite } from '../../../../contexts/contextWebsite';

const SignUpMaster = () => {

    const [step, setStep] = useState(0);

    const [fio, setFio] = useState(["", "", ""]);
    const [occupation, setOccupation] = useState("");
    const [workingFrom, setWorkingFrom] = useState(0);
    const [address, setAddress] = useState("");
    const [selectedOptionsLocation, setSelectedOptionsLocation] = useState(null);
    const [email, setEmail] = useState("");
    const [codeConf, setcodeConf] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState("");
    const [code, setcode] = useState("");
    const [sendCode, setSendCode] = useState("");

    const [showLoader, setShowLoader] = useState(false);

    const comps = [<MasterFIOEnter fio={fio} setFio={setFio} step={step} setStep={setStep}></MasterFIOEnter>, 

                    <MasterOccupationEnter occupation={occupation} setOccupation={setOccupation} 
                                            step={step} setStep={setStep}></MasterOccupationEnter>,

                    <MasterLocationEnter workingFrom={workingFrom} setWorkingFrom={setWorkingFrom}
                                            address={address} setAddress={setAddress}
                                            selectedOptionsLocation={selectedOptionsLocation} setSelectedOptionsLocation={setSelectedOptionsLocation}
                                            step={step} setStep={setStep}></MasterLocationEnter>, 

                    <MasterEmailEnter email={email} setEmail={setEmail}
                                        codeConf={codeConf} setCodeConf={setcodeConf}
                                        code={code} setCode={setcode}
                                        sendCode={sendCode} setSendCode={setSendCode}
                                        step={step} setStep={setStep}></MasterEmailEnter>, 

                    <MasterPhotoEnter photo={photo} setPhoto={setPhoto}
                                        FIO={fio}
                                        step={step} setStep={setStep}></MasterPhotoEnter>,

                    <MasterPasswordEnter password={password} setPassword={setPassword} 
                                            step={step} setStep={setStep}></MasterPasswordEnter>]

    const navigate = useNavigate();
    const WEBSITE = useContext(contextWebsite);

    useEffect(()=>{
        if(step === 5){
            masterController.registrate(`${fio[0]} ${fio[1]} ${fio[2]}`, occupation, workingFrom, address, selectedOptionsLocation,
                                            email, photo, password, WEBSITE.currentCity);
            navigate('/');
        }
    }, [step])

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