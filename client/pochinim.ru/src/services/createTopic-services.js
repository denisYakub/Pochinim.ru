import User from "../controllers/USER-controller";

async function checkForAccessInCreateTopic(){

    if(localStorage.getItem('token')){
        const ret = await User.checkAuth();

        if(ret?.message){
            return false;
        }else{
            return true;
        }
    }
    return false;
}

export default checkForAccessInCreateTopic;