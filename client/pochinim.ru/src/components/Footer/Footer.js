import {React, Fragment, useEffect} from "react";
import '../Footer/Footer.css'
const Footer = () => {
    return(<Fragment>
        <div className="footer">
        <div className="inner-footer">
            <div className="leftPart">
                <a className="logo">
                починим.ру
                </a>
                <div className="mediaButtonDiv">
                    <button className="mediaButton">
                        
                    </button>
                    <button className="mediaButton">
                        
                    </button>
                    <button className="mediaButton">
                        
                    </button>
                </div>
                <a className="copyRight">
                © POCHINIM.RU, 2010–2024
                </a>
            </div>
            <div className="rightPart">
                <div className="ref">
                    <div className="col">
                        <a>
                        О нас
                        </a>
                        <a>
                        Блог
                        </a>
                        <a>
                        Все услуги
                        </a>
                        <a>
                        Все отзывы
                        </a>
                    </div>
                    <div className="col">
                        <a>
                        Создать заказ
                        </a>
                        <a>
                        История моих заказов
                        </a>
                        <a>
                        Условия использования
                        </a>
                        <a>
                        Служба поддержки 
                        </a>
                    </div>
                    <div className="col">
                        <a>
                        Для специалистов
                        </a>
                        <a>
                        Вход для специалистов
                        </a>
                        <a>
                        Партнерская программа
                        </a>
                    </div>
                </div>
                <div className="req">
                    <a className="ask">
                    Есть предложения?
                    </a>
                    <div className="input">
                        <input className="inputLine"></input>
                        <button className="inputButton">
                            
                        </button>
                    </div>
                </div>
                <a className="info">ООО «Починим.РУ» осуществляет деятельность в области информационных технологий. Вид деятельности (код): 2.01.</a>
            </div>
        </div>
        </div>
        </Fragment>);
}

export default Footer;