import { Fragment, useEffect, useState } from "react";
import MasterProfileCard from './MasterCard';

const ListOfMasters = ({listOfMasters, topic, setActivePop, setTextPop, canSendMessage}) => {
    const [list, setList] = useState(listOfMasters);

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
        {list?.map((obj, key) => {
            return(<MasterProfileCard value={obj} key={key} 
                                        setActivePop={setActivePop} setTextPop={setTextPop}
                                        canSendMessage={canSendMessage}></MasterProfileCard>);    
        })}
    </Fragment>);
}

export default ListOfMasters;