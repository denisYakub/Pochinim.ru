class ButtonsAnimations{
    async buttonHover(colour1, {buttonBG, animateButtonBG},
         colour2, {buttonText, animateButtonText}){
        await animateButtonBG(buttonBG.current, {backgroundColor: colour1});
        await animateButtonText(buttonText.current, {color: colour2});
    }

    async showErrorHint(scale, {errorScope, animateError}){
        await animateError(errorScope.current, {scale: scale});
    }
}

const buttonsAnimations = new ButtonsAnimations();

export default buttonsAnimations;