import User from "../models/USER-model";

async function checkForAuth(){

    if(localStorage.getItem('token')){
        const user = new User();
        const ret = await user.checkAuth();

        if(ret?.message){
            console.log(ret.message);
            return null;
        }else{
            console.log(ret.login);
            return ret?.login;
        }
    }
    return null;
}

export default checkForAuth;