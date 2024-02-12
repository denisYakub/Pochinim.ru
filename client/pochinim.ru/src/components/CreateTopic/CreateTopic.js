import { Fragment } from "react";
import '../CreateTopic/CreateTopic.css'
const createTopic = () => {
    return(<Fragment>
        <div className="creatTopic">
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
    </Fragment>);
}

export default createTopic;