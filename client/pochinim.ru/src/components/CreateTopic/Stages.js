import { useRef, useState } from "react"
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import {motion, useAnimate} from 'framer-motion'
import buttonsAnimations from "../../animations/buttons-animations.js";
import topicController from "../../controllers/TOPIC-controller.js";
import loadPhotoIcon from "../../img/putFile.png";
import InputWithError from "../../animations/input-error-field.js";
import InputDateWithError from "../../animations/input-error-date.js";

//const optionsOfExistingTopics = topicController.getListOfExistingTopics();
const optionsOfWork = await topicController.getListOfWork();
const optionsOfWhatHappend = await topicController.getListOfWhatHappend();
const optionsOfWhereIsProblem = await topicController.getListofWhereIsProblem();

const key = "52112b4d-5217-4897-8975-50bb62c674a6";

const Stage1 = ({topic, setTopic, error}) => {
    const activateHint = (value) => {
        setTopic(value);
    };

    return(<div className="blockPhase">
        <h1>
            Как назвать задачу?
        </h1>
        <div className="create-topic-input-size">
            <InputWithError placeholder={"Сантехника"} value={topic} setValue={setTopic} error={error}></InputWithError>
        </div>
        <div className="button-hints">
            <button className="hint" onClick={() => activateHint("Сантехника")}>
            Сантехник
            </button>
            <button className="hint" onClick={() => activateHint("Ремонт")}>
            Ремонт
            </button>
            <button className="hint" onClick={() => activateHint("Срочно")}>
            Срочно
            </button>
            <button className="hint" onClick={() => activateHint("Дистанционно")}>
            Дистанционно
            </button>
        </div>
    </div>)
}
const Stage2 = ({FIO, setFIO, phoneNumber, setphoneNumber, error}) => {
    return(<div className="blockPhase">
        <h1>
            Контактная информация
        </h1>
        <div className="contact">
            <div style={{width: "500px"}}>
                <InputWithError placeholder={"Имя Фамилия"} value={FIO} setValue={setFIO} error={error}></InputWithError>
            </div>
            <div style={{width: "500px"}}>
                <InputWithError placeholder={"+7-000-000-00-00"} value={phoneNumber} setValue={setphoneNumber} error={error}></InputWithError>
            </div>
        </div>
    </div>)
}
const Stage3 = ({need, setNeed, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();
    const [localNeed, setLocalNeed] = useState("");


    const inputRadioCheck = (e) => {
        setNeed(e.value);
    }

    const isChecked = (index) => {
        if(optionsOfWork.indexOf(need) === index){
            return true;
        }else{
            return false;
        }
    }

    const isCheckedUserInput = () =>{
        if(need === "" || optionsOfWork.includes(need)){
            return false;
        }else{
             return true;
        }
    }

    const setValue = () => {
        if(optionsOfWork.includes(need)){
            return "";
        }else{
            return need;
        }
    }

    return(<div className="blockPhase">
        <h1>
            Что требуется?
        </h1>
        <div className="listOfOptions" onChange={e => inputRadioCheck(e.target)}> 
            {optionsOfWork.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio" value={item} name="check" checked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="urInput">
                <input type="radio" className="urInput-radio" value={localNeed} name="check" checked={isCheckedUserInput()}></input>
                <div className="create-topic-input-size">
                    <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalNeed} error={error}></InputWithError>
                 </div>
            </div>
        </div>
    </div>)
}
const Stage4 = ({problem, setProblem, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();
    const [localProblem, setLocalProblem] = useState("");


    const inputRadioCheck = (e) => {
        setProblem(e.value);
    }

    const isChecked = (index) => {
        if(optionsOfWhatHappend.indexOf(problem) === index){
            return true;
        }else{
            return false;
        }
    }

    const isCheckedUserInput = () =>{
        if(problem === "" || optionsOfWhatHappend.includes(problem)){
            return false;
        }else{
             return true;
        }
    }

    const setValue = () => {
        if(optionsOfWhatHappend.includes(problem)){
            return "";
        }else{
            return problem;
        }
    }

    return(<div className="blockPhase">
        <h1>
            Что случилось?
        </h1>
        <div className="listOfOptions" onChange={e => inputRadioCheck(e.target)}>
            {optionsOfWhatHappend.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio" value={item} name="check" checked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="urInput">
                <input type="radio" className="urInput-radio" value={localProblem} name="check" checked={isCheckedUserInput()}></input>
                <div className="create-topic-input-size">
                    <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalProblem} error={error}></InputWithError>
                 </div>
            </div>
        </div>
    </div>)
}
const Stage5 = ({problemLocation, setProblemLocation, error, setError, errorRed}) => {
    const [errorScope, animateError] = useAnimate();
    const [localProblemLocation, setLocalProblemLocation] = useState("");


    const inputRadioCheck = (e) => {
        setProblemLocation(e.value);
    }

    const isChecked = (index) => {
        if(optionsOfWhereIsProblem.indexOf(problemLocation) === index){
            return true;
        }else{
            return false;
        }
    }

    const isCheckedUserInput = () =>{
        if(problemLocation === "" || optionsOfWhereIsProblem.includes(problemLocation)){
            return false;
        }else{
             return true;
        }
    }

    const setValue = () => {
        if(optionsOfWhereIsProblem.includes(problemLocation)){
            return "";
        }else{
            return problemLocation;
        }
    }
    
    return(<div className="blockPhase">
        <h1>
            Где проблема?
        </h1>
        <div className="listOfOptions" onChange={e => inputRadioCheck(e.target)}>
            {optionsOfWhereIsProblem.map((item, index) => {
                return(
                <div key={index} className="option">
                    <input type="radio" value={item} name="check" checked={isChecked(index)}></input>
                    <p>{item}</p>
                </div>);
            })}
            <div className="urInput">
                <input type="radio" className="urInput-radio" value={localProblemLocation} name="check" checked={isCheckedUserInput()}></input>
                <div className="create-topic-input-size">
                    <InputWithError placeholder={"Ваш вариант"} value={setValue()} setValue={setLocalProblemLocation} error={error}></InputWithError>
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
                : null}
            <motion.a className="errorStageMessage" ref={errorScope} initial={{scale: 0, y: 0, x: 0}}>Ошибка ввода</motion.a>
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
        <div className="create-topic-input-date-size">
            <InputDateWithError value={date} setValue={setDate} error={error}></InputDateWithError>
        </div>
    </div>)
}
const Stage8 = ({paymentOption, setPaymentOption, error, setError, errorRed}) => {
    
    const inputRadioCheck = (e) => {
        setPaymentOption(e.value);
    }

    return(<div className="blockPhase">
        <h1>
            Сколько готовы заплатить за работу?
        </h1>
        <div className="paymentOptions" onChange={e => inputRadioCheck(e.target)}>
            <div className="paymentOption">
                <input type="radio" value={0} className="urInput-radio" name="check"></input>
                <div>
                    <h1>Сделка без риска</h1>
                    <a>Оплата банковской картой с гарантией возврата и компенсацией материального ущерба до 10 000 ₽. Комиссия 11% + 35 ₽. Подробнее</a>
                </div>
            </div>
            <div className="paymentOption">
                <input type="radio" value={1} className="urInput-radio" name="check"></input>
                <div>
                    <h1>Оплата напрямую исполнителю</h1>
                    <a>Без гарантий и компенсаций Починим.ру: вы напрямую договариваетесь с исполнителем об условиях и способе оплаты.</a>
                </div>
            </div>
            <div className="paymentOption">
                <input type="radio" value={2} className="urInput-radio" name="check"></input>
                <div>
                    <h1>Оплата с закрывающими документами</h1>
                    <a>Откликнутся только юридические лица, ИП или самозанятые. Вы платите с расчётного счета компании и получаете закрывающие документы от исполнителя.</a>
                </div>
            </div>
        </div>
    </div>)
}
const Stage9 = ({detailsText, setDetailsText, detailsFiles, setDetailsFiles, error, setError, errorRed}) => {
    return(<div className="blockPhase">
        <h1>
            Остались пожелания к заказу?
        </h1>
        <div className="moreInfo">
            <textarea ref={errorRed} placeholder="Важные детали для специлиста, о которых мы не спросили" onChange={e => setDetailsText(e.target.value)}></textarea>
            <div className="topic-photos">
                {detailsFiles!=null?Array.from(detailsFiles)?.map((file)=> {
                    return(
                    <div className="topic-photo">
                        <img className="photo" src={URL.createObjectURL(file)} alt="your file"></img>
                        {file.name};
                    </div>
                )}):null}
            </div>
            <div className="topic-photo-choose" onClick={() => document.querySelector(".photo-input").click()}>
                <img src={loadPhotoIcon} alt="loadPhotoIcon"></img>
                <p>Добавить/удалить файл или фото</p>
                <input type="file" accept=".jpg,.jpeg,.png" multiple={true} hidden={true} 
                className="photo-input"
                onChange={e => setDetailsFiles(e.target.files)}></input>
            </div>
            
        </div>
    </div>)
}
const Stage10 = ({accountID, setAccountID, setSendApplication, publishOnForum, setPublishOnForum, error, setError, errorRed}) => {
    const inputRadioCheck = (e) => {
        if(publishOnForum === false){
            setPublishOnForum(true);
        }else{
            setPublishOnForum(false);
        }
    }

    return(<div className="blockPhase">
        <h1>
            Выберете аккаунт для создания темы:
        </h1>
        <div className="block-accounts-to-choose">
            <div className="list-of-accounts">
                <button className="acount-info">
                    {localStorage.getItem("mail")}
                </button>
                <button className="add-account"></button>
            </div>
            <a href="">Зарегистрировать новый </a>
        </div>
        <button className="publish-topic" onClick={() => {setSendApplication(true)}}>Опубликовать задание</button>
        <div className="publish-topic-in-forum" onChange={e => inputRadioCheck(e.target)}>
            <input type='checkbox' name="check" checked={publishOnForum}></input>
            <p>Опубликовать задание также на форуме</p>
        </div>
    </div>)
}

export {Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8, Stage9, Stage10};