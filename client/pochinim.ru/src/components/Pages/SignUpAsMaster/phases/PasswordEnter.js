const MasterPasswordEnter = ({password, setPassword}) => {
    return(<div className="phase-block">
        <input type="password" placeholder="пароль" value={password} onChange={e => setPassword(e.target.value)} className="text-input-field"></input>
        <input type="password" placeholder="повторите пароль" className="text-input-field"></input>
    </div>);
};

export default MasterPasswordEnter;