import { Fragment, useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { contextOrder } from '../../../contexts/contextOrder';
import ListOfMasters from "../CreateTopic/ListOfMasters";
import OrderInfo from "./OrderInfo";
import AlertPopup from '../../Popups/AlarmPopup/AlarmPopup';
import masterController from '../../../controllers/MASTER-controller';
import './Order.css';

const Order = () =>{

    const params = useParams;

    const pev_page = `${params.pev_page}/${params.who}`;

    const id_topic = params.id;

    const { order, setOrder } = useContext(contextOrder);

    const [active, setActive] = useState(false);
    const [textPop, setTextPop] = useState("Войдите или зарегестрируйтесь, чтоб создавать темы");

    const [listOfMasters, setListOfMasters] = useState([]);

    const comps = [<OrderInfo order={order}></OrderInfo>,
                    <ListOfMasters listOfMasters={listOfMasters} topic={order?.topic_name}
                                    setActivePop={setActive} setTextPop={setTextPop}
                                    canSendMessage={true}></ListOfMasters>];

    const [id, setId] = useState(0);                              

    useEffect(() => {
        console.log(order);
        async function setData(){
            setListOfMasters(await masterController.getListOfMasters(0, 30));
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
                            <p>чаты</p>
                        </div>
                    </div>
                    {comps[id]}
                </div>
                :order?.status == 'отменен'?
                <div className="order-content">
                    <div className="phases-wrapper">
                        <div className="order-head">
                            <h1>{order?.topic_name}</h1>
                            <button>{order?.status}</button>
                        </div>
                    </div>
                </div>
                :order?.status == 'завершен'?
                <div className="order-content">
                    <div className="phases-wrapper">
                        <div className="order-head">
                            <h1>{order?.topic_name}</h1>
                            <button>{order?.status}</button>
                        </div>
                    </div>
                    <div className="order-review">
                        <p>оставить отзыв</p>
                    </div>
                </div>
            :<></>}
        </div>
        <AlertPopup active={active} setActive={setActive} children={textPop}></AlertPopup>
    </Fragment>)
}

export default Order;