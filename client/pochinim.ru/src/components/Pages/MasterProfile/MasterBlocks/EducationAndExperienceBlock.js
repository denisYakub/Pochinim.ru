import { Fragment, useEffect, useState } from "react";
import EditEducationAndExperiencePopup from "../../../Popups/EditPopup/EditEducationAndExperiencePopup";
import { useParams } from 'react-router-dom';

const EducationAndExperienceBlock = ({MASTER, setReloadPage}) => {

    const [active, setActive] = useState(false);
    const [active1, setActive1] = useState(false);

    const update = () =>{
        setActive(true);
    } 

    const update1 = () =>{
        setActive1(true);
    } 

    useEffect(()=>{
        
    },[])

    return(<Fragment>
        <div className="phases-wrapper">
            <h1 className="outline-h">Образование и опыт</h1>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Образование</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => update()}></div>}
                </div>
                <div className="sercices-prices">
                    {MASTER.education?.map((value, index) => {
                        return(<div key={index}>
                            <p>{value[0]}</p>
                            <p>{value[1]}</p>
                        </div>);
                    })}
                </div>
            </div>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Опыт работы</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => update1()}></div>}
                </div>
                <div className="sercices-prices">
                    {MASTER.experience?.map((value, index) => {
                        return(<div key={index}>
                            <p>{value[0]}</p>
                            <p>{value[1]}</p>
                        </div>);
                    })}
                </div>
            </div>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Достижения и грамоты</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => {}}></div>}
                </div>
                {/*MASTER..map((value, index) => {
                    return(<p key={index}>{value}</p>);
                })*/}
            </div>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Разное</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => {}}></div>}
                </div>
                {/*MASTER..map((value, index) => {
                    return(<p key={index}>{value}</p>);
                })*/}
            </div>
        </div>
        <EditEducationAndExperiencePopup active={active} setActive={setActive}
            updateFunction={MASTER.updateMasterField}
            name={'Образование и год окончания'}
            fieldToUpdate={"education"}
            value={MASTER.education}
            idUser={localStorage.getItem('id-master')} setReloadPage={setReloadPage}></EditEducationAndExperiencePopup>
        <EditEducationAndExperiencePopup active={active1} setActive={setActive1}
            updateFunction={MASTER.updateMasterField}
            name={'Опыт работы и год окончания'}
            fieldToUpdate={"experience"}
            value={MASTER.experience}
            idUser={localStorage.getItem('id-master')} setReloadPage={setReloadPage}></EditEducationAndExperiencePopup>
    </Fragment>);
}

export default EducationAndExperienceBlock;