import InputWithError from '../../../../animations/input-error-field';
import USERController from '../../../../controllers/USER-controller';

const PasswordPhase = ({phase, setPhase, password, setPassword, name, setName, email, emailCode, errorInSingInUp, setErrorInSingInUp}) =>{
    const click = async() =>{
        if(emailCode == 0){
            if(await USERController.logInUser(email, password)){
                setErrorInSingInUp(false);
                setPhase(phase + 1);
            }else{
                setErrorInSingInUp(true);
            }
        }else{
            if(await USERController.registrate(email, name, password)){
                setErrorInSingInUp(false);
                setPhase(phase + 1);
            }else{
                setErrorInSingInUp(true);
            }
        }
    };

    return(<div className="phase-block">
        <div className="annotationReg">
            <h1>
            Введите пароль
            </h1>
            <p>
            </p>
        </div>
        <div className="sighnInUp-input-size">
            <InputWithError placeholder={'пароль'} value={password} setValue={setPassword} error={errorInSingInUp}></InputWithError>
            <a>Специалисты не видят вашу почту. Вы сами решите, кому она будет доступена.</a>
        </div>
        {emailCode!=0?<input type="text" placeholder={'ФИО'} value={name} onChange={e => setName(e.target.value)}></input>:<></>}
        <button className="continue-button" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default PasswordPhase;