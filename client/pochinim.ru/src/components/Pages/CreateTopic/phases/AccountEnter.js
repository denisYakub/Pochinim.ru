import { useState } from "react";

const AccountEnter = ({setSendApplication, publishOnForum, setPublishOnForum}) => {
    const inputRadioCheck = (e) => {
        if(publishOnForum === false){
            setPublishOnForum(true);
        }else{
            setPublishOnForum(false);
        }
    }

    const [hide, setHide] = useState(false);

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
        <button className="continue-button" onClick={() => {setHide(true);setSendApplication(true)}} hidden={hide}>Опубликовать задание</button>
        <div className="options-input" onChange={e => inputRadioCheck(e.target)}>
            <div>
                <input type='checkbox' name="check" checked={publishOnForum} hidden={hide}></input>
                <p hidden={hide}>Опубликовать задание также на форуме</p>
            </div>
        </div>
    </div>)
}

export default AccountEnter;