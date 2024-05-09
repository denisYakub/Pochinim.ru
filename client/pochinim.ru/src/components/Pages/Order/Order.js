import { Fragment, useEffect, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { contextOrder } from '../../../contexts/contextOrder';
import ListOfMasters from "../CreateTopic/ListOfMasters";
import OrderInfo from "./OrderInfo";
import AlertPopup from '../../Popups/AlarmPopup/AlarmPopup';
import './Order.css';
import { contextChats } from "../../../contexts/contextChats";
import Chat from '../Chats/Chat';
import topicController from "../../../controllers/TOPIC-controller";

const Order = () =>{

    const navigate = useNavigate();

    const params = useParams();

    const id_topic = params.id;
    const email = params.email;

    const { order, setOrder } = useContext(contextOrder);

    const [active, setActive] = useState(false);
    const [textPop, setTextPop] = useState("Войдите или зарегестрируйтесь, чтоб создавать темы");
    const [photos, setPhotos] = useState([]);
    const [review, setReview] = useState([{}, {}]);

    const CHATS = useContext(contextChats);
    const [chats, setChats] = useState(CHATS.chats);

    const comps = [<OrderInfo order={order} photos={photos}></OrderInfo>,
                    <ListOfMasters topic={order?.topic_name}
                                    setActivePop={setActive} setTextPop={setTextPop}
                                    idTopic={id_topic}></ListOfMasters>,
                    <Chat></Chat>];

    const [id, setId] = useState(0);
    
    const [tf, setTf] = useState(true);

    useEffect(() => {
        async function setData(){
            await CHATS.downloadChatsOfTopic(id_topic);
            setChats(CHATS.chats);
            if(tf){
                setPhotos(await topicController.getPhotosByIdTopic(id_topic));
            }
        }
        
        setData();
        setTf(false);
    }, [chats])

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
                            {chats?.map((val, ind) => {
                                return(<div key={ind} className="message-wrapper" 
                                    onClick={() => {setId(2);CHATS.idCompanion = val?.id_master;CHATS.idChat = val?.id_chat}}>
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
            :navigate(`/MyOrders/${email}`)};
        </div>
        <AlertPopup active={active} setActive={setActive} children={textPop}></AlertPopup>
    </Fragment>)
}

export default Order;