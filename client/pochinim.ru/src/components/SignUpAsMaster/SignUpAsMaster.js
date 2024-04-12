import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../SignUpAsMaster/SignUpAsMaster.css';
import MasterFIOEnter from "./phases/FIOEnter";
import MasterOccupationEnter from "./phases/OccupationEnter";
import MasterLocationEnter from "./phases/LocationEnter";
import MasterEmailEnter from "./phases/EmailEnter";
import MasterPhotoEnter from "./phases/PhotoEnter";
import MasterPasswordEnter from "./phases/PasswordEnter";

const SignUpMaster = () => {

    const [step, setStep] = useState(0);

    const [fio, setFio] = useState(["", "", ""]);
    const [occupation, setOccupation] = useState("");
    const [workingFrom, setWorkingFrom] = useState(0);
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [codeConf, setCodeConf] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const navigate = useNavigate();

    const comps = [<MasterFIOEnter fio={fio} setFio={setFio}></MasterFIOEnter>, 

                    <MasterOccupationEnter occupation={occupation} setOccupation={setOccupation}></MasterOccupationEnter>,

                    <MasterLocationEnter workingFrom={workingFrom} setWorkingFrom={setWorkingFrom}
                                            location={location} setLocation={setLocation}></MasterLocationEnter>, 

                    <MasterEmailEnter email={email} setEmail={setEmail}
                                        codeConf={codeConf} setCodeConf={setCodeConf}
                                        code={code} setCode={setCode}></MasterEmailEnter>, 

                    <MasterPhotoEnter photo={photo} setPhoto={setPhoto}></MasterPhotoEnter>,
                    <MasterPasswordEnter password={password} setPassword={setPassword}></MasterPasswordEnter>]

    const move = (incr) => {
        const ntStep = step + incr;
        if(ntStep >= 0 && ntStep <= 5){
            if(step === 3){
                setCodeConf(true)
            }
            setStep(ntStep);
        }else{
            navigate('/');
        }
    }

    useEffect(()=>{

    }, [step])

    return(<Fragment>
        <div className='SignUpMaster'>
            <div className='back-button-wrapper'>
                <div className='back-icon'></div>
                <button onClick={() => move(-1)} className='back-button'>Назад</button>
            </div>
            <div className='phases-window'>
                {comps[step]}
                <button onClick={() => move(1)} className='next-button'>Продолжить</button>
            </div>
        </div>
    </Fragment>);
};

export default SignUpMaster;