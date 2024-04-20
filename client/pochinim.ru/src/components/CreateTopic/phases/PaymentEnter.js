const PaymentEnter = ({paymentOption, setPaymentOption, error, setError, errorRed}) => {
    
    const inputRadioCheck = (e) => {
        setPaymentOption(e.value);
    }

    return(<div className="blockPhase">
        <h1>
            Сколько готовы заплатить за работу?
        </h1>
        <div className="paymentOptions" onChange={e => inputRadioCheck(e.target)}>
            <div className="paymentOption">
                <input type="radio" value={0} className="urInput-radio" name="check"></input>
                <div>
                    <h1>Сделка без риска</h1>
                    <a>Оплата банковской картой с гарантией возврата и компенсацией материального ущерба до 10 000 ₽. Комиссия 11% + 35 ₽. Подробнее</a>
                </div>
            </div>
            <div className="paymentOption">
                <input type="radio" value={1} className="urInput-radio" name="check"></input>
                <div>
                    <h1>Оплата напрямую исполнителю</h1>
                    <a>Без гарантий и компенсаций Починим.ру: вы напрямую договариваетесь с исполнителем об условиях и способе оплаты.</a>
                </div>
            </div>
            <div className="paymentOption">
                <input type="radio" value={2} className="urInput-radio" name="check"></input>
                <div>
                    <h1>Оплата с закрывающими документами</h1>
                    <a>Откликнутся только юридические лица, ИП или самозанятые. Вы платите с расчётного счета компании и получаете закрывающие документы от исполнителя.</a>
                </div>
            </div>
        </div>
    </div>)
}

export default PaymentEnter;