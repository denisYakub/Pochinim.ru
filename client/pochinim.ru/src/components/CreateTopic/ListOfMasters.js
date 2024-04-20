import { Fragment, useEffect, useState } from "react";
import masterController from "../../controllers/MASTER-controller";
//import {Link} from "react-router-dom";
import MasterProfileCard from "./MasterCard";

//const list = await masterController.getListOfMasters(0, 30);

const ListOfMasters = async ({topic, setActivePop, setTextPop}) => {
    const [list, setList] = useState(await masterController.getListOfMasters(0, 30));

    useEffect(() => {
        var sortedList = [];

        if(list.length > 0){
            list.forEach(el => {
                for (const val of el){
                    if(val[0].toLowerCase().includes(topic.toLowerCase())){
                        sortedList.push(el);
                        break;
                    };
                }
                /*el?.sercicesAndPrice?.forEach(val => {
                    if(val[0].toLowerCase().includes(topic.toLowerCase())){
                        sortedList.push(el);
                    };
                });*/
            });

            if(sortedList.length > 0){
                setList(sortedList); 
            }   
        }
    }, [list, topic]);

    /*const checkTopic = (value) => {
        var tf = false;
        value.forEach(element => {
            if(element[0].toLowerCase().includes(topic.toLowerCase())){
                tf = true;
            }
        });
        return tf;
    }*/   

    /*return(list?.map((value, index) => {
        if(checkTopic(value.sercicesAndPrice)){
            return(<MasterProfileCard key={index} value={value}></MasterProfileCard>);
        };
    }));*/
    return(<Fragment>
        {list?.map(obj => {
            return(<MasterProfileCard value={obj} setActivePop={setActivePop} setTextPop={setTextPop}/>)
        })}
    </Fragment>)
}

export default ListOfMasters;