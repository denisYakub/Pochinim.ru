import { Fragment, useEffect, useState } from "react";
import Popup from "../Popup/Popup";
import '../CreateTopic/CreateTopic.css'
import checkForAccessInCreateTopic from "../../services/createTopic-services";
const CreateTopic = () => {
    
    const [active, setActive] = useState(false)

    async function checkAccess(){
        setActive(await checkForAccessInCreateTopic());
    }

    useEffect(() => {
        checkAccess();
    }, [])

    return(<Fragment>
        <div className={active?"creatTopicWithAccess":"creatTopicWithOutAccess"}>
            <div className="content">
                <div className="left-content">
                    <button>
                        Специалисты
                    </button>
                    <button>
                        Помощь
                    </button>
                    <a>
                        Анкета-сантехник
                    </a>
                </div>
                <div className="right-content">
                    <h1>
                        Как назвать задачу?
                    </h1>
                    <input>
                    </input>
                    <div className="control-buttons">
                        <button>
                            Назад
                        </button>
                        <button>
                            Продолжить
                        </button>
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