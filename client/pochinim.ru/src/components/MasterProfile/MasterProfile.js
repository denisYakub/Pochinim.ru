import { Fragment, useContext, useEffect, useState } from 'react';
import '../MasterProfile/MasterProfile.css';
import { Link, useParams } from 'react-router-dom';
import { contextCreatetopic } from '../../contexts/contextCreatetopic';
import masterController from '../../controllers/MASTER-controller';

const MasterProfile = () => {

    const params = useParams();
    const { topic } = useContext(contextCreatetopic);

    const prev_page = params.pev_page;
    const id_master = params.id;

    const [reviews, setReviews] = useState({});
    const [masterInf, setMasterInf] = useState({});

    useEffect(() => {
        async function getData(){
            setReviews(await masterController.getReviewsById(id_master));
            setMasterInf(await masterController.getWholeInfById(id_master));
        };

        getData();
    }, [])
    
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
        <div className='master-profile'>
            <div className='profile-wrapper'>
                <div className='go-back-to-origin'>
                    <div className='go-back-button'>
                        <div className='back-icon'></div>
                        <Link to={`/${prev_page}`}>Все специалисты</Link>
                    </div>
                    <div className='navigation-profile-wrapper'>
                        <button className='button-grey'>Обо мне</button>
                        <button className='button-grey'>Образование и опыт</button>
                        <button className='button-grey'>Договор и гарантии</button>
                        <button className='button-grey'>Фотографии</button>
                        <button className='button-grey'>Услуги и цены</button>
                        <button className='button-grey'>Отзывы</button>
                    </div>
                    <div>Заполнить детали заказа</div>
                </div>
                <div className='profile-info'>
                    <div className='master-info-card'>
                        <div className="master-main-info">
                            <img src={masterInf?.photo} alt=""></img>
                            <div className="master-main-info-text">
                                <div className="master-fio-stats">
                                    <div className="master-fio">
                                        <div className="master-h">{masterInf?.fio}</div>
                                    </div>
                                    <div className="master-stats">
                                        <div className="master-stat">
                                            <div className="star-icon"></div>
                                            <p>{masterInf?.stars}</p>
                                        </div>
                                        <div className="master-stat">
                                               <div className="review-icon"></div>
                                              <p>{masterInf?.reviewsCount}</p>
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
                            {masterInf?.aboutMe}
                        </div>
                        <div className="experiences-educations-master">
                            <div className="master-h">Образование и опыт</div>
                            <div className="experience-education-master">
                                <p>{masterInf?.experience}</p>
                                <p>{masterInf?.education}</p>
                            </div>
                        </div>
                        <div className='animated-cards'>

                        </div>
                        <div className='guarantee-master'>
                            <div className="master-h">Договор и гарантия</div>

                        </div>
                        <div className='work-photos-master'>
                            <div className="master-h">Фотографии</div>

                        </div>
                        <div className="sercices-price-master">
                            <div className="master-h">Услуги и цены</div>
                            <div className="list-of-sercices-prices-master">
                                {masterInf?.sercicesAndPrice?.map((val, ind) => {
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
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>)
}

export default MasterProfile;