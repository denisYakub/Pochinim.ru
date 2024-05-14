import { useEffect, useState } from 'react';
import './EditPopup.css';
import {motion, useAnimate} from "framer-motion";

const EditPopup = ({active, setActive, name, updateFunction, fieldToUpdate, value, setReloadPage}) =>{

    const [scope, animate] = useAnimate();
    const [newValue, setNewValue] = useState(value)

    const cancel = async () => {
        await animate(scope.current, {scale:0});
        setActive(false);
    }

    const save = async () => {
        await updateFunction(fieldToUpdate, newValue);
        await animate(scope.current, {scale:0});
        setActive(false);
        setReloadPage(true);
    }

    useEffect(() => {
        if(value?.length > 0 ){
            setNewValue(value.split('"').join(''));
        }
        console.log(value);
    }, [value])

    return(<motion.div ref={scope} className='edit-popup-wrapper'
        initial={{scale:0}} animate={active?{scale:1}:null}>
            <div className='edit-popup'>
                <div className='children-popup'>
                    <h1 className="edit-popup-h">{name}</h1>
                    <input className="edit-popup-input" value={newValue} onChange={e => setNewValue(e.target.value)}></input>
                </div>
                <div className='edit-popup-buttons'>
                    <button className='cancel-button' onClick={() => cancel()}>Отменить изменения</button>
                    <button className='save-button' onClick={() => save()}>Сохранить</button>
                </div>
            </div>
    </motion.div>);
}

export default EditPopup;