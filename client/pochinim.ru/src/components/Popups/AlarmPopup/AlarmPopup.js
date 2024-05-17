import './AlarmPopup.css';
import {motion, useAnimate} from "framer-motion";
const Popup = ({active, setActive, children}) =>{

    const [scope, animate] = useAnimate();

    const close = async () => {
        if(!localStorage.getItem('cookies')){
            localStorage.setItem('cookies', true);
        }
        await animate(scope.current, {scale:0});
        setActive(false);
    }

    return(<motion.div ref={scope} className='Popup'
        initial={{scale:0}} animate={active?{scale:1}:null}>
            <div className='info-popup'>
                <div className='icon-popup'></div>
                <p>{children}</p>
            </div>
            <button onClick={() => close()}>Прекрасно</button>
    </motion.div>);
}

export default Popup;