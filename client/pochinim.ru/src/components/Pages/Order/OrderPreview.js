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
                <h1 style={{marginTop: '0'}}>{value?.topic_name}</h1>
                <p style={{marginTop: '0'}}>{value?.address}</p>
                <p style={{marginTop: '0'}}>{value?.date}</p>
            </div>
            <button className={`order-preview-status-${value?.status}`}>Заказ {value?.status}</button>
            <div className='order-views'>
                <img src={Eye} alt=''></img>
                {value?.views}
            </div>
        </div>
    </Fragment>)
}

export default OrderPreView;