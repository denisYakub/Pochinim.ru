import { useRef, useState } from "react"
import { getListOfExistingTopics, getListOfWhatHappend, getListOfWork, getListofWhereIsProblem } from "../../services/createTopic-services"
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import {motion, useAnimate} from 'framer-motion'
import buttonsAnimations from "../../animations/buttons-animations.js";

const optionsOfExistingTopics = await getListOfExistingTopics();
const optionsOfWork = await getListOfWork();
const optionsOfWhatHappend = await getListOfWhatHappend();
const optionsOfWhereIsProblem = await getListofWhereIsProblem();

const key = "52112b4d-5217-4897-8975-50bb62c674a6";

const Stage1 = ({topic, setTopic, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();

    return(<div className="blockPhase">
        <h1>
            Как назвать задачу?
        </h1>
        
        <div className="inputAndError">
            <input placeholder="Сантехник" ref={errorRed} value={topic} onChange={e => setTopic(e.target.value)}></input> 
            {error
                ?<div className="errorInStage"
                onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                </div>
                : console.log("no_errors")}
            <motion.a className="errorStageMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>Ошибка ввода</motion.a>
        </div>
        <div className="topicNameHints">
            <button>
            Сантехник
            </button>
            <button>
            Ремонт
            </button>
            <button>
            Срочно
            </button>
            <button>
            Дистанционно
            </button>
        </div>
    </div>)
}
const Stage2 = ({FIO, setFIO, phoneNumber, setphoneNumber, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();

    return(<div className="blockPhase">
        <h1>
            Контактная информация
        </h1>
        <div className="contact">
            <div className="inputAndError">
                <input placeholder="Имя Фамилия" value={FIO} ref={errorRed} onChange={e => setFIO(e.target.value)}></input>
                {error
                    ?<div className="errorInStage"
                    onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                    onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                    </div>
                    : console.log("no_errors")}
                <motion.a className="errorStageMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>Ошибка ввода</motion.a>
            </div>
            <div className="inputAndError">
                <input placeholder="+7-000-000-00-00" value={phoneNumber} ref={errorRed} onChange={e => setphoneNumber(e.target.value)}></input>
                {error
                    ?<div className="errorInStage"
                    onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                    onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                    </div>
                    : console.log("no_errors")}
                <motion.a className="errorStageMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>Ошибка ввода</motion.a>
            </div>
        </div>
    </div>)
}
const Stage3 = ({need, setneed, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();
    return(<div className="blockPhase">
        <h1>
            Что требуется?
        </h1>
        <div className="listOfOptions">
            {optionsOfWork.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio"></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="urInput">
                <input type="radio" className="urInput-radio"></input>
                <div className="inputAndError">
                    <input type="text" className="urInput-text" placeholder="Ваш вариант" value={need} ref={errorRed} onChange={e => setneed(e.target.value)}></input>
                    {error
                        ?<div className="errorInStage"
                        onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                        onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                        </div>
                        : console.log("no_errors")}
                    <motion.a className="errorStageMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>Ошибка ввода</motion.a>
                </div>
            </div>
        </div>
    </div>)
}
const Stage4 = ({problem, setProblem, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();
    return(<div className="blockPhase">
        <h1>
            Что случилось?
        </h1>
        <div className="listOfOptions">
            {optionsOfWhatHappend.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio"></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="urInput">
                <input type="radio" className="urInput-radio"></input>
                <div className="inputAndError">
                    <input type="text" className="urInput-text" placeholder="Ваш вариант" value={problem} ref={errorRed} onChange={e => setProblem(e.target.value)}></input>
                    {error
                        ?<div className="errorInStage"
                        onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                        onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                        </div>
                        : console.log("no_errors")}
                    <motion.a className="errorStageMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>Ошибка ввода</motion.a>
                </div>
            </div>
        </div>
    </div>)
}
const Stage5 = ({problemLocation, setProblemLocation, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();
    return(<div className="blockPhase">
        <h1>
            Где проблема?
        </h1>
        <div className="listOfOptions">
            {optionsOfWhereIsProblem.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio"></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="urInput">
                <input type="radio" className="urInput-radio"></input>
                <div className="inputAndError">
                    <input type="text" className="urInput-text" placeholder="Ваш вариант" value={problemLocation} ref={errorRed} onChange={e => setProblemLocation(e.target.value)}></input>
                    {error
                        ?<div className="errorInStage"
                        onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                        onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                        </div>
                        : console.log("no_errors")}
                    <motion.a className="errorStageMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>Ошибка ввода</motion.a>
                </div>
            </div>
        </div>
    </div>)
}
const Stage6 = ({address, setAddress, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();
    const [zoom, setZoom] = useState(9);
    const [center, setCenter] = useState([55.75, 37.57]);

    const [placemarkCoords, setPlacemarkCoords] = useState(null);

    const ymaps = useRef(null);
    const mapRef = useRef(null);

    function setLocation(loc){
        ymaps.current.geocode(loc).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const newCoords = firstGeoObject.geometry.getCoordinates();
            setCenter(newCoords);
            setZoom(10);
        })
    }

    const handleMapClick = (e) => {
        const coords = e.get("coords");
        setPlacemarkCoords(coords)
        
        ymaps.current.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const newAddress = [
                firstGeoObject.getLocalities().length
                    ? firstGeoObject.getLocalities()
                    : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                firstGeoObject.getPremiseNumber()
            ]
            .filter(Boolean)
            .join(", ");
            setAddress(newAddress);
        });
    };

    return(<div className="blockPhase">
        <h1>
            По какому адресу?
        </h1>
        <input placeholder={"Город, улица, дом"} ref={errorRed} onChange={e => setLocation(e.target.value)}></input>
        <div className="inputAndError">
            <p className="addressInfo" ref={errorRed}>{address}</p>
            {error
                ?<div className="errorInStage"
                onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                </div>
                : console.log("no_errors")}
            <motion.a className="errorStageMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>Ошибка ввода</motion.a>
        </div>
        <div className="Ymap">
        <YMaps query={{apikey: key}}>
            <Map onClick={handleMapClick} 
                onLoad={(e) => { ymaps.current = e }}
                modules={["Placemark", "geocode", "geoObject.addon.balloon"]}
                instanceRef={mapRef}
                state={{center: center, zoom: zoom}} 
                width={"862px"} height={"267px"}>
                    {placemarkCoords && (<Placemark geometry = 
                    {placemarkCoords}></Placemark>)}
            </Map>
        </YMaps>
        </div>
    </div>)
}
const Stage7 = ({date, setDate, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();

    return(<div className="blockPhase">
        <h1>
            Когда нужна услуга?
        </h1>
        <div className="inputAndError">
            <input type="date" ref={errorRed} onChange={e => setDate(e.target.value)}></input>
            {error
                ?<div className="errorInStage"
                onMouseEnter={() => buttonsAnimations.showErrorHint(1, {errorScope, animateError})}
                onMouseLeave={() => buttonsAnimations.showErrorHint(0, {errorScope, animateError})}>
                </div>
                : console.log("no_errors")}
            <motion.a className="errorStageMessage" ref={errorScope} initial={{scale: 0, y: 40, x: 542}}>Ошибка ввода</motion.a>
        </div>
    </div>)
}
const Stage8 = ({paymentOption, setPaymentOption, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();
    setPaymentOption(1);
    return(<div className="blockPhase">
        <h1>
            Сколько готовы заплатить за работу?
        </h1>
        <div className="paymentOptions">
            <div className="paymentOption">
                <input type="radio" className="urInput-radio"></input>
                <div>
                    <h1>Сделка без риска</h1>
                    <a>Оплата банковской картой с гарантией возврата и компенсацией материального ущерба до 10 000 ₽. Комиссия 11% + 35 ₽. Подробнее</a>
                </div>
            </div>
            <div className="paymentOption">
                <input type="radio" className="urInput-radio"></input>
                <div>
                    <h1>Оплата напрямую исполнителю</h1>
                    <a>Без гарантий и компенсаций Починим.ру: вы напрямую договариваетесь с исполнителем об условиях и способе оплаты.</a>
                </div>
            </div>
            <div className="paymentOption">
                <input type="radio" className="urInput-radio"></input>
                <div>
                    <h1>Оплата с закрывающими документами</h1>
                    <a>Откликнутся только юридические лица, ИП или самозанятые. Вы платите с расчётного счета компании и получаете закрывающие документы от исполнителя.</a>
                </div>
            </div>
        </div>
    </div>)
}
const Stage9 = ({detailsText, setDetailsText, detailsFiles, setDetailsFiles, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();
    
    return(<div className="blockPhase">
        <h1>
            Остались пожелания к заказу?
        </h1>
        <div className="moreInfo">
            <textarea ref={errorRed} placeholder="Важные детали для специлиста, о которых мы не спросили" onChange={e => setDetailsText(e.target.value)}></textarea>
            <input type="file" accept=".jpg,.jpeg,.png" multiple onChange={e => setDetailsFiles(e.target.value)}></input>
        </div>
    </div>)
}
const Stage10 = ({accountID, setAccountID, setSendApplication, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();

    return(<div className="blockPhase">
        <h1>
            Выберете аккаунт для создания темы:
        </h1>
        <div>
            <button>Александр И.</button>
            <a href="">Зарегистрировать новый </a>
        </div>
        <button onClick={() => {setSendApplication(true)}}>Опубликовать задание</button>
        <div>
            <input type="radio"></input>
            <p>Опубликовать задание также на форуме</p>
        </div>
    </div>)
}

export {Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8, Stage9, Stage10};