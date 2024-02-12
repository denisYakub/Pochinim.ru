import './Popup.css';
import {motion} from "framer-motion";
const Popup = ({active, setActive, children}) =>{
    return(<motion.div className='Popup' onClick={() => setActive(false)}
            initial={{scale:0}} animate={active?{scale:1}:null}>
        <motion.div className='Popup-content' onClick={e => e.stopPropagation()}>
            {children}
        </motion.div>
    </motion.div>);
}

export default Popup;