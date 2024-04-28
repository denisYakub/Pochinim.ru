import { Fragment } from "react";

const OrderInfo = ({order}) => {
    return (<Fragment>
        <div className="phases-wrapper">
            <div className="order-head">
                <h1>{order?.topic_name}</h1>
                <button>{order?.status}</button>
            </div>
        </div>
    </Fragment>)
}

export default OrderInfo;