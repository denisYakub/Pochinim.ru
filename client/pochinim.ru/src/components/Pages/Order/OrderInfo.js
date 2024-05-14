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
                    <p>Ключевые детали</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.problem}</p>
                <p>{order?.need}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Место поломки</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.problem_location}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Когда</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.date.split('T')[0]}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Цена</p>
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
                    <p>Адрес</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.address}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p>Описание</p>
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