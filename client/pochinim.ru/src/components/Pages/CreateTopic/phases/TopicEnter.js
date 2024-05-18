import { useEffect, useState } from 'react';
import InputWithError from '../../../../animations/input-error-field';
import  Select from 'react-select';

const TopicEnter = ({TOPIC}) => {
    const [topic_name, setTopic_name] = useState(TOPIC.topicName);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.topicName = topic_name;
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
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
            <div style={{display: 'flex', gap: '10px', alignItems: 'baseline'}}>
            <InputWithError placeholder={"Сантехника"} value={topic_name} setValue={setTopic_name} 
                error={error} setError={setError} errorText={'Не верное значение'}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
            <Select options={TOPIC.assistenceHints}
                onChange={e => sessionStorage.setItem('create_topic_theme', JSON.stringify(e.value))}
                placeholder={
                    sessionStorage.getItem('create_topic_theme')?
                    JSON.parse(sessionStorage.getItem('create_topic_theme'))?.topic
                    :'Выбирите категорию'
                }
                styles={{
                    control: (base) => ({
                        ...base,
                        marginTop: '20px',
                        width: '220px',
                        borderRadius: '20px'
                    }),
                }}>
            </Select>
            </div>
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