const PaymentEnter = ({paymentOption, setPaymentOption}) => {
    
    const inputRadioCheck = (e) => {
        setPaymentOption(e.value);
    }

    const isChecked = (index) => {
        if(paymentOption === index){
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
        <div className="options-input" onChange={e => inputRadioCheck(e.target)}>
            <div>
                <input type="radio" value={0} name="check"></input>
                <p>Сделка без риска - Оплата банковской картой с гарантией возврата и компенсацией материального ущерба до 10 000 ₽. Комиссия 11% + 35 ₽. Подробнее</p>
            </div>
            <div>
                <input type="radio" value={1} name="check"></input>
                <p>Оплата напрямую исполнителю - Без гарантий и компенсаций Починим.ру: вы напрямую договариваетесь с исполнителем об условиях и способе оплаты.</p>
            </div>
            <div>
                <input type="radio" value={2} name="check"></input>
                <p>Оплата с закрывающими документами - Откликнутся только юридические лица, ИП или самозанятые. Вы платите с расчётного счета компании и получаете закрывающие документы от исполнителя.</p>
            </div>
        </div>
    </div>)
}

export default PaymentEnter;