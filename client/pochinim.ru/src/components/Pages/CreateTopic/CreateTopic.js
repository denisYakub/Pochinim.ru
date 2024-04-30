import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import {useAnimate} from 'framer-motion'
import { useNavigate, useParams} from "react-router-dom";
import { contextCreatetopic } from '../../../contexts/contextCreatetopic';
import { contextLocation } from "../../../contexts/contextLocation";
import TopicEnter from './phases/TopicEnter';
import ContactEnter from './phases/ContactEnter';
import NeedEnter from './phases/NeedEnter';
import ProblemEnter from './phases/ProblemEnter';
import ProblemLocationEnter from './phases/ProblemLocationEnter';
import AddressEnter from './phases/AddressEnter';
import DateEnter from './phases/DateEnter';
import PaymentEnter from './phases/PaymentEnter';
import DetailsEnter from './phases/DetailsEnter';
import AccountEnter from './phases/AccountEnter';
import ListOfMasters from './ListOfMasters';
import HelpPage from '../HelpPage/HelpPage';
import masterController from '../../../controllers/MASTER-controller';
import TOPICController from '../../../controllers/TOPIC-controller';
import Popup from '../../Popups/AlarmPopup/AlarmPopup';
import './CreateTopic.css';

const CreateTopic = () => {
    const navigate = useNavigate();

    const params = useParams();
    const auth = params?.email;

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
    const [canSendMessage, setCanSendMessage] = useState(false);
    const [listOfMasters, setListOfMasters] = useState([]);
    
    const [error, setError] = useState(false);
    const [errorRed, animateErrorRed] = useAnimate();

    const phasesComps = useMemo(() => { return [<TopicEnter topic={topic} setTopic={setTopic}
                                error={error}></TopicEnter>, 
                    <ContactEnter FIO={FIO} setFIO={setFIO}
                                phoneNumber={phoneNumber} setphoneNumber={setphoneNumber}
                                    error={error}></ContactEnter>, 
                    <NeedEnter need={need} setNeed={setNeed}
                                error={error}></NeedEnter>, 
                    <ProblemEnter problem={problem} setProblem={setProblem}
                                error={error}></ProblemEnter>,
                    <ProblemLocationEnter problemLocation={problemLocation} setProblemLocation={setProblemLocation}
                                error={error}></ProblemLocationEnter>, 
                    <AddressEnter address={address} setAddress={setAddress} location={location}
                                error={error} errorRed={errorRed}></AddressEnter>, 
                    <DateEnter date={date} setDate={setDate}
                                error={error}></DateEnter>, 
                    <PaymentEnter paymentOption={paymentOption} setPaymentOption={setPaymentOption}></PaymentEnter>, 
                    <DetailsEnter detailsText={detailsText} setDetailsText={setDetailsText}
                                detailsFiles={detailsFiles} setDetailsFiles={setDetailsFiles}
                                    errorRed={errorRed}></DetailsEnter>, 
                    <AccountEnter setSendApplication={setSendApplication}
                                    publishOnForum={publishOnForum} setPublishOnForum={setPublishOnForum}></AccountEnter>]},
                                [FIO, accountID, address, date, detailsFiles, detailsText, error, 
                                    errorRed, need, paymentOption, phoneNumber, problem, problemLocation, 
                                        publishOnForum, topic]);

    const leftButtonsComps = [<ListOfMasters listOfMasters={listOfMasters} topic={topic}
                                                setActivePop={setActivePop} setTextPop={setTextPop}
                                                canSendMessage={canSendMessage}></ListOfMasters>,
                                <HelpPage></HelpPage>];                                    

    async function checkAccess(){
        if(auth == 'null'){
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
            setCanSendMessage(true);
            setSendApplication(false);  
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
        <div className= "page-wrapper">
            <div className="createTopic-content">
                <div className="navigation-profile-wrapper">
                    <button className="button-grey" onClick={masters}>Специалисты</button>
                    <button className="button-grey" onClick={help}> Помощь</button>
                    <a>Заполнение формы - {topic}</a>
                </div>
                {idLeftButtonsComps === 2?
                    <div className="createTopic-phases">
                        {phasesComps[activeStage]}
                        <div className="createTopic-phases-control-buttons">
                            <button name="prev" onClick={moveBack}>
                                <div className="prevIcon"></div>
                                Назад
                            </button>
                            {activeStage<9?
                                <button name="nt" onClick={moveOn}>
                                    Продолжить
                                    <div className="ntIcon"></div>
                                </button>
                            :<></>}
                        </div>
                    </div>
                :
                    <div className="createTopic-list-of-masters">
                        {leftButtonsComps[idLeftButtonsComps]}
                    </div>}
            </div>
            <Popup active={activePop} setActive={setActivePop}>
                {textPop}
            </Popup>
        </div>
    </Fragment>);
}

export default CreateTopic;