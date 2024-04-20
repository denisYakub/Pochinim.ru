import { Fragment, useEffect, useRef, useState } from "react";
import {observer} from "mobx-react-lite"
import '../MainPage/Mainpage.css'
import { motion } from "framer-motion";
import Popup from "../Popup/Popup";
import WebSiteController from "../../controllers/WEBSITE-controller";
import ButtonGoTo from "../../animations/button-go-to";

const reviews = await WebSiteController.getReviews();
  
const hints = await WebSiteController.getHints();

const services = await WebSiteController.getServices();

const steps = ["ЗАПОЛНИ АНКЕТУ", "ЗАПОЛНИ АНКЕТУ", "ЗАПОЛНИ АНКЕТУ", "ЗАПОЛНИ АНКЕТУ"]

const MainPAge = () => {

    const [widthSteps, setWidthSteps] = useState(0);
    const carouselSteps = useRef();

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    const [active, setActive] = useState(true);

    const cookies = <Popup active={active} setActive={setActive}>
    Этот сайт использует куки для улучшения вашего опыта. Продолжая использовать сайт, вы соглашаетесь с нашей Политикой конфиденциальности.
    </Popup>;
    
    useEffect(() => {
        localStorage.getItem('token')?setActive(false):setActive(true);
        setWidthSteps(carouselSteps.current.scrollWidth-carouselSteps.current.offsetWidth);
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    },[])
    
    return(<Fragment>
        <div className="mainPage">
            <div className="whiteCover">
            <div className="title">
                <a name="title-a1">починим.ру</a>
                <a className="title-a2"> мастера, которым можно доверить</a>
            </div>
            <div className="out-search">
            <div className="inner-search">
                <div className="searchLine">
                    <input value={"Услуга или специалист"} className="searchInput"
                    onChange={() => {}}>
                        
                    </input>
                    <button className="searchButton">
                        <div className="inner-Button">
                        Найти
                        </div>
                    </button>
                </div>
                <div className="hints">
                    {hints.map((item, index) => {
                        return(
                            <button className="hint" key={index}>
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>
            </div>
            <div className="aboutUs">
                <div className="left-aboutUs">
                    <button className="buttonMore">
                        O нас
                    </button>
                    <div className="icon-aboutUs">
                    </div>
                </div>
                <div className="right-aboutUs">
                    <div className="mainaboutUs">
                    <ButtonGoTo text={"Написать задание"} road={"/CreateTopic"}></ButtonGoTo>
                    <a className="a1">
                    “Починим.ру начал свой путь в 2010 году как небольшая стартап-команда, стремящаяся упростить процесс ремонта для людей.” 
                    </a>
                    </div>
                    <div className="states">
                        <div className="state">
                            <h1>
                                {"<3 часа"}
                            </h1>
                            <a>
                            Среднее время нахождения мастера для ремонта
                            </a>
                        </div>
                        <div className="state">
                            <h1>
                            + 7,000
                            </h1>
                            <a>
                            успешно завершенных ремонтов
                            </a>
                        </div>
                        <div className="state">
                            <h1>
                            85%
                            </h1>
                            <a>
                            клиентов оценили наш сервис на 5 звезд
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="aboutService">
                <button className="buttonMore">
                О сервисе
                </button>
                <div className="howTo">
                    <motion.div ref={carouselSteps} className="steps" 
                    whileTap={{cursor: "grabbing"}} >
                        <motion.div className="inner-steps"
                        drag='x' 
                        dragConstraints={{right: 0, left: -widthSteps}}>
                            {steps.map((item, index)=>{
                                return(<motion.div 
                                className="itemStep"
                                key={index}>
                                    {index},{item}
                                </motion.div>);
                            })}
                        </motion.div>
                    </motion.div>
                    <div className="annotation">
                        <a>
                        Мастера найти просто, сделай всего несколько кликов!
                        </a>
                        <div className="icon-Service">

                        </div>
                        <div className="containerForProgressOfAnnotation">
                            01
                            <progress>
                            </progress>
                            02 03
                        </div>
                    </div>
                </div>
            </div>
            <div className="services">
                <button className="buttonMore">
                Услуги
                </button>
                <div className="listOfServices">
                    {services.map((item, index) => {
                        return(
                        <div className="service" key={index}>
                            <div className="mainBranchService">
                                <h1>{item.mainBrunch.name}</h1>
                                <div>{item.mainBrunch.numberOfMasters}</div>
                            </div>
                            <div className="subBranchesService">
                                {item.subBrunches.map((subitem, subindex) => {
                                    return(<button key={subindex} className="listOfBranches">
                                        {subitem}
                                    </button>);
                                })}
                            </div>
                        </div>)
                    })}
                </div>
                <a href="" className="allservicesHRef">
                Все услуги
                </a>
            </div>
            <div className="reviews-carousel">
                <button className="buttonMore">
                    Отзывы
                </button>
                <motion.div ref={carousel} className="carousel" 
                    whileTap={{cursor: "grabbing"}}>
                    <motion.div 
                        drag='x' 
                        dragConstraints={{right: 0, left: -width}} 
                        className="inner-carousel"
                        animate={{x:[0, -width, 0]}}
                        transition={{type: "tween", duration: 100, repeat: Infinity}}
                        >
                        {reviews.map((item, index) => {
                            return (
                                <motion.div className="item" key={index}>
                                    <div className="itemsReview">
                                        <h1>{item.review.topic}</h1>
                                        <a className="a3">{item.review.time}</a>
                                        <a className="a4">{item.review.price}</a>
                                        <a className="a5">{item.review.a}</a>
                                        <a className="a6">{item.review.date}</a>
                                    </div>
                                    <div className="itemsMaster">
                                        <div className="photoMaster"></div>
                                        <div className="aboutMaster">
                                            <a>{item.master.name}</a>
                                            <a>{item.master.rate}</a>
                                            <a>{item.master.stat}</a>
                                        </div>
                                    </div>
                                </motion.div>
                                );
                            })}
                    </motion.div>
                </motion.div>
            </div>
            <div className="whiteCoverEnd">
            <div className="forum">
            <div className="left-PartOfForum">
                <button className="buttonMore">
                    Форум
                </button>
                <div className="icon-Forum"></div>
            </div>
            <div className="right-PartOfForum">
                <div className="mainOfForum">
                    <ButtonGoTo text={"Читать форум"} road={"/"}></ButtonGoTo>
                    <a>Здесь вы можете общаться с другими пользователями, делиться опытом, задавать вопросы и получать ответы от экспертов.</a>
                </div>
            <div className="digitalPartOfForum">
            <div className="wrapper">
                    <div className="container">
                    <input type="radio" name="slide" id="c1" defaultChecked></input>
                    <label htmlFor="c1" className="card">
                        <div className="row">
                            <div className="description">
                                <h4>68%</h4>
                                <p>пользователей находят ответ на свой вопрос на форуме</p>
                            </div>
                        </div>
                    </label>
                    <input type="radio" name="slide" id="c2" ></input>
                    <label htmlFor="c2" className="card">
                        <div className="row">
                            <div className="description">
                                <h4>68%</h4>
                                <p>пользователей находят ответ на свой вопрос на форуме</p>
                            </div>
                        </div>
                    </label>
                    <input type="radio" name="slide" id="c3" ></input>
                    <label htmlFor="c3" className="card">
                        <div className="row">
                            <div className="description">
                                <h4>68%</h4>
                                <p>пользователей находят ответ на свой вопрос на форуме</p>
                            </div>
                        </div>
                    </label>
                    <input type="radio" name="slide" id="c4" ></input>
                    <label htmlFor="c4" className="card">
                        <div className="row">
                            <div className="description">
                                <h4>68%</h4>
                                <p>пользователей находят ответ на свой вопрос на форуме</p>
                            </div>
                        </div>
                    </label>
                    </div>
                </div>
                <motion.div className="shaker">
                            <motion.a>
                            Дизайн и оформление
                            </motion.a>
                            <motion.a>
                            Бытовая техника
                            </motion.a>
                            <motion.a>
                            Инженерные работы
                            </motion.a>
                </motion.div>
            </div>
            </div>
            </div>
            <motion.div className="blog">

            </motion.div>
        </div>
        </div>
        {cookies}
    </Fragment>);

}

export default observer(MainPAge);