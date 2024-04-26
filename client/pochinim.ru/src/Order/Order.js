import { Fragment } from "react";
import { useParams } from "react-router-dom";
import './OrderPreview.css';

const Order = () =>{

    const params = useParams;

    const pev_page = params.pev_page;
    const id_topic = params.id;

    return(<Fragment>
        <div className="order">
            {id_topic}
        </div>
    </Fragment>)
}

export default Order;