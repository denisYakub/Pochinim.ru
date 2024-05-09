import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Chats.css';
import { contextChats } from "../../../contexts/contextChats";
import DotsImg from '../../../img/3-bots-img.png';

const Chats = () => {

    const params = useParams();

    const CHATS = useContext(contextChats);
    const [chats, setChats] = useState(CHATS.chats);

    const [companionID, setCompanionID] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        async function getData(){
            await CHATS.downloadChatsOfTopic(CHATS.idTopic);
            setChats(CHATS.chats);
            await CHATS.downloadMessagesOfChat();
            setMessages(CHATS.messages);
        };

        getData();
    }, [chats]);

    const enter = async () => {
        CHATS.sendMessage(message);
        setMessage('');
    }

    return(<Fragment>
        <div className='page-wrapper'>
            <div className="chats-content">
                    <div className="messages-wrapper" style={{width: '333px'}}>
                        {chats?.map((val, ind) => {
                            return(<div key={ind} className="message-wrapper" onClick={() => {CHATS.idCompanion = val?.id_master}}>
                                <img src={val?.photo} alt=""></img>
                                <div> 
                                    <h1>{val?.id_master}</h1>
                                    <p>{val?.text_of_last_message}</p>
                                </div>
                            </div>);
                        })}
                    </div>
                <div className="opened-chat">
                    <div className="chat-head">
                        <div>
                            {companionID}
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
                                        {/*<p>{val?.date}</p>*/}
                                    </div>
                                </div>);
                            }else{
                                return(<div key={ind} className="chat-companion-message">
                                        {val?.message.split(' ')?.map((v, i) => {
                                            return(<p>{v}</p>);
                                        })}
                                        {/*<p>{val?.date}</p>*/}
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