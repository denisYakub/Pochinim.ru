import { Fragment, useEffect, useState } from "react"
import EditSercicesPricesListPopup from "../../../Popups/EditPopup/EditSercicesPricesListPopup";
import { useParams } from 'react-router-dom';

const SercicesAndPriceBlock = ({MASTER, setReloadPage}) => {

    const [active, setActive] = useState(false);

    const update = () =>{
        setActive(true);
    } 

    return(<Fragment>
        <div className="phases-wrapper">
            <h1 className="outline-h">Услуги и условия работы</h1>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Услуги и цены</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => update()}></div>}
                </div>
                <div className="sercices-prices">
                    {MASTER.sercicesPrice?.map((value, index) => {
                        return(<div key={index}>
                            <p>{value[0]}</p>
                            <p>{value[1]}</p>
                        </div>);
                    })}
                </div>
            </div>
        </div>
        <EditSercicesPricesListPopup active={active} setActive={setActive}
            updateFunction={MASTER.updateMasterField}
            fieldToUpdate={"sercices_price"}
            value={MASTER.sercicesPrice}
            idUser={localStorage.getItem('id-master')} setReloadPage={setReloadPage}></EditSercicesPricesListPopup>
    </Fragment>);
}

export default SercicesAndPriceBlock;