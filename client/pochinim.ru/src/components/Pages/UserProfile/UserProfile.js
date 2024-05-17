import { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import USERController from '../../../controllers/USER-controller';
import MainInfoBlock from './clientBlocks/MainInfoBlock';
import PersonalDataBlock from './clientBlocks/PersonalDataBlock';
import NotificationsBlock from './clientBlocks/NotificationsBlock';
import LinkedSocialsBlock from './clientBlocks/LinkedSocialsBlock';
import AccountSecurityBlock from './clientBlocks/AccountSecurityBlock';
import ProfileActionsBlock from './clientBlocks/ProfileActionsBlock';
import './UserProfile.css';

const UserProfile = () => {

    const [user, setUser] = useState({});
    const [reload, setReload] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function setData(){
            setUser(await USERController.getUserInfo(localStorage.getItem('id')));
        }
        if(reload){
            setData();
            setReload(false);
        }
    },[navigate, reload, user]);

    return(<Fragment>
            <div className="user-profile">
                <div className='profile-wrapper'>
                    <div className="user-profile-navigation">
                        <div className='navigation-profile-wrapper'>
                            <button className='button-grey'>Личные данные</button>
                            <button className='button-grey'>Уведомления</button>
                            <button className='button-grey'>Привязанные соц сети</button>
                            <button className='button-grey'>Безопасность аккаунта</button>
                            <button className='button-grey'>Действия с профилем</button>
                        </div>
                    </div>
                    <div className='profile-info'>
                        <MainInfoBlock photo_path={user?.photo_path} name={user?.account_name} 
                                            registration_date={user?.registration_date} 
                                            passportConf={user?.passport_verification}></MainInfoBlock>
                        <PersonalDataBlock id={user?.id_account} name={user?.account_name} gender={user?.gender} 
                                            email={user?.account_email} phone_number={user?.phone_number}
                                            setReloadPage={setReload}></PersonalDataBlock>
                        <NotificationsBlock notification_option={user?.notification_option}></NotificationsBlock>
                        <LinkedSocialsBlock socials={user?.socials}></LinkedSocialsBlock>
                        <AccountSecurityBlock></AccountSecurityBlock>
                        <ProfileActionsBlock></ProfileActionsBlock>
                    </div>
                </div>
            </div>
        </Fragment>);
};

export default UserProfile;