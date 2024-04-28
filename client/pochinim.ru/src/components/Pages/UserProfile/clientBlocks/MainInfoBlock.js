import { Fragment, useEffect, useState } from "react";
import defaultPhoto from '../../../../img/default-user-img.png';

const MainInfoBlock = ({photo_path, name, registration_date}) =>{

    const [photo, setPhoto] = useState(defaultPhoto);
    const [passportConf, setPassportConf] = useState({'icon': null, 'text': null });

    useEffect(() => {
        async function setData(photo_path){
            //setPhoto();
            //setPassportConf()
        }
        setData(photo_path);
    }, [])

    return(<Fragment>
        <div className="phases-wrapper">
            <div className="main-info-block">
                <div className="round-profile-photo" onClick={() => document.querySelector('.round-photo-input').click()}>
                    <img src={photo} alt=""></img>
                    <input type='file' hidden accept=".jpg,.jpeg,.png" className="round-photo-input" 
                        onChange={e => {console.log(e.target.files[0]);}}></input>
                </div>
                <div>
                    <h1>{name}</h1>
                    <p>{registration_date }</p>
                </div>
            </div>
            <div className="main-info-documents-block">
                <img src={passportConf.icon}></img>
                <p>{passportConf.text}</p>
            </div>
        </div>
    </Fragment>);
}

export default MainInfoBlock;