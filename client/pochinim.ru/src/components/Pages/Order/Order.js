import { Fragment, useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { contextOrder } from '../../../contexts/contextOrder';
import ListOfMasters from "../CreateTopic/ListOfMasters";
import OrderInfo from "./OrderInfo";
import AlertPopup from '../../Popups/AlarmPopup/AlarmPopup';
import masterController from '../../../controllers/MASTER-controller';
import './Order.css';
import { contextChats } from "../../../contexts/contextChats";
import chatController from "../../../controllers/Chat-controller";
import Chat from '../Chats/Chat';

const Order = () =>{

    const params = useParams();

    const pev_page = `${params.pev_page}/${params.who}`;

    const id_topic = params.id;

    const { order, setOrder } = useContext(contextOrder);

    const [active, setActive] = useState(false);
    const [textPop, setTextPop] = useState("Войдите или зарегестрируйтесь, чтоб создавать темы");

    const [listOfMasters, setListOfMasters] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [review, setReview] = useState([{}, {}]);
    const [idCompanion, setIdCompanion] = useState(null);

    const {chats, setChats} = useContext(contextChats);

    const comps = [<OrderInfo order={order}></OrderInfo>,
                    <ListOfMasters listOfMasters={listOfMasters} topic={order?.topic_name}
                                    setActivePop={setActive} setTextPop={setTextPop}
                                    topicId={true}></ListOfMasters>,
                    <Chat idCompanion={idCompanion} idTopic={id_topic}></Chat>];

    const [id, setId] = useState(0);                              

    useEffect(() => {
        async function setData(){
            setListOfMasters(await masterController.getListOfMasters(0, 30));
            setChats(await chatController.getChatsUserByIdTopic(id_topic));
            //setPhotos();
            //setReview();
        }
        
        setData();
    }, [])

    const masters = () => {
        if(id == 0){
            setId(1);
        }
        if(id == 1){
            setId(0);
        }
        if(id == 2){
            setId(0);
        }
    }

    return(<Fragment>
        <div className="page-wrapper">
            {order?.status == 'активен'?
                <div className="order-content">
                    <div className="order-navigation">
                        <div className='navigation-profile-wrapper'>
                            <button className='button-grey' onClick={masters}>Специалисты</button>
                            <button className='button-grey'>Помощь</button>
                        </div>
                        <div className="messages-wrapper">
                            {console.log(chats)}
                            {chats?.map((val, ind) => {
                                return(<div key={ind} className="message-wrapper" onClick={() => {setId(2);setIdCompanion(val?.id_master)}}>
                                    <img src={val?.photo} alt=""></img>
                                    <div> 
                                        <h1>{val?.id_master}</h1>
                                        <p>{val?.text_of_last_message}</p>
                                    </div>
                                </div>);
                            })}
                        </div>
                    </div>
                    {comps[id]}
                </div>
            :order?.status == 'отменен'?
                <div className="order-content">
                    {comps[id]}
                </div>
                :order?.status == 'завершен'?
                <div className="order-content">
                    {comps[id]}
                    <div className="order-review">
                        {review[0]?.null?
                            <div className="order-review-yours-empty">
                                <p>Ваш отзыв на мастера</p>
                                <p>Нет отзыва</p>
                                <button className="blue-review-button">Оставить отзыв на мастера</button>
                            </div>
                        :       
                            <div className="order-review-yours">
                                <p>{review[0]?.stars}</p>
                                <p>{review[0]?.date}</p>
                                <p>{review[0]?.id_from}</p>
                                <p>{review[0]?.text}</p>
                            </div>}
                        {review[1]?.null?
                            <div className="order-review-masters-empty">
                                <p>Отзыв мастера на Вас</p>
                                <p>Нет отзыва</p>
                            </div>
                        :
                            <div className="order-review-masters">
                                <p>{review[1]?.stars}</p>
                                <p>{review[0]?.date}</p>
                                <p>{review[0]?.id_from}</p>
                                <p>{review[0]?.text}</p>
                            </div>}
                    </div>
                </div>
            :<></>}
        </div>
        <AlertPopup active={active} setActive={setActive} children={textPop}></AlertPopup>
    </Fragment>)
}

export default Order;