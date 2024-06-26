import { useState } from 'react';
import defaultPhoto from '../../../../img/default-user-img.png'

const MasterPhotoEnter = ({step, setStep, MASTER}) => {

    const [photo, setPhoto] = useState(MASTER.photo);

    const [image, setImage] = useState(photo?URL.createObjectURL(photo):defaultPhoto);

    const upLoadPhoto = (value) => {
        setPhoto(value);
        setImage(URL.createObjectURL(value));
    }

    const click = async () => {
        try {
            MASTER.photo = photo;
            setStep(step + 1);
        } catch (error) {
            if(error.message == 'Пустое значение'){

            }else{
                throw new Error(error.message);
            }
        }
    }

    return(<div className="phases-wrapper">
        <div className="signUpMaster-annotation">
            <h1>Фото в профиль</h1>
            <a>Клиенты чаще всего выбирают мастеров с фото в профиле. В любой момент можно сметь фото.</a>
        </div>
        <div className="photo-choose-block">
            <div className="photo-choose-input" onClick={() => document.querySelector(".photo-input-field").click()}>
                <img src={image} alt="photo"></img>
                <h1>{MASTER.fio[0]} {MASTER.fio[1]}</h1>
                <p>Загрузить фото или селфи</p>
                <input type="file" accept=".jpg,.jpeg,.png" multiple={false} 
                    className="photo-input-field" hidden={true} 
                    onChange={e => upLoadPhoto(e.target.files[0])}></input>
            </div>
            <div className="text-hints">
                <div className="text-hint">
                    <div className="yep-icon"></div>
                    <p>На фото изображены вы;</p>
                </div>
                <div className="text-hint">
                    <div className="yep-icon"></div>
                    <p>Лицо видно полностью;</p>
                </div>
                <div className="text-hint">
                    <div className="yep-icon"></div>
                    <p>Размер фото не меньше 100×200</p>
                </div>
                <div className="text-hint">
                    <div className="nope-icon"></div>
                    <p>На фото вы в солнцезащитных очках/в головном уборе;</p>
                </div>
                <div className="text-hint">
                    <div className="nope-icon"></div>
                    <p>На фото есть посторонние люди;</p>
                </div>
                <div className="text-hint">
                    <div className="nope-icon"></div>
                    <p>Есть подписи/другие картинки;</p>
                </div>
                <div className="text-hint">
                    <div className="nope-icon"></div>
                    <p>На фото есть алькоголь/сигареты;</p>
                </div>
            </div>
        </div>
        <button onClick={click} className='continue-button'>Продолжить</button>
    </div>);
};

export default MasterPhotoEnter;