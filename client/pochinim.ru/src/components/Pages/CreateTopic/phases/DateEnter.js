import { useState, useEffect } from 'react';
import InputWithError from '../../../../animations/input-error-field';

const DateEnter = ({TOPIC}) => {
    const [date, setDate] = useState(TOPIC.date)

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.date = date;
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
        
    },[date])

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>7/9</p>
            <h1>Когда нужна услуга?</h1>
        </div>
        <InputWithError placeholder={null} value={date} setValue={setDate} 
                    error={error} setError={setError} errorText={'Не верное значение'}
                    warning={warning} setWarning={setWarning} warningText={'Заполните поле'} inputType='date'></InputWithError>
    </div>)
}

export default DateEnter;