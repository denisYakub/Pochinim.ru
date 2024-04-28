import InputWithError from '../../../../animations/input-error-field';

const TopicEnter = ({topic, setTopic, error}) => {
    const activateHint = (value) => {
        setTopic(value);
    };

    return(<div className="blockPhase">
        <h1>
            Как назвать задачу?
        </h1>
        <div className="create-topic-input-size">
            <InputWithError placeholder={"Сантехника"} value={topic} setValue={setTopic} error={error}></InputWithError>
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
    </div>)
}

export default TopicEnter;