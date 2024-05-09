import { useEffect, useState } from 'react';
import InputWithError from '../../../../animations/input-error-field';

const MasterOccupationEnter = ({occupation, setOccupation, step, setStep}) => {
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        try {
            if(occupation == ''){
                throw Error('пустое значение')
            }
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
    },[occupation])

    const activateHint = (value) => {
        setOccupation(value);
    }

    const click = async () =>{
        if(occupation != ""){
            setStep(step + 1);
        }
    }

    return(<div className="phases-wrapper">
        <div className="signUpMaster-annotation">
            <h1>Чем вы занимаетесь?</h1>
            <a>Укажите все наши специальность — так подходящий заказов будет больше.</a>
        </div>
        <div className="signUpMaster-inputs">
            <InputWithError placeholder={'Род деятельности'} value={occupation} setValue={setOccupation} 
                error={error} setError={setError} errorText={'Ошибка'}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
            <div className="button-hints">
                <button className="hint" onClick={() => activateHint("Ремонт компьтеров")}>Ремонт компьтеров</button>
                <button className="hint" onClick={() => activateHint("Ремонт стиральных машин")}>Ремонт стиральных машин</button>
                <button className="hint" onClick={() => activateHint("Сантехника")}>Сантехника</button>
                <button className="hint" onClick={() => activateHint("Устранение засоров")}>Устранение засоров</button>
                <button className="hint" onClick={() => activateHint("Спальни")}>Спальни</button>
                <button className="hint" onClick={() => activateHint("Протечка воды")}>Протечка воды</button>
            </div>
        </div>
        <button onClick={click} className='continue-button'>Продолжить</button>
    </div>);
};

export default MasterOccupationEnter;