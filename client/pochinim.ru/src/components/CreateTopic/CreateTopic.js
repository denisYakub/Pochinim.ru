import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import Popup from "../Popup/Popup";
import '../CreateTopic/CreateTopic.css'
import {useAnimate} from 'framer-motion'
import { useNavigate} from "react-router-dom";
import ListOfMasters from "./ListOfMasters";
import TOPICController from "../../controllers/TOPIC-controller";
import USERController from "../../controllers/USER-controller";
import HelpPage from "../HelpPage/HelpPage";
import { contextCreatetopic } from '../../contexts/contextCreatetopic';
import AccountEnter from "./phases/AccountEnter";
import DetailsEnter from "./phases/DetailsEnter";
import PaymentEnter from "./phases/PaymentEnter";
import DateEnter from "./phases/DateEnter";
import AddressEnter from "./phases/AddressEnter";
import ProblemLocationEnter from "./phases/ProblemLocationEnter";
import ProblemEnter from "./phases/ProblemEnter";
import NeedEnter from "./phases/NeedEnter";
import ContactEnter from "./phases/ContactEnter";
import TopicEnter from "./phases/TopicEnter";

import masterController from "../../controllers/MASTER-controller";
import { contextLocation } from "../../contexts/contextLocation";

const CreateTopic = () => {
    const navigate = useNavigate();

    const [activePop, setActivePop] = useState(false);
    const [textPop, setTextPop] = useState("Войдите или зарегестрируйтесь, чтоб создавать темы");

    const [activeStage, setActiveStage] = useState(0);

    const { topic, setTopic, 
            FIO, setFIO, 
            phoneNumber, setphoneNumber, 
            need, setNeed,
            problem, setProblem, 
            problemLocation, setProblemLocation,
            address, setAddress,
            date, setDate,
            paymentOption, setPaymentOption,
            detailsText, setDetailsText,
            detailsFiles, setDetailsFiles,
            idLeftButtonsComps, setIdLeftButtonsComps} = useContext(contextCreatetopic)

    const { location, setLocation } = useContext(contextLocation)

    const [accountID, setAccountID] = useState("");
    const [publishOnForum, setPublishOnForum] = useState(false);
    const [sendApplication, setSendApplication] = useState(false); 
    const [listOfMasters, setListOfMasters] = useState([]);
    
    const [error, setError] = useState(false);
    const [errorRed, animateErrorRed] = useAnimate();

    const phasesComps = useMemo(() => { return [<TopicEnter topic={topic} setTopic={setTopic}
                                error={error}></TopicEnter>, 
                    <ContactEnter FIO={FIO} setFIO={setFIO}
                                phoneNumber={phoneNumber} setphoneNumber={setphoneNumber}
                                    error={error}></ContactEnter>, 
                    <NeedEnter need={need} setNeed={setNeed}
                                error={error} setError={setError} errorRed={errorRed}></NeedEnter>, 
                    <ProblemEnter problem={problem} setProblem={setProblem}
                                error={error} setError={setError} errorRed={errorRed}></ProblemEnter>,
                    <ProblemLocationEnter problemLocation={problemLocation} setProblemLocation={setProblemLocation}
                                error={error} setError={setError} errorRed={errorRed}></ProblemLocationEnter>, 
                    <AddressEnter address={address} setAddress={setAddress} location={location}
                                error={error} setError={setError} errorRed={errorRed}></AddressEnter>, 
                    <DateEnter date={date} setDate={setDate}
                                error={error} setError={setError} errorRed={errorRed}></DateEnter>, 
                    <PaymentEnter paymentOption={paymentOption} setPaymentOption={setPaymentOption}
                                error={error} setError={setError} errorRed={errorRed}></PaymentEnter>, 
                    <DetailsEnter detailsText={detailsText} setDetailsText={setDetailsText}
                                detailsFiles={detailsFiles} setDetailsFiles={setDetailsFiles}
                                    error={error} setError={setError} errorRed={errorRed}></DetailsEnter>, 
                    <AccountEnter accountID={accountID} setAccountID={setAccountID}
                                setSendApplication={setSendApplication}
                                publishOnForum={publishOnForum} setPublishOnForum={setPublishOnForum}
                                error={error} setError={setError} errorRed={errorRed}></AccountEnter>]},
                                [FIO, accountID, address, date, detailsFiles, detailsText, error, 
                                    errorRed, need, paymentOption, phoneNumber, problem, problemLocation, 
                                        publishOnForum, topic]);

    const leftButtonsComps = [<ListOfMasters listOfMasters={listOfMasters} topic={topic}
                                                setActivePop={setActivePop} setTextPop={setTextPop}></ListOfMasters>,
                                <HelpPage></HelpPage>];                                    

    async function checkAccess(){
        if(!localStorage.getItem('mail')){
            setActivePop(true);
        }
    }

    async function setMaters(){
        setListOfMasters(await masterController.getListOfMasters(0, 30));
    }

    useEffect(() => {
        checkAccess();

        setMaters();
        
        if(sendApplication == true){
            console.log(publishOnForum);
            const finalTopic = {topic, FIO, phoneNumber, need, problem, problemLocation,
                                    address, date, paymentOption, detailsText, detailsFiles,
                                        accountID};

            TOPICController.createNewTopic(finalTopic);

            setSendApplication(false);
            navigate('/');   
        }
    }, [sendApplication, FIO, accountID, address, date,
            detailsFiles, detailsText, need, paymentOption, phoneNumber, 
                problem, problemLocation, publishOnForum, topic])

    const moveOn = async () => {
        var nextStage;
        switch (activeStage) {
            case 0:
                if(topic != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                }
                break;
            case 1:
                if(FIO != "" && phoneNumber != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                }
                break;
            case 2:
                if(need != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                }
                break;
            case 3:
                if(problem != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true)
                }
                break;
            case 4:
                if(problemLocation != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                }
                break;
            case 5:
                if(address != "Поставте метку на карте"){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                }
                break;
            case 6:
                if(date != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                }
                break;
            case 7:
                if(paymentOption != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                }
                break;
            case 8:
                if(detailsText != "" && detailsFiles != null){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                }
                break;
            default:
                break;
        }
        
        if(nextStage <= phasesComps.length - 1){
            setActiveStage(nextStage);
        }
    }

    const moveBack = () => {
        const prevStage = activeStage - 1;
        if(prevStage >= 0){
            setActiveStage(prevStage);
        }
    }

    const help = () => {
        if(idLeftButtonsComps === 1){
            setIdLeftButtonsComps(2);
        }else if(idLeftButtonsComps === 2){
            setIdLeftButtonsComps(1);
        }else if(idLeftButtonsComps === 0){
            setIdLeftButtonsComps(1);
        }
    }

    const masters = () => {
        if(idLeftButtonsComps === 0){
            setIdLeftButtonsComps(2);
        }else if(idLeftButtonsComps === 2){
            setIdLeftButtonsComps(0);
        }else if(idLeftButtonsComps === 1){
            setIdLeftButtonsComps(0);
        }
        
    }

    return(<Fragment>
        <div className= "creatTopic">
            <div className="content">
                <div className="left-content">
                    <button onClick={masters}>
                        Специалисты
                    </button>
                    <button onClick={help}>
                        Помощь
                    </button>
                    <a>
                    Заполнение формы - {topic}
                    </a>
                </div>
                {idLeftButtonsComps === 2?
                    <div className="right-content-create-topic">
                        {activeStage<9?<a>{activeStage + 1}/9</a>:<a>Авторизация</a>}
                        {phasesComps[activeStage]}
                        <div className="control-buttons">
                            <button name="prev" onClick={moveBack}
                                onMouseEnter={()=>{}}
                                onMouseLeave={()=>{}}>
                                <div className="prevIcon"></div>
                                    <q>Назад</q>
                            </button>
                            {activeStage<9?
                                <button name="nt" onClick={moveOn}
                                    onMouseEnter={()=>{}}
                                    onMouseLeave={()=>{}}>
                                    <p>Продолжить</p>
                                    <div className="ntIcon"></div>
                                </button>
                            :<></>}
                        </div>
                    </div>
                :
                    <div className="right-content-find-master">
                        {leftButtonsComps[idLeftButtonsComps]}
                    </div>}
            </div>
        </div>
        <Popup active={activePop} setActive={setActivePop}>
            {textPop}
        </Popup>
    </Fragment>);
}

export default CreateTopic;