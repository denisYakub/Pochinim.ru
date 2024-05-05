import { useNavigate } from 'react-router-dom';
import { contextOrder } from '../../../contexts/contextOrder';
import { Fragment, useEffect, useContext } from "react";
import Eye from '../../../img/eye-img.png';
import './OrderPreview.css';

const OrderPreView = ({value, email}) => {

    const navigate = useNavigate();

    const { order, setOrder } = useContext(contextOrder);

    useEffect(() => {
        setOrder(value);
    }, []);

    return(<Fragment>
        <div className='order-preview' onClick={() => {navigate(`Order/${value?.id_topic}`)}}>
            <div className='order-preview-info'>
                <div>
                    <h1>{value?.topic_name}</h1>
                    <button className={`order-preview-status-${value?.status}`}>Заказ {value?.status}</button>
                </div>
                <p>{value?.address}</p>
                <p>{value?.date}</p>
            </div>
            <div className='order-views'>
                <img src={Eye} alt=''></img>
                {value?.views}
            </div>
        </div>
    </Fragment>)
}

export default OrderPreView;