import { Fragment, useContext, useEffect } from 'react';
import '../MasterProfile/MasterProfile.css';
import { Link, useParams } from 'react-router-dom';
import { contextCreatetopic } from '../../contexts/contextCreatetopic';

const MasterProfile = () => {

    const params = useParams();
    const { topic } = useContext(contextCreatetopic);

    const prev_page = params.pev_page;

    useEffect(() => {
        console.log(topic);
    },[])

    return(<Fragment>
        <div className='master-profile'>
            <Link to={`/${prev_page}`}>{prev_page}</Link>
            MasterProfile
        </div>
    </Fragment>)
}

export default MasterProfile;