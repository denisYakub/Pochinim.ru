import { Fragment, useEffect, useRef, useState } from "react";
import {observer} from "mobx-react-lite"
import './Mainpage.css'
import { motion, useInView } from "framer-motion";
import Popup from "../../Popups/AlarmPopup/AlarmPopup";
import WebSiteController from "../../../controllers/WEBSITE-controller";
import ButtonGoTo from "../../../animations/button-go-to";
import ProgressBar from '../../../animations/progress-bar';
import { Link } from "react-router-dom";

const MainPAge = () => {

    const reviews = WebSiteController.getReviews();
  
    const hints = WebSiteController.getHints();
    
    const services = WebSiteController.getServices();
    
    const mainPageText = { cokies: 'Этот сайт использует куки для улучшения вашего опыта. Продолжая использовать сайт, вы соглашаетесь с нашей Политикой конфиденциальности.',
                            title: {logo: 'починим.ру', text: 'мастера, которым можно доверить'},
                            about_us: {title: '“Починим.ру начал свой путь в 2010 году как небольшая стартап-команда, стремящаяся упростить процесс ремонта для людей.”',
                                        statistic: [{title: '<3 часа', sub_title: 'Среднее время нахождения мастера для ремонта'}, 
                                                    {title: '+ 7,000', sub_title: 'успешно завершенных ремонтов'}, 
                                                    {title: '85%', sub_title: 'клиентов оценили наш сервис на 5 звезд'}]},
                            about_service: {title: 'Мастера найти просто, сделай всего несколько кликов!',
                                            steps: ["ЗАПОЛНИ АНКЕТУ", "ЗАПОЛНИ АНКЕТУ", "ЗАПОЛНИ АНКЕТУ"]},
                            forum: {title: 'Здесь вы можете общаться с другими пользователями, делиться опытом, задавать вопросы и получать ответы от экспертов.',
                                    info: [{title: '68%', sub_title: 'пользователей находят ответ на свой вопрос на форуме'},
                                            {title: '68%', sub_title: 'пользователей находят ответ на свой вопрос на форуме'},
                                            {title: '68%', sub_title: 'пользователей находят ответ на свой вопрос на форуме'},
                                            {title: '68%', sub_title: 'пользователей находят ответ на свой вопрос на форуме'}]},
                            
    };

    const ref_progress_0 = useRef(null);
    const isInView_0 = useInView(ref_progress_0);
    const ref_progress_1 = useRef(null);
    const isInView_1 = useInView(ref_progress_1);
    const ref_progress_2 = useRef(null);
    const isInView_2 = useInView(ref_progress_2);

    const [ref_progresses, set_ref_progresses] = useState([ref_progress_0, ref_progress_1, ref_progress_2]);

    const [progress, setProgress] = useState(0);

    const [widthSteps, setWidthSteps] = useState(0);
    const carouselSteps = useRef();

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    const [active, setActive] = useState(true);
    const cookies = <Popup active={active} setActive={setActive}>{mainPageText.cokies}</Popup>;
    
    useEffect(() => {
        localStorage.getItem('token')?setActive(false):setActive(true);
        setWidthSteps(carouselSteps.current.scrollWidth-carouselSteps.current.offsetWidth);
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        if(isInView_2){
            setProgress(100);
        }
        if(!isInView_2){
            setProgress(66.6);
        }
        if(!isInView_1 && !isInView_2){
            setProgress(33.3);
        }
    },[isInView_0, isInView_1, isInView_2])
    
    return(<Fragment>
        <div className="page-wrapper">
            <div className="main-page-content">
                <div className="white-cover-end">
                    <div className="title">
                        <h1>{mainPageText.title.logo}</h1>
                        <h2>{mainPageText.title.text}</h2>
                    </div>
                    <div className="main-page-search">
                        <div className="main-page-search-input">
                            <input className="text-input-field"
                                placeholder="Услуга или специалист" value={''}
                                onChange={() => {}}></input>
                            <button className="searchButton">{'Найти'}</button>
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
                    <div className="aboutUs">
                        <div className="left-aboutUs">
                            <button className="buttonMore">{'O нас'}</button>
                            <div className="icon-aboutUs"></div>
                        </div>
                        <div className="right-aboutUs">
                            <div className="main-about-us">
                                <ButtonGoTo text={"Написать задание"} 
                                    road={`/CreateTopic/${localStorage.getItem('mail')}`}></ButtonGoTo>
                                <h1 className='sub-title'>
                                     {mainPageText.about_us.title}
                                </h1>
                            </div>
                            <div className="about-us-states">
                                {mainPageText.about_us.statistic.map(val => {
                                    return(
                                        <div className="about-us-state">
                                            <h1>{val.title}</h1>
                                            <p>{val.sub_title}</p>
                                        </div>);
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aboutService">
                    <button className="buttonMore">{'О сервисе'}</button>
                    <div className="howTo">
                        <motion.div ref={carouselSteps} className="steps" 
                            whileTap={{cursor: "grabbing"}} >
                            <motion.div className="inner-steps"
                                animate={{x:[0, -widthSteps, 0]}}
                                transition={{type: "tween", duration: 50, repeat: Infinity}}>
                                {mainPageText.about_service.steps.map((item, index)=>{
                                    return(<motion.div 
                                    className="itemStep"
                                    key={index}>
                                        <h1>{item}</h1>
                                        <p ref={ref_progresses[index]}>{index}</p>
                                    </motion.div>);
                                })}
                            </motion.div>
                        </motion.div>
                        <div className="annotation">
                            <p>{mainPageText.about_service.title}</p>
                            <div className="icon-Service"></div>
                            <div className="containerForProgressOfAnnotation">
                                {'1'}
                                <ProgressBar bgcolor={'#3838CE'} completed={progress}></ProgressBar>
                                {'3'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="services">
                    <button className="buttonMore">{'Услуги'}</button>
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
                    <Link to={''} className="allservicesHRef">{'Все услуги'}</Link>
                </div>
                <div className="reviews-carousel">
                    <button className="buttonMore">{'Отзывы'}</button>
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
                                            <p className="a3">{item.review.time}</p>
                                            <p className="a4">{item.review.price}</p>
                                            <p className="a5">{item.review.a}</p>
                                            <p className="a6">{item.review.date}</p>
                                        </div>
                                        <div className="itemsMaster">
                                            <div className="photoMaster"></div>
                                            <div className="aboutMaster">
                                                <p>{item.master.name}</p>
                                                <p>{item.master.rate}</p>
                                                <p>{item.master.stat}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                    );
                                })}
                        </motion.div>
                    </motion.div>
                </div>
                <div className="white-cover-start">
                    <div className="forum">
                        <div className="left-PartOfForum">
                            <button className="buttonMore">{'Форум'}</button>
                            <div className="icon-Forum"></div>
                        </div>
                        <div className="right-PartOfForum">
                            <div className="mainOfForum">
                                <ButtonGoTo text={"Читать форум"} road={"/"}></ButtonGoTo>
                                <a>{mainPageText.forum.title}</a>
                            </div>
                            <div className="digitalPartOfForum">
                                <div className="wrapper">
                                    <div className="container">
                                        <input type="radio" name="slide" id="c1" defaultChecked></input>
                                        <label htmlFor="c1" className="card">
                                            <div className="row">
                                                <button>{'Статистика'}</button>
                                                <div className="description">
                                                    <h1>{mainPageText.forum.info[0].title}</h1>
                                                    <p>{mainPageText.forum.info[0].sub_title}</p>
                                                </div>
                                            </div>
                                        </label>
                                        <input type="radio" name="slide" id="c2" ></input>
                                        <label htmlFor="c2" className="card">
                                            <div className="row">
                                                <button>{'Статистика'}</button>
                                                <div className="description">
                                                    <h1>{mainPageText.forum.info[1].title}</h1>
                                                    <p>{mainPageText.forum.info[1].sub_title}</p>
                                                </div>
                                            </div>
                                        </label>
                                        <input type="radio" name="slide" id="c3" ></input>
                                        <label htmlFor="c3" className="card">
                                            <div className="row">
                                                <button>{'Статистика'}</button>
                                                <div className="description">
                                                    <h1>{mainPageText.forum.info[2].title}</h1>
                                                    <p>{mainPageText.forum.info[2].sub_title}</p>
                                                </div>
                                            </div>
                                        </label>
                                        <input type="radio" name="slide" id="c4" ></input>
                                        <label htmlFor="c4" className="card">
                                            <div className="row">
                                                <button>{'Статистика'}</button>
                                                <div className="description">
                                                    <h1>{mainPageText.forum.info[3].title}</h1>
                                                    <p>{mainPageText.forum.info[3].sub_title}</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <motion.div className="shaker">
                                    <motion.p 
                                    animate={{
                                        x: (Math.random() * (100 - (-100)) + (-100)), 
                                        y: (Math.random() * (100 - (-100)) + (-100)), 
                                        rotate: (Math.random() * (100 - (-100)) + (-100))
                                    }}>
                                        {'Дизайн и оформление'}
                                    </motion.p>
                                    <motion.p  
                                    animate={{
                                        x: (Math.random() * (100 - (-100)) + (-100)), 
                                        y: (Math.random() * (100 - (-100)) + (-100)), 
                                        rotate: (Math.random() * (100 - (-100)) + (-100))
                                    }}>
                                        Бытовая техника
                                    </motion.p>
                                    <motion.p   
                                    animate={{
                                        x: (Math.random() * (100 - (-100)) + (-100)), 
                                        y: (Math.random() * (100 - (-100)) + (-100)), 
                                        rotate: (Math.random() * (100 - (-100)) + (-100))
                                    }}>
                                        Инженерные работы
                                    </motion.p>
                                    <motion.p 
                                    animate={{
                                        x: (Math.random() * (100 - (-100)) + (-100)), 
                                        y: (Math.random() * (100 - (-100)) + (-100)), 
                                        rotate: (Math.random() * (100 - (-100)) + (-100))
                                    }}>
                                        Ремонт и отделка
                                    </motion.p>
                                    <motion.p  
                                    animate={{
                                        x: (Math.random() * (100 - (-100)) + (-100)), 
                                        y: (Math.random() * (100 - (-100)) + (-100)), 
                                        rotate: (Math.random() * (100 - (-100)) + (-100))
                                    }}>
                                        Компьютеры и электроника
                                    </motion.p>
                                    <motion.p  
                                    animate={{
                                        x: (Math.random() * (100 - (-100)) + (-100)), 
                                        y: (Math.random() * (100 - (-100)) + (-100)), 
                                        rotate: (Math.random() * (100 - (-100)) + (-100))
                                    }}>
                                        Инженерные работы
                                    </motion.p>
                                    <motion.p  
                                    animate={{
                                        x: (Math.random() * (100 - (-100)) + (-100)), 
                                        y: (Math.random() * (100 - (-100)) + (-100)), 
                                        rotate: (Math.random() * (100 - (-100)) + (-100))
                                    }}>
                                        Авторемонт
                                    </motion.p>
                                    <motion.p 
                                    animate={{
                                        x: (Math.random() * (100 - (-100)) + (-100)), 
                                        y: (Math.random() * (100 - (-100)) + (-100)), 
                                        rotate: (Math.random() * (100 - (-100)) + (-100))
                                    }}>
                                        Мелкий ремонт
                                    </motion.p>
                                    <motion.p  
                                    animate={{
                                        x: (Math.random() * (100 - (-100)) + (-100)), 
                                        y: (Math.random() * (100 - (-100)) + (-100)), 
                                        rotate: (Math.random() * (100 - (-100)) + (-100))
                                    }}>
                                        Мебель
                                    </motion.p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {cookies}
    </Fragment>);

}

export default observer(MainPAge);