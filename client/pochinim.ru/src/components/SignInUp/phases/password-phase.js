import { logIn, registrate } from "../../../services/signInUp-service";
import {motion, useAnimate} from 'framer-motion'

const PasswordPhase = ({phase, setPhase, password, setPassword, name, setName, email, emailCode}) =>{

    const [scope, animate] = useAnimate();

    const click = async() =>{
        if(emailCode === 0){
            if(await logIn(email, password)){
                setPhase(phase + 1)
            }else{
                animate(scope.current, 
                    {rotate: [0, 5, -5, 0], 
                        background: ["#DDDCDC", "#ff008c", "#DDDCDC"]}, 
                    {repeat: 1, duration: 0.5})
            }
        }else{
            if(await registrate(email, name, password)){
                setPhase(phase + 1)
            }else{
                animate(scope.current, 
                    {rotate: [0, 5, -5, 0], 
                        background: ["#DDDCDC", "#ff008c", "#DDDCDC"]}, 
                    {repeat: 1, duration: 0.5})
            }
        }
    };

    return(<div className="inner-box" ref={scope}>
        <div className="annotation">
            <h1>
            Введите пароль
            </h1>
            <a>
            </a>
        </div>
        <div className="inputField">
            <input type="text" placeholder={password} onChange={e => setPassword(e.target.value)}></input>
            {console.log(emailCode)}
            {emailCode!==0?<input type="text" placeholder={name} onChange={e => setName(e.target.value)}></input>:<></>}
        </div>
        <button className="buttonNext" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default PasswordPhase;