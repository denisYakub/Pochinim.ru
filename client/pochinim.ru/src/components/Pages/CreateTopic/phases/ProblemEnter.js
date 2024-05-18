import { useEffect, useState } from "react"
import topicController from '../../../../controllers/TOPIC-controller';
import InputWithError from '../../../../animations/input-error-field';

const ProblemEnter = ({TOPIC}) => {

    const [optionsOfWhatHappend, ] = useState(JSON.parse(sessionStorage.getItem('create_topic_theme'))?.problem_hints);

    const [localProblem, setLocalProblem] = useState("");
    const [problem, setProblem] = useState(TOPIC.problem);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    
    useEffect(()=>{
        try {
            TOPIC.problem = problem;
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
        
    },[problem])

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
                <div key={index} className="option">
                    <input type="radio" value={item} name="check" defaultChecked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="option-input">
                <input type="radio" value={localProblem} name="check" defaultChecked={isCheckedUserInput()}></input>
                <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalProblem} 
                    error={error} setError={setError} errorText={'Не верное значение'}
                    warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
            </div>
        </div>
    </div>)
}

export default ProblemEnter;