import './ChangeOrderStatus.css';
import { Fragment, useContext, useEffect, useState } from "react";
import userController from '../../../controllers/USER-controller';
import { contextChats } from '../../../contexts/contextChats';
import masterController from '../../../controllers/MASTER-controller';
import {motion, useAnimate} from "framer-motion";
import CloseImg from '../../../img/close-img.png';
import StarImg from '../../../img/star-img.png';
import StarFullImg from '../../../img/star-full-img.png';
import topicController from '../../../controllers/TOPIC-controller';

const ChangeOrderStatus = ({active, setActive, who, id_order, id_client, head}) => {

    const CHATS = useContext(contextChats)

    const [mastersFromChats, setMastersFromChats] = useState([]);
    const [photoMastersFromChats, setPhotoMastersFromChats] = useState([]);

    const [choosenMasterId, setChoosenMasterId] = useState(null);
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState('');
    const [finalPrice, setFinalPrice] = useState();

    useEffect(() => {
        async function getData(){
            if(who=='client'){
                await CHATS.downloadChatsOfTopic(id_order, localStorage.getItem('mail'));

                var a = [];
                var b = [];
                for(const chat of CHATS.chats){
                    a.push(await masterController.getWholeInfById(chat.id_master));
                }
                setMastersFromChats(a);
                for(const mater of a){
                    b.push(await masterController.getMasterPhotoByPath(mater.master_photo_path));
                }
                setPhotoMastersFromChats(b);
            }else{

            }
        }

        sessionStorage.clear();

        getData()
    }, [])

    const addStars = (value) => {
        setStars(value);
    }

    const minusStars = (value) => {
        if(value - 1 >= 0)
            setStars(value - 1)
    }

    const closeOrder = async () => {
        if(choosenMasterId == null){
            topicController.closeTopic(id_order, localStorage.getItem('token'));
            setActive(false);
        }else if(stars != null && comment != null && finalPrice != null){
            topicController.finalizeTopic(stars, head, comment, finalPrice, choosenMasterId, id_client, id_order , localStorage.getItem('token'));
            setActive(false);
        }
    }
    
    return(
        <motion.div className='change-order-status'
            initial={{scale:0}} 
            animate={active?{scale:1}:null}>
            {who=='client'?
                <div className='change-order-status-client'>
                    <div className='close-button'>
                        <h1>Редактировать</h1>
                        <img src={CloseImg} alt='' onClick={() => setActive(false)}></img>
                    </div>
                    <div className='change-order-status-masters'>
                        <h1>Выберете Специалиста:</h1>
                        {mastersFromChats.map((value, index) =>{
                            return(<div key={index}
                                    style={{opacity: value.id_master==choosenMasterId?'1':'0.7'}}
                                    onClick={() => {setChoosenMasterId(value.id_master)}}>
                                <img src={photoMastersFromChats[index]} alt=''></img>
                                <p>{value.fio?.replace(',', ' ')?.replace(',', ' ')}</p>
                            </div>)
                        })}
                    </div>
                    {choosenMasterId?<div className='change-order-status-rate-master'>
                        <h1>Как вам работа специалиста?</h1>
                        <div className='change-order-status-rate-stars'>
                            {stars>=1?<img src={StarFullImg} alt='' onClick={() => minusStars(1)}></img>
                            :<img src={StarImg} alt='' onClick={() => addStars(1)}></img>}
                            {stars>=2?<img src={StarFullImg} alt='' onClick={() => minusStars(2)}></img>
                            :<img src={StarImg} alt='' onClick={() => addStars(2)}></img>}
                            {stars>=3?<img src={StarFullImg} alt='' onClick={() => minusStars(3)}></img>
                            :<img src={StarImg} alt='' onClick={() => addStars(3)}></img>}
                            {stars>=4?<img src={StarFullImg} alt='' onClick={() => minusStars(4)}></img>
                            :<img src={StarImg} alt='' onClick={() => addStars(4)}></img>}
                            {stars>=5?<img src={StarFullImg} alt='' onClick={() => minusStars(5)}></img>
                            :<img src={StarImg} alt='' onClick={() => addStars(5)}></img>}
                        </div>
                    </div>:null}
                    {choosenMasterId?<div className='change-order-status-leave-comment'>
                        <h1>Комментарий</h1>
                        <textarea placeholder='Напишите ваш комментарий' value={comment}
                            onChange={e => setComment(e.target.value)}></textarea>
                    </div>:null}
                    {choosenMasterId?<div className='change-order-status-final-price'>
                        <h1>Сколько вы заплатили за работу специалиста?</h1>
                        <input className='text-input-field' type='number' placeholder='От'
                            onChange={e => setFinalPrice(e.target.value)} style={{width: '200px'}}></input>
                        <h2>Стоимость совпала с вашими ожиданиями?</h2>
                        <div className='options-input' onChange={e => console.log(e)}>
                            <div className='option' value={0}>
                                <input type='radio'></input>
                                <p>Да</p>
                            </div>
                            <div className='option' value={1}>
                                <input type='radio'></input>
                                <p>Нет, оказалась выше</p>
                            </div>
                            <div className='option' value={2}>
                                <input type='radio'></input>
                                <p>Нет, оказалась ниже</p>
                            </div>
                        </div>
                    </div>:null}
                    <button className='go-next-button' style={{width: '100%'}} onClick={() => closeOrder()}>Готово</button>
                </div>
            :
                <div className='change-order-status-master'>

                </div>
            }
        </motion.div>
    );
}

export default ChangeOrderStatus;