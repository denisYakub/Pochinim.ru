import { Fragment, useEffect, useState, useContext } from 'react';
import './MasterOrdersSearch.css';
import { contextMaster } from '../../../contexts/contextMaster';
import { values } from 'mobx';
import OrderPreviewForMaster from './OrderPreviewForMaster';

const OldOrdersSearch = () => {

    const MASTER = useContext(contextMaster);

    const [orders, setOrders] = useState([]);

    const handleInputChange = (e) => { 
        
    }

    useEffect(() => {
        async function setData(){
            setOrders(await MASTER.getMastersOrders());
        }

        if(orders.length == 0){
            setData();
        }
    }, [orders])

    return(<Fragment>
            <div className='old-orders-search-content'>
                <div className='old-orders-search-head'>
                    <h1>Мои заказы</h1>
                    <input type='text' className='text-input-field'
                            style={{width: '638px'}}
                            onChange={e => handleInputChange(e.target.value)}></input>
                </div>
                <div className='old-orders-search-list-head'>
                    <p style={{opacity: '1'}}>Активные</p>
                    <p style={{opacity: '0.7'}}>В работе</p>
                    <p style={{opacity: '0.7'}}>Выполненные</p>
                    <p style={{opacity: '0.7'}}>Архив</p>
                </div>
                <div className='old-orders-search-list'>
                    {orders.map((value, index) => {
                        return(<div style={{width: '1322px'}}>
                            <OrderPreviewForMaster key={index} TOPIC={value.order} chat={value.chat}></OrderPreviewForMaster>
                            </div>);
                    })}
                </div>
            </div>
    </Fragment>);
}

export default OldOrdersSearch;