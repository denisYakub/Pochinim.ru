import { Fragment } from "react";
import StarImg from '../../../../img/star-img.png';
import StarFullImg from '../../../../img/star-full-img.png';

const ReviewsBlock = ({MASTER}) => {
    return(<Fragment>
        <div className="phases-wrapper">
            <h1 className="outline-h">Отзывы</h1>
            <div className="reviews">
                {MASTER.reviews?.map((val, indx) => {
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
                        </div>
                    </div>)
                })}
            </div>
        </div>
    </Fragment>)
}

export default ReviewsBlock;