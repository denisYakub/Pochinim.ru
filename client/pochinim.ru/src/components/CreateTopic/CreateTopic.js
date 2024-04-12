import { Fragment, useEffect, useMemo, useState } from "react";
import Popup from "../Popup/Popup";
import '../CreateTopic/CreateTopic.css'
import {Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8, Stage9, Stage10} from "./Stages";
import {useAnimate} from 'framer-motion'
import textAnimations from '../../animations/text-animations'
import { useNavigate} from "react-router-dom";
import ListOfMasters from "./ListOfMasters";
import TOPICController from "../../controllers/TOPIC-controller";
import USERController from "../../controllers/USER-controller";
const CreateTopic = () => {
    
    const navigate = useNavigate();

    const [activePop, setActivePop] = useState(false)
    const [textPop, setTextPop] = useState("");

    const [activeStage, setActiveStage] = useState(0);

    const [topic, setTopic] = useState("");
    const [FIO, setFIO] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [need, setNeed] = useState("");
    const [problem, setProblem] = useState("");
    const [problemLocation, setProblemLocation] = useState("");
    const [address, setAddress] = useState("Поставте метку на карте");
    const [date, setDate] = useState("");
    const [paymentOption, setPaymentOption] = useState("");
    const [detailsText, setDetailsText] = useState("");
    const [detailsFiles, setDetailsFiles] = useState(null);
    const [accountID, setAccountID] = useState("");
    const [publishOnForum, setPublishOnForum] = useState(false);
    const [sendApplication, setSendApplication] = useState(false); 
    
    const [error, setError] = useState(false);
    const [errorRed, animateErrorRed] = useAnimate();

    const comps = useMemo(() => { return [<Stage1 topic={topic} setTopic={setTopic}
                                error={error} setError={setError} errorRed={errorRed}></Stage1>, 
                    <Stage2 FIO={FIO} setFIO={setFIO}
                                phoneNumber={phoneNumber} setphoneNumber={setphoneNumber}
                                    error={error} setError={setError} errorRed={errorRed}></Stage2>, 
                    <Stage3 need={need} setNeed={setNeed}
                                error={error} setError={setError} errorRed={errorRed}></Stage3>, 
                    <Stage4 problem={problem} setProblem={setProblem}
                                error={error} setError={setError} errorRed={errorRed}></Stage4>,
                    <Stage5 problemLocation={problemLocation} setProblemLocation={setProblemLocation}
                                error={error} setError={setError} errorRed={errorRed}></Stage5>, 
                    <Stage6 address={address} setAddress={setAddress}
                                error={error} setError={setError} errorRed={errorRed}></Stage6>, 
                    <Stage7 date={date} setDate={setDate}
                                error={error} setError={setError} errorRed={errorRed}></Stage7>, 
                    <Stage8 paymentOption={paymentOption} setPaymentOption={setPaymentOption}
                                error={error} setError={setError} errorRed={errorRed}></Stage8>, 
                    <Stage9 detailsText={detailsText} setDetailsText={setDetailsText}
                                detailsFiles={detailsFiles} setDetailsFiles={setDetailsFiles}
                                    error={error} setError={setError} errorRed={errorRed}></Stage9>, 
                    <Stage10 accountID={accountID} setAccountID={setAccountID}
                                setSendApplication={setSendApplication}
                                publishOnForum={publishOnForum} setPublishOnForum={setPublishOnForum}
                                error={error} setError={setError} errorRed={errorRed}></Stage10>]},
                                [FIO, accountID, address, date, detailsFiles, detailsText, error, 
                                    errorRed, need, paymentOption, phoneNumber, problem, problemLocation, 
                                        publishOnForum, topic]);

    const compListOfMasters = <ListOfMasters topic={topic}
                                                setActivePop={setActivePop} setTextPop={setTextPop}></ListOfMasters>;

    const [listOfMasters, setListOfMasters] = useState(false);

    async function checkAccess(){
        if(await USERController.checkForAccess()){
            setActivePop(false);
            setTextPop("Войдите или зарегестрируйтесь, чтоб создавать темы");
        }else{
            setActivePop(true);
            setTextPop("Войдите или зарегестрируйтесь, чтоб создавать темы");
        }
    }

    useEffect(() => {
        checkAccess();
    }, [])

    useEffect(() => {
        if(sendApplication == true){
            console.log(publishOnForum);
            const finalTopic = {topic, FIO, phoneNumber, need, problem, problemLocation,
                                    address, date, paymentOption, detailsText, detailsFiles,
                                        accountID};

            TOPICController.createNewTopic(finalTopic);

            setSendApplication(false);
            navigate('/');   
        }
    }, [activeStage, comps, sendApplication, FIO, accountID, address, date,
            detailsFiles, detailsText, navigate, need, paymentOption, phoneNumber, 
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
                    await textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed});
                }
                break;
            case 1:
                if(FIO != "" && phoneNumber != ""){
                    nextStage = activeStage + 1;
                    console.log(FIO);
                    setError(false);
                }else{
                    setError(true);
                    await textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed});
                }
                break;
            case 2:
                if(need != ""){
                    console.log(need);
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                    await textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed});
                }
                break;
            case 3:
                if(problem != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                    await textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed});
                }
                break;
            case 4:
                if(problemLocation != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                    await textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed});
                }
                break;
            case 5:
                if(address != "Поставте метку на карте"){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                    await textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed});
                }
                break;
            case 6:
                if(date != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                    await textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed});
                }
                break;
            case 7:
                if(paymentOption != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                    await textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed});
                }
                break;
            case 8:
                if(detailsText != "" && detailsFiles != ""){
                    nextStage = activeStage + 1;
                    setError(false);
                }else{
                    setError(true);
                    await textAnimations.highlightErrorInput("#1C1C1C", {errorRed, animateErrorRed});
                }
                break;
            default:
                break;
        }
        
        if(nextStage <= comps.length - 1){
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
    }

    const masters = () => {
        if(!listOfMasters){
            setListOfMasters(true);
        }else{
            setListOfMasters(false);
        }
    }

    return(<Fragment>
        <div className="creatTopic">
            <div className="content">
                <div className="left-content">
                    <div className="mastersAndNumber">
                        <button onClick={masters}>
                            Специалисты
                        </button>
                        <a>1587</a>
                    </div>
                    <button onClick={help}>
                        Помощь
                    </button>
                    <a>
                    Заполнение формы - {topic}
                    </a>
                </div>
                {!listOfMasters?
                    <div className="right-content-create-topic">
                        {activeStage<9?<a>{activeStage + 1}/9</a>:<a>Авторизация</a>}
                        {comps[activeStage]}
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
                        {compListOfMasters}
                    </div>}
            </div>
        </div>
        <Popup active={activePop} setActive={setActivePop}>
            {textPop}
        </Popup>
    </Fragment>);
}

export default CreateTopic;