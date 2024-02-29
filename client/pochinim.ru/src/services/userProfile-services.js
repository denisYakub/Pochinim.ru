import User from "../controllers/USER-controller";

async function logOut(){
    
    const ret = await User.logOut();
    console.log(ret);
    
}

export {logOut};