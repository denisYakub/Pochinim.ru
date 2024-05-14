import { Fragment, useState } from 'react';
import './MasterOrdersSearch.css';
import NewOrdersSearch from './NewOrdersSearch';
import OldOrdersSearch from './OldOrdersSearch';

const MasterOrdersSearch = () => {

    const [myOrdersChoose, setMyOrdersChoose] = useState(false);

    const [idComp, setIdComp] = useState(0);
    const comps = [<NewOrdersSearch/>, <OldOrdersSearch/>];

    return(<Fragment>
        <div className='page-wrapper'>
            <div className='master-orders-search-buttons'>
                <button className='button-grey' style={{backgroundColor: myOrdersChoose?'':'#21212126'}}
                    onClick={() => {
                        setMyOrdersChoose(false);
                        setIdComp(0);
                    }}>Обзор</button>
                <button className='button-grey' style={{backgroundColor: myOrdersChoose?'#21212126':''}}
                    onClick={() => {
                        setMyOrdersChoose(true);
                        setIdComp(1);
                    }}>Мои заказы</button>
            </div>
            {comps[idComp]}
        </div>
    </Fragment>);
}

export default MasterOrdersSearch;