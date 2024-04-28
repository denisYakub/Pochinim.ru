import { Fragment, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { contextLocation } from '../../../contexts/contextLocation';
import Loader from '../../Loader/Loader';
import MasterFIOEnter from './phases/FIOEnter';
import MasterOccupationEnter from './phases/OccupationEnter';
import MasterLocationEnter from './phases/LocationEnter';
import MasterEmailEnter from './phases/EmailEnter';
import MasterPhotoEnter from './phases/PhotoEnter';
import MasterPasswordEnter from './phases/PasswordEnter';
import masterController from '../../../controllers/MASTER-controller';
import './SignUpAsMaster.css';

const SignUpMaster = () => {

    const { city } = useContext(contextLocation);

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

    const navigate = useNavigate();

    const comps = [<MasterFIOEnter fio={fio} setFio={setFio}></MasterFIOEnter>, 

                    <MasterOccupationEnter occupation={occupation} setOccupation={setOccupation}></MasterOccupationEnter>,

                    <MasterLocationEnter workingFrom={workingFrom} setWorkingFrom={setWorkingFrom}
                                            address={address} setAddress={setAddress}
                                            selectedOptionsLocation={selectedOptionsLocation} setSelectedOptionsLocation={setSelectedOptionsLocation}></MasterLocationEnter>, 

                    <MasterEmailEnter email={email} setEmail={setEmail}
                                        codeConf={codeConf} setCodeConf={setcodeConf}
                                        code={code} setCode={setcode}
                                        sendCode={sendCode} setSendCode={setSendCode}></MasterEmailEnter>, 

                    <MasterPhotoEnter photo={photo} setPhoto={setPhoto}
                                        FIO={fio}></MasterPhotoEnter>,
                    <MasterPasswordEnter password={password} setPassword={setPassword}></MasterPasswordEnter>]

    const move = async (incr) => {
        const ntStep = step + incr;
        switch (step) {
            case 0:
                if(fio[0] != "" && fio[1] != ""){
                    setStep(ntStep);
                }
                break;
            case 1:
                if(occupation != ""){
                    setStep(ntStep);
                }
                break;
            case 2:
                if(workingFrom != 0 && (address != ""|| selectedOptionsLocation != null)){
                    setStep(ntStep);
                }
                break;
            case 3:
                if(email != "" && code != ""){
                    if(code == sendCode){
                        setStep(ntStep);
                        setcodeConf(false);
                    }
                }
                break;
            case 4:
                if(photo != null){
                    setStep(ntStep);
                }
                break;
            case 5:
                if(password != ""){
                    await masterController.registrate(fio, occupation, workingFrom, address, selectedOptionsLocation, 
                        email, photo, password, city);
                    setStep(ntStep);
                }
                break;
            default:
                navigate('/');
                break;
        }
    }

    useEffect(()=>{

    }, [step])

    return(<Fragment>
        <div className='SignUpMaster'>
            <div className='inner-SignUpMaster'>
                <div className='go-back-button'>
                    <div className='back-icon'></div>
                    <button onClick={() => move(-1)} className='back-button'>Назад</button>
                </div>
                <div className='phases-wrapper'>
                    {comps[step]}
                    <button onClick={() => move(1)} className='continue-button'>Продолжить</button>
                </div>
            </div>
        </div>
        <Loader showLoader={showLoader} setShowLoader={setShowLoader} text={"Проверяем код"}></Loader>
    </Fragment>);
};

export default SignUpMaster;