import { Fragment, useEffect, useState } from "react";
import masterController from "../../controllers/MASTER-controller";
import MasterProfileCard from "./MasterCard";

//======================fix_it===========================
const l = await masterController.getListOfMasters(0, 30);
//======================fix_it===========================

const ListOfMasters = ({topic, setActivePop, setTextPop}) => {
    const [list, setList] = useState(l);

    useEffect(() => {
        var sortedList = [];

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
    }, []);

    return(<Fragment>
        {list.map((obj, key) => {
            return(<MasterProfileCard value={obj} key={key} setActivePop={setActivePop} setTextPop={setTextPop}></MasterProfileCard>);    
        })}
    </Fragment>);
}

export default ListOfMasters;