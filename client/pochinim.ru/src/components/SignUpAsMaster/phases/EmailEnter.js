const MasterEmailEnter = ({email, setEmail, codeConf, setCodeConf, code, setCode}) => {

    const sendNewCode = () => {
        setCodeConf(false);
    }
    
    return(<div className="phaseBlock">
        <input placeholder="почта" value={email} onChange={e => setEmail(e.target.value)} className="inputField"></input>
        {codeConf?
        <button onClick={sendNewCode} className="send-code-button">выслать код</button>
        :
        <input placeholder="код" onChange={e => setCode(e.target.value)} className="inputField"></input>}
    </div>);
};

export default MasterEmailEnter;