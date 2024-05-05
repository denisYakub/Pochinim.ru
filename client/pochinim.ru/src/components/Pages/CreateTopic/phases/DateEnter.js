import { useState, useEffect } from 'react';
import InputDateWithError from '../../../../animations/input-error-date';

const DateEnter = ({TOPIC}) => {
    const [date, setDate] = useState(TOPIC.date)
    const [error, setError] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.date = date;
        } catch (error) {
            console.log(error);
            setDate('');
            setError(true);
            setTimeout(()=>{
                setError(false);
            }, 5000);
        }
        
    },[date])

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>7/9</p>
            <h1>Когда нужна услуга?</h1>
        </div>
        <InputDateWithError value={date} setValue={setDate} error={error}></InputDateWithError>
    </div>)
}

export default DateEnter;