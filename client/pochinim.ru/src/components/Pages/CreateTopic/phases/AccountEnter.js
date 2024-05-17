import { useState } from "react";
import Popup from '../../../Popups/AlarmPopup/AlarmPopup';

const AccountEnter = ({TOPIC, hide, setHide}) => {

    const [active, setActive] = useState(false);

    const inputRadioCheck = (e) => {
        
    }

    const click = async () =>{
        try {
            TOPIC.topicId = await TOPIC.saveTopic();
            setHide(true);
        } catch (error) {
            if(error.message == 'пустое значение'){
                setActive(true);
            }
        }
        TOPIC.topicId = await TOPIC.saveTopic();
    }

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>Авторизация</p>
            <h1>{hide?'Тема создана':'Выберете аккаунт для создания темы:'}</h1>
        </div>
        <div className="createTopic-accounts-to-choose">
            <div className="list-of-accounts">
                <button className="acount-info">
                    {localStorage.getItem("mail")}
                </button>
                <button className="add-account"></button>
            </div>
            <a href="">Зарегистрировать новый </a>
        </div>
        {hide?
            null
        :
            <button className="continue-button" onClick={click}>Опубликовать задание</button>
        }
        <div className="options-input" onChange={e => inputRadioCheck(e.target)} style={{opacity: '0.5'}}>
            <div className="option">
                <input type='checkbox' name="check" hidden={hide}></input>
                <p hidden={hide}>Опубликовать задание также на форуме</p>
            </div>
        </div>
        <Popup active={active} setActive={setActive} children={'Вы не заполнили все поля'}></Popup>
    </div>)
}

export default AccountEnter;