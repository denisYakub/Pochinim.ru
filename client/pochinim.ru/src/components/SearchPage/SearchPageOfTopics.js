import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import fetchListOfUsers from './SearchPageFunctions';

const ListOfTopics = () => {

    const navigate = useNavigate();
    const [data , setData] = useState([]);

    useEffect( () => {
        const fn1 = async () =>{
            setData(await fetchListOfUsers());
        }
        fn1();
    }, [])
    
    return (
    <form>Search Page
        <div>
            {data?.message || data==null? "Need to refresh" : data.map(el => 
                <div key={el.id_account}>
                    {el.account_name}
                </div>
            )}
        </div>
    </form>)
};

export default ListOfTopics;