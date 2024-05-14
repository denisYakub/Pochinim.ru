import { Fragment } from "react"
import { useState } from 'react';
import EditPopup from '../../../Popups/EditPopup/EditPopup';
import { useParams } from "react-router-dom";

const AboutMeBlock = ({MASTER, setReloadPage}) => {

    const [active, setActive] = useState(false);

    const update = () =>{
        setActive(true);
    } 

    return(<Fragment>
        <div className="phases-wrapper">
            <h1 className="outline-h">О себе</h1>
            <div className="editable-block"> 
                <div className='edit-wrapper-button'>
                    <p>Изменить</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => update()}></div>}
                </div>
                <p>{MASTER.aboutMe}</p>
            </div>
        </div>
        <EditPopup active={active} setActive={setActive} 
            name={'Обо мне'} 
            updateFunction={MASTER.updateMasterField}
            fieldToUpdate={'about_me'} value={MASTER.aboutMe} 
            setReloadPage={setReloadPage}></EditPopup>
    </Fragment>)
}

export default AboutMeBlock;