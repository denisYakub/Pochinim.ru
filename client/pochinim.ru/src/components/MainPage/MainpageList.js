import { Fragment, useEffect, useState } from "react";
import User from "../../models/USER-model";
import {observer} from "mobx-react-lite"

const MainPAge = () => {
    const user = new User();
    const [isAuth , setAuth] = useState("");
    useEffect(() => {
        async function fetchData(){
            const storeData = localStorage.getItem('token')
            if(storeData){
                const data = await user.checkAuth();
                console.log(data);
                setAuth(data.login);
            }
        }
        fetchData()
    }, [])
    
    return(<Fragment>
        <h1>Main page {`${isAuth}`}</h1>
    </Fragment>);
}

export default observer(MainPAge);