import defaultImg from '../../../img/person.png';

const MasterPhotoEnter = ({photo, setPhoto}) => {
    return(<div className="phaseBlock">
        <h1>Фото в профиль</h1>
        <a>Клиенты чаще всего выбирают мастеров с фото в профиле. В любой момент можно сметь фото.</a>
        <div className="photo-choose-block">
            <div className="photo-choose-input">
                <img src={photo} alt={defaultImg}></img>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={e => setPhoto(e.target.files[0])} multiple={false}></input>
            </div>
            <div className="text-hints">
                <div className="text-hint">
                    <div className="yep-icon"></div>
                    <p></p>
                    <div className="nope-icon"></div>
                    <p></p>
                </div>
            </div>
        </div>
    </div>);
};

export default MasterPhotoEnter;