import { useState } from 'react';
import putFile from '../../../../img/putFile.png';

const PassportFace = ({setPassportPhase, DOCS}) => {

    const [photoFacePassport, setPhotoFacePassport] = useState(null);

    const goNext = (phase) => {
        try {
            DOCS.photoFacePassport = photoFacePassport
            setPassportPhase(phase)
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
                    <h1>Фото с паспортом</h1>
                    <p>Загрузите ваше фото с паспортом согласно инструкции</p>
                </div>
                <div className='document-verification-passport-face-info'>
                    <div className='document-verification-passport-face-info-text'>
                        <p>Цвет: Цветное фото.</p>
                        <p>Качество: Фотография должна быть четкой и хорошо освещенной, без размытий или искажений.</p>
                        <p>Фон: Фон должен быть однородным, светлым и без каких-либо объектов или теней, особенно в области лица. В случае загрузки с паспортом, фоном может быть белый фон паспорта.</p>
                        <p>Поза и ракурс: Лицо пользователя должно быть четко видимым и без каких-либо препятствий. Рекомендуется, чтобы пользователь смотрел прямо в камеру. Голова должна быть расположена прямо, без наклона.</p>
                        <p>Формат файла: файл должен быть в формате JPEG/JPG или PNG.</p>
                    </div>
                    <img></img>
                </div>
                {photoFacePassport?
                    <div className='document-verification-passport-face-delete'>
                        <img src={URL.createObjectURL(photoFacePassport)} alt=''></img>
                        <button onClick={() => setPhotoFacePassport(null)}></button>
                    </div>
                :
                    <div className='document-verification-passport-face-input' onClick={() => document.querySelector('.photo-input-field').click()}>
                        <img src={putFile} alt=""></img>
                        <p>Загрузить документ</p>
                        <input type="file" accept=".jpg,.jpeg,.png" multiple={false} 
                                className="photo-input-field" hidden={true} 
                                onChange={e => setPhotoFacePassport(e.target.files[0])}></input>
                    </div>
                }
                <div className='document-verification-button-nav'>
                    <button className="go-prev-button" onClick={() => goPrev(2)}>
                        <div></div>
                        Вернуться
                    </button>
                    <button className="go-next-button" onClick={e => goNext(4)}>
                        Продолжить
                        <div></div>
                    </button>
                </div>
            </div>
        </div>
    );
} 

export default PassportFace;