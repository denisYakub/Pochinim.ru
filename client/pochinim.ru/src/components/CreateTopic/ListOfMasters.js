import masterController from "../../controllers/MASTER-controller";

const list = await masterController.getListOfMasters();

const ListOfMasters = ({topic, setActivePop, setTextPop}) => {

    const checkTopic = (value) => {
        var tf = false;
        value.forEach(element => {
            if(element[0].toLowerCase().includes(topic.toLowerCase())){
                tf = true;
            }
        });
        return tf;
    }   

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

    return(list.map((value, index) => {
        if(checkTopic(value.sercicesAndPrice)){
            return(<div key={index} className="master-wrapper">
            <div className="master-info-card">
                <div className="master-main-info">
                    <img src={value.photo} alt=""></img>
                    <div className="master-main-info-text">
                        <div className="master-fio-stats">
                            <div className="master-fio">
                                <div className="master-h">{value.fio}</div>
                            </div>
                            <div className="master-stats">
                                <div className="master-stat">
                                    <div className="star-icon"></div>
                                    <p>{value.stars}</p>
                                </div>
                                <div className="master-stat">
                                    <div className="review-icon"></div>
                                    <p>{value.reviewsCount}</p>
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
                    {value.aboutMe}
                </div>
                <div className="experiences-educations-master">
                    <div className="master-h">Образование и опыт</div>
                    <div className="experience-education-master">
                        {value.experience}
                        {value.education}
                    </div>
                </div>
                <div className="sercices-price-master">
                    <div className="master-h">Услуги и цены</div>
                    <div className="list-of-sercices-prices-master">
                        {value.sercicesAndPrice.map((val, ind) => {
                            return(
                                <div key={ind} className="sercice-price-master">
                                    {val[0]}
                                    ....
                                    {val[1]}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="master-reviews">
                    <div className="master-h">Отзывы</div>
                    <div className="reviews">
                        <div className="review">
                            <div className="review-stars-date">
                                <div className="review-stars">
                                    <div className={setStars(value.review.stars)}></div>
                                    {value.review.stars}
                                </div>
                                <div className="review-date">
                                    {value.review.date}
                                </div>
                            </div>
                            <div className="review-from-topic">
                                <div className="review-from">{value.review.from}</div>
                                <div className="review-topic">{value.review.topic}</div>
                            </div>
                            <div className="review-text">
                                {value.review.text}
                            </div>
                            <div className="review-price">
                                <p>Стоимость работ:</p>
                                <div>{value.review.price}</div>
                            </div>
                        </div>
                        <div className="review">
                            <div className="review-stars-date">
                                <div className="review-stars">
                                    <div className={setStars(value.review.stars)}></div>
                                    {value.review.stars}
                                </div>
                                <div className="review-date">
                                    {value.review.date}
                                </div>
                            </div>
                            <div className="review-from-topic">
                                <div className="review-from">{value.review.from}</div>
                                <div className="review-topic">{value.review.topic}</div>
                            </div>
                            <div className="review-text">
                                {value.review.text}
                            </div>
                            <div className="review-price">
                                <p>Стоимость работ:</p>
                                <div>{value.review.price}</div>
                            </div>
                        </div>
                    </div>
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
        </div>);
        }else{
            return(<div>Не подходит</div>);
        }
    }));
}

export default ListOfMasters;