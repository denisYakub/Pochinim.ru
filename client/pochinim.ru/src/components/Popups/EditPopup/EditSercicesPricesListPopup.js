import './EditPopup.css';
import { Fragment, useEffect, useState } from "react"
import {motion, useAnimate} from "framer-motion";

const EditSercicesPricesListPopup = ({active, setActive, updateFunction, fieldToUpdate, idUser, setReloadPage, value}) =>{

    const [scope, animate] = useAnimate();

    const [checkbox, setCheckbox] = useState(null);
    const [checked, setChecked] = useState(false);

    const [newListOfSercicesAndPrice, setNewListOfSercicesAndPrice] = useState(value);

    const [newSercices, setNewSercices] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const [deleteSercice, setDeleteSercice] = useState([]);

    const updatePrice = (index, price) => {
        console.log(index, price);
        newListOfSercicesAndPrice[index][1] = price;

        console.log(newListOfSercicesAndPrice);
    }

    useEffect(() => {
        if(checkbox?.type == 'checkbox' && checkbox?.value == 'new'){
            setChecked(true);
            if(newSercices != '' && newPrice != 0){
                //const ls = newListOfSercicesAndPrice;
                newListOfSercicesAndPrice?.push([newSercices, newPrice]);
                //setNewListOfSercicesAndPrice(ls);
                setCheckbox(null);
                setNewSercices('');
                setNewPrice(0);
                setChecked(false);
            }
        }else if(checkbox?.type == 'checkbox'){
            var index = deleteSercice.indexOf(checkbox.value);
            
            if(index !== -1){
                deleteSercice.splice(index, 1);
            }else{
                deleteSercice.push(checkbox.value)
            }
        }

        setChecked(false);

        if(value.length > 0 ){
            setNewListOfSercicesAndPrice(value);
        }
        
    }, [checkbox, newSercices, newPrice, value])

    const cancel = async () => {
        await animate(scope.current, {scale:0});
        setActive(false);
    }

    const save = async () => {
        if (deleteSercice.length != 0) {
            deleteSercice.forEach(el => {
                console.log(el);
                var index;
                newListOfSercicesAndPrice.forEach((elim, ind) => {
                    if(elim[0] == el)
                        index = ind
                })
                console.log(index);
                if(index !== -1){
                    newListOfSercicesAndPrice.splice(index, 1);
                }
            });
        }
        await updateFunction(fieldToUpdate, newListOfSercicesAndPrice);
        await animate(scope.current, {scale:0});
        setActive(false);
        setReloadPage(true);
    }

    return(<motion.div ref={scope} className='edit-popup-wrapper'
        initial={{scale:0}} animate={active?{scale:1}:null}>
            <div className='edit-popup'>
            <div className='children-popup'>
                <h1 className="edit-popup-h">Услуги и цены</h1>
                <div className="edit-popup-list-of-sercices-prices" onChange={
                        e => {setCheckbox(e.target)}
                    }>
                    {newListOfSercicesAndPrice?.map((value, index) => {
                        return(<Fragment>
                            <div key={index} className="edit-popup-sercice-price">
                                <div className="edit-popup-sercice-price-checkbox">
                                    <input type='checkbox' value={value[0]} defaultChecked></input>
                                    <p>{value[0]}</p>
                                </div>
                                <input type='number' placeholder={value[1]} 
                                        onChange={e => updatePrice(index, e.target.value)}></input>
                            </div>
                        </Fragment>);
                    })}
                    <div className="edit-popup-sercice-price">
                        <div className="edit-popup-sercice-price-checkbox">
                            <input type='checkbox' value={'new'} defaultChecked={false} checked={checked}></input>
                            <input type='text' placeholder='' value={newSercices} onChange={e => setNewSercices(e.target.value)}></input>
                        </div>
                        <input type='number' placeholder={0} value={newPrice} onChange={e => setNewPrice(e.target.value)}></input>
                    </div>
                </div>
            </div>
                <div className='edit-popup-buttons'>
                    <button className='cancel-button' onClick={() => cancel()}>Отменить изменения</button>
                    <button className='save-button' onClick={() => save()}>Сохранить</button>
                </div>
            </div>
    </motion.div>);
}

export default EditSercicesPricesListPopup;