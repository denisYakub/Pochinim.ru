import InputDateWithError from '../../../../animations/input-error-date';

const DateEnter = ({date, setDate, error}) => {
    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>7/9</p>
            <h1>Когда нужна услуга?</h1>
        </div>
        <InputDateWithError value={date} setValue={setDate} error={error}></InputDateWithError>
    </div>)
}

export default DateEnter;