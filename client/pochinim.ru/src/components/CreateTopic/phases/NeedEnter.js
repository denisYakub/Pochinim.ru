import InputWithError from "../../../animations/input-error-field.js";
import topicController from "../../../controllers/TOPIC-controller.js";
import { useState } from "react"

const optionsOfWork = await topicController.getListOfWork();

const NeedEnter = ({need, setNeed, error, setError, errorRed}) => {
    const [localNeed, setLocalNeed] = useState("");


    const inputRadioCheck = (e) => {
        setNeed(e.value);
    }

    const isChecked = (index) => {
        if(optionsOfWork.indexOf(need) === index){
            return true;
        }else{
            return false;
        }
    }

    const isCheckedUserInput = () =>{
        if(need === "" || optionsOfWork.includes(need)){
            return false;
        }else{
             return true;
        }
    }

    const setValue = () => {
        if(optionsOfWork.includes(need)){
            return "";
        }else{
            return need;
        }
    }

    return(<div className="blockPhase">
        <h1>
            Что требуется?
        </h1>
        <div className="listOfOptions" onChange={e => inputRadioCheck(e.target)}> 
            {optionsOfWork.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio" value={item} name="check" checked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="urInput">
                <input type="radio" className="urInput-radio" value={localNeed} name="check" checked={isCheckedUserInput()}></input>
                <div className="create-topic-input-size">
                    <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalNeed} error={error}></InputWithError>
                 </div>
            </div>
        </div>
    </div>)
}

export default NeedEnter;