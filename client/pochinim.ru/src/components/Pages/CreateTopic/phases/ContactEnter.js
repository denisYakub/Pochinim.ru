import InputWithError from '../../../../animations/input-error-field';

const ContactEnter = ({FIO, setFIO, phoneNumber, setphoneNumber, error}) => {
    return(<div className="blockPhase">
        <h1>
            Контактная информация
        </h1>
        <div className="contact">
            <div style={{width: "500px"}}>
                <InputWithError placeholder={"Имя Фамилия"} value={FIO} setValue={setFIO} error={error}></InputWithError>
            </div>
            <div style={{width: "500px"}}>
                <InputWithError placeholder={"+7-000-000-00-00"} value={phoneNumber} setValue={setphoneNumber} error={error}></InputWithError>
            </div>
        </div>
    </div>)
}

export default ContactEnter;