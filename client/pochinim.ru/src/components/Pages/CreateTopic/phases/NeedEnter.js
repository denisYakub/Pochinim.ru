import { useState, useEffect } from "react"
import topicController from '../../../../controllers/TOPIC-controller';
import InputWithError from '../../../../animations/input-error-field';

const optionsOfWork = await topicController.getListOfWork();

const NeedEnter = ({TOPIC}) => {
    const [localNeed, setLocalNeed] = useState("");
    const [need, setNeed] = useState(TOPIC.need);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.need = need;
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
        
    },[need])

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

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>3/9</p>
            <h1>Что требуется?</h1>
        </div>
        <div className="options-input" onChange={e => inputRadioCheck(e.target)}> 
            {optionsOfWork.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio" value={item} name="check" defaultChecked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="option-input">
                <input type="radio" value={localNeed} name="check" defaultChecked={isCheckedUserInput()}></input>
                <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalNeed} 
                    error={error} setError={setError} errorText={'Не верное значение'}
                    warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
            </div>
        </div>
    </div>)
}

export default NeedEnter;