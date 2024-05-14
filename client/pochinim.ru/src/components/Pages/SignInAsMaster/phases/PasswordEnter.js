import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const MasterPasswordEnter = ({step, setStep, MASTER}) => {

    const navigate = useNavigate();

    const [password, setPassword] = useState(MASTER.password);

    const click = async () =>{
        try {
            MASTER.password = password;
            await MASTER.logInMaster();
            navigate('/');
        } catch (error) {
            if(error.message == 'Пустое значение' || error.message ==  'Пароль меньше 8 символов' ||
            error.message == 'Пароль дожен включать 1 цифру' || error.message ==  'Пароль дожен включать 1 букву' ||
            error.message == 'Аккаунт не существует'
            ){
                console.log(error.message);
            }else{
                throw new Error(error.message);
            }
        }
    }

    return(<div className="phases-wrapper">
        <input type="password" placeholder="пароль" value={password} onChange={e => setPassword(e.target.value)} className="text-input-field"></input>
        <button onClick={click} className='continue-button'>Продолжить</button>
    </div>);
};

export default MasterPasswordEnter;