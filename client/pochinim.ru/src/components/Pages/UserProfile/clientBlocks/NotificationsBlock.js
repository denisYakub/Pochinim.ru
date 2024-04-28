import { Fragment } from "react";

const  NotificationsBlock = ({notification_option}) => {
    return(<Fragment>
        <div className="phases-wrapper">
            <div>
                <h1>Уведомления</h1>
                <p>Уведомления по заказм будут приходить</p>
            </div>
            <div className="">
                <div className="radio-button">
                    <input type='radio' checked></input>
                    <p>На почту и СМС</p>
                </div>
                <div className="radio-button">
                    <input type='radio' checked={false}></input>
                    <p>На почту</p>
                </div>
                <div className="radio-button">
                    <input type='radio' checked={false}></input>
                    <p>СМС</p>
                </div>
            </div>
        </div>
    </Fragment>);
}

export default NotificationsBlock;