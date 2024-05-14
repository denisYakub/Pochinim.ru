import { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const PersonalDataBlock = ({MASTER}) => {
    return (<Fragment>
        <div className="phases-wrapper">
            <h1 className="outline-h">Личные данные</h1>
            <div className="editable-block"> 
                <div className='edit-wrapper-button'>
                    <p>Имя</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => {}}></div>}
                </div>
                <p>{MASTER.fio?.split(',')[0]}</p>
            </div>
            <div className="editable-block">
                <div className='edit-wrapper-button'>
                    <p>Фамилия</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => {}}></div>}
                </div>
                <p>{MASTER.fio?.split(',')[1]}</p>
            </div>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Электронная почта</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => {}}></div>}
                </div>
                <p>{MASTER.email}</p>
            </div>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Номер телефона</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => {}}></div>}
                </div>
                <p>{MASTER.phone_number}</p>
            </div>
        </div>
    </Fragment>);

}

export default PersonalDataBlock;