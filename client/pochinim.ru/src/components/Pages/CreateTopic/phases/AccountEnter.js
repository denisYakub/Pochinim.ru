import { useState } from "react";

const AccountEnter = ({TOPIC, hide, setHide}) => {

    const inputRadioCheck = (e) => {
        
    }

    const click = async () =>{
        setHide(true);
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
            <></>
        :
            <button className="continue-button" onClick={click}>Опубликовать задание</button>
        }
        <div className="options-input" onChange={e => inputRadioCheck(e.target)}>
            <div>
                <input type='checkbox' name="check" hidden={hide}></input>
                <p hidden={hide}>Опубликовать задание также на форуме</p>
            </div>
        </div>
    </div>)
}

export default AccountEnter;