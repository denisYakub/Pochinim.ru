import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contextWebsite } from "../../../../contexts/contextWebsite";

const MasterPasswordEnter = ({step, setStep, MASTER}) => {

    const navigate = useNavigate();
    const WEBSITE = useContext(contextWebsite);

    const [password, setPassword] = useState(MASTER.password);

    const click = async () =>{
        try {
            MASTER.password = password;
            MASTER.registrateMaster(WEBSITE.currentCity);
            navigate('/');
        } catch (error) {
            if(['Пустое значение', 'Пароль меньше 8 символов',
            'Пароль дожен включать 1 цифру', 'Пароль дожен включать 1 букву'
            ].includes(error.message)){

            }else{
                throw new Error(error.message);
            }
        }
    }

    return(<div className="phases-wrapper">
        <input type="password" placeholder="пароль" value={password} onChange={e => setPassword(e.target.value)} className="text-input-field"></input>
        <input type="password" placeholder="повторите пароль" className="text-input-field"></input>
        <button onClick={click} className='continue-button'>Продолжить</button>
    </div>);
};

export default MasterPasswordEnter;