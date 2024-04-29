import { Fragment, useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { contextOrder } from '../../../contexts/contextOrder';
import ListOfMasters from "../CreateTopic/ListOfMasters";
import OrderInfo from "./OrderInfo";
import AlertPopup from '../../Popups/AlarmPopup/AlarmPopup';
import masterController from '../../../controllers/MASTER-controller';
import './Order.css';

const Order = () =>{

    const params = useParams();

    const pev_page = `${params.pev_page}/${params.who}`;

    const id_topic = params.id;

    const { order, setOrder } = useContext(contextOrder);

    const [active, setActive] = useState(false);
    const [textPop, setTextPop] = useState("Войдите или зарегестрируйтесь, чтоб создавать темы");

    const [listOfMasters, setListOfMasters] = useState([]);
    const [chats, setChats] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [review, setReview] = useState([{}, {}]);

    const comps = [<OrderInfo order={order}></OrderInfo>,
                    <ListOfMasters listOfMasters={listOfMasters} topic={order?.topic_name}
                                    setActivePop={setActive} setTextPop={setTextPop}
                                    canSendMessage={true}></ListOfMasters>];

    const [id, setId] = useState(0);                              

    useEffect(() => {
        async function setData(){
            setListOfMasters(await masterController.getListOfMasters(0, 30));
            //setChats();
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
    }

    return(<Fragment>
        <div className="page-wrapper">
            {order?.status == 'активен'?
                <div className="order-content">
                    <div>
                        <div className='navigation-profile-wrapper'>
                            <button className='button-grey' onClick={masters}>Специалисты</button>
                            <button className='button-grey'>Помощь</button>
                        </div>
                        <div className="order-chats">
                            {chats.map((val, ind) => {
                                return(<div key={ind}>

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