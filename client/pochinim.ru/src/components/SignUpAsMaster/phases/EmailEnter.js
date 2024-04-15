import userController from "../../../controllers/USER-controller";
import masterController from "../../../controllers/MASTER-controller";
import Loader from '../../Loader/Loader';
import { useState } from 'react';

const MasterEmailEnter = ({email, setEmail, codeConf, setCodeConf, code, setCode, sendCode, setSendCode}) => {

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
    
    return(<div className="phase-block">
        <input placeholder="почта" value={email} onChange={e => setEmail(e.target.value)} className="text-input-field"></input>
        {codeConf?
        <input placeholder="код" onChange={e => setCode(e.target.value)} className="text-input-field"></input>
        :
        <button onClick={sendNewCode} className="send-code-button">выслать код</button>}
        <Loader showLoader={showLoader} setShowLoader={setShowLoader} text={"Высылаем код"}></Loader>
    </div>);
};

export default MasterEmailEnter;