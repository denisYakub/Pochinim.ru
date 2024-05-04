import { Fragment, useContext, useEffect, useState } from "react"
import {Link, useNavigate} from "react-router-dom";
import masterController from '../../../controllers/MASTER-controller';
import { contextChats } from "../../../contexts/contextChats";

const MasterProfileCard = ({value, setActivePop, setTextPop, topicId}) => {

    const navigate = useNavigate();

    const [photo, setPhoto] = useState(null);

    const {setCompanionInfo} = useContext(contextChats);

    useEffect(() => {
        async function showPhoto(path){
            setPhoto(await masterController.getMasterPhotoByPath(path));
        };

        showPhoto(value.photo_path);
        setCompanionInfo({'fio': value?.fio, 'photo': photo});
    }, [])

    const sendMessage = async () => {
        if(localStorage.getItem('mail') && topicId != null){
            if(topicId != true){
                navigate(`Chats/${value?.id}/${(await topicId)}`);
            }else{
                navigate(`Chats/${value?.id}`);
            }
        }else{
            setActivePop(true);
            setTextPop("Вы не можете писать специалистам, пока не заполните анкету");
        }
    }

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
                                <div className="master-h">{value?.fio}</div>
                            </div>
                            <div className="master-stats">
                                <div className="master-stat">
                                    <div className="star-icon"></div>
                                    <p>{value?.stars}</p>
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
                        <p>{value?.experience[0]}</p>
                        <p>{value?.education[0]}</p>
                        <Link className="link-black" to={`/CreateTopic/MasterProfile/${value?.id}`}>
                            Все({value?.experience?.length+value?.education?.length} шт)
                        </Link>
                    </div>
                </div>
                <div className="sercices-price-master">
                    <div className="master-h">Услуги и цены</div>
                    <div className="list-of-sercices-prices-master">
                        <div className="services-prices" style={{marginTop: '10px'}}>
                            <p>{value?.sercicesAndPrice[0][0]}</p>
                            <p>{value?.sercicesAndPrice[0][1]}</p>
                        </div>
                        <div className="services-prices">
                            <p>{value?.sercicesAndPrice[1][0]}</p>
                            <p>{value?.sercicesAndPrice[1][1]}</p>
                        </div>
                        <div className="services-prices">
                            <p>{value?.sercicesAndPrice[2][0]}</p>
                            <p>{value?.sercicesAndPrice[2][1]}</p>
                        </div>
                        <Link className="link-black" to={`/CreateTopic/MasterProfile/${value?.id}`}>
                            Все({value?.sercicesAndPrice?.length} шт)
                        </Link>
                    </div>
                </div>
                <div className="master-reviews">
                    <div className="master-h">Отзывы</div>
                    <div className="reviews">
                        {value?.reviews?.map((val, indx) => {
                            return(<div key={indx} className="review">
                                <div className="review-stars-date">
                                    <div className="review-stars">
                                        <div className={setStars(val?.reviews.stars)}></div>
                                        {val?.reviews.stars}
                                    </div>
                                    <div className="review-date">
                                        {val?.reviews.date}
                                    </div>
                                </div>
                                <div className="review-from-topic">
                                    <div className="review-from">{val?.reviews.from}</div>
                                    <div className="review-topic">{val?.reviews.topic}</div>
                                </div>
                                <div className="review-text">
                                    {val?.reviews.text}
                                </div>
                                <div className="review-price">
                                    <p>Стоимость работ:</p>
                                    <div>{val?.reviews.price}</div>
                                </div>
                            </div>)
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