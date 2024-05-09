import { Fragment, useEffect, useState } from "react";
import defaultPhoto from '../../../../img/default-user-img.png';
import userController from "../../../../controllers/USER-controller";
import X from '../../../../img/x.png';
import Y from '../../../../img/verification-status-green-img.png';
import { useNavigate } from "react-router-dom";

const MainInfoBlock = ({photo_path, name, registration_date, passportConf}) =>{

    const [photo, setPhoto] = useState(defaultPhoto);

    const navigate = useNavigate();

    const upDatePhoto = async(value) => {
        await userController.saveUserPhoto(value);
        setPhoto(URL.createObjectURL(value));
    }

    useEffect(() => {
        async function setData(){
            if(photo_path != null){
                setPhoto(await userController.getUserPhoto(photo_path));
            }
        }

        setData();
    }, [photo_path])

    return(<Fragment>
        <div className="phases-wrapper">
            <div className="main-info-block">
                <div className="round-profile-photo" onClick={() => document.querySelector('.round-photo-input').click()}>
                    <img src={photo} alt=""></img>
                    <input type='file' hidden accept=".jpg,.jpeg,.png" className="round-photo-input" 
                        onChange={e => upDatePhoto(e.target.files[0])}></input>
                </div>
                <div className="main-info-name-date">
                    <h1>{name}</h1>
                    <p>{registration_date?.split('T')[0]}</p>
                </div>
            </div>
            {passportConf?
                <div className="main-info-documents-block">
                    <img src={Y} alt=""></img>
                    <p>Паспортные данные подтверждены</p>
                </div>
            :
                <div className="main-info-documents-block" onClick={() => {navigate(`documentVerification/passport`)}}>
                    <img src={X} alt=""></img>
                    <p>Паспортные данные не подтверждены</p>
                </div>}
        </div>
    </Fragment>);
}

export default MainInfoBlock;