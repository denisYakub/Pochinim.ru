import { useState, useEffect } from 'react';
import loadPhotoIcon from '../../../../img/edit-img.png';

const DetailsEnter = ({TOPIC}) => {
    const [detailsText, setDetailsText] = useState(TOPIC.detailsText);
    const [detailsFiles, setDetailsFiles] = useState(TOPIC.detailsFiles);
    const [error, setError] = useState(false);

    useEffect(()=>{
        try {
            TOPIC.detailsText = detailsText;
            TOPIC.detailsFiles = detailsFiles;
        } catch (error) {
            console.log(error);
            detailsText('');
            setDetailsFiles('');
            setError(true);
            setTimeout(()=>{
                setError(false);
            }, 5000);
        }
        
    },[detailsText, detailsFiles])

    return(<div className="createTopic-phase">
        <div className='createTopic-phase-annotation'>
            <p>9/9</p>
            <h1>Остались пожелания к заказу?</h1>
        </div>
        <div className="createTopic-details-text-photo">
            <textarea placeholder="Важные детали для специлиста, о которых мы не спросили" onChange={e => setDetailsText(e.target.value)}></textarea>
            <div className="topic-photos">
                {detailsFiles!=null?Array.from(detailsFiles)?.map((file)=> {
                    return(
                    <div className="topic-photo">
                        <img className="photo" src={URL.createObjectURL(file)} alt="your file"></img>
                        {file.name};
                    </div>
                )}):null}
            </div>
            <div className="createTopic-details-photo-choose" onClick={() => document.querySelector(".photo-input").click()}>
                <img src={loadPhotoIcon} alt=""></img>
                <p>Добавить/удалить файл или фото</p>
                <input type="file" accept=".jpg,.jpeg,.png" multiple={true} hidden={true} 
                className="photo-input"
                onChange={e => setDetailsFiles(e.target.files)}></input>
            </div>
        </div>
    </div>)
}

export default DetailsEnter;