import loadPhotoIcon from "../../../img/putFile.png";

const DetailsEnter = ({detailsText, setDetailsText, detailsFiles, setDetailsFiles, error, setError, errorRed}) => {
    return(<div className="blockPhase">
        <h1>
            Остались пожелания к заказу?
        </h1>
        <div className="moreInfo">
            <textarea ref={errorRed} placeholder="Важные детали для специлиста, о которых мы не спросили" onChange={e => setDetailsText(e.target.value)}></textarea>
            <div className="topic-photos">
                {detailsFiles!=null?Array.from(detailsFiles)?.map((file)=> {
                    return(
                    <div className="topic-photo">
                        <img className="photo" src={URL.createObjectURL(file)} alt="your file"></img>
                        {file.name};
                    </div>
                )}):null}
            </div>
            <div className="topic-photo-choose" onClick={() => document.querySelector(".photo-input").click()}>
                <img src={loadPhotoIcon} alt="loadPhotoIcon"></img>
                <p>Добавить/удалить файл или фото</p>
                <input type="file" accept=".jpg,.jpeg,.png" multiple={true} hidden={true} 
                className="photo-input"
                onChange={e => setDetailsFiles(e.target.files)}></input>
            </div>
            
        </div>
    </div>)
}

export default DetailsEnter;