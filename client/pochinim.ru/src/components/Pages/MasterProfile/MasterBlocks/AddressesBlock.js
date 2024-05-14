import { Fragment } from "react";
import { useParams } from 'react-router-dom';

const AddressesBlock = ({MASTER, setReloadPage}) => {

    return(<Fragment>
        <div className="phases-wrapper">
            <h1 className="outline-h">Районы и адреса</h1>
            <div className="editable-gray-block">
                <div className='edit-wrapper-button'>
                    <p>Мой адрес</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => {}}></div>}
                </div>
                <p>{MASTER.city}</p>
            </div>
            <div className="editable-block"> 
                <div className='edit-wrapper-button'>
                    <p>Выезжаю к клиентам</p>
                    {useParams().pev_page?null:<div className='edit-button' onClick={() => {}}></div>}
                </div>
                <div className="button-hints" style={{marginTop: '20px', marginBottom: '20px'}}>
                    {MASTER.selectedOptionsLocation?.map((value, index) => {
                        return(<button className="hint" key={index}>{value}</button>);
                    })}
                </div>
            </div>
        </div>
    </Fragment>);
}

export default AddressesBlock;