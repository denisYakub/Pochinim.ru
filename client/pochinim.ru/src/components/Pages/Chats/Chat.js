import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Chats.css';
import { contextChats } from "../../../contexts/contextChats";
import DotsImg from '../../../img/3-bots-img.png';
import masterController from '../../../controllers/MASTER-controller';
import defaultPhoto from '../../../img/default-user-img.png';

const Chats = ({master}) => {

    const params = useParams();

    const CHATS = useContext(contextChats);
    const [messages, setMessages] = useState(CHATS.messages);
    const [message, setMessage] = useState('');

    const [photo, setPhoto] = useState(null);
    const [companion, setCompanion] = useState({});

    useEffect(() => {
        async function getData(){
            await CHATS.downloadMessagesOfChat();
            setMessages(CHATS.messages);
        };

        sessionStorage.clear();

        getData();
    }, [messages]);

    useEffect(() => {
        async function setData(){
            setCompanion(master[0]);
            setPhoto(master[1]);
        }

        setData();

    }, [master])

    const enter = async () => {
        CHATS.sendMessage(message, localStorage.getItem('mail'));
        setMessage('');
    }

    return(<Fragment>
                <div className="opened-chat">
                    <div className="chat-head">
                        <div className="chat-head-companion">
                            <img src={photo} alt=""></img>
                            <div>
                                <h1>{companion.fio?.split(',')[0]} {companion.fio?.split(',')[1]?.split(',')[0]}</h1>
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
    </Fragment>);
}

export default Chats;