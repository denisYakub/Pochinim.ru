const Manual = ({setPassportPhase}) => {
    return(
        <div className="phases-wrapper">
            <div className="document-verification-manual">
                <div className="document-verification-manual-annotation">
                    <h1>Верификация личности</h1>
                    <h1>Инструкция</h1>
                    <div>
                        <p>Загрузите фото документа и ваше фото с документом.</p>
                        <p>Проходит проверка тот, кому принадлежит аккаунт.</p>
                    </div>
                </div>
                <div className="document-verification-manual-steps">
                    <div className="document-verification-manual-step">
                        <p>1</p>
                        <div>
                            <h1>Фото документов</h1>
                             <p>Данные и фото паспорта.</p>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="document-verification-manual-step">
                        <p>2</p>
                        <div>
                            <h1>Фото с паспортом</h1>
                             <p>Фото с паспортом в руках</p>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="document-verification-manual-step">
                        <p>3</p>
                        <div>
                            <h1>Завершений</h1>
                             <p>Проверка данных модерацией</p>
                        </div>
                    </div>
                </div>
                <button className="go-next-button" onClick={e => setPassportPhase(1)}>
                    Продолжить
                    <div></div>
                </button>
            </div>
        </div>
    )
}

export default Manual;