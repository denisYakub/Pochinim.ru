import { Fragment } from "react";

const OrderInfo = ({order, photos}) => {
    return (<Fragment>
        <div className="phases-wrapper">
            <div className="order-head">
                <h1>{order?.topic_name}</h1>
                <div className="order-head-info">
                    <div className="order-id">
                        <p style={{color: '#1C1C1C4D'}}>Номер заказа</p>
                        <p>{order?.id_topic}</p>
                    </div>
                    <div className="order-date">
                        <p style={{color: '#1C1C1C4D'}}>Создан</p>
                        <p>{order?.date.split('T')[0]}</p>
                    </div>
                    <button className={`order-preview-status-${order?.status}`}>Заказ {order?.status}</button>
                </div>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Детали</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.problem}</p>
                <p>{order?.need}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Информация об объекте</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.problem_location}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Удобные дни и время</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.date}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Стоимость услуги</p>
                    <div className='edit-button'></div>
                </div>
                <p>от {order?.price_start} до {order?.price_end}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Кому</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.fio}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Куда вам удобно приехать?</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.address}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Дополнения и пожелания</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.details}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Фото и файлы</p>
                    <div className='edit-button'></div>
                </div>
                <div className="order-photos">
                    {photos?.map((val, ind) => {
                        return(<div key={ind} className="order-photo">
                            <img src={val} alt=""></img>
                            <p>{/*val?.name*/}</p>
                        </div>)
                    })}
                </div>
            </div>
            <div className="order-info-block">
                <p>Аккаунт</p>
                <p>{order?.id_account}</p>
            </div>
        </div>
    </Fragment>)
}

export default OrderInfo;