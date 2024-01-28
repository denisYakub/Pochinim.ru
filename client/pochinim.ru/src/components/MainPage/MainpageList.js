import { Fragment, useContext, useEffect, useState } from "react";
import {observer} from "mobx-react-lite"
import { useLocation } from "react-router-dom";
import fetchWelcomeWords from "./MainpageFunctions";

const MainPAge = () => {
    const [words , setWords] = useState("");
    
    useEffect(() => {

        const fn1 = async () => {
            const w = await fetchWelcomeWords();
            setWords(w);
        }

        fn1();
        
    }, [])
    
    return(<Fragment>
        <h1>Main page</h1>
        <h2>{`${words}`}</h2>
    </Fragment>);
}

export default observer(MainPAge);