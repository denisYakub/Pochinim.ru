import { Fragment, useCallback, useState } from "react";
import { useBeforeUnload, useBlocker, useLocation } from "react-router-dom";
import OrderFullInfoForMaster from "./OrderFullInfoForMaster";
import './MasterOrdersSearch.css';
import BlankImg from '../../../img/blank-img.png';

const NewOrderForMaster = () => {

    const data = useLocation()

    return(<Fragment>
        <div className="page-wrapper">
            <div className="new-order-for-master-content">
                <OrderFullInfoForMaster order={data.state.TOPIC} photos={data.state.imgs}></OrderFullInfoForMaster>
                <div className="new-order-for-master-buttons">
                    <div className="phases-wrapper">
                        <button className="button-grey" style={{width: '300px'}}>Откликнуться</button>
                    </div>
                    <div className="phases-wrapper">
                        <div className="new-order-for-master-info-doc">
                            <img src={BlankImg} alt=""></img>
                            <h1>Пройдите проверку документов</h1>
                            <p>Откликнуться можно только после проверки паспорта.</p>
                            <button className="go-next-button" style={{width: '300px'}}>Пройти проверку</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>);
}

export default NewOrderForMaster;