import {motion, useAnimate} from "framer-motion";
import './MapPopup.css'

const MapPopup = ({active, setActive}) => {
    const [scope, animate] = useAnimate();


    const close = async () => {
        await animate(scope.current, {scale:0});
        setActive(false);
        setReloadPage(true);
    }

    return(<motion.div ref={scope} className='edit-popup-wrapper'
    initial={{scale:0}} animate={active?{scale:1}:null}>
        <div className='edit-popup'>
            {children}
            <div className='edit-popup-buttons'>
            </div>
        </div>
</motion.div>);
};

export default MapPopup;