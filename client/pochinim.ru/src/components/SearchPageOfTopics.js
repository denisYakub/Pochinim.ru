import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const ListOfTopics = () => {

    const navigate = useNavigate();
    const [data , setData] = useState([]);

    useEffect( () => {
        async function fetchData(){
            const token = await localStorage.getItem('token');
            console.log('Bearer ' + btoa(token));
            const fet = await fetch('http://localhost:4000/api/users',{
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                credentials: "include"
            })
            const res = await fet.json();
            console.log(res);
            setData(res);
        }
        fetchData();
    }, [])
    
    return (<form>Search Page{}
        </form>)
};

export default ListOfTopics;