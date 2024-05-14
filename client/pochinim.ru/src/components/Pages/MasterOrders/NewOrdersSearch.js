import { Fragment, useContext, useEffect, useState } from 'react';
import './MasterOrdersSearch.css';
import OrderPreviewForMaster from './OrderPreviewForMaster';
import topicController from '../../../controllers/TOPIC-controller'
import I_1 from '../../../img/interactive-master-order-search/profile.png';
import I_2 from '../../../img/interactive-master-order-search/very-good.png';
import I_3 from '../../../img/interactive-master-order-search/services.png';
import I_4 from '../../../img/interactive-master-order-search/email.png';
import I_5 from '../../../img/interactive-master-order-search/bonus.png';

const NewOrdersSearch = () => {

    const [listOfOrders, setListOfOrders] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [filteredListOfOrders, setFilteredListOfOrder] = useState([]);

    const [filterPanel, setFilterPanel] = useState({filterMeet: [false, false], filterPrice: [0, 1000000000], filterCity: []});
    const [filterCity, setFilterCity] = useState([]);
    const [filterPrice, setFilterPrice] = useState([0, 1000000000]);
    const [filterMeet, setFilterMeet] = useState([false, false]);

    const [cityChoosen, setCityChoosen] = useState([false, false, false]);

    useEffect(()=>{
        async function setData(){
            setListOfOrders(await topicController.getAllTopicsForMaster());
            setFilteredListOfOrder(await topicController.getAllTopicsForMaster());
        }
        
        if(listOfOrders.length == 0){
            setData();
        }
    }, [listOfOrders])

    const handleInputChange = (e) => { 
        setSearchItem(e);

        const filteredItems = listOfOrders.filter((value) => 
            value.topic_name.toLowerCase().includes(e.toLowerCase()));
        setFilteredListOfOrder(filteredItems);
    }

    return(<Fragment>
            <div className='master-orders-search-content'>
                <div className='phases-wrapper'>
                    <h1 className='outline-h'>Фильтры</h1>
                    <div className='master-orders-search-filer-meeting'>
                        <h1>Место встречи :</h1>
                        <div>
                            <div className='master-orders-search-filer-meeting-choose'>
                                <input type='checkbox' onClick={() => {setFilterMeet([!filterMeet[0], filterMeet[1]])}}></input>
                                <p>У специалиста</p>
                            </div>
                            <div className='master-orders-search-filer-meeting-choose'>
                                <input type='checkbox' onClick={() => {setFilterMeet([filterMeet[0], !filterMeet[1]])}}></input>
                                <p>У клиента</p>
                            </div>
                        </div>
                    </div>
                    <div className='master-orders-search-filer-price'>
                        <h1>Ставка,₽ :</h1>
                        <div className='master-orders-search-filer-price-inputs'>
                            <input type='number' placeholder='от' className='text-input-field' onChange={e => setFilterPrice([e.target.value, filterPrice[1]])}></input>
                            <input type='number' placeholder='до' className='text-input-field' onChange={e => setFilterPrice([filterPrice[0], e.target.value])}></input>
                        </div>
                    </div>
                    <div className='master-orders-search-filer-location'>
                        <h1>Город :</h1>
                        <div className='button-hints'>
                            <button style={{opacity: cityChoosen[0]?'0.7':'1'}} onClick={() => {
                                if(cityChoosen[0]){
                                    setFilterCity(filterCity.filter((val) => val != 'Москва'))
                                    setCityChoosen([false, cityChoosen[1], cityChoosen[2]])
                                }else{
                                    filterCity.push('Москва')
                                    setCityChoosen([true, cityChoosen[1], cityChoosen[2]])
                                };
                            }}>Москва</button>
                            <button style={{opacity: cityChoosen[1]?'0.7':'1'}} onClick={() => {
                                if(cityChoosen[1]){
                                    setFilterCity(filterCity.filter((val) => val != 'Санкт-Петербург'))
                                    setCityChoosen([cityChoosen[0], false, cityChoosen[2]])
                                }else{
                                    filterCity.push('Санкт-Петербург')
                                    setCityChoosen([cityChoosen[0], true, cityChoosen[2]])
                                };
                            }}>Санкт-Петербург</button>
                            <button style={{opacity: cityChoosen[2]?'0.7':'1'}} onClick={() => {
                                if(cityChoosen[2]){
                                    setFilterCity(filterCity.filter((val) => val != 'Екатеренбург'))
                                    setCityChoosen([cityChoosen[0], cityChoosen[1], false])
                                }else{
                                    filterCity.push('Екатеренбург')
                                    setCityChoosen([cityChoosen[0], cityChoosen[1], true])
                                };
                            }}>Екатеренбург</button>
                        </div>
                    </div>
                    <div className='master-orders-search-filer-buttons'>
                        <button className='go-next-button' onClick={() => {
                            setFilterPanel({filterMeet: filterMeet, filterPrice: filterPrice, filterCity: filterCity});
                        }}>Применить фильтры</button>
                        <button className='button-grey' onClick={() => {
                            setFilterPanel({filterMeet: [false, false], filterPrice: [], filterCity: []})
                        }}>Сбросить всё</button>
                    </div>
                </div>
                <div className='master-orders-search'>
                    <input type='text' className='text-input-field'
                            onChange={e => handleInputChange(e.target.value)}></input>
                    <div className='master-orders-list'>
                        {filteredListOfOrders.map((value, index)=>{
                            if(index == 1){
                                return(<div>
                                        <div className='master-orders-interactive'>
                                            <div>
                                                <p>Обновить анкету</p>
                                                <img src={I_1} alt=''></img>
                                            </div>
                                            <div>
                                                <p>“Очень хвалят”</p>
                                                <img src={I_2} alt=''></img>
                                            </div>
                                            <div>
                                                <p>Добавили новые услуги</p>
                                                <img src={I_3} alt=''></img>
                                            </div>
                                            <div>
                                                <p>Укажите почту</p>
                                                <img src={I_4} alt=''></img>
                                            </div>
                                            <div>
                                                <p>500 бонусов за друга</p>
                                                <img src={I_5} alt=''></img>
                                            </div>
                                        </div>
                                        <OrderPreviewForMaster key={index} TOPIC={value}/>
                                    </div>)
                            }
                            return(<OrderPreviewForMaster key={index} TOPIC={value}/>);
                        })}
                    </div>
                </div>
            </div>
    </Fragment>);
}

export default NewOrdersSearch;