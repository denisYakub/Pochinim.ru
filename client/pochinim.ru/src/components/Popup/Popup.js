import './Popup.css';
import {motion, useAnimate} from "framer-motion";
const Popup = ({active, setActive, children}) =>{

    const [scope, animate] = useAnimate();

    const close = () => {
        animate(scope.current, {scale:0});
        //setActive(params)
    }

    return(active?<motion.div ref={scope} className='Popup'
            initial={{scale:0}} animate={active?{scale:1}:null}>
        <motion.div className='Popup-content'>
            <a>
            {children}
            </a>
            <button onClick={() => close()}>
            Прекрасно
            </button>
        </motion.div>
    </motion.div>:<></>);
}

export default Popup;