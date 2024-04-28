import './EditPopup.css';
import {motion, useAnimate} from "framer-motion";

const EditPopup = ({active, setActive, children, updateFunction, fieldToUpdate, newValue, idUser, setReloadPage}) =>{

    const [scope, animate] = useAnimate();

    const cancel = async () => {
        await animate(scope.current, {scale:0});
        setActive(false);
    }

    const save = async () => {
        await updateFunction(fieldToUpdate, newValue, idUser);
        await animate(scope.current, {scale:0});
        setActive(false);
        setReloadPage(true);
    }

    return(<motion.div ref={scope} className='edit-popup-wrapper'
        initial={{scale:0}} animate={active?{scale:1}:null}>
            <div className='edit-popup'>
                {children}
                <div className='edit-popup-buttons'>
                    <button className='cancel-button' onClick={() => cancel()}>Отменить изменения</button>
                    <button className='save-button' onClick={() => save()}>Сохранить</button>
                </div>
            </div>
    </motion.div>);
}

export default EditPopup;