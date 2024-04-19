import { Fragment, useEffect } from "react";
import "../UserProfile/UserProfile.css"
import { useNavigate } from 'react-router-dom'
import USERController from "../../controllers/USER-controller";

const UserProfile = () => {

    const navigate = useNavigate();

    const logout = async () => {
        if(await USERController.logOutUser()){
            navigate('/');
        }
    }

    useEffect(()=>{},[navigate]);

    return(<Fragment>
            <div className="user-profile">
                <div className='profile-wrapper'>
                    <div className='navigation-profile-wrapper'>
                        <button onClick={e => logout()} className='button-grey'>logOut</button>
                    </div>
                    <div className='profile-info'>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>);
};

export default UserProfile;