import User from "../models/USER-model";

async function logOut(){
    
    const user = new User();

    const ret = await user.logOut();
    console.log(ret);
    
}

export {logOut};