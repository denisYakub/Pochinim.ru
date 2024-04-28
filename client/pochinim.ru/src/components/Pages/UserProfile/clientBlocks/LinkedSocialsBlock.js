import { Fragment } from "react";
import { Link } from "react-router-dom";

const LinkedSocialsBlock = ({socials}) =>{
    return(<Fragment>
        <div className="phases-wrapper">
            <div>
                <h1>Привязанные соц сети</h1>
                <p>Подключите соцсети, чтобы входить за пару кликов с любого устройства. Не публикуем ссылки на ваши соцсети.</p>
            </div>
            <div className="socials">
                {socials?.map((val, ind) => {
                    return(<div key={ind} className="social">
                        <div className="radio-button">
                            <input type='radio' checked></input>
                            <p>{val?.name}</p>
                        </div>
                        <Link>Отвязать</Link>
                    </div>);
                })}
            </div>
        </div>
    </Fragment>);
}

export default LinkedSocialsBlock;