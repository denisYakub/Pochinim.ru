import congratsimg from '../../../../img/congrats-img.png';

const Congratulations = ({setPassportPhase, DOCS}) => {

    const goNext = async (phase) => {
        try {
            await DOCS.sendPassport();
            setPassportPhase(phase);
        } catch (error) {
            if(error.message == 'Пустое поле'){
                
            }
        }
    }

    const goPrev = (phase) => {
        setPassportPhase(phase);
    }

    return(
        <div className="phases-wrapper">
            <div className="document-verification-manual">
                <div className="document-verification-manual-annotation">
                    <h1>Подтверждение</h1>
                        <p>Спасибо, что прошли верификацию! </p>
                        <p>Проходит проверка тот, кому принадлежит аккаунт.</p>
                        <p>Это важный этапб укрепляющий доверие пользователей к вам. Проверка докуменьов займет от 1 до 3 рабочих дней.</p>
                        <p>Результаты проверки будут доступны в вашем профиле.</p>
                        <p>Благодорим за ваше терпение и понимание!</p>
                   
                </div>
                <img src={congratsimg} alt=''
                    className='document-verification-congratulations'></img>
                <div className='document-verification-button-nav'>
                    <button className="go-prev-button" onClick={() => goPrev(3)}>
                        <div></div>
                        Вернуться
                    </button>
                    <button className="go-next-button" onClick={e => goNext(0)}>
                        Завершить
                        <div></div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Congratulations;