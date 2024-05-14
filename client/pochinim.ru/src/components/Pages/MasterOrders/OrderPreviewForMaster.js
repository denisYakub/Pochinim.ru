import { Fragment, useEffect, useState } from "react";
import './MasterOrdersSearch.css';
import topicController from "../../../controllers/TOPIC-controller";
import Clock from '../../../img/clock-img.png';
import { useNavigate } from "react-router-dom";

const OrderPreviewForMaster = ({TOPIC}) => {

    const [imgs, setImgs] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        async function setData(){
            setImgs(await topicController.getPhotosByIdTopic(TOPIC.id_topic))
        }

        if(imgs.length == 0){
            setData()
        }
    },[imgs])

    return(<Fragment>
        <div className='master-order-preview-content' onClick={() => {navigate(`NewOrder/${TOPIC.id_topic}`, {state: {TOPIC, imgs}});}}>
            <div className="master-order-preview-info">
                <div className="master-order-preview-info-text">
                    <h1>{TOPIC.topic_name}</h1>
                    <p>{TOPIC.details}</p>
                </div>
                <div className="master-order-preview-info-date-adress">
                    <div>
                        <img src={Clock} alt=""></img>
                        <data>{TOPIC.date?.split('T')[0]}</data>
                    </div>
                    <div className="button-hints">
                        <button>{TOPIC.address}</button>
                    </div>
                </div>
            </div>
            <div className="master-order-preview-imgs">
                {imgs?.map((value, index) => {
                    return(<img key={index} src={value} alt="" 
                                className={`master-order-preview-img-${index>3?'3':index}`}>
                            </img>);
                })}
            </div>
        </div>
    </Fragment>);
}

export default OrderPreviewForMaster;