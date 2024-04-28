import InputDateWithError from '../../../../animations/input-error-date';

const DateEnter = ({date, setDate, error}) => {
    return(<div className="blockPhase">
        <h1>
            Когда нужна услуга?
        </h1>
        <div className="create-topic-input-date-size">
            <InputDateWithError value={date} setValue={setDate} error={error}></InputDateWithError>
        </div>
    </div>)
}

export default DateEnter;