import {motion, useAnimate} from 'framer-motion'
const CodePhase = ({phase, setPhase, code, setCode, emailCode}) =>{

    const [scope, animate] = useAnimate();

    const click = () =>{
        if(emailCode == code){
            setPhase(phase + 1)
        }else{
            animate(scope.current, 
                {rotate: [0, 5, -5, 0], 
                    background: ["#DDDCDC", "#ff008c", "#DDDCDC"]}, 
                {repeat: 1, duration: 0.5})
        }
    };
    
    return(<div className="inner-box" ref={scope}>
        <div className="annotation">
            <h1>
            Введите код из сообщения
            </h1>
            <a>
            Код отправили на почту " + "email"
            </a>
        </div>
        <div className="inputField">
            <input type="text" placeholder={code} onChange={e => setCode(e.target.value)}></input>
        </div>
        <button className="buttonNext" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default CodePhase;