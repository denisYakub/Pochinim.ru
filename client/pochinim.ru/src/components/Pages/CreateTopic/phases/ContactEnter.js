import { Fragment, useEffect, useState } from 'react';
import InputWithError from '../../../../animations/input-error-field';

const ContactEnter = ({TOPIC}) => {
    const [fio, setFio] = useState(TOPIC.fio);
    const [phoneNumber, setPhoneNumber] = useState(TOPIC.phoneNumber);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    useEffect(()=>{
        try {
            TOPIC.fio = fio;
            TOPIC.phoneNumber = phoneNumber;
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'телефон должен иметь ввид: +79*********'){
                setError(true);
            }else if(error.message){
                setError(true);
            }
        }
    }, [fio, phoneNumber])
    return(<Fragment>
        <div className="createTopic-phase">
            <div className='createTopic-phase-annotation'>
                <p>2/9</p>
                <h1>Контактная информация</h1>
            </div>
            <div className="createTopic-phase-inputs">
            <InputWithError placeholder={"Имя Фамилия"} value={fio} setValue={setFio} 
                error={error} setError={setError} errorText={'Не верное значение'}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
            <InputWithError placeholder={"+7-000-000-00-00"} value={phoneNumber} setValue={setPhoneNumber} 
                error={error} setError={setError} errorText={'Не верное значение'}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
            </div>
        </div>

    </Fragment>)
}

export default ContactEnter;