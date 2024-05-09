import { useState, useEffect } from "react";
import InputWithError from '../../../../animations/input-error-field';

const PaymentEnter = ({TOPIC}) => {
    const [paymentOption, setPaymentOption] = useState(TOPIC.paymentOption);
    const [localPaymentOption, setLocalPaymentOption] = useState("");

    const [paymentPriceStart, setPaymentPriceStart] = useState(TOPIC.paymentPriceStart);
    const [paymentPriceEnd, setPaymentPriceEnd] = useState(TOPIC.paymentPriceEnd);

    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.paymentOption = paymentOption;
            TOPIC.paymentPriceStart = paymentPriceStart;
            TOPIC.paymentPriceEnd = paymentPriceEnd;
        } catch (error) {
            if(error.message == 'пустое значение'){
                setWarning(true);
            }else if(error.message == 'неверное значение'){
                setError(true);
            }
        }
        
    },[paymentOption, paymentPriceStart, paymentPriceEnd])

    const inputRadioCheck = (value) => {
        console.log(value);
        setPaymentOption(value);
    };

    const isCheckedUserInput = (value) =>{
        if(value == paymentOption){
            return true;
        }else{
             return false;
        }
    }

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>8/9</p>
            <h1>Сколько готовы заплатить за работу?</h1>
        </div>
        <div className="price-input">
            <InputWithError placeholder={"от"} value={paymentPriceStart} setValue={setPaymentPriceStart} 
                error={error} setError={setError} errorText={'Не верное значение'}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
                inputType="number"></InputWithError>
            <InputWithError placeholder={"до"} value={paymentPriceEnd} setValue={setPaymentPriceEnd} 
                error={error} setError={setError} errorText={'Не верное значение'}
                warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
                inputType="number"></InputWithError>
        </div>
        <div className="options-input" onChange={e => inputRadioCheck(e.target.value)}>
            <div className="option">
                <input type='radio' value={0} checked={isCheckedUserInput(0)} name="check"></input>
                <p>Сделка без риска - Оплата банковской картой с гарантией возврата и компенсацией материального ущерба до 10 000 ₽. Комиссия 11% + 35 ₽. Подробнее</p>
            </div>
            <div className="option">
                <input type="radio" value={1} checked={isCheckedUserInput(1)} name="check"></input>
                <p>Оплата напрямую исполнителю - Без гарантий и компенсаций Починим.ру: вы напрямую договариваетесь с исполнителем об условиях и способе оплаты.</p>
            </div>
            <div className="option">
                <input type="radio" value={2} checked={isCheckedUserInput(2)} name="check"></input>
                <p>Оплата с закрывающими документами - Откликнутся только юридические лица, ИП или самозанятые. Вы платите с расчётного счета компании и получаете закрывающие документы от исполнителя.</p>
            </div>
        </div>
    </div>)
}

export default PaymentEnter;