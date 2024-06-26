import { Fragment, useContext, useEffect, useState } from "react"
import {Link, useNavigate} from "react-router-dom";
import masterController from '../../../controllers/MASTER-controller';
import { contextChats } from "../../../contexts/contextChats";
import StarImg from '../../../img/star-img.png';
import StarFullImg from '../../../img/star-full-img.png';

const MasterProfileCard = ({value, setActivePop, setTextPop, idTopic}) => {

    const navigate = useNavigate();

    const [photo, setPhoto] = useState(null);

    const CHATS = useContext(contextChats);

    useEffect(() => {
        async function showPhoto(path){
            setPhoto(await masterController.getMasterPhotoByPath(path));
        };

        showPhoto(value.photo_path);
    }, [])
    //===================================================================
    const sendMessage = async () => {
        if(localStorage.getItem('mail') && idTopic != null){

            CHATS.idCompanion = value?.id;
            CHATS.idTopic = idTopic;
            CHATS.companionInfo = value;
            CHATS.userId = localStorage.getItem('id');
            await CHATS.setChatIDByIdTopic(idTopic);

            navigate(`Chats/${value?.id}`, {state: {email: localStorage.getItem('mail')}});

        }else{
            setActivePop(true);
            setTextPop("Вы не можете писать специалистам, пока не заполните анкету");
        }
    }
    //===================================================================
    const offerTopic = () => {
        setActivePop(true);
        setTextPop("Вы не можете предлагать специалистам, пока не заполните анкету");
    }

    const setStars = (value) => {
        var stars;
        if(value < 0.5){
            stars = '0';
        }if(value < 1){
            stars = '0-5';
        }else if(value < 1.5){
            stars = '1';
        }else if(value < 2){
            stars = '1-5';
        }else if(value < 2.5){
            stars = '2';
        }else if(value < 3){
            stars = '2-5';
        }else if(value < 3.5){
            stars = '3';
        }else if(value < 4){
            stars = '3-5';
        }else if(value < 4.5){
            stars = '4';
        }else if(value < 5){
            stars = '4-5';
        }else{
            stars = '5';
        }
        return `stars-${stars}`
    }

    return(<Fragment>
        <div className="master-wrapper">
            <div className="master-info-card">
                <div className="master-main-info">
                    <img src={photo} alt=""></img>
                    <div className="master-main-info-text">
                        <div className="master-fio-stats">
                            <div className="master-fio">
                                <div className="master-h">{value?.fio?.replace(',', ' ')?.replace(',', ' ')}</div>
                            </div>
                            <div className="master-stats">
                                <div className="master-stat">
                                    <div className="star-icon"></div>
                                    <p>{value?.stars?value?.stars:'нет оценок'}</p>
                                </div>
                                <div className="master-stat">
                                    <div className="review-icon"></div>
                                    <p>{value?.reviewsCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="master-documents">
                            {value?.documents?.map((val, ind)=>{
                                return(<div key={ind} className="master-document">
                                    <div className={`document-${val}-icon`}></div>
                                    <p>{val} подтвержден</p>
                                </div>);
                            })}
                        </div>
                    </div>
                </div>
                <div className="about-master">
                    <div className="master-h">Обо мне</div>
                    {value?.aboutMe}
                </div>
                <div className="experiences-educations-master">
                    <div className="master-h">Образование и опыт</div>
                    <div className="experience-education-master">
                        {value.experience?.map((val, ind) => {
                            if(ind == 0){
                                return(<div className="services-prices" style={{marginTop: '10px'}}>
                                        <p>{val[0]}</p>
                                        <p>{val[1]}</p>
                                    </div>)                  
                            }
                        })}
                        {value.education?.map((val, ind) => {
                            if(ind == 0){
                                return(<div className="services-prices" style={{marginTop: '10px'}}>
                                            <p>{val[0]}</p>
                                            <p>{val[1]}</p>
                                        </div>)  
                            }
                        })}
                        <Link className="link-black" to={`/CreateTopic/MasterProfile/${value?.id}`}>
                            Все({value?.experience?.length+value?.education?.length} шт)
                        </Link>
                    </div>
                </div>
                <div className="sercices-price-master">
                    <div className="master-h">Услуги и цены</div>
                    <div className="list-of-sercices-prices-master">
                        {value.sercicesAndPrice?.map((val, ind) => {
                            if(ind < 3){
                                if(ind == 0){
                                    return(<div className="services-prices" style={{marginTop: '10px'}}>
                                            <p>{val[0]}</p>
                                            <p>{val[1]}</p>
                                        </div>);
                                }else{
                                    return(<div className="services-prices">
                                        <p>{val[0]}</p>
                                        <p>{val[1]}</p>
                                    </div>);
                                }
                            }
                        })}
                        <Link className="link-black" to={`/CreateTopic/MasterProfile/${value?.id}`}>
                            Все({value?.sercicesAndPrice?.length} шт)
                        </Link>
                    </div>
                </div>
                <div className="master-reviews">
                    <div className="master-h">Отзывы</div>
                    <div className="reviews">
                        {value?.reviews?.map((val, indx) => {
                            if(indx <= 2){
                            return(<div key={indx} className="review">
                                <div className="review-stars-date">
                                    <div className="review-stars">
                                        {val?.stars>=1?<img src={StarFullImg} alt=''></img>
                                        :<img src={StarImg} alt=''></img>}
                                        {val?.stars>=2?<img src={StarFullImg} alt=''></img>
                                        :<img src={StarImg} alt=''></img>}
                                        {val?.stars>=3?<img src={StarFullImg} alt=''></img>
                                        :<img src={StarImg} alt=''></img>}
                                        {val?.stars>=4?<img src={StarFullImg} alt=''></img>
                                        :<img src={StarImg} alt=''></img>}
                                        {val?.stars>=5?<img src={StarFullImg} alt=''></img>
                                        :<img src={StarImg} alt=''></img>}
                                    </div>
                                    <div className="review-date">
                                        {val?.date?.split('T')[0]}
                                    </div>
                                </div>
                                <div className="review-from-topic">
                                    <div className="review-from">{val?.id_client}</div>
                                    <div className="review-topic">{val?.head}</div>
                                </div>
                                <div className="review-text">
                                    {val?.text}
                                </div>
                                <div className="review-price">
                                    <p>Стоимость работ:</p>
                                    <div>{val?.price?.split(',')[0]}</div>
                                    {}
                                </div>
                            </div>)
                            }
                        })}
                    </div>
                    <Link className="link-black" to={`/CreateTopic/MasterProfile/${value?.id}`}>
                        Все({value?.reviews?.length} шт)
                    </Link>
                </div>
            </div>
            <div className="master-action-card">
                <button onClick={sendMessage}>Написать соощение</button>
                <button onClick={offerTopic}>Предложить заказ</button>
                <div className="masterLocation">
                    <p>{value?.city}</p>
                </div>
            </div>
        </div>
    </Fragment>);
}

export default MasterProfileCard;