import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Chats.css';
import { contextChats } from "../../../contexts/contextChats";
import DotsImg from '../../../img/3-bots-img.png';
import chatController from "../../../controllers/Chat-controller";

const Chats = ({idCompanion, idTopic}) => {

    const params = useParams();

    const {chats, companionInfo} = useContext(contextChats);

    const [companionID, setCompanionID] = useState('');
    const [topicId, setTopicId] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        async function getData(){
            if(companionID == '' && topicId == ''){
                if(idCompanion && idTopic){
                    setCompanionID(idCompanion);
                    setTopicId(idTopic);
                }else{
                    console.log(params.with, params.id);
                    setCompanionID(params.with);
                    setTopicId(params.id);
                }
            }
            setMessages(await chatController.getMessagesUser(topicId, companionID));
        };
        getData();
    });

    const enter = async () => {
        if(message != ''){
            await chatController.sendMessageUser(message, companionID, topicId);
            setMessage('');
        }
    }

    return(<Fragment>
        <div className='page-wrapper'>
            <div className="chats-content">
                    <div className="messages-wrapper">
                        {chats?.map((val, ind) => {
                            return(<div key={ind} className="message-wrapper" onClick={() => {setCompanionID(val?.id_master)}}>
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