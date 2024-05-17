import { Fragment, useEffect, useState } from "react";
import MasterProfileCard from './MasterCard';
import './MasterCard.css'
import masterController from "../../../controllers/MASTER-controller";

const ListOfMasters = ({topic, setActivePop, setTextPop, idTopic}) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function setData(){

            var sortedList = [];

            setList(await masterController.getListOfMasters(0, 30));

            if(list.length > 0){
                list.forEach(el => {
                    for (var i = 0; i < el.sercicesAndPrice.length; ++i){
                        if(el.sercicesAndPrice[i][0].toLowerCase().includes(topic.toLowerCase())){
                            sortedList.push(el);
                            break;
                        }
                    }
                });
    
                if(sortedList.length > 0){
                    setList(sortedList); 
                }else{
                    //если ничего не нашлось
                } 
            }
        }

        setData();
    }, []);

    return(<Fragment>
        {list?.map((obj, key) => {
            return(<div className="list-of-masters-wrapper" key={key}>
                <MasterProfileCard value={obj}
                setActivePop={setActivePop} setTextPop={setTextPop}
                idTopic={idTopic}></MasterProfileCard>
            </div>);    
        })}
    </Fragment>);
}

export default ListOfMasters;