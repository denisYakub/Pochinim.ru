import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import '../SearchPage/SearchPage.css'

const ListOfTopics = () => {

    const state = useLocation();
    const navigate = useNavigate();
    
    return (<Fragment>
        <div className='searchPage'>
            {state.state?.search}
            <div className='list'>

            </div>
            <div className='createTopic'>
                <button onClick={() => navigate('/CreateTopic')}>
                    создать тему
                </button>
            </div>
        </div>
    </Fragment>);
};

export default ListOfTopics;