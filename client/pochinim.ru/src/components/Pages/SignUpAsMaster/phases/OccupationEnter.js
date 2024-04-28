const MasterOccupationEnter = ({occupation, setOccupation}) => {

    const activateHint = (value) => {
        setOccupation(value);
    }

    return(<div className="phase-block">
        <h1>Чем вы занимаетесь?</h1>
        <a>Укажите все наши специальность — так подходящий заказов будет больше.</a>
        <input placeholder="Род деятельности" value={occupation} onChange={e => setOccupation(e.target.value)} className="text-input-field"></input>
        <div className="button-hints">
            <button className="hint" onClick={() => activateHint("Ремонт компьтеров")}>Ремонт компьтеров</button>
            <button className="hint" onClick={() => activateHint("Ремонт стиральных машин")}>Ремонт стиральных машин</button>
            <button className="hint" onClick={() => activateHint("Сантехника")}>Сантехника</button>
            <button className="hint" onClick={() => activateHint("Устранение засоров")}>Устранение засоров</button>
            <button className="hint" onClick={() => activateHint("Спальни")}>Спальни</button>
            <button className="hint" onClick={() => activateHint("Протечка воды")}>Протечка воды</button>
        </div>
    </div>);
};

export default MasterOccupationEnter;