import { Fragment, useEffect, useState } from 'react';
import InputWithError from '../../../../animations/input-error-field';

const ContactEnter = ({TOPIC}) => {
    const [fio, setFio] = useState(TOPIC.fio);
    const [phoneNumber, setPhoneNumber] = useState(TOPIC.phoneNumber);
    const [error, setError] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.fio = fio;
            TOPIC.phoneNumber = phoneNumber;
        } catch (error) {
            console.log(error);
            setFio('');
            setPhoneNumber('');
            setError(true);
            setTimeout(()=>{
                setError(false);
            }, 5000);
        }
    }, [fio, phoneNumber])
    return(<Fragment>
        <div className="createTopic-phase">
            <div className='createTopic-phase-annotation'>
                <p>2/9</p>
                <h1>Контактная информация</h1>
            </div>
            <div className="createTopic-phase-inputs">
                <InputWithError placeholder={"Имя Фамилия"} value={fio} setValue={setFio} error={error}></InputWithError>
                <InputWithError placeholder={"+7-000-000-00-00"} value={phoneNumber} setValue={setPhoneNumber} error={error}></InputWithError>
            </div>
        </div>

    </Fragment>)
}

export default ContactEnter;