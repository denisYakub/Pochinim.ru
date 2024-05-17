import { Fragment, useEffect, useState } from "react";
import masterController from "../../../controllers/MASTER-controller";

const ChatPreview = ({value, onClick}) => {

    const [photo, setPhoto] = useState(null);

    const [master, setMaster] = useState({});
    
    useEffect(() => {
        async function setData(){
            setMaster(await masterController.getWholeInfById(value.id_master));
            console.log(master);
            setPhoto(await masterController.getMasterPhotoByPath(master.master_photo_path));
        }

        if(photo == null){
            setData();
            console.log(photo);
        }
    })

    return(<Fragment>
        <div className="message-wrapper" 
            onClick={() => onClick(value, master)}>
            <img src={photo} alt=""></img>
            <div> 
                <h1>{master.fio?.split(',')[0]}</h1>
                <p>{value.text_of_last_message}</p>
            </div>
        </div>
    </Fragment>);
}

export default ChatPreview;