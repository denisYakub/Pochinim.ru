import { Fragment, useEffect, useState } from "react";
import EditPopup from '../../../Popups/EditPopup/EditPopup';
import userController from '../../../../controllers/USER-controller';

const PersonalDataBlock = ({id, name, gender, email, phone_number, setReloadPage}) =>{

    const [active, setActive] = useState(false);
    const [text, setText] = useState("");
    const [field, setField] = useState("");
    const [children, setChildren] = useState(<></>); 

    const update = (head, field, currentValue) =>{
        setChildren(<div className='children-popup'>
            <h1 className="edit-popup-h">{head}</h1>
            <input className="edit-popup-input" placeholder={currentValue} onChange={e => setText(e.target.value)}></input>
        </div>);
        if(field == 'account_email'){
            
        }
        setField(field);
        setActive(true);
    }

    return(<Fragment>
        <div className="phases-wrapper">
            <h1 className="outline-h">Личные данные</h1>
            <div className="editable-block"> 
                <div className='edit-wrapper-button'>
                    <p>Имя</p>
                    <div className='edit-button' onClick={() => update('Имя', 'account_name', name)}></div>
                </div>
                <p>{name}</p>
            </div>
            <div className="editable-block">
                <div className='edit-wrapper-button'>
                    <p>Пол</p>
                    <div className='edit-button' onClick={() => update('Пол', 'gender', gender)}></div>
                </div>
                <p>{gender}</p>
            </div>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Электронная почта</p>
                    <div className='edit-button' onClick={() => update('Электронная почта', 'account_email', email)}></div>
                </div>
                <p>{email}</p>
            </div>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Номер телефона</p>
                    <div className='edit-button' onClick={() => update('Номер телефона', 'phone_number', phone_number)}></div>
                </div>
                <p>{phone_number}</p>
            </div>
        </div>
        <EditPopup active={active} setActive={setActive} 
        children={children} updateFunction={userController.updateUserField}
        fieldToUpdate={field} newValue={text} idUser={id} setReloadPage={setReloadPage}></EditPopup>
    </Fragment>);
}

export default PersonalDataBlock;