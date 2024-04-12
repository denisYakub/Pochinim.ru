const MasterEmailEnter = ({email, setEmail, codeConf, setCodeConf, code, setCode}) => {

    const sendNewCode = () => {
        //checkMail
        setCodeConf(true);
    }
    
    return(<div className="phaseBlock">
        <input placeholder="почта" value={email} onChange={e => setEmail(e.target.value)} className="inputField"></input>
        {codeConf?
        <input placeholder="код" onChange={e => setCode(e.target.value)} className="inputField"></input>
        :
        <button onClick={sendNewCode} className="send-code-button">выслать код</button>}
    </div>);
};

export default MasterEmailEnter;