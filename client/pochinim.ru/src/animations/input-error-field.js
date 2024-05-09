import {motion, useAnimation} from 'framer-motion'
import { useEffect, useState } from "react";
import mark_orange from '../img/exclamation-mark-orange-img.png';
import mark_red from '../img/exclamation-mark-red-img.png';
import './input-error-field.css';

const InputWithError = ({placeholder, value, setValue, 
                            error, setError, errorText, 
                            warning, setWarning, warningText,
                            inputType = 'text'}) => {
    
    const animate_hint = useAnimation();
    const animate_border = useAnimation();
    const [mark, setMark] = useState(mark_orange);
    const [text, setText] = useState(warningText);
   
    useEffect(() => {
        try {
            async function showError(){
                await animate_border.start({border: '1px solid #EF0000'});
                await animate_hint.start({scale: 1});
            }
        
            async function showWarning(){
                await animate_border.start({border: '1px solid #F48400'});
                await animate_hint.start({scale: 1});
            }
        
            async function unShow(){
                await animate_border.start({border: '1px solid var(--color-secondary-grey-searchline)'});
                await animate_hint.start({scale: 0});
            }
    
            if(error){
                setMark(mark_red);
                setText(errorText);
                showError();
                setTimeout(() => {
                    //unShow();
                    setError();
                }, 10000);
            }
            if(warning){
                setMark(mark_orange);
                setText(warningText);
                showWarning();
                setTimeout(() => {
                    //unShow();
                    setWarning(false);
                }, 2000);
            }
            if(!warning && !error){
                unShow();
            }
        } catch (error) {
            console.log(error.message);
        }
    },[error, warning])
 
    return(<motion.div className="input-with-error-wrapper">
        <motion.input className='input-error-field'
            type={inputType}
            placeholder={placeholder} value={value}
            onChange={e => setValue(e.target.value)}
            animate={animate_border}
            initial={{
                border: '1px solid var(--color-secondary-grey-searchline)',
            }}></motion.input>
        <motion.div className='mistake-hint'
            animate={animate_hint}
            initial={{
                scale: 0,
            }}>
            <img src={mark} alt=''></img>
            <p>{text}</p>
        </motion.div>
    </motion.div>);
}

export default InputWithError;