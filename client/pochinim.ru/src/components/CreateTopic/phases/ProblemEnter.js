import { useState } from "react"
import InputWithError from "../../../animations/input-error-field.js";
import topicController from "../../../controllers/TOPIC-controller.js";

const optionsOfWhatHappend = await topicController.getListOfWhatHappend();

const ProblemEnter = ({problem, setProblem, error, setError, errorRed}) => {
    const [localProblem, setLocalProblem] = useState("");


    const inputRadioCheck = (e) => {
        setProblem(e.value);
    }

    const isChecked = (index) => {
        if(optionsOfWhatHappend.indexOf(problem) === index){
            return true;
        }else{
            return false;
        }
    }

    const isCheckedUserInput = () =>{
        if(problem === "" || optionsOfWhatHappend.includes(problem)){
            return false;
        }else{
             return true;
        }
    }

    const setValue = () => {
        if(optionsOfWhatHappend.includes(problem)){
            return "";
        }else{
            return problem;
        }
    }

    return(<div className="blockPhase">
        <h1>
            Что случилось?
        </h1>
        <div className="listOfOptions" onChange={e => inputRadioCheck(e.target)}>
            {optionsOfWhatHappend.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio" value={item} name="check" checked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="urInput">
                <input type="radio" className="urInput-radio" value={localProblem} name="check" checked={isCheckedUserInput()}></input>
                <div className="create-topic-input-size">
                    <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalProblem} error={error}></InputWithError>
                 </div>
            </div>
        </div>
    </div>)
}

export default ProblemEnter;