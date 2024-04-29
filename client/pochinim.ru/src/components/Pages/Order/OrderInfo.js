import { Fragment } from "react";

const OrderInfo = ({order, photos}) => {
    return (<Fragment>
        <div className="phases-wrapper">
            <div className="order-head">
                <h1>{order?.topic_name}</h1>
                <div className="order-id">
                    <p>Номер заказа</p>
                    <p>{order?.id_topic}</p>
                </div>
                <div className="order-date">
                    <p>Создан</p>
                    <p>{order?.date}</p>
                </div>
                <button className={`order-preview-status-${order?.status}`}>Заказ {order?.status}</button>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p style={{marginTop: '0'}}>Детали</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.problem}</p>
                <p>{order?.need}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p style={{marginTop: '0'}}>Информация об объекте</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.problem_location}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p style={{marginTop: '0'}}>Удобные дни и время</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.date}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p style={{marginTop: '0'}}>Стоимость услуги</p>
                    <div className='edit-button'></div>
                </div>
                <p>от {order?.price_start} до {order?.price_end}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p style={{marginTop: '0'}}>Кому</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.fio}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p style={{marginTop: '0'}}>Куда вам удобно приехать?</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.address}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p style={{marginTop: '0'}}>Дополнения и пожелания</p>
                    <div className='edit-button'></div>
                </div>
                <p>{order?.details}</p>
            </div>
            <div className="order-info-block">
                <div className='edit-wrapper-button'>
                    <p style={{marginTop: '0'}}>Фото и файлы</p>
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
                <p style={{marginTop: '0'}}>Аккаунт</p>
                <p>{order?.id_account}</p>
            </div>
        </div>
    </Fragment>)
}

export default OrderInfo;