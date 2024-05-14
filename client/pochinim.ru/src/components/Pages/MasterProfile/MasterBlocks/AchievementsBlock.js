import { Fragment } from "react";
import starImg from '../../../../img/star.png';
import reviewImg from '../../../../img/review.png';
import veryGoodImg from '../../../../img/very-good-img.png';
const AchievementsBlock = ({MASTER}) => {
    return (<Fragment>
        <div className="phases-wrapper">
            <div className="achievements-list">
                <div className="achievement">
                    <img src={starImg} alt=""></img>
                    {MASTER.reviewsStars?
                        <p>{MASTER.reviewsStars}</p>
                    :
                        <p>Нет оценок</p>
                    }
                </div>
                <div className="achievement">
                    <img src={reviewImg} alt=""></img>
                    {MASTER.reviewsCount?
                        <p>{MASTER.reviewsCount}</p>
                    :
                        <p>Нет отзывов</p>
                    }
                </div>
                <div className="achievement">
                    <img src={veryGoodImg} alt=""></img>
                    <p>Очень хвалят</p>
                </div>
            </div>
        </div>
    </Fragment>);
}

export default AchievementsBlock;