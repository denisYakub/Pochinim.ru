import { Fragment } from "react";
import { Link } from "react-router-dom";

const ActionsBlock = () => {


    return (<Fragment>
        <div className="phases-wrapper">    
            <h1>Действия с профилем</h1>
            <div className="delete-account">
                <Link className="link-black">Удалить</Link>
            </div>
            <div>
                <Link className="link-black" onClick={() => {}}>Выйти</Link>
            </div>
        </div>
    </Fragment>);
}

export default ActionsBlock;