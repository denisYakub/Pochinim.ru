import {motion, useAnimate} from 'framer-motion'
import { useEffect } from "react";

const InputWithError = ({placeholder, value, setValue, error}) => {
    
    const [errorScope, errorAnimate] = useAnimate();
    const [errorRed, animateErrorRed] = useAnimate();
   
    useEffect(() => {
        if(error){
            highlightErrorInput("#1C1C1C", errorRed, animateErrorRed);
        }
    },[error])

    const showErrorHint = async (scale, errorScope, errorAnimate) => {
        await errorAnimate(errorScope.current, {scale: scale});
    }

    const highlightErrorInput = async (baseColour, errorRed, animateErrorRed) => {
        await animateErrorRed(errorRed.current, {color: "#EF0000"});
        await animateErrorRed(errorRed.current, {color: baseColour});
    }
 
    return(<div className="input-with-error-wrapper">
        <div className="input-with-error">
            <input placeholder={placeholder} value={value} ref={errorRed} onChange={e => setValue(e.target.value)}></input>
            {error?
                <div className="error-sign"
                    onMouseEnter={() => showErrorHint(1, errorScope, errorAnimate)}
                    onMouseLeave={() => showErrorHint(0, errorScope, errorAnimate)}>
                </div>
            : 
                <></>}
        </div>
        <motion.div className='error-message' ref={errorScope} initial={{scale: 0, position: "absolute", 
            width: "fit-content", height: "fit-content", display: "flex", justifyContent: 'center', alignItems: "center"}}>
            <p>
                Вы тут ошиблись!
            </p>
        </motion.div>
    </div>);
}

export default InputWithError;