import { Fragment } from 'react';
import InputWithError from '../../../../animations/input-error-field';

const ContactEnter = ({FIO, setFIO, phoneNumber, setphoneNumber, error}) => {
    return(<Fragment>
        <div className="createTopic-phase">
            <div className='createTopic-phase-annotation'>
                <p>2/9</p>
                <h1>Контактная информация</h1>
            </div>
            <div className="createTopic-phase-inputs">
                <InputWithError placeholder={"Имя Фамилия"} value={FIO} setValue={setFIO} error={error}></InputWithError>
                <InputWithError placeholder={"+7-000-000-00-00"} value={phoneNumber} setValue={setphoneNumber} error={error}></InputWithError>
            </div>
        </div>

    </Fragment>)
}

export default ContactEnter;