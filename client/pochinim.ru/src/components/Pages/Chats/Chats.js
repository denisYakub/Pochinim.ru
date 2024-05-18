import { Fragment, createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import './Chats.css';
import { contextChats } from "../../../contexts/contextChats";
import DotsImg from '../../../img/3-bots-img.png';
import ChatPreviewDinamic from "./ChatPreviewDinamic";
import defaultPhoto from '../../../img/default-user-img.png';
import masterController from '../../../controllers/MASTER-controller';
import userController from "../../../controllers/USER-controller";

const Chats = () => {

    const params = useParams();

    const email = useLocation();

    const CHATS = useContext(contextChats);
    const [chats, setChats] = useState(null);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const [photo, setPhoto] = useState(null);
    const [companion, setCompanion] = useState(CHATS.companionInfo);

    useEffect(() => {
        async function getData(){
            await CHATS.downloadChatsOfTopic(CHATS.idTopic, email.state.email)
            setChats(CHATS.chats);

            await CHATS.downloadMessagesOfChat();
            setMessages(CHATS.messages);
        }

        async function getData2(){
            if(companion.master_photo_path == null && companion.photo_path == undefined 
                        || companion.master_photo_path == undefined && companion.photo_path == null){
                setPhoto(defaultPhoto);
            } else if(companion.photo_path == null){
                setPhoto(await masterController.getMasterPhotoByPath(companion.master_photo_path));
            }else if(companion.master_photo_path == null){
                setPhoto(await userController.getUserPhoto(companion.photo_path));
            }
        }

        sessionStorage.clear();
        
        getData();

        if(photo == null){
            getData2();
        }
    })

    const enter = async () => {
        CHATS.sendMessage(message, params.email);
        setMessage('');
    }

    const onClick = async (photo, companion, id_chat) => {
        CHATS.idChat = id_chat;
        setPhoto(photo);
        setCompanion(companion);
    }

    return(<Fragment>
        <div className='page-wrapper'>
            <div className="chats-content">
                <div className="messages-wrapper" style={{width: '333px'}}>
                    {chats?.map((val, ind) => {
                        return(<ChatPreviewDinamic key={ind}
                                    chat={val}
                                    opacity={CHATS.idChat==val.id_chat?'1':'0.7'}
                                    onClick={onClick}
                                    id_user={CHATS.userId}>
                            </ChatPreviewDinamic>)
                    })}
                </div>
                <div className="opened-chat">
                    <div className="chat-head">
                        <div className="chat-head-companion">
                            <img src={photo} alt=""></img>
                            <div>
                                <h1>{companion.account_name}
                                    {companion.fio?.split(',')[0]} {companion.fio?.split(',')[1]?.split(',')[0]}
                                </h1>
                                {companion.fio?
                                    <div className="master-stats">
                                        <div className="master-stat">
                                            <div className="star-icon"></div>
                                            <p>{companion.stars}</p>
                                        </div>
                                        <div className="master-stat">
                                            <div className="review-icon"></div>
                                            <p>{companion.reviewsCount}</p>
                                        </div>
                                    </div>
                                : null}
                            </div>
                        </div>
                        <img src={DotsImg} alt=""></img>
                    </div>
                    <div className="chat-messages">
                    {messages?.map((val, ind) => {
                        if(val?.sender_email == params.email){
                            return(<div key={ind} style={{display: 'flex', justifyContent: 'end'}}>
                                <div className="chat-my-message">
                                    {val?.message.split(' ')?.map((v, i) => {
                                        return(<p>{v}</p>);
                                    })}
                                </div>
                            </div>);
                        }else{
                            return(<div key={ind} className="chat-companion-message">
                                {val?.message.split(' ')?.map((v, i) => {
                                    return(<p>{v}</p>);
                                })}
                            </div>);
                        }
                    })}
                </div>
                <div className="chat-input">
                    <input className="text-input-field" value={message} placeholder="Сообщение" onChange={e => setMessage(e.target.value)}></input>
                    <button className="button-grey" onClick={() => enter()}>отправить</button>
                </div>
                </div>
            </div>
        </div>
    </Fragment>);
}

export default Chats;