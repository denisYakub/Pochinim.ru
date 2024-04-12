import { useState } from "react";
import Loader from "../../Loader/Loader";

const MasterPasswordEnter = ({password, setPassword}) => {
    
    const [showLoader, setShowLoader] = useState(false);

    return(<div className="phaseBlock">
        <button onClick={() => setShowLoader(true)}>Загрузить</button>
        <Loader showLoader={showLoader} setShowLoader={setShowLoader} timer={3000}></Loader>
    </div>);
};

export default MasterPasswordEnter;