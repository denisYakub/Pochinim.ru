import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useBeforeUnload, useBlocker, useLocation, useNavigate } from "react-router-dom";
import OrderFullInfoForMaster from "./OrderFullInfoForMaster";
import './MasterOrdersSearch.css';
import BlankImg from '../../../img/blank-img.png';
import {contextMaster} from '../../../contexts/contextMaster';
import {contextChats} from '../../../contexts/contextChats';

const NewOrderForMaster = () => {

    const data = useLocation()

    const navigate = useNavigate();

    const MASTER = useContext(contextMaster);
    const CHATS = useContext(contextChats);

    const [hide, setHide] = useState(false);

    const openChats = async () => {
        if(data.state.chat.status.includes('свободно')){
            CHATS.idCompanion = data.state.chat.id_user
            CHATS.idTopic = data.state.TOPIC.id_topic
            CHATS.idChat = data.state.chat.id_chat;
            navigate(`Chats/${data.state.chat.id_user}`)
        }
    }   

    useEffect(() => {
        const id = sessionStorage.getItem(`respond-${localStorage.getItem('id-master')}`)

        if(id == data.state.TOPIC.id_topic){
            setHide(true);
        }
    }, [hide])

    return(<Fragment>
        <div className="page-wrapper">
            <div className="new-order-for-master-content">
                <OrderFullInfoForMaster order={data.state.TOPIC} photos={data.state.imgs}></OrderFullInfoForMaster>
                {data.state.chat?
                    <div className="phases-wrapper" onClick={() => openChats()}>
                        {data.state.chat.status.includes('свободно')?
                            <div style={{opacity: '1'}}>
                                <h1>Чат с клиентом</h1>
                                <p>{data.state.chat.text_of_last_message}</p>
                            </div>
                        :
                            <div style={{opacity: '0.7'}}>
                                <h1>Чат с клиентом</h1>
                                <p>{data.state.chat.text_of_last_message}</p>
                                <p>Пока клиент определился с мастером, возможно к вам еще вернеться</p>
                            </div>}
                    </div>
                :
                    <div className="new-order-for-master-buttons">
                        <div className="phases-wrapper">
                            {hide?
                                <h1 style={{width: '300px'}}>Сегодня вы уже отправляли запрос</h1>
                            :
                                <button className="button-grey" style={{width: '300px'}} onClick={() => {
                                    MASTER.responseOrder(data.state.TOPIC.id_topic, data.state.TOPIC.id_account); 
                                    setHide(true);
                                    sessionStorage.setItem(`respond-${localStorage.getItem('id-master')}`, data.state.TOPIC.id_topic);
                                }}>Откликнуться</button>
                            }
                        </div>
                        <div className="phases-wrapper">
                            <div className="new-order-for-master-info-doc">
                                <img src={BlankImg} alt=""></img>
                                <h1>Пройдите проверку документов</h1>
                                <p>Откликнуться можно только после проверки паспорта.</p>
                                <button className="go-next-button" style={{width: '300px'}}>Пройти проверку</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </Fragment>);
}

export default NewOrderForMaster;