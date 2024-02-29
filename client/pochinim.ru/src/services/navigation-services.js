import User from "../controllers/USER-controller";

async function checkForAuth(){

    if(localStorage.getItem('token')){
        const ret = await User.checkAuth();

        if(ret?.message){
            console.log(ret?.message);
            return null;
        }else{
            console.log(ret?.login);
            return ret?.login;
        }
    }
    return null;
}

export default checkForAuth;