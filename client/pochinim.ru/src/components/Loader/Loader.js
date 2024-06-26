import { motion } from "framer-motion";
import '../Loader/Loader.css';
import loadImg from '../../img/load.png';

const Loader = ({showLoader, setShowLoader, text}) => {
    return(<div>
            {showLoader?
                <div className="loader">
                    <motion.img src={loadImg} alt="It should be load image..." className="loader-img"
                        animate={{rotate: 360}}
                        transition={{repeat: Infinity, duration: 3, type: "tween"}}></motion.img>
                    <p className="loader-text">{text}</p>
                </div>
            :
                <></>}
         </div>);
}

export default Loader;