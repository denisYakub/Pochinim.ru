import User from "../models/USER-model";

async function checkEmail(email, phase){
    const user = new User();    
    const ret = await user.checkEmail(email);
    return ret;
    
}

async function fetchRegistrate(login, email, password){

    if(login === "" || email === "" || password === ""){
        return false;
    }

    const user = new User();    
    const ret = await user.registrate(login, email, password)

    if(ret.message){
        console.log(ret.message);
        return false;
    }
    return true;
}

export {fetchRegistrate, checkEmail};