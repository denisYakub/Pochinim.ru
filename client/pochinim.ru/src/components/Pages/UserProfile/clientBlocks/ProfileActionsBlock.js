import { Fragment } from "react";
import { Link } from "react-router-dom";
import USERController from '../../../../controllers/USER-controller';

const ProfileActionsBlock = () => {

    const logout = async () => {
        await USERController.logOutUser();
    };

    return (<Fragment>
        <div className="phases-wrapper">    
            <h1>Действия с профилем</h1>
            <div>
                <Link>Удалить</Link>
                <p>Вы потеряете историю заказов и контакты специалистов.</p>
            </div>
            <div>
                <Link to={'/'} onClick={() => logout()}>Выйти</Link>
            </div>
        </div>
    </Fragment>);
}

export default ProfileActionsBlock;