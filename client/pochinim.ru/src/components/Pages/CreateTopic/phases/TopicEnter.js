import InputWithError from '../../../../animations/input-error-field';

const TopicEnter = ({topic, setTopic, error}) => {
    const activateHint = (value) => {
        setTopic(value);
    };

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>1/9</p>
            <h1>Как назвать задачу?</h1>
        </div>
        <div className='createTopic-phase-inputs'>
            <InputWithError placeholder={"Сантехника"} value={topic} setValue={setTopic} error={error}></InputWithError>
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