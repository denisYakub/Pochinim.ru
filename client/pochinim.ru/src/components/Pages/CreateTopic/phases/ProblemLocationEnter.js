import { useState, useEffect } from "react"
import topicController from '../../../../controllers/TOPIC-controller';
import InputWithError from '../../../../animations/input-error-field';

const ProblemLocationEnter = ({TOPIC}) => {

    const [optionsOfWhereIsProblem, ] = useState(JSON.parse(sessionStorage.getItem('create_topic_theme'))?.problem_location_hints);

    const [localProblemLocation, setLocalProblemLocation] = useState("");
    const [problemLocation, setProblemLocation] = useState(TOPIC.problemLocation);
    
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.problemLocation = problemLocation;
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
        
    },[problemLocation])

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
    
    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>5/9</p>
            <h1>Где проблема?</h1>
        </div>
        <div className="options-input" onChange={e => inputRadioCheck(e.target)}>
            {optionsOfWhereIsProblem.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio" value={item} name="check" defaultChecked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="option-input">
                <input type="radio" value={localProblemLocation} name="check" defaultChecked={isCheckedUserInput()}></input>
                <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalProblemLocation} 
                    error={error} setError={setError} errorText={'Не верное значение'}
                    warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
            </div>
        </div>
    </div>)
}

export default ProblemLocationEnter;