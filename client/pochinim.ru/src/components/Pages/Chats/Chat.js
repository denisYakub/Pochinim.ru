import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Chats.css';
import { contextChats } from "../../../contexts/contextChats";
import DotsImg from '../../../img/3-bots-img.png';
import chatController from "../../../controllers/Chat-controller";

const Chats = ({idCompanion, idTopic}) => {

    const params = useParams();

    //const {chats, companionInfo} = useContext(idCompanion);

    const [companionID, setCompanionID] = useState(idCompanion);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        async function getData(){
            setMessages(await chatController.getMessagesUser(idTopic, companionID));
        };
        
        getData();
    });

    const enter = async () => {
        if(message != ''){
            await chatController.sendMessageUser(message, companionID, idTopic);
            setMessage('');
        }
    }

    return(<Fragment>
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
    </Fragment>);
}

export default Chats;