import User from "../../models/USER-model";

async function fetchListOfUsers(){
    const user = new User();

    const ret = await user.listOfUsers();
    if(ret?.message){
        console.log(ret.message);
    }
    return ret;
}

export default fetchListOfUsers;