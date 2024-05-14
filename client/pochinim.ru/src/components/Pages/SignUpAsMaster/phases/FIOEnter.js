import { useState, useEffect } from "react";

const MasterFIOEnter = ({step, setStep, MASTER}) => {

    const [fio, setFio] = useState(MASTER.fio)

    const [secondName, setSecondName] = useState(true);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    const setNoSecondName = (value) => {
        setSecondName(!secondName);
    }

    const setFioByIndex = (value, index) => {
        const currentFio = fio.map((v, i) => {
            if(i == index){
                return v = value;
            }else{
                return v;
            }
        });

        setFio(currentFio);
    }

    const click = async () =>{
        try {
            MASTER.fio = fio;
            setStep(step + 1);
        } catch (error) {
            if(error.message == 'Пустое значение'){
                setWarning(true);
            }
        }
    }
    
    return(<div className="phases-wrapper">
        <div className="signUpMaster-annotation">
            <h1>Как вас представить клиентам?</h1>
            <a>Пожалуйств , укажите ваши ФИО как в паспорте, это важно для проверки.</a>
        </div>
        <div className="signUpMaster-inputs">
            <input placeholder="Имя" value={fio[0]} onChange={e => setFioByIndex(e.target.value, 0)} className="text-input-field"></input>
            <input placeholder="Фамилия" value={fio[1]} onChange={e => setFioByIndex(e.target.value, 1)} className="text-input-field"></input>
            {secondName?
                <input placeholder="Отчество" value={fio[2]} onChange={e => setFioByIndex(e.target.value, 2)} className="text-input-field"></input>
            :
                <></>}
            <div className="options-input" onChange={e => setNoSecondName(e.target.value)}>
                <div className="option">
                    <input type="checkbox" value={secondName}></input> 
                    <p>Нет отчества</p>
                </div>
            </div>
        </div>
        <button onClick={click} className='continue-button'>Продолжить</button>
    </div>);
};

export default MasterFIOEnter;