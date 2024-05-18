import { Fragment, useEffect, useState } from "react"
import masterController from '../../../controllers/MASTER-controller';
import userController from "../../../controllers/USER-controller";
import defaultPhoto from '../../../img/default-user-img.png';

const ChatPreviewDinamic = ({chat, opacity, id_user, onClick}) => {

    const [photo, setPhoto] = useState(null);
    const [companion, setCompanion] = useState({});

    useEffect(() => {
        async function setData(){
            if(id_user == chat.id_user){
                setCompanion(await masterController.getWholeInfById(chat.id_master));
                if(companion.master_photo_path == null){
                    setPhoto(defaultPhoto);
                }else{
                    setPhoto(await masterController.getMasterPhotoByPath(companion.master_photo_path));
                }
            }else{
                setCompanion(await userController.getUserInfo(chat.id_user))
                if(companion.photo_path == null){
                    setPhoto(defaultPhoto);
                }else{
                    setPhoto(await userController.getUserPhoto(companion.photo_path));
                }
            }
        }

        setData();
    }, [photo])

    return(<Fragment>
        <div className="message-wrapper"
            style={{opacity: opacity}}
            onClick={() => onClick(photo, companion, chat.id_chat)}>
                <img src={photo} alt=''></img>
                <div>
                    <h1>{companion.fio}{companion.account_name}</h1>
                    <p>{chat.text_of_last_message}</p>
                </div>
        </div>
    </Fragment>)
}

export default ChatPreviewDinamic;