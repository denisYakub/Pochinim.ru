import { Fragment, useContext, useEffect, useRef, useState } from "react";
import {observer} from "mobx-react-lite"
import '../MainPage/Mainpage.css'
import {motion, px, useAnimate, useInView} from "framer-motion";
import none from '../img/none.png'

const review = {
  review: {
    topic: "Чистка ноутбука, замена термопасты",
    time: "Мастер нашелся за 15 мин",
    price: "1200 руб, оплата СБР",
    text: "Первый раз за 8 лет решила почистить ноутбук, в жару он стал сильно греться. Услуга была выполнена быстро и качественно, за 30 минут. Всем очень довольна!:)",
    date: "5 декабря 2023 г.",
  },
   master: {
      name: "Александр Н.",
      rate: "Рейтинг мастера: 4.5",
      stat: "Выполнил: 122 задания ",
      photo: "defult"
   }
  }

  const reviews = [review, review, review, review, review, review, review, review, review, review, review, review];
  
  const hints = ["Прорволо трубу", "Сломался кондиционер", "Починить телефон"];

  const service = {
    mainBrunch: {
        name: "Электроника",
        numberOfMasters: 1545
    },
    subBrunches: ["Ремонт компьютеров", "Ремонт оргтехники", "Ремонт приставок", "Ремонт телефонов", "Ремонт электроники", "+"]
  }

  const services = [service, service, service, service, service, service]

const MainPAge = () => {

    /*const [words , setWords] = useState("");
    
    useEffect(() => {

        const fn1 = async () => {
            const w = await fetchWelcomeWords();
            setWords(w);
        }

        fn1();
        
    }, [])*/

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleCardClick = (index) => {
        setExpandedIndex(index === expandedIndex ? -1 : index);
    }

    const cardVariants = {
        expanded: "400px",
        collapsed: "200px"
    }

    const cardImages = [none, none, none, none];

    const cardDescription = ["пользователей находят ответ на свой вопрос на форуме"]

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    },[])
    
    return(<Fragment>
        <body className="mainPage">
            <div className="title">
                <text className="title-text">Повседневная</text>
                <text className="title-text">практика показывает</text>
                <text className="title-text">что рамки</text>
                <text className="title-text">место обучения</text>
            </div>
            <div className="out-search">
            <div className="inner-search">
                <div className="searchLine">
                    <input value={"Услуга или специалист"} className="searchInput">

                    </input>
                    <button className="searchButton">
                        Найти
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
                <button className="buttonMore">
                    о нас
                </button>
                <div className="left-aboutUs">
                    <text className="mainTextaboutUs">
                    “Починим.ру начал свой путь в 2010 году как небольшая стартап-команда, стремящаяся упростить процесс ремонта для людей.” 
                    </text>
                    <div className="states">
                        <div className="state-1">
                            <h1>
                                {"<3 часа"}
                            </h1>
                            <text>
                            Среднее время нахождения мастера для ремонта
                            </text>
                        </div>
                        <div className="state-2">
                            <h1>
                            + 7,000
                            </h1>
                            <text>
                            успешно завершенных ремонтов
                            </text>
                        </div>
                        <div className="state-3">
                            <h1>
                            85%
                            </h1>
                            <text>
                            клиентов оценили наш сервис на 5 звезд
                            </text>
                        </div>
                    </div>
                </div>
            </div>
            <div className="aboutService">
                <button className="buttonMore">
                О сервисе
                </button>
                <div className="howTo">
                    <div className="steps">

                    </div>
                    <div className="annotation">
                        <text className="wordsOfAnnotation">
                        Мастера найти просто, сделай всего несколько кликов!
                        </text>
                        <progress className="progressOfAnnotation">

                        </progress>
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
            <div className="reviews">
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
                        transition={{type: "tween", duration: 15, repeat: Infinity}}
                        >
                        {reviews.map((item, index) => {
                            return (
                                <motion.div className="item" key={index}>
                                    <div className="itemsReview">
                                        <h1>{item.review.topic}</h1>
                                        <p>{item.review.time}</p>
                                        <text>{item.review.price}</text>
                                        <text>{item.review.text}</text>
                                        <p>{item.review.date}</p>
                                    </div>
                                    <div className="itemsMaster">
                                        <div className="photoMaster"></div>
                                        <div className="aboutMaster">
                                            <text>{item.master.name}</text>
                                            <text>{item.master.rate}</text>
                                            <text>{item.master.stat}</text>
                                        </div>
                                    </div>
                                </motion.div>
                                );
                            })}
                    </motion.div>
                </motion.div>
            </div>
            <div className="forum">
            <button className="buttonMore">
                Форум
            </button>
            <div className="leftPartOfForum">
                <text className="mainTextOfForum">Здесь вы можете общаться с другими пользователями, делиться опытом, задавать вопросы и получать ответы от экспертов.</text>
            <div className="digitalPartOfForum">
            <div class="wrapper">
                    <div class="container">
                    <input type="radio" name="slide" id="c1"></input>
                    <label for="c1" class="card">
                        <div class="row">
                            <div class="description">
                                <h4>68%</h4>
                                <p>пользователей находят ответ на свой вопрос на форуме</p>
                            </div>
                        </div>
                    </label>
                    <input type="radio" name="slide" id="c2" ></input>
                    <label for="c2" class="card">
                        <div class="row">
                            <div class="description">
                                <h4>68%</h4>
                                <p>пользователей находят ответ на свой вопрос на форуме</p>
                            </div>
                        </div>
                    </label>
                    <input type="radio" name="slide" id="c3" ></input>
                    <label for="c3" class="card">
                        <div class="row">
                            <div class="description">
                                <h4>68%</h4>
                                <p>пользователей находят ответ на свой вопрос на форуме</p>
                            </div>
                        </div>
                    </label>
                    <input type="radio" name="slide" id="c4" ></input>
                    <label for="c4" class="card">
                        <div class="row">
                            <div class="description">
                                <h4>68%</h4>
                                <p>пользователей находят ответ на свой вопрос на форуме</p>
                            </div>
                        </div>
                    </label>
                    </div>
                </div>     
                <div className="shaker">
                            Im shaker
                </div>
            </div>
            </div>
            </div>
            <motion.div className="blog">

            </motion.div>
        </body>
    </Fragment>);

}

export default observer(MainPAge);