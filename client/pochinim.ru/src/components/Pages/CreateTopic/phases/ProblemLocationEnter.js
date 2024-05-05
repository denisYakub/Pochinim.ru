import { useState, useEffect } from "react"
import topicController from '../../../../controllers/TOPIC-controller';
import InputWithError from '../../../../animations/input-error-field';

const optionsOfWhereIsProblem = await topicController.getListofWhereIsProblem();

const ProblemLocationEnter = ({TOPIC}) => {
    const [localProblemLocation, setLocalProblemLocation] = useState("");
    const [problemLocation, setProblemLocation] = useState(TOPIC.problemLocation);
    const [error, setError] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.problemLocation = problemLocation;
        } catch (error) {
            console.log(error);
            setProblemLocation('');
            setError(true);
            setTimeout(()=>{
                setError(false);
            }, 5000);
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
                <div key={index}>
                    <input type="radio" value={item} name="check" checked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div>
                <input type="radio" value={localProblemLocation} name="check" checked={isCheckedUserInput()}></input>
                <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalProblemLocation} error={error}></InputWithError>
            </div>
        </div>
    </div>)
}

export default ProblemLocationEnter;