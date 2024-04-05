import userServices from "../services/user-services";

class UserController{

    async checkUserEmail(email){//signInUp-service
        const ret = await userServices.checkEmail(email)
        return ret;
    }

    async registrateUser(login, email, password){//signInUp-service

        if(login === "" || email === "" || password === ""){
            return false;
        }
     
        const ret = await userServices.registrate(login, email, password)
    
        if(ret.message){
            console.log(ret.message);
            return false;
        }
        return true;
    }

    async getSendCode(email){//signInUp-service
        var code = await userServices.sendCode(email);
        if(code?.message){
            return false;
        }
        console.log(code);
        return code;
    }

    async logInUser(email, password){//signInUp-service
        var ret = await userServices.logIn(email, password);
        console.log(ret);
        if(ret?.message){
            return false;
        }
        return true;
    }

    async checkForAccess(){
        if(localStorage.getItem('token')){
            const ret = await userServices.checkAuth();
            
            if(ret?.message){
                return false;
            }else{
                return true;
            }
        }
        return false;
    }

    async logOutUser(){
        const ret = await userServices.logOut();
        console.log(ret);

    }
}

export default new UserController();