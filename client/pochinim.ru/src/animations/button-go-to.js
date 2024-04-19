import { useAnimate } from "framer-motion";
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

   const showErrorHint = async(scale, {errorScope, animateError}) => {
       await animateError(errorScope.current, {scale: scale});
   }

    return(<div ref={buttonBG} className="button-go-to"
                onMouseEnter={e => {buttonHover("#3838CE", {buttonBG, animateButtonBG}, "#FFF", {buttonText, animateButtonText})}}
                onMouseLeave={e => {buttonHover("#EBF0FF", {buttonBG, animateButtonBG}, "#3838CE", {buttonText, animateButtonText})}}
                onClick={e => navigate(road)}>
        <a ref={buttonText}>{text}</a>
        <button></button>
    </div>);
}

export default ButtonGoTo;