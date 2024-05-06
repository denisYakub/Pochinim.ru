import {motion, useAnimate} from 'framer-motion'
import { useEffect, useState } from "react";
import mark_orange from '../img/exclamation-mark-orange-img';
import mark_red from '../img/exclamation-mark-red-img';

const InputWithError = ({placeholder, value, setValue, error, warning, mistakeText}) => {
    
    const [errorScope, errorAnimate] = useAnimate();
    const [errorRed, animateErrorRed] = useAnimate();

    const [error_hint, set_error_hint] = useAnimate();
    const [error_border, set_error_border] = useAnimate();
    const [mark, setMark] = useState(mark_red );
   
    useEffect(() => {
        /*if(error){
            highlightErrorInput("#1C1C1C", errorRed, animateErrorRed);
        }*/
        if(error){

        }
        if(warning){
            
        }
    },[error, warning])

    const showErrorHint = async (scale, errorScope, errorAnimate) => {
        await errorAnimate(errorScope.current, {scale: scale});
    }

    const highlightErrorInput = async (baseColour, errorRed, animateErrorRed) => {
        await animateErrorRed(errorRed.current, {color: "#EF0000"});
        await animateErrorRed(errorRed.current, {color: baseColour});
    }
 
    return(<div className="input-with-error-wrapper">
        <motion.input placeholder={placeholder} value={value}
            onChange={e => setValue(e.target.value)}
            ref={error_border}></motion.input>
        <motion.div className='mistake-hint'
            ref={error_hint}>
            <img src={mark} alt=''></img>
            <p>{mistakeText}</p>
        </motion.div>
        {/*<div className="input-with-error">
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
            </motion.div>*/}
    </div>);
}

export default InputWithError;