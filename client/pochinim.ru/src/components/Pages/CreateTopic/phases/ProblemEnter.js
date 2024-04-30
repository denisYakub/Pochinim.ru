import { useState } from "react"
import topicController from '../../../../controllers/TOPIC-controller';
import InputWithError from '../../../../animations/input-error-field';

const optionsOfWhatHappend = await topicController.getListOfWhatHappend();

const ProblemEnter = ({problem, setProblem, error}) => {
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

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>4/9</p>
            <h1>Что случилось?</h1>
        </div>
        <div className="options-input" onChange={e => inputRadioCheck(e.target)}>
            {optionsOfWhatHappend.map((item, index) => {
                return(
                <div key={index}>
                    <input type="radio" value={item} name="check" checked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div>
                <input type="radio" value={localProblem} name="check" checked={isCheckedUserInput()}></input>
                <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalProblem} error={error}></InputWithError>
            </div>
        </div>
    </div>)
}

export default ProblemEnter;