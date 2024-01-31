import User from "../../models/USER-model";
import MainpageList from "./MainpageList";

async function fetchWelcomeWords(){

    "Pls logIn"

    if(localStorage.getItem('token')){
        const user = new User();
        const ret = await user.checkAuth();

        if(ret?.message){
            console.log(ret.message);
        }else{
            return `Welcome, ${ret?.login}`;
        }
    }
    return "Pls logIn";
}

export default fetchWelcomeWords;