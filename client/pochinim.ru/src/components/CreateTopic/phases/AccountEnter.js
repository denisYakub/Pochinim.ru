const AccountEnter = ({accountID, setAccountID, setSendApplication, publishOnForum, setPublishOnForum, error, setError, errorRed}) => {
    const inputRadioCheck = (e) => {
        if(publishOnForum === false){
            setPublishOnForum(true);
        }else{
            setPublishOnForum(false);
        }
    }

    return(<div className="blockPhase">
        <h1>
            Выберете аккаунт для создания темы:
        </h1>
        <div className="block-accounts-to-choose">
            <div className="list-of-accounts">
                <button className="acount-info">
                    {localStorage.getItem("mail")}
                </button>
                <button className="add-account"></button>
            </div>
            <a href="">Зарегистрировать новый </a>
        </div>
        <button className="publish-topic" onClick={() => {setSendApplication(true)}}>Опубликовать задание</button>
        <div className="publish-topic-in-forum" onChange={e => inputRadioCheck(e.target)}>
            <input type='checkbox' name="check" checked={publishOnForum}></input>
            <p>Опубликовать задание также на форуме</p>
        </div>
    </div>)
}

export default AccountEnter;