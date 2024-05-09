import { motion, useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import './button-go-to.css';

const ButtonGoTo = ({text, road}) => {

    const [buttonBG, animateButtonBG] = useAnimate();
    const [buttonText, animateButtonText] = useAnimate();

    const navigate = useNavigate();

    const buttonHover = async (colour1, {buttonBG, animateButtonBG},colour2, {buttonText, animateButtonText}) => {
       await animateButtonBG(buttonBG.current, {backgroundColor: colour1, border: colour1});
       await animateButtonText(buttonText.current, {color: colour2});
   }

    return(<motion.div ref={buttonBG} className="button-go-to"
                onMouseEnter={() => buttonHover("#3838CE", {buttonBG, animateButtonBG}, "#FFF", {buttonText, animateButtonText})}
                onMouseLeave={() => buttonHover("#EBF0FF", {buttonBG, animateButtonBG}, "#3838CE", {buttonText, animateButtonText})}
                onClick={e => navigate(road)}>
        <motion.p ref={buttonText}>{text}</motion.p>
        <button></button>
    </motion.div>);
}

export default ButtonGoTo;