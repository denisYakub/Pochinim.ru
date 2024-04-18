import { Fragment, useContext, useEffect, useState } from 'react';
import '../MasterProfile/MasterProfile.css';
import { Link, useParams } from 'react-router-dom';
import { contextCreatetopic } from '../../contexts/contextCreatetopic';
import masterController from '../../controllers/MASTER-controller';

const MasterProfile = () => {

    const params = useParams();
    //const { topic } = useContext(contextCreatetopic);

    const prev_page = params.pev_page;
    const id_master = params.id;

    const [reviews, setReviews] = useState(null);
    const [masterInf, setMasterInf] = useState(null);

    useEffect(() => {
        const setData = async() => {
            setReviews(await masterController.getReviewsById(id_master));
            setMasterInf(await masterController.getWholeInfById(id_master));
        }
        setData();
    },[])

    return(<Fragment>
        <div className='master-profile'>
            <div className='profile-wrapper'>
                <div className='go-back-to-origin'>
                    <div className='go-back-button'>
                        <div className='back-icon'></div>
                        <Link to={`/${prev_page}`}>{prev_page}</Link>
                    </div>
                    <div className='navigation-profile-wrapper'>
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>
                </div>
                <div className='profile-info'>
                        
                </div>
            </div>
        </div>
    </Fragment>)
}

export default MasterProfile;