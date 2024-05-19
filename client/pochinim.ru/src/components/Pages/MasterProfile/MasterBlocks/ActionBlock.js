import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import masterController from '../../../../controllers/MASTER-controller';

const ActionsBlock = () => {

    const navigate = useNavigate();
    
    const logout = async () => {
        await masterController.logOutMaster()
        navigate('/')
    };

    return (<Fragment>
        <div className="phases-wrapper">    
            <h1>Действия с профилем</h1>
            <div className="delete-account">
                <Link className="link-black">Удалить</Link>
            </div>
            <div>
                <Link className="link-black" onClick={() => logout()}>Выйти</Link>
            </div>
        </div>
    </Fragment>);
}

export default ActionsBlock;