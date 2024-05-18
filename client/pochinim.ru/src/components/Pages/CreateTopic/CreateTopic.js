import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useParams} from "react-router-dom";
import { contextCreatetopic } from '../../../contexts/contextCreatetopic';
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
import Popup from '../../Popups/AlarmPopup/AlarmPopup';
import './CreateTopic.css';

const CreateTopic = () => {

    const params = useParams();
    const auth = params?.email;

    const TOPIC = useContext(contextCreatetopic);

    const [activePop, setActivePop] = useState(false);
    const [textPop, setTextPop] = useState("Войдите или зарегестрируйтесь, чтоб создавать темы");
    const [hide, setHide] = useState(false);

    const [activeStage, setActiveStage] = useState(0);
    const [idLeftButtonsComps, setIdLeftButtonsComps] = useState(2);

    const phasesComps = [<TopicEnter TOPIC={TOPIC}></TopicEnter>, 
                        <ContactEnter TOPIC={TOPIC}></ContactEnter>, 
                        <NeedEnter TOPIC={TOPIC}></NeedEnter>, 
                        <ProblemEnter TOPIC={TOPIC}></ProblemEnter>,
                        <ProblemLocationEnter TOPIC={TOPIC}></ProblemLocationEnter>, 
                        <AddressEnter TOPIC={TOPIC}></AddressEnter>, 
                        <DateEnter TOPIC={TOPIC}></DateEnter>, 
                        <PaymentEnter TOPIC={TOPIC}></PaymentEnter>, 
                        <DetailsEnter TOPIC={TOPIC}></DetailsEnter>, 
                        <AccountEnter TOPIC={TOPIC} hide={hide} setHide={setHide}></AccountEnter>]

    const leftButtonsComps = [<ListOfMasters topic={TOPIC.topicName}
                                                setActivePop={setActivePop} setTextPop={setTextPop}
                                                idTopic={TOPIC.topicId}></ListOfMasters>,
                                <HelpPage></HelpPage>];                                    
    
    useEffect(() => {
        async function checkAccess(){
            if(auth == 'null'){
                setActivePop(true);
            }
        }

        checkAccess();
    }, [])

    const moveOn = async () => {
        if(activeStage + 1 == 2  && !sessionStorage.getItem('create_topic_theme')){
            setActiveStage(5);
        }else if(activeStage + 1 <= 9){
            setActiveStage(activeStage + 1);
        }
    }

    const moveBack = () => {
        if(activeStage - 1 == 4  && !sessionStorage.getItem('create_topic_theme')){
            setActiveStage(1);
        }else if(activeStage - 1 >= 0){
            setActiveStage(activeStage - 1);
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
            <div className={`createTopic-content`}>
                <div className="createTopic-navigation">
                    <div className="navigation-profile-wrapper">
                        <button className="button-grey" onClick={masters}>Специалисты</button>
                        <button className="button-grey"onClick={help}> Помощь</button>
                    </div>
                    <a>Заполнение формы - {TOPIC.topicName}</a>
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
                    leftButtonsComps[idLeftButtonsComps]}
            </div>
            <Popup active={activePop} setActive={setActivePop}>
                {textPop}
            </Popup>
        </div>
    </Fragment>);
}

export default CreateTopic;