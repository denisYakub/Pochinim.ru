import { Fragment, useState, useEffect } from "react";
import X from '../../../../img/x.png';
import Y from '../../../../img/verification-status-green-img.png';
import { useNavigate } from "react-router-dom";
import defaultPhoto from '../../../../img/default-user-img.png';

const MainInfoBlock = ({MASTER}) => {
    
    const navigate = useNavigate();

    const [photo, setPhoto] = useState(defaultPhoto);

    const upDatePhoto = async(value) => {
        setPhoto(URL.createObjectURL(value));
        //await userController.saveUserPhoto(value);
    }

    useEffect(() => {
        setPhoto(MASTER.photo);
    })

    return (<Fragment>
        <div className="phases-wrapper">
            <div className="main-info-block">
                <div className="round-profile-photo" onClick={() => document.querySelector('.round-photo-input').click()}>
                    <img src={photo} alt=""></img>
                    <input type='file' hidden accept=".jpg,.jpeg,.png" className="round-photo-input" 
                        onChange={e => upDatePhoto(e.target.files[0])}></input>
                </div>
                <div className="main-info-name-date">
                    <h1>{MASTER.fio?.replace(',', ' ').replace(',', ' ')}</h1>
                    <p>{MASTER.registration_date?.split('T')[0]}</p>
                </div>
            </div>
            <div className="main-info-documents">
                {MASTER.documents?
                    <div className="main-info-documents-block">
                        <img src={Y} alt=""></img>
                        <p>Паспортные данные подтверждены</p>
                    </div>
                :
                    <div className="main-info-documents-block" onClick={() => {navigate(`documentVerification/passport`)}}>
                        <img src={X} alt=""></img>
                        <p>Паспортные данные не подтверждены</p>
                    </div>
                }
                {MASTER.documents?
                    <div className="main-info-documents-block">
                        <img src={Y} alt=""></img>
                        <p>ИП поддтержден</p>
                    </div>
                :
                    <div className="main-info-documents-block" onClick={() => {navigate(`documentVerification/ip`)}}>
                        <img src={X} alt=""></img>
                        <p>ИП не поддтержден</p>
                    </div>
                }
            </div>
        </div>
    </Fragment>);
}

export default MainInfoBlock;