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

async function getSendCode(email){
    const user = new User();
    var code = await user.sendCode(email);
    if(code?.message){
        return false;
    }
    console.log(code);
    return code;
}

async function registrate(email, name, password){
    const user = new User();
    var ret = await user.registrate(name, email, password);
    if(ret?.message){
        return false;
    }
    return true;
}

async function logIn(email, password){
    const user = new User();
    var ret = await user.logIn(email, password);
    console.log(ret);
    if(ret?.message){
        return false;
    }
    return true;
}

export {fetchRegistrate, checkEmail, getSendCode, registrate, logIn};