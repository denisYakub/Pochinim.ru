import { useState } from "react"
import topicController from '../../../../controllers/TOPIC-controller';
import InputWithError from '../../../../animations/input-error-field';

const optionsOfWhereIsProblem = await topicController.getListofWhereIsProblem();

const ProblemLocationEnter = ({problemLocation, setProblemLocation, error}) => {
    const [localProblemLocation, setLocalProblemLocation] = useState("");


    const inputRadioCheck = (e) => {
        setProblemLocation(e.value);
    }

    const isChecked = (index) => {
        if(optionsOfWhereIsProblem.indexOf(problemLocation) === index){
            return true;
        }else{
            return false;
        }
    }

    const isCheckedUserInput = () =>{
        if(problemLocation === "" || optionsOfWhereIsProblem.includes(problemLocation)){
            return false;
        }else{
             return true;
        }
    }

    const setValue = () => {
        if(optionsOfWhereIsProblem.includes(problemLocation)){
            return "";
        }else{
            return problemLocation;
        }
    }
    
    return(<div className="blockPhase">
        <h1>
            Где проблема?
        </h1>
        <div className="listOfOptions" onChange={e => inputRadioCheck(e.target)}>
            {optionsOfWhereIsProblem.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio" value={item} name="check" checked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="urInput">
                <input type="radio" className="urInput-radio" value={localProblemLocation} name="check" checked={isCheckedUserInput()}></input>
                <div className="create-topic-input-size">
                    <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalProblemLocation} error={error}></InputWithError>
                 </div>
            </div>
        </div>
    </div>)
}

export default ProblemLocationEnter;