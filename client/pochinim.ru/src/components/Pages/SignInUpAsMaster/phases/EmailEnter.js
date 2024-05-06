import { useState } from 'react';
import Loader from '../../../Loader/Loader';
import masterController from '../../../../controllers/MASTER-controller';
import userController from '../../../../controllers/USER-controller';

const MasterEmailEnter = ({email, setEmail, codeConf, setCodeConf, code, setCode, sendCode, setSendCode, step, setStep}) => {

    const [showLoader, setShowLoader] = useState(false);

    const sendNewCode = async () => {
        if(email != "" && !(await masterController.checkMasterInBd(email))){
            setShowLoader(true);
            const b = await userController.getSendCode(email);
            setSendCode(b);
            setCodeConf(true);

            setShowLoader(false);
        }
    }

    const click = async () =>{
        if(email != "" && code != ""){
            setStep(step + 1);
        }
    }

    return(<div className="phases-wrapper">
        <input placeholder="почта" value={email} onChange={e => setEmail(e.target.value)} className="text-input-field"></input>
        {codeConf?
        <input placeholder="код" onChange={e => setCode(e.target.value)} className="text-input-field"></input>
        :
        <button onClick={sendNewCode} className="send-code-button">выслать код</button>}
        <button onClick={click} className='continue-button'>Продолжить</button>
        <Loader showLoader={showLoader} setShowLoader={setShowLoader} text={"Высылаем код"}></Loader>
    </div>);
};

export default MasterEmailEnter;