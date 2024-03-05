import { Fragment, useEffect, useState } from "react";
import Popup from "../Popup/Popup";
import '../CreateTopic/CreateTopic.css'
import {checkForAccessInCreateTopic, createTopic} from "../../services/createTopic-services";
import {Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8, Stage9, Stage10} from "./Stages";
import {useAnimate} from 'framer-motion'
import textAnimations from '../../animations/text-animations'
const CreateTopic = () => {
    
    const [active, setActive] = useState(false)
    const [activeStage, setActiveStage] = useState(0);
    const [formName, setFormName] = useState("");

    const [canGoToNt, setCanGoToNt] = useState(false);
    const [canGoToPrev, setCanGoToPrev] = useState(false);

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
    const [detailsFiles, setDetailsFiles] = useState([]);
    const [accountID, setAccountID] = useState(""); 
    const [sendApplication, setSendApplication] = useState(false); 
    
    const [error, setError] = useState(false);
    const [errorRed, animateErrorRed] = useAnimate();

    const comps = [<Stage1 topic={topic} setTopic={setTopic}
                                error={error} setError={setError} errorRed={errorRed}></Stage1>, 
                    <Stage2 FIO={FIO} setFIO={setFIO}
                                phoneNumber={phoneNumber} setphoneNumber={setphoneNumber}
                                    error={error} setError={setError} errorRed={errorRed}></Stage2>, 
                    <Stage3 need={need} setneed={setNeed}
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
                                error={error} setError={setError} errorRed={errorRed}></Stage10>]

    async function checkAccess(){
        setActive(await checkForAccessInCreateTopic());
    }

    useEffect(() => {
        checkAccess();
        if(sendApplication == true){
            console.log("Sending application");
            console.log("info");
            console.log(topic, FIO, phoneNumber, need, problem, problemLocation,
                        address, date, paymentOption, detailsText, detailsFiles,
                        accountID, sendApplication);
            const finalTopic = {topic, FIO, phoneNumber, need, problem, problemLocation,
                                    address, date, paymentOption, detailsText, detailsFiles,
                                        accountID};
            const resp = createTopic(finalTopic);              
        }
    }, [activeStage, comps, sendApplication])

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

    return(<Fragment>
        <div className="creatTopic">
            <div className="content">
                <div className="left-content">
                    <div className="mastersAndNumber">
                        <button>
                            Специалисты
                        </button>
                        <a>1587</a>
                    </div>
                    <button>
                        Помощь
                    </button>
                    <a>
                    Заполнение формы - {formName}
                    </a>
                </div>
                <div className="right-content">
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
            </div>
        </div>
        <Popup active={!active} setActive={setActive}>
            Войдите или зарегестрируйтесь, чтоб создавать темы
        </Popup>
    </Fragment>);
}

export default CreateTopic;