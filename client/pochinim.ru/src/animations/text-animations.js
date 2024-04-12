class TextAnimations{
    async highlightErrorInput(baseColour, {errorRed, animateErrorRed}){
        await animateErrorRed(errorRed.current, {color: "#EF0000"});
        await animateErrorRed(errorRed.current, {color: baseColour});
    }
}

const textAnimations = new TextAnimations()

export default textAnimations;