import User from "../controllers/USER-controller";

async function checkEmail(email, phase){
    const ret = await User.checkEmail(email);
    return ret;
    
}

async function fetchRegistrate(login, email, password){

    if(login === "" || email === "" || password === ""){
        return false;
    }
 
    const ret = await User.registrate(login, email, password)

    if(ret.message){
        console.log(ret.message);
        return false;
    }
    return true;
}

async function getSendCode(email){
    var code = await User.sendCode(email);
    if(code?.message){
        return false;
    }
    console.log(code);
    return code;
}

async function registrate(email, name, password){
    var ret = await User.registrate(name, email, password);
    if(ret?.message){
        return false;
    }
    return true;
}

async function logIn(email, password){
    var ret = await User.logIn(email, password);
    console.log(ret);
    if(ret?.message){
        return false;
    }
    return true;
}

export {fetchRegistrate, checkEmail, getSendCode, registrate, logIn};