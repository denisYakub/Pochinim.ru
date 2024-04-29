import { useNavigate } from "react-router-dom";

const MasterPasswordEnter = ({password, setPassword, step, setStep}) => {

    const navigate = useNavigate();

    const click = async () =>{
        if(password != ""){
            //setStep(step + 1);
            navigate('/');
        }
    }

    return(<div className="phases-wrapper">
        <input type="password" placeholder="пароль" value={password} onChange={e => setPassword(e.target.value)} className="text-input-field"></input>
        <input type="password" placeholder="повторите пароль" className="text-input-field"></input>
        <button onClick={click} className='continue-button'>Продолжить</button>
    </div>);
};

export default MasterPasswordEnter;