const MasterPasswordEnter = ({password, setPassword}) => {
    return(<div className="phaseBlock">
        <input type="password" placeholder="пароль" value={password} onChange={e => setPassword(e.target.value)} className="inputField"></input>
        <input type="password" placeholder="повторите пароль" className="inputField"></input>
    </div>);
};

export default MasterPasswordEnter;