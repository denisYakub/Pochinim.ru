import { Fragment, useEffect, useState } from "react"
import {Link} from "react-router-dom";
import masterController from "../../controllers/MASTER-controller";

const MasterProfileCard = ({value, setActivePop, setTextPop}) => {

    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        async function showPhoto(path){
            setPhoto(await masterController.getMasterPhotoByPath(path));
        };
        showPhoto(value.photo_path);
    }, [])

    const sendMessage = () => {
        console.log("hi");
        setActivePop(true);
        setTextPop("Вы не можете писать специалистам, пока не заполните анкету");
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
                            <div className="master-document">
                                <div className="shield-icon"></div>
                                Паспорт подтвержден
                            </div>
                            <div className="master-document">
                                <div className="document-icon"></div>
                                Работает по договору
                            </div>
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
                        <p>{value?.experience}</p>
                        <p>{value?.education}</p>
                        <Link to={`/CreateTopic/MasterProfile/${value?.id}`}>Все(N шт)</Link>
                    </div>
                </div>
                <div className="sercices-price-master">
                    <div className="master-h">Услуги и цены</div>
                    <div className="list-of-sercices-prices-master">
                        {value?.sercicesAndPrice.map((val, ind) => {
                            return(
                                <div key={ind} className="sercice-price-master">
                                    {val[0]}
                                    ....
                                    {val[1]}
                                </div>
                            );
                        })}
                        <Link to={`/CreateTopic/MasterProfile/${value?.id}`}>Все(N шт)</Link>
                    </div>
                </div>
                <div className="master-reviews">
                    <div className="master-h">Отзывы</div>
                    <div className="reviews">
                        <div className="review">
                            <div className="review-stars-date">
                                <div className="review-stars">
                                    <div className={setStars(value?.reviews.stars)}></div>
                                    {value?.reviews.stars}
                                </div>
                                <div className="review-date">
                                    {value?.reviews.date}
                                </div>
                            </div>
                            <div className="review-from-topic">
                                <div className="review-from">{value?.reviews.from}</div>
                                <div className="review-topic">{value?.reviews.topic}</div>
                            </div>
                            <div className="review-text">
                                {value?.reviews.text}
                            </div>
                            <div className="review-price">
                                <p>Стоимость работ:</p>
                                <div>{value?.reviews.price}</div>
                            </div>
                        </div>
                        <div className="review">
                            <div className="review-stars-date">
                                <div className="review-stars">
                                    <div className={setStars(value?.reviews.stars)}></div>
                                    {value?.reviews.stars}
                                </div>
                                <div className="review-date">
                                    {value?.reviews.date}
                                </div>
                            </div>
                            <div className="review-from-topic">
                                <div className="review-from">{value?.reviews.from}</div>
                                <div className="review-topic">{value?.reviews.topic}</div>
                            </div>
                            <div className="review-text">
                                {value?.reviews.text}
                            </div>
                            <div className="review-price">
                                <p>Стоимость работ:</p>
                                <div>{value?.reviews.price}</div>
                            </div>
                        </div>
                    </div>
                    <Link to={`/CreateTopic/MasterProfile/${value?.id}`}>Все(N шт)</Link>
                </div>
            </div>
            <div className="master-action-card">
                <button onClick={sendMessage}>Написать соощение</button>
                <button onClick={offerTopic}>Предложить заказ</button>
                <div className="masterLocation">
                    <a>Регион-</a>
                    <p>Москва и Мо</p>
                </div>
            </div>
        </div>
    </Fragment>);
}

export default MasterProfileCard;