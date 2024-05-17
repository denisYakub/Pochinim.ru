import { Fragment, useEffect, useState } from "react"
import masterController from '../../../controllers/MASTER-controller';
import userController from "../../../controllers/USER-controller";

const ChaPreviewDinamic = ({value, opacity, onClick, idCompanion}) => {

    const [photo, setPhoto] = useState(null);
    const [master, setMaster] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        async function setData(){
            if(idCompanion == value.id_master){
                setUser(await userController.getUserInfo(value.id_user));
                setPhoto(await userController.getUserPhoto(user.photo_path));
            }else{
                setMaster(await masterController.getWholeInfById(value.id_master));
                setPhoto(await masterController.getMasterPhotoByPath(master.master_photo_path));
            }
        }

        if(photo == null){
            setData();
        }
    }, [photo])

    return(<Fragment>
        <div className="message-wrapper"
            style={{opacity: opacity}}
            onClick={() => onClick()}>
                <img src={photo} alt=""></img>
                <div>
                    <h1>{idCompanion==value.id_master?value.id_master:value.id_user}</h1>
                    <p>{value?.text_of_last_message}</p>
                </div>
        </div>
    </Fragment>)
}

export default ChaPreviewDinamic;