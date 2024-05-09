import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import USERController from '../../../../controllers/USER-controller';

const ProfileActionsBlock = () => {

    const navigate = useNavigate();

    const logout = async () => {
        await USERController.logOutUser();
        navigate('/')
    };

    return (<Fragment>
        <div className="phases-wrapper">    
            <h1>Действия с профилем</h1>
            <div className="delete-account">
                <Link className="link-black">Удалить</Link>
                <p>Вы потеряете историю заказов и контакты специалистов.</p>
            </div>
            <div>
                <Link className="link-black" onClick={() => logout()}>Выйти</Link>
            </div>
        </div>
    </Fragment>);
}

export default ProfileActionsBlock;