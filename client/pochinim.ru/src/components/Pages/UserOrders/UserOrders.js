import { Link, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from "react";
import userController from '../../../controllers/USER-controller';
import OrderPreView from '../Order/OrderPreview';
import FilterIcon from '../../../img/filter-img.png';
import GreetingsImg from '../../../img/greetings-img.png';
import './UserOrders.css';

const MyOrders = () => {
    const params = useParams();

    const auth = params.email;

    const [topics, setTopics] = useState(null);

    useEffect(() => {
        async function setData(auth){
            setTopics(await userController.getUserTopics(auth));
        }
        if(auth != 'null'){
            setData(auth);
        }
    }, [topics])

    return(<Fragment>
        <div className='page-wrapper'>
            <div className='orders-content'>
                {auth=='null'?
                    <div className='my-orders-not-logged-in'>
                            <h1>Войдите или зарегистрируйтесь</h1>
                    </div>
                :
                    <div className='my-orders-logged-in'>
                            <div className='my-orders-list'>
                                <div className='my-orders-head'>
                                    <h1>Мои заказы</h1>
                                    <button className='button-grey'>Я заказчик</button>
                                    <div>
                                        <img src={FilterIcon} alt='' className='filter-icon'></img>
                                    </div>
                                </div>
                                <div className='orders'>
                                    {topics?.map((value, index) => {
                                        return(<Fragment key={index}>
                                            <OrderPreView value={value} email={auth}></OrderPreView>
                                        </Fragment>);
                                    })}
                                </div>
                            </div>
                            <div className='my-orders-assists'>
                                <div className='my-orders-assists-interection'>
                                    <img src={GreetingsImg} alt=''></img>
                                    <div>
                                        <p>Станьте инсполнителем на починим.ру</p>
                                        <p>Зарабатывайте больше!</p>
                                    </div>
                                </div>
                                <div className='my-orders-assists-questions'>
                                    <h1>Частые вопросы</h1>
                                    <div>
                                        <Link className='link-as-text'>Сколько откликов я получу?</Link>
                                        <Link className='link-as-text'>Обязательно ли выбирать исполнителя?</Link>
                                        <Link className='link-as-text'>Как оплачить услуги исполнителя?</Link>
                                        <Link className='link-as-text'>Как выбрать надежного исполнителя?</Link>
                                    </div>
                                </div>
                            </div>
                    </div>}
            </div>
        </div>
    </Fragment>);
}

export default MyOrders;