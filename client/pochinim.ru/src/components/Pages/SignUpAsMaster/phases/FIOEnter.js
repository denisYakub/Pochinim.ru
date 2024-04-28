import { useState } from "react";

const MasterFIOEnter = ({fio, setFio}) => {

    const [secondName, setSecondName] = useState(true);

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

    return(<div className="phase-block">
        <h1>Как вас представить клиентам?</h1>
        <a>Пожалуйств , укажите ваши ФИО как в паспорте, это важно для проверки.</a>
        <input placeholder="Имя" value={fio[0]} onChange={e => setFioByIndex(e.target.value, 0)} className="text-input-field"></input>
        <input placeholder="Фамилия" value={fio[1]} onChange={e => setFioByIndex(e.target.value, 1)} className="text-input-field"></input>
        {secondName?
            <input placeholder="Отчество" value={fio[2]} onChange={e => setFioByIndex(e.target.value, 2)} className="text-input-field"></input>
            :
            <></>}
        <div className="options" onChange={e => setNoSecondName(e.target.value)}>
            <div className="option">
                <input type="checkbox" value={secondName}></input> 
                <p>Нет отчества</p>
            </div>
        </div>
    </div>);
};

export default MasterFIOEnter;