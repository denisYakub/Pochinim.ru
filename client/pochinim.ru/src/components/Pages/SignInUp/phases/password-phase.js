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

    return(<div className="phases-wrapper">
        <div className="sighnInUp-annotation">
            <h1>Введите пароль</h1>
            {emailCode!=0?
                <p>Создайте пароль и впишите имя</p>
            :
                <></>}
        </div>
        <InputWithError placeholder={'пароль'} value={password} setValue={setPassword} error={errorInSingInUp}></InputWithError>
        {emailCode!=0?
            <div className="sighnInUp-input-with-text">
                <input type="text" placeholder={'Имя'} className='text-input-field'
                        value={name} onChange={e => setName(e.target.value)}></input>
                <p>Специалисты будут видеть вас под этим именем</p>
            </div>
        :
            <></>}
        <button className="continue-button" onClick={click}>
        Продолжить
        </button>
    </div>);
}

export default PasswordPhase;