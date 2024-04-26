import './OrderPreview.css';
import Eye from '../img/eye.png';
import { useNavigate } from 'react-router-dom';
const { Fragment } = require("react")


const OrderPreView = ({value, email}) => {

    const navigate = useNavigate();

    return(<Fragment>
        <div className='order-preview' onClick={() => {navigate(`/MyOrders/${email}/Order/${value?.id_topic}`)}}>
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