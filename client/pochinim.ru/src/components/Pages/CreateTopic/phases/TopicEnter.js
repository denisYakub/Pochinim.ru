import { useEffect, useState } from 'react';
import InputWithError from '../../../../animations/input-error-field';

const TopicEnter = ({TOPIC}) => {
    const [topic_name, setTopic_name] = useState(TOPIC.topicName);
    const [error, setError] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.topicName = topic_name;
        } catch (error) {
            console.log(error);
            setTopic_name('');
            setError(true);
            setTimeout(()=>{
                setError(false);
            }, 5000);
        }
        
    },[topic_name])

    const activateHint = (value) => {
        setTopic_name(value);
    };

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>1/9</p>
            <h1>Как назвать задачу?</h1>
        </div>
        <div className='createTopic-phase-inputs'>
            <InputWithError placeholder={"Сантехника"} value={topic_name} setValue={setTopic_name} error={error}></InputWithError>
            <div className="button-hints">
                <button className="hint" onClick={() => activateHint("Сантехника")}>
                Сантехник
                </button>
                <button className="hint" onClick={() => activateHint("Ремонт")}>
                Ремонт
                </button>
                <button className="hint" onClick={() => activateHint("Срочно")}>
                Срочно
                </button>
                <button className="hint" onClick={() => activateHint("Дистанционно")}>
                Дистанционно
                </button>
            </div>
        </div>
    </div>)
}

export default TopicEnter;