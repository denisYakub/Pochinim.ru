import Y from '../../../../img/check.png';
import X from '../../../../img/x.png';
import passportPhotoExample1 from '../../../../img/passport-photo-example-1.png';
import passportPhotoExample2 from '../../../../img/passport-photo-example-2.png';
import passportPhotoExample3 from '../../../../img/passport-photo-example-3.png';
import putFile from '../../../../img/putFile.png';
import Select from 'react-select';
import InputWithError from '../../../../animations/input-error-field';
import { useState } from 'react';

const PassportDataFirtPart = ({setPassportPhase}) => {
    return(
        <div className="phases-wrapper">
            <div className="document-verification-manual">
                <div className="document-verification-manual-annotation">
                    <h1>Данные паспорта</h1>
                    <h1>Инструкция</h1>
                    <p>Загрузите фото документа. Проходит проверка тот, кому принадлежит аккаунт.</p>
                </div>
                <div className="document-verification-passport-data-main-text">
                    <p>Сфотографийте главный развоворот паспорта.</p>
                    <p>Снимок должен быть цветным и четким, без бликов и посторонних предметов. Все буквы и цифры хорошо читаются, все углы документа видны.</p>
                    <p>Не загружайте сканы или фото копий документа.</p>
                </div>
                <div className="document-verification-passport-data-photo-example">
                    <div>
                        <img src={Y} alt=''
                        style={{
                            border: '1px solid #299400',
                            borderRadius: '40px',
                            width: '39px',
                            height: '39px'
                        }}></img>
                        <img src={passportPhotoExample1} alt=''
                        style={{
                            background: '#EBF0FF',
                            padding: '33px',
                            border: '1px solid #EBF0FF',
                            borderRadius: '10px'
                        }}></img>
                    </div>
                    <div>
                        <img src={X} alt=''
                        style={{
                            border: '1px solid #EF0000',
                            borderRadius: '40px',
                            width: '39px',
                            height: '39px'
                        }}></img>
                        <img src={passportPhotoExample2} alt=''
                        style={{
                            background: '#EBF0FF',
                            paddingBottom: '105px',
                            paddingLeft: '33px',
                            paddingRight: '33px',
                            border: '1px solid #EBF0FF',
                            borderRadius: '10px'
                        }}></img>
                    </div>
                    <div>
                        <img src={X} alt=''
                        style={{
                            border: '1px solid #EF0000',
                            borderRadius: '40px',
                            width: '39px',
                            height: '39px'
                        }}></img>
                        <img src={passportPhotoExample3} alt=''
                        style={{
                            background: '#EBF0FF',
                            paddingBottom: '152px',
                            paddingLeft: '13px',
                            paddingRight: '124px',
                            border: '1px solid #EBF0FF',
                            borderRadius: '10px'
                        }}></img>
                    </div>
                </div>
                <button className="go-next-button" onClick={e => setPassportPhase(2)}>
                    Продолжить
                    <div></div>
                </button>
            </div>
        </div>
    );
} 

const PassportDataSecondPart = ({setPassportPhase, DOCS}) => {

    const countries = [{ value: 'RUS', label: 'Российская Федерация' }, 
                        { value: 'UK', label: 'Великобритания' },
                        { value: 'UZ', label: 'Узбекистан' }];

    const [errorText, setErrorText] = useState('Ошибка ввода');              
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(true);
    
    const [country, setCountry] = useState(DOCS.passport.country);
    const [series, setSeries] = useState(DOCS.passport.series);
    const [number, setNumber] = useState(DOCS.passport.number);
    const [fio, setFio] = useState(DOCS.passport.fio);
    const [date, setDate] = useState(DOCS.passport.date);
    const [code, setCode] = useState(DOCS.passport.code);
    const [whoGave, setWhoGave] = useState(DOCS.passport.who_gave);
    const [photo, setPhoto] = useState(DOCS.passport.photo);

    const goNext = (phase) => {
        try {
            DOCS.passport = { country: country, series: series, number: number, 
                fio: fio, date: date, code: code, who_gave: whoGave, photo: photo };
                
            setPassportPhase(phase)
        } catch (error) {
            if(error.message == 'Пустое поле'){
                setError(true);
                setErrorText(error.message);
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
                    <h1>Паспортные данные</h1>
                    <p>Введите даннве паспорта, а также загрузите фото документа согласно инструкции</p>
                </div>
                <div className='document-verification-passport-data-input'>
                    <div className='document-verification-passport-text-input'>
                        <Select options={countries}
                            placeholder={country}
                            onChange={e => setCountry(e.value)}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    display: 'flex',
                                    borderRadius: '100px',
                                    border: '1px solid var(--color-secondary-grey-dies)',
                                    background: 'var(--color-secondary-grey-dies)',
                                    width: 'fit-content',
                                    height: '55px',
                                    marginBottom: '30px'
                                }), 
                            }}>
                        </Select>
                        <div>
                            <InputWithError placeholder={'Серия '}
                                            value={series} setValue={setSeries}
                                            error={error} setError={setError} errorText={errorText}
                                            warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
                            <InputWithError placeholder={'Номер'}
                                            value={number} setValue={setNumber}
                                            error={error} setError={setError} errorText={errorText}
                                            warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
                        </div>
                        <InputWithError placeholder={'ФИО'}
                                        value={fio} setValue={setFio}
                                        error={error} setError={setError} errorText={errorText}
                                        warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
                        <div>
                            <InputWithError placeholder={'Дата выдачи'}
                                            value={date} setValue={setDate}
                                            error={error} setError={setError} errorText={errorText}
                                            warning={warning} setWarning={setWarning} warningText={'Заполните поле'}
                                            inputType='date'></InputWithError>
                            <InputWithError placeholder={'Код подразделения'}
                                            value={code} setValue={setCode}
                                            error={error} setError={setError} errorText={errorText}
                                            warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
                        </div>
                        <InputWithError placeholder={'Кем выдан'}
                                        value={whoGave} setValue={setWhoGave}
                                        error={error} setError={setError} errorText={errorText}
                                        warning={warning} setWarning={setWarning} warningText={'Заполните поле'}></InputWithError>
                    </div>
                    {photo?
                        <div className='document-verification-passport-photo-delete'>
                            <img src={URL.createObjectURL(photo)} alt=''></img>
                            <button onClick={() => setPhoto(null)}></button>
                        </div>
                    :
                        <div className='document-verification-passport-photo-input' onClick={() => document.querySelector('.photo-input-field').click()}>
                            <img src={putFile} alt=""></img>
                            <p>Загрузить документ</p>
                            <input type="file" accept=".jpg,.jpeg,.png" multiple={false} 
                                    className="photo-input-field" hidden={true} 
                                    onChange={e => setPhoto(e.target.files[0])}></input>
                        </div>
                    }
                </div>
                <div className='document-verification-button-nav'>
                    <button className="go-prev-button" onClick={() => goPrev(1)}>
                        <div></div>
                        Вернуться
                    </button>
                    <button className="go-next-button" onClick={() => goNext(3)}>
                        Продолжить
                        <div></div>
                    </button>
                </div>
            </div>
        </div>
    );
} 

export {PassportDataFirtPart, PassportDataSecondPart};