import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Chats.css';

const Chats = () => {

    const params = useParams();

    useEffect(()=>{
        console.log(params.email, params.id, params.with);
    },[])

    return(<Fragment>
        <div className='page-wrapper'>
            <div className="chats-content">
                <div>

                </div>
                <div>
                    
                </div>
            </div>
        </div>
    </Fragment>);
}

export default Chats;