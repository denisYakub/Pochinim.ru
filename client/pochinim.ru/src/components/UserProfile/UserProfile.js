import { Fragment } from "react";
import "../UserProfile/UserProfile.css"
import { useNavigate } from 'react-router-dom'
import USERController from "../../controllers/USER-controller";

const UserProfile = () => {

    const navigate = useNavigate();

    const logout = async () => {
        await USERController.logOutUser();
        navigate('/')
    }

    return(<Fragment>
            <div className="prof">
                <h1>
                    UserProfile
                </h1>
                <button onClick={logout}>
                    logOut
                </button>
            </div>
            <div className="testFont">
                <h1 className="font-1">
                    Test new added font 1
                </h1>
                <h1 className="font-2">
                    Test new added font 2
                </h1>
            </div>
        </Fragment>);
};

export default UserProfile;